# Pester 5 tests of the tenant scripts (scripts/om_*.ps1) against a fake octo-cli and octo-ckc.
#
# Invariant (AB#9363): no template script deletes or recreates a tenant unless the target is a local stack AND the
# user asked for it with an explicit switch; otherwise the script aborts before any write.
#
# The scripts run as child processes (pwsh -File), exactly as a developer runs them. A fake octo-cli and octo-ckc
# come first on PATH: they log every call to a file and never reach a real OctoMesh. A refused run may only have
# called `ListContexts` (reading), nothing else - not even `Config`, which rewrites the local octo-cli context.
#
# Run: pwsh scripts/tests/Invoke-ScriptTests.ps1

BeforeAll {
    $script:SourceScripts = Split-Path -Parent $PSScriptRoot
    $script:IsWin = $IsWindows

    # A copy of the scripts with a minimal repository around them, so the CK compile output and the seed data never
    # touch the real repository.
    $script:Repo = Join-Path $TestDrive "repo"
    $scriptsCopy = Join-Path $script:Repo "scripts"
    New-Item -ItemType Directory -Path $scriptsCopy -Force | Out-Null
    Copy-Item -Path (Join-Path $script:SourceScripts "om_*.ps1") -Destination $scriptsCopy
    New-Item -ItemType Directory -Path (Join-Path $script:Repo "src/TestAppCkModel/ConstructionKit") -Force | Out-Null
    $seedDir = Join-Path $script:Repo "src/blueprints/TestApp/seed-data"
    New-Item -ItemType Directory -Path $seedDir -Force | Out-Null
    Set-Content -Path (Join-Path $seedDir "entities.yaml") -Value "entities: []"

    # Fake tools: one PowerShell implementation, called through a small wrapper per tool name.
    $script:FakeBin = Join-Path $TestDrive "fake-bin"
    New-Item -ItemType Directory -Path $script:FakeBin -Force | Out-Null
    $impl = Join-Path $script:FakeBin "fake-octo.ps1"
    Set-Content -Path $impl -Value @'
# No param block: every argument (also -c, -w, -y) arrives as a plain string in $args.
$Tool = $args[0]
$Rest = @($args | Select-Object -Skip 1 | ForEach-Object { "$_" })
Add-Content -Path $env:FAKE_OCTO_LOG -Value ("$Tool " + ($Rest -join ' '))
$command = if ($Rest.Count -ge 2 -and $Rest[0] -eq '-c') { $Rest[1] } else { '' }
if ($Tool -eq 'octo-cli' -and $command -eq 'ListContexts') {
    if ($env:FAKE_OCTO_LISTCONTEXTS_EXIT) { Write-Output 'error: no contexts'; exit [int]$env:FAKE_OCTO_LISTCONTEXTS_EXIT }
    Write-Output 'OctoMesh CLI (fake) 3.5.0'
    Write-Output ''
    $file = $env:FAKE_OCTO_CONTEXTS
    if ($env:FAKE_OCTO_CONTEXTS_AFTER_CONFIG -and (Select-String -Path $env:FAKE_OCTO_LOG -Pattern '^octo-cli -c Config ' -Quiet)) {
        $file = $env:FAKE_OCTO_CONTEXTS_AFTER_CONFIG
    }
    Get-Content -Raw -Path $file
    exit 0
}
if ($Tool -eq 'octo-cli' -and $command -eq 'GetTenants' -and $env:FAKE_OCTO_FAIL_COMMAND -ne 'GetTenants') {
    if ($env:FAKE_OCTO_GETTENANTS_EXIT) { Write-Output 'error: forbidden'; exit [int]$env:FAKE_OCTO_GETTENANTS_EXIT }
    Write-Output 'Getting tenants (fake)'
    $ids = @($env:FAKE_OCTO_TENANTS -split ',' | Where-Object { $_ })
    ConvertTo-Json -InputObject @($ids | ForEach-Object { [ordered]@{ Database = $_; TenantId = $_; ParentTenantId = $null } })
    exit 0
}
if ($Tool -eq 'octo-cli' -and $command -eq 'Config' -and $env:OCTO_CLI_CONTEXT) {
    # Like the real octo-cli: Config refuses a context override (exit 251) and changes nothing.
    Write-Output "'Config' changes a stored context and therefore cannot be combined with --context."
    exit 251
}
if ($Tool -eq 'octo-cli' -and $env:FAKE_OCTO_FAIL_COMMAND -and $command -eq $env:FAKE_OCTO_FAIL_COMMAND) {
    # Fails the first FAKE_OCTO_FAIL_TIMES calls of the command (0: every call) with the given exit code and message.
    $calls = @(Select-String -Path $env:FAKE_OCTO_LOG -Pattern "^octo-cli -c $command( |$)").Count
    $times = [int]$env:FAKE_OCTO_FAIL_TIMES
    if ($times -eq 0 -or $calls -le $times) {
        Write-Output $env:FAKE_OCTO_FAIL_MESSAGE
        exit [int]$env:FAKE_OCTO_FAIL_EXIT
    }
}
if ($Tool -eq 'octo-cli' -and $command -eq 'Delete' -and $env:FAKE_OCTO_DELETE_EXIT) {
    Write-Output 'Conflict: capabilities are still enabled'
    exit [int]$env:FAKE_OCTO_DELETE_EXIT
}
if ($Tool -eq 'octo-ckc' -and $command -eq 'Compile') {
    $out = $Rest[[array]::IndexOf($Rest, '-o') + 1]
    New-Item -ItemType Directory -Path $out -Force | Out-Null
    Set-Content -Path (Join-Path $out 'ck-testapp-1.yaml') -Value 'model: TestApp'
}
Write-Output "FAKE-CALL $Tool $command"
exit 0
'@
    foreach ($tool in @("octo-cli", "octo-ckc")) {
        if ($script:IsWin) {
            Set-Content -Path (Join-Path $script:FakeBin "$tool.cmd") -Value "@pwsh -NoProfile -File `"%~dp0fake-octo.ps1`" $tool %*"
        }
        else {
            $wrapper = Join-Path $script:FakeBin $tool
            Set-Content -Path $wrapper -Value "#!/bin/sh`nexec pwsh -NoProfile -File `"`$(dirname `"`$0`")/fake-octo.ps1`" $tool `"`$@`""
            & chmod +x $wrapper
        }
    }

    function script:New-Context {
        param(
            [string]$Name = "local",
            [string]$Identity = "https://identity.127-0-0-1.nip.io/",
            [string]$Asset = "https://assets.127-0-0-1.nip.io/",
            [string]$Communication,
            [string]$AuthStatus = "valid",
            [bool]$IsEffective = $true,
            [string]$Tenant = "octosystem"
        )
        [ordered]@{
            name = $Name; isActive = $IsEffective; isEffective = $IsEffective; tenant = $Tenant
            services = [ordered]@{ identity = $Identity; asset = $Asset; bot = $null; communication = $Communication; reporting = $null; ai = $null }
            authStatus = $AuthStatus; accessTokenExpiresAt = $null; hasRefreshToken = $true
        }
    }

    # Runs one script of the copy against the given contexts. Returns exit code, output and the logged tool calls.
    function script:Invoke-TenantScript {
        param(
            [Parameter(Mandatory)][string]$Script,
            [string[]]$Arguments = @(),
            [object[]]$Contexts = @((New-Context)),
            [object[]]$ContextsAfterConfig,
            [int]$ListContextsExit = 0,
            # Tenants GetTenants lists (default: the tenant the tests use exists).
            [string[]]$Tenants = @("my-app", "test-ordi"),
            [int]$GetTenantsExit = 0,
            [int]$DeleteExit = 0,
            # Let one octo-cli command fail: @{ Command = 'Create'; Times = 0 (always) or n; Exit = 252; Message = '...' }
            [hashtable]$Fail
        )
        $id = [guid]::NewGuid().ToString("N")
        $contextsFile = Join-Path $TestDrive "contexts-$id.json"
        ConvertTo-Json -InputObject @($Contexts) -Depth 5 | Set-Content -Path $contextsFile
        $afterFile = $null
        if ($PSBoundParameters.ContainsKey("ContextsAfterConfig")) {
            $afterFile = Join-Path $TestDrive "contexts-after-$id.json"
            ConvertTo-Json -InputObject @($ContextsAfterConfig) -Depth 5 | Set-Content -Path $afterFile
        }
        $log = Join-Path $TestDrive "calls-$id.log"
        Set-Content -Path $log -Value $null
        $oldPath = $env:PATH
        $env:PATH = $script:FakeBin + [IO.Path]::PathSeparator + $oldPath
        $env:FAKE_OCTO_LOG = $log
        $env:FAKE_OCTO_CONTEXTS = $contextsFile
        $env:FAKE_OCTO_LISTCONTEXTS_EXIT = if ($ListContextsExit) { "$ListContextsExit" } else { $null }
        $env:FAKE_OCTO_CONTEXTS_AFTER_CONFIG = $afterFile
        $env:FAKE_OCTO_TENANTS = ($Tenants -join ',')
        $env:FAKE_OCTO_GETTENANTS_EXIT = if ($GetTenantsExit) { "$GetTenantsExit" } else { $null }
        $env:FAKE_OCTO_DELETE_EXIT = if ($DeleteExit) { "$DeleteExit" } else { $null }
        if ($Fail) {
            $env:FAKE_OCTO_FAIL_COMMAND = $Fail.Command
            $env:FAKE_OCTO_FAIL_TIMES = "$($Fail.Times)"
            $env:FAKE_OCTO_FAIL_EXIT = "$($Fail.Exit)"
            $env:FAKE_OCTO_FAIL_MESSAGE = $Fail.Message
        }
        try {
            $output = & pwsh -NoProfile -NonInteractive -File (Join-Path $script:Repo "scripts" $Script) @Arguments 2>&1 |
                ForEach-Object { "$_" }
            $exit = $LASTEXITCODE
        }
        finally {
            $env:PATH = $oldPath
            $env:FAKE_OCTO_LOG = $null
            $env:FAKE_OCTO_CONTEXTS = $null
            $env:FAKE_OCTO_LISTCONTEXTS_EXIT = $null
            $env:FAKE_OCTO_CONTEXTS_AFTER_CONFIG = $null
            $env:FAKE_OCTO_TENANTS = $null
            $env:FAKE_OCTO_GETTENANTS_EXIT = $null
            $env:FAKE_OCTO_DELETE_EXIT = $null
            $env:FAKE_OCTO_FAIL_COMMAND = $null
            $env:FAKE_OCTO_FAIL_TIMES = $null
            $env:FAKE_OCTO_FAIL_EXIT = $null
            $env:FAKE_OCTO_FAIL_MESSAGE = $null
        }
        $calls = @(Get-Content -Path $log | Where-Object { $_ })
        [pscustomobject]@{
            ExitCode = $exit
            Output   = ($output -join "`n")
            Lines    = @($output)
            Calls    = $calls
            Writes   = @($calls | Where-Object { $_ -notmatch '^octo-cli -c ListContexts( |$)' })
        }
    }

    $script:Remote = New-Context -Name "staging-1" -Identity "https://connect.staging.example.com/" -Asset "https://assets.staging.example.com/"
}

Describe "Recognising a local stack (Test-OctoLocalUrl)" {
    BeforeAll { . (Join-Path $script:SourceScripts "om_common.ps1") }

    It "accepts <Url>" -ForEach @(
        @{ Url = "https://identity.127-0-0-1.nip.io/" }
        @{ Url = "https://assets.127-0-0-1.nip.io" }
        @{ Url = "https://127-0-0-1.nip.io" }
        @{ Url = "https://localhost:5003/" }
        @{ Url = "http://localhost:5001" }
        @{ Url = "https://LOCALHOST:5001" }
        @{ Url = "https://127.0.0.1:5003/" }
        @{ Url = "https://[::1]:5003/" }
    ) {
        Test-OctoLocalUrl -Url $Url | Should -BeTrue
    }

    It "rejects <Url>" -ForEach @(
        @{ Url = "https://connect.staging.example.com/" }
        @{ Url = "https://localhost.evil.example.com/" }
        @{ Url = "https://identity.localhost/" }
        @{ Url = "https://identity.127-0-0-1.nip.io.evil.example.com/" }
        @{ Url = "https://evil127-0-0-1.nip.io/" }
        @{ Url = "https://192-168-1-10.nip.io/" }
        @{ Url = "https://localhost@evil.example.com/" }
        @{ Url = "https://evil.example.com/?h=localhost" }
        @{ Url = "https://evil.example.com/127-0-0-1.nip.io" }
        @{ Url = "https://10.0.0.5:5003/" }
        @{ Url = "ftp://localhost/" }
        @{ Url = "localhost:5003" }
        @{ Url = "" }
        @{ Url = $null }
    ) {
        Test-OctoLocalUrl -Url $Url | Should -BeFalse
    }
}

Describe "Validating tenant ids (Assert-OctoTenantId)" {
    BeforeAll { . (Join-Path $script:SourceScripts "om_common.ps1") }

    It "accepts <TenantId>" -ForEach @(
        @{ TenantId = "custom-app" }
        @{ TenantId = "test_ordi2" }
    ) {
        { Assert-OctoTenantId -TenantId $TenantId -NotSystem } | Should -Not -Throw
    }

    It "rejects <Case>" -ForEach @(
        @{ Case = "an option-like id"; TenantId = "-y" }
        @{ Case = "a trailing newline"; TenantId = "my-app`n" }
        @{ Case = "the system tenant with a trailing newline"; TenantId = "octosystem`n" }
        @{ Case = "a leading blank"; TenantId = " my-app" }
        @{ Case = "an empty id"; TenantId = "" }
    ) {
        { Assert-OctoTenantId -TenantId $TenantId -NotSystem } | Should -Throw '*Invalid tenant id*'
    }

    It "rejects the system tenant in any case when -NotSystem is set" {
        { Assert-OctoTenantId -TenantId "OctoSystem" -NotSystem } | Should -Throw '*system tenant*'
    }
}

Describe "om_initialize_tenant.ps1" {
    Context "default (no switch): imports into the existing tenant, never deletes or creates" {
        It "abuse case 1: default call against a non-local context deletes and creates nothing" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "test-ordi") -Contexts @($script:Remote)
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $r.Calls | Should -Not -Match ' -c (Delete|Create|ProvisionCurrentUser|EnableCommunication|EnableStreamData)( |$)'
            $r.Calls | Should -Contain "octo-cli -c ImportFromCatalog -cn PublicGitHubCatalog -m Basic-2.5.0 -w"
            ($r.Calls -match '^octo-cli -c ImportCk -f ') | Should -HaveCount 1
            ($r.Calls -match '^octo-cli -c ImportRt -f ') | Should -HaveCount 1
        }

        It "abuse case 2: -TenantId of an existing hosted tenant only targets that tenant with imports" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "test-ordi") -Contexts @($script:Remote)
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $configs = @($r.Calls -match '^octo-cli -c Config ')
            $configs | Should -Not -BeNullOrEmpty
            $configs | ForEach-Object { $_ | Should -Match ' -tid test-ordi( |$)' }
            $r.Calls | Should -Not -Match '-tid octosystem'
        }

        It "-SkipSampleData imports the Construction Kits only" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "test-ordi", "-SkipSampleData") -Contexts @($script:Remote)
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $r.Calls | Should -Not -Match ' -c ImportRt '
            ($r.Calls -match '^octo-cli -c ImportCk -f ') | Should -HaveCount 1
        }

        It "does not delete on a local stack either" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app")
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $r.Calls | Should -Not -Match ' -c (Delete|Create)( |$)'
        }

        It "prints the target context URL and tenant before the first write" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "test-ordi") -Contexts @($script:Remote)
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $target = [array]::FindIndex([string[]]$r.Lines, [Predicate[string]] { param($l) $l -match 'Target: context ''staging-1'', identity https://connect\.staging\.example\.com/, asset https://assets\.staging\.example\.com/, tenant ''test-ordi''' })
            $firstWrite = [array]::FindIndex([string[]]$r.Lines, [Predicate[string]] { param($l) $l -like 'FAKE-CALL *' })
            $target | Should -BeGreaterOrEqual 0 -Because $r.Output
            $firstWrite | Should -BeGreaterThan $target
        }
    }

    Context "-Recreate: delete and create, only on a local stack" {
        It "deletes and recreates the tenant on the local getting-started stack" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate")
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $delete = [array]::IndexOf($r.Calls, "octo-cli -c Delete -tid my-app --disable-features -y --context local")
            $create = [array]::IndexOf($r.Calls, "octo-cli -c Create -tid my-app -db my-app -np --context local")
            $delete | Should -BeGreaterOrEqual 0 -Because ($r.Calls -join "`n")
            $create | Should -BeGreaterThan $delete
            ($r.Calls -match '^octo-cli -c ImportRt -f ') | Should -HaveCount 1
        }

        It "creates without a delete when the tenant does not exist yet" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate") -Tenants @()
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $r.Calls | Should -Not -Match ' -c Delete( |$)'
            $r.Calls | Should -Contain "octo-cli -c Create -tid my-app -db my-app -np --context local"
        }

        It "stops before any tenant write when OCTO_CLI_CONTEXT is set (<Mode>)" -ForEach @(
            @{ Mode = "-Recreate" }
            @{ Mode = "default" }
        ) {
            $arguments = @("-TenantId", "my-app")
            if ($Mode -eq "-Recreate") { $arguments += "-Recreate" }
            $env:OCTO_CLI_CONTEXT = "local"
            try { $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments $arguments }
            finally { $env:OCTO_CLI_CONTEXT = $null }
            $r.ExitCode | Should -Not -Be 0
            $r.Calls | Should -Not -Match ' -c (Delete|Create|ProvisionCurrentUser|ImportCk|ImportRt|ImportFromCatalog|GetTenants)( |$)'
        }

        It "stops before the create when the delete fails" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate") -DeleteExit 1
            $r.ExitCode | Should -Not -Be 0
            $r.Calls | Should -Not -Match ' -c (Create|ImportCk|ImportRt|ImportFromCatalog)( |$)'
        }

        It "works on an OctoMesh developer stack (localhost)" {
            $dev = New-Context -Name "dev" -Identity "https://localhost:5003/" -Asset "https://localhost:5001/"
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate") -Contexts @($dev)
            $r.ExitCode | Should -Be 0 -Because $r.Output
            $r.Calls | Should -Contain "octo-cli -c Delete -tid my-app --disable-features -y --context dev"
        }

        It "refuses when the active context is switched between the check and the delete (<Case>)" -ForEach @(
            @{ Case = "another context became active"; Kind = "other" }
            @{ Case = "the same context now points at a remote stack"; Kind = "remote" }
            @{ Case = "the context lost its tenant"; Kind = "tenant" }
        ) {
            $after = switch ($Kind) {
                "other" { @((New-Context -IsEffective $false), (New-Context -Name "staging-1" -Identity "https://connect.staging.example.com/" -Asset "https://assets.staging.example.com/")) }
                "remote" { @((New-Context -Name "local" -Identity "https://connect.staging.example.com/" -Asset "https://assets.staging.example.com/")) }
                "tenant" { @((New-Context -Tenant "test-ordi")) }
            }
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate") -ContextsAfterConfig $after
            $r.ExitCode | Should -Not -Be 0
            $r.Calls | Should -Not -Match ' -c (Delete|Create|ProvisionCurrentUser)( |$)'
            $r.Output | Should -Match 'changed after it was checked'
        }

        It "abuse case 1/2: refuses against a non-local context before any write" {
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "test-ordi", "-Recreate") -Contexts @($script:Remote)
            $r.ExitCode | Should -Not -Be 0
            $r.Writes | Should -BeNullOrEmpty
            $r.Output | Should -Match 'not a local stack'
            $r.Output | Should -Match 'https://connect\.staging\.example\.com/'
        }

        It "abuse case 3: refuses a context named like local that points at <Case>" -ForEach @(
            @{ Case = "a remote identity and asset URL"; Identity = "https://connect.staging.example.com/"; Asset = "https://assets.staging.example.com/"; Communication = $null }
            @{ Case = "a local identity but a remote asset URL"; Identity = "https://identity.127-0-0-1.nip.io/"; Asset = "https://assets.staging.example.com/"; Communication = $null }
            @{ Case = "a remote communication URL"; Identity = "https://identity.127-0-0-1.nip.io/"; Asset = "https://assets.127-0-0-1.nip.io/"; Communication = "https://communication.staging.example.com/" }
            @{ Case = "a look-alike host"; Identity = "https://identity.127-0-0-1.nip.io.evil.example.com/"; Asset = "https://assets.127-0-0-1.nip.io.evil.example.com/"; Communication = $null }
            @{ Case = "userinfo before a remote host"; Identity = "https://localhost@connect.staging.example.com/"; Asset = "https://localhost@assets.staging.example.com/"; Communication = $null }
            @{ Case = "no asset URL"; Identity = "https://identity.127-0-0-1.nip.io/"; Asset = $null; Communication = $null }
        ) {
            $ctx = New-Context -Name "local" -Identity $Identity -Asset $Asset -Communication $Communication
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", "my-app", "-Recreate") -Contexts @($ctx)
            $r.ExitCode | Should -Not -Be 0
            $r.Writes | Should -BeNullOrEmpty
            $r.Output | Should -Match 'not a local stack'
        }

        It "refuses the system tenant as the tenant of the app (<Mode>)" -ForEach @(
            @{ Mode = "-Recreate" }
            @{ Mode = "default" }
        ) {
            $arguments = @("-TenantId", "OctoSystem")
            if ($Mode -eq "-Recreate") { $arguments += "-Recreate" }
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments $arguments -Contexts @($script:Remote)
            $r.ExitCode | Should -Not -Be 0
            $r.Writes | Should -BeNullOrEmpty
            $r.Output | Should -Match 'system tenant'
        }
    }

    Context "abuse case 4: no usable octo-cli context" {
        It "refuses when <Case> (<Mode>)" -ForEach @(
            @{ Case = "not logged in"; Mode = "default"; Kind = "nologin"; Exit = 0 }
            @{ Case = "not logged in"; Mode = "-Recreate"; Kind = "nologin"; Exit = 0 }
            @{ Case = "no effective context"; Mode = "default"; Kind = "noneffective"; Exit = 0 }
            @{ Case = "no effective context"; Mode = "-Recreate"; Kind = "noneffective"; Exit = 0 }
            @{ Case = "the context has no identity URL"; Mode = "default"; Kind = "noidentity"; Exit = 0 }
            @{ Case = "no context at all"; Mode = "default"; Kind = "empty"; Exit = 0 }
            @{ Case = "no context at all"; Mode = "-Recreate"; Kind = "empty"; Exit = 0 }
            @{ Case = "ListContexts fails"; Mode = "default"; Kind = "empty"; Exit = 1 }
            @{ Case = "ListContexts fails"; Mode = "-Recreate"; Kind = "empty"; Exit = 1 }
        ) {
            $contexts = switch ($Kind) {
                "nologin" { @((New-Context -AuthStatus "none")) }
                "noneffective" { @((New-Context -IsEffective $false)) }
                "noidentity" { @((New-Context -Identity "")) }
                default { @() }
            }
            $arguments = @("-TenantId", "my-app")
            if ($Mode -eq "-Recreate") { $arguments += "-Recreate" }
            $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments $arguments -Contexts $contexts -ListContextsExit $Exit
            $r.ExitCode | Should -Not -Be 0
            $r.Writes | Should -BeNullOrEmpty
            $r.Output | Should -Match 'octo-cli'
        }
    }

    It "refuses a tenant id that is not a plain name (<TenantId>)" -ForEach @(
        @{ TenantId = "my app" }
        @{ TenantId = "my;app" }
    ) {
        $r = Invoke-TenantScript -Script "om_initialize_tenant.ps1" -Arguments @("-TenantId", $TenantId)
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
        $r.Output | Should -Match 'Invalid tenant id'
    }
}

Describe "om_delete_tenants.ps1" {
    It "needs -Force even on a local stack" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app")
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
        $r.Output | Should -Match '-Force'
    }

    It "deletes on a local stack with -Force" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Calls | Should -Contain "octo-cli -c Delete -tid my-app --disable-features -y --context local"
        $r.Output | Should -Match "Target: context 'local', identity https://identity\.127-0-0-1\.nip\.io/"
    }

    It "reads the tenant list through the checked context before it deletes" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "My-App", "-Force")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $list = [array]::IndexOf($r.Calls, "octo-cli -c GetTenants --context local")
        $delete = [array]::IndexOf($r.Calls, "octo-cli -c Delete -tid My-App --disable-features -y --context local")
        $list | Should -BeGreaterOrEqual 0 -Because ($r.Calls -join "`n")
        $delete | Should -BeGreaterThan $list
    }

    It "skips a tenant that does not exist without deleting anything" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -Tenants @("other-app")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Calls | Should -Not -Match ' -c Delete( |$)'
        $r.Output | Should -Match 'does not exist'
    }

    It "fails without deleting when the tenant list cannot be read" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -GetTenantsExit 1
        $r.ExitCode | Should -Not -Be 0
        $r.Calls | Should -Not -Match ' -c Delete( |$)'
        $r.Output | Should -Match 'GetTenants failed'
    }

    It "passes on octo-cli's own reason when the tenant list cannot be read" {
        $fail = @{ Command = 'GetTenants'; Times = 0; Exit = 252; Message = "Authentication failed: No token for tenant 'octosystem' was issued (identity error: invalid_grant)." }
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -Fail $fail
        $r.ExitCode | Should -Not -Be 0
        $r.Calls | Should -Not -Match ' -c Delete( |$)'
        $r.Output | Should -Match 'GetTenants failed \(exit code 252\): Authentication failed'
        $r.Output | Should -Match 'invalid_grant'
    }

    It "fails when the delete fails instead of reporting success" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -DeleteExit 1
        $r.ExitCode | Should -Not -Be 0
        $r.Output | Should -Match '(?s)-c Delete -tid my-app.*failed \(exit code 1\)'
    }

    It "refuses a non-local context even with -Force" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "test-ordi", "-Force") -Contexts @($script:Remote)
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }

    It "refuses a context named like local that points at a remote URL" {
        $ctx = New-Context -Name "local" -Identity "https://connect.staging.example.com/" -Asset "https://assets.staging.example.com/"
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -Contexts @($ctx)
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }

    It "refuses to delete the system tenant" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "octosystem", "-Force")
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }

    It "refuses when not logged in" {
        $r = Invoke-TenantScript -Script "om_delete_tenants.ps1" -Arguments @("-TenantId", "my-app", "-Force") -Contexts @((New-Context -AuthStatus "none"))
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }
}

Describe "om_create_tenants.ps1" {
    It "creates the tenant on a local stack" {
        $r = Invoke-TenantScript -Script "om_create_tenants.ps1" -Arguments @("-TenantId", "my-app")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Calls | Should -Contain "octo-cli -c Create -tid my-app -db my-app -np --context local"
    }

    It "stops at once without retries when the create is rejected: <Case>" -ForEach @(
        @{ Case = "login not accepted (invalid_grant)"; Exit = 252; Message = "Authentication failed: No token for tenant 'octosystem' was issued (identity error: invalid_grant)."; Expect = "No token for tenant 'octosystem'" }
        @{ Case = "401"; Exit = 1; Message = "Response status code does not indicate success: 401 (Unauthorized)."; Expect = '401' }
        @{ Case = "403"; Exit = 1; Message = "Response status code does not indicate success: 403 (Forbidden)."; Expect = '403' }
    ) {
        $r = Invoke-TenantScript -Script "om_create_tenants.ps1" -Arguments @("-TenantId", "my-app") -Fail @{ Command = 'Create'; Times = 0; Exit = $Exit; Message = $Message }
        $r.ExitCode | Should -Not -Be 0
        ($r.Calls -match '^octo-cli -c Create ') | Should -HaveCount 1
        $r.Output | Should -Match ([regex]::Escape($Expect))
        $r.Output | Should -Match 'Not retried'
        $r.Output | Should -Not -Match 'retrying in 10 seconds'
    }

    It "retries a transient failure of the create" {
        $fail = @{ Command = 'Create'; Times = 1; Exit = 1; Message = "Conflict: Tenant ID 'my-app' is already in use." }
        $r = Invoke-TenantScript -Script "om_create_tenants.ps1" -Arguments @("-TenantId", "my-app") -Fail $fail
        $r.ExitCode | Should -Be 0 -Because $r.Output
        ($r.Calls -match '^octo-cli -c Create ') | Should -HaveCount 2
    }

    It "retries a 403 of the user provisioning, which the identity setup of a new tenant can answer for a moment" {
        $fail = @{ Command = 'ProvisionCurrentUser'; Times = 1; Exit = 1; Message = "Response status code does not indicate success: 403 (Forbidden)." }
        $r = Invoke-TenantScript -Script "om_create_tenants.ps1" -Arguments @("-TenantId", "my-app") -Fail $fail
        $r.ExitCode | Should -Be 0 -Because $r.Output
        ($r.Calls -match '^octo-cli -c ProvisionCurrentUser ') | Should -HaveCount 2
    }

    It "refuses a non-local context before any write" {
        $r = Invoke-TenantScript -Script "om_create_tenants.ps1" -Arguments @("-TenantId", "test-ordi") -Contexts @($script:Remote)
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }
}

Describe "Scripts that write into the tenant print the target first" {
    It "<Script> prints context URL and tenant before the first write" -ForEach @(
        @{ Script = "om_importck.ps1" }
        @{ Script = "om_importrt.ps1" }
        @{ Script = "om_setupIdentityService_local.ps1" }
    ) {
        $r = Invoke-TenantScript -Script $Script -Arguments @("-TenantId", "test-ordi") -Contexts @($script:Remote)
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $target = [array]::FindIndex([string[]]$r.Lines, [Predicate[string]] { param($l) $l -match "Target: context 'staging-1', identity https://connect\.staging\.example\.com/.*tenant 'test-ordi'" })
        $firstWrite = [array]::FindIndex([string[]]$r.Lines, [Predicate[string]] { param($l) $l -like 'FAKE-CALL *' })
        $target | Should -BeGreaterOrEqual 0 -Because $r.Output
        $firstWrite | Should -BeGreaterThan $target
        $r.Calls | Should -Not -Match ' -c (Delete|Create)( |$)'
    }

    It "<Script> refuses when not logged in" -ForEach @(
        @{ Script = "om_importck.ps1" }
        @{ Script = "om_importrt.ps1" }
        @{ Script = "om_setupIdentityService_local.ps1" }
    ) {
        $r = Invoke-TenantScript -Script $Script -Arguments @("-TenantId", "my-app") -Contexts @((New-Context -AuthStatus "none"))
        $r.ExitCode | Should -Not -Be 0
        $r.Writes | Should -BeNullOrEmpty
    }
}
