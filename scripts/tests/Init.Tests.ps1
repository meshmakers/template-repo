# Pester 5 tests of init.sh and init.ps1: every test initialises its own copy of the template in the test drive, the
# repository itself is never changed. Template-only: init.sh / init.ps1 remove this file.
#
# What is tested: the run without a terminal (options and environment variables), the separate tenant id (given,
# derived, asked with the derived default), refusals before any file changes, --help, and that the tenant id lands in
# every place the app and the scripts read it.
#
# Run: pwsh scripts/tests/Invoke-ScriptTests.ps1

BeforeDiscovery {
    $script:HasBash = [bool](Get-Command bash -ErrorAction SilentlyContinue) -and [bool](Get-Command python3 -ErrorAction SilentlyContinue)
}

BeforeAll {
    $script:RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
    $script:InitVariables = @('INIT_APP_NAME', 'INIT_TENANT_ID', 'INIT_CLIENT_ID', 'INIT_DEFAULT_LANG', 'INIT_EXTRA_LANGS', 'INIT_ASSUME_YES', 'INIT_INTERACTIVE')
    $script:TenantScripts = @('om_create_tenants', 'om_delete_tenants', 'om_importck', 'om_importrt', 'om_initialize_tenant', 'om_setupIdentityService_local')

    # Files of the template: tracked and new (not ignored) files of the checkout, so node_modules and build output stay
    # out of the copies.
    Push-Location $script:RepoRoot
    try { $script:TemplateFiles = @(git ls-files --cached --others --exclude-standard) | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } }
    finally { Pop-Location }

    function script:New-TemplateCopy {
        $copy = Join-Path $TestDrive ([guid]::NewGuid().ToString("N"))
        foreach ($file in $script:TemplateFiles) {
            $target = Join-Path $copy $file
            New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
            Copy-Item -LiteralPath (Join-Path $script:RepoRoot $file) -Destination $target
        }
        return $copy
    }

    # Path and hash of every file below the copy, to prove that a refused run changed nothing.
    function script:Get-TreeSnapshot([string]$Root) {
        Get-ChildItem -Path $Root -Recurse -File -Force | Sort-Object FullName | ForEach-Object {
            "$($_.FullName.Substring($Root.Length)) $((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
        }
    }

    # Runs init.sh (or init.ps1 with -PowerShell) of the copy with the given arguments, environment variables and
    # stdin text. stdin is a file (the text, empty by default), never a terminal. Returns exit code and output.
    function script:Invoke-Init {
        param([string]$Copy, [string[]]$Arguments = @(), [hashtable]$Environment = @{}, [string]$InputText = "", [switch]$PowerShell)
        $stdin = Join-Path $TestDrive "stdin-$([guid]::NewGuid().ToString('N')).txt"
        [System.IO.File]::WriteAllText($stdin, $InputText)
        $saved = @{}
        foreach ($name in $script:InitVariables + @('INIT_TEST_STDIN')) { $saved[$name] = [Environment]::GetEnvironmentVariable($name); [Environment]::SetEnvironmentVariable($name, $null) }
        foreach ($key in $Environment.Keys) { [Environment]::SetEnvironmentVariable($key, $Environment[$key]) }
        [Environment]::SetEnvironmentVariable('INIT_TEST_STDIN', $stdin)
        try {
            # bash redirects stdin from the file; piping a string from PowerShell would not keep empty lines reliably.
            if ($PowerShell) {
                $output = & bash -c 'exec pwsh -NoProfile -File "$0" "$@" < "$INIT_TEST_STDIN"' (Join-Path $Copy "init.ps1") @Arguments 2>&1 | ForEach-Object { "$_" }
            }
            else {
                $output = & bash -c 'exec bash "$0" "$@" < "$INIT_TEST_STDIN"' (Join-Path $Copy "init.sh") @Arguments 2>&1 | ForEach-Object { "$_" }
            }
            return [pscustomobject]@{ ExitCode = $LASTEXITCODE; Output = ($output -join "`n") }
        }
        finally {
            foreach ($name in $script:InitVariables + @('INIT_TEST_STDIN')) { [Environment]::SetEnvironmentVariable($name, $saved[$name]) }
        }
    }

    # Asserts that the tenant id is in every place the app and the scripts read it, and that no template name is left.
    function script:Assert-Tenant([string]$Copy, [string]$Kebab, [string]$TenantId) {
        $config = Get-Content -Raw (Join-Path $Copy "src/$Kebab/src/assets/config.json") | ConvertFrom-Json
        $config.tenantId | Should -BeExactly $TenantId
        (Get-Content (Join-Path $Copy "src/charts/$Kebab/values.yaml")) | Should -Contain "  tenantId: `"$TenantId`""
        foreach ($script in $script:TenantScripts) {
            (Get-Content -Raw (Join-Path $Copy "scripts/$script.ps1")) | Should -Match ([regex]::Escape("[string]`$TenantId = `"$TenantId`""))
        }
        $left = Get-ChildItem -Path $Copy -Recurse -File -Force | Where-Object { $_.FullName -notmatch '[/\\]\.git[/\\]' } |
            Select-String -Pattern 'custom-app', 'customApp', 'CustomApp', 'custom_app', '__INIT_TENANT_ID__', '__INIT_CLIENT_ID__' -CaseSensitive -List
        $left | Should -BeNullOrEmpty
    }

    # Asserts that the app (config.json) and the client registration script use the same client id.
    function script:Assert-Client([string]$Copy, [string]$Kebab, [string]$ClientId) {
        $config = Get-Content -Raw (Join-Path $Copy "src/$Kebab/src/assets/config.json") | ConvertFrom-Json
        $config.clientId | Should -BeExactly $ClientId
        (Get-Content -Raw (Join-Path $Copy "scripts/om_setupIdentityService_local.ps1")) | Should -Match ([regex]::Escape("[string]`$ClientId = `"$ClientId`""))
    }

    # The flags of the language picker in styles.scss, in order.
    function script:Get-Flags([string]$Copy, [string]$Kebab) {
        $styles = Get-Content -Raw (Join-Path $Copy "src/$Kebab/src/styles.scss")
        $match = [regex]::Match($styles, '\$flag-icons-included-countries: \(([^)]*)\)')
        $match.Success | Should -BeTrue
        return @($match.Groups[1].Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    }
}

Describe "init.sh without a terminal" -Skip:(-not $script:HasBash) {
    It "initialises with options, a separate tenant id and languages, without any prompt" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--tenant-id", "test-ordi", "--lang", "en-GB", "--extra-langs", "de-AT", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Not -Match 'App Name \(PascalCase, e\.g\.|Continue\? \(y/N\)|Tenant ID \['
        $r.Output | Should -Match 'Tenant ID:\s+test-ordi \(given\)'
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
        $config = Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/config.json") | ConvertFrom-Json
        $config.defaultLanguage | Should -Be "en-GB"
        @($config.supportedLanguages.cultureCode) | Should -Be @("en-GB", "de-AT")
        Join-Path $copy "src/inspections/src/assets/i18n/de-AT.json" | Should -Exist
        foreach ($removed in @("init.sh", "init.ps1", "scripts/ci", "scripts/tests/Init.Tests.ps1", "Octo.Template.sln", "src/custom-app")) {
            Join-Path $copy $removed | Should -Not -Exist
        }
        Join-Path $copy "src/InspectionsCkModel/InspectionsCkModel.csproj" | Should -Exist
        Join-Path $copy "src/blueprints/Inspections/blueprint.yaml" | Should -Exist
        Assert-Client -Copy $copy -Kebab "inspections" -ClientId "inspections-frontend-debug"
        $r.Output | Should -Match 'Client ID:\s+inspections-frontend-debug \(default'
    }

    It "accepts a kebab-case app name and converts it to PascalCase" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "ordi-terminplan", "--tenant-id", "test-ordi", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Match "App Name \(PascalCase\): OrdiTerminplan \(converted from 'ordi-terminplan'\)"
        Assert-Tenant -Copy $copy -Kebab "ordi-terminplan" -TenantId "test-ordi"
        Join-Path $copy "src/OrdiTerminplanCkModel/OrdiTerminplanCkModel.csproj" | Should -Exist
        Join-Path $copy "src/blueprints/OrdiTerminplan/blueprint.yaml" | Should -Exist
        Assert-Client -Copy $copy -Kebab "ordi-terminplan" -ClientId "ordi-terminplan-frontend-debug"
    }

    It "uses the client id given with --client-id in the app and in the client registration script" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--tenant-id", "test-ordi", "--client-id", "custom-app-ordi.frontend", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Match 'Client ID:\s+custom-app-ordi\.frontend \(given\)'
        $config = Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/config.json") | ConvertFrom-Json
        # A client id that contains the template name stays as given.
        $config.clientId | Should -BeExactly "custom-app-ordi.frontend"
        (Get-Content -Raw (Join-Path $copy "scripts/om_setupIdentityService_local.ps1")) | Should -Match ([regex]::Escape('[string]$ClientId = "custom-app-ordi.frontend"'))
    }

    It "reads the client id from INIT_CLIENT_ID" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--yes") -Environment @{ INIT_CLIENT_ID = "ordi-frontend" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Client -Copy $copy -Kebab "inspections" -ClientId "ordi-frontend"
    }

    It "ships German texts for de-AT and de-DE, English placeholders for other languages, and their flags" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--lang", "de-AT", "--extra-langs", "en-GB,de-DE,fr-FR", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $i18n = Join-Path $copy "src/inspections/src/assets/i18n"
        (Get-Content -Raw (Join-Path $i18n "de-AT.json") | ConvertFrom-Json).APP.HOME | Should -Be "Startseite"
        (Get-Content -Raw (Join-Path $i18n "de-AT.json") | ConvertFrom-Json).APP.WELCOME | Should -Be "Willkommen bei Inspections"
        (Get-Content -Raw (Join-Path $i18n "de-DE.json") | ConvertFrom-Json).APP.HOME | Should -Be "Startseite"
        (Get-Content -Raw (Join-Path $i18n "fr-FR.json") | ConvertFrom-Json).APP.HOME | Should -Be "Home"
        $r.Output | Should -Match 'fr-FR\.json with the English texts as placeholders'
        $r.Output | Should -Match 'Translate the English placeholder texts of: fr-FR'
        Get-Flags -Copy $copy -Kebab "inspections" | Should -Be @("at", "gb", "de", "fr")
    }

    It "removes the German file when no language uses it and keeps only the flags in use" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Join-Path $copy "src/inspections/src/assets/i18n/de-AT.json" | Should -Not -Exist
        Get-Flags -Copy $copy -Kebab "inspections" | Should -Be @("gb")
        $r.Output | Should -Match 'pwsh scripts/generate-dev-certs\.ps1'
    }

    It "reads the environment variables instead of options" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Environment @{ INIT_APP_NAME = "Inspections"; INIT_TENANT_ID = "test-ordi"; INIT_DEFAULT_LANG = "de-AT"; INIT_EXTRA_LANGS = "en-GB"; INIT_ASSUME_YES = "1" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
        $config = Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/config.json") | ConvertFrom-Json
        $config.defaultLanguage | Should -Be "de-AT"
        @($config.supportedLanguages.cultureCode) | Should -Be @("de-AT", "en-GB")
    }

    It "lets an option win over its environment variable" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--tenant-id=test-ordi", "-y") -Environment @{ INIT_APP_NAME = "Inspections"; INIT_TENANT_ID = "other-tenant" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
    }

    It "uses the derived tenant id without --tenant-id and prints it" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "FieldInspections", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Match 'Tenant ID:\s+field-inspections \(derived from the app name\)'
        $r.Output | Should -Match 'Tenant of the app: field-inspections'
        Assert-Tenant -Copy $copy -Kebab "field-inspections" -TenantId "field-inspections"
    }

    It "keeps a tenant id that contains the template name untouched" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--tenant-id", "my-custom-app-InspectionsApp", "--yes")
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $config = Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/config.json") | ConvertFrom-Json
        $config.tenantId | Should -BeExactly "my-custom-app-InspectionsApp"
        (Get-Content -Raw (Join-Path $copy "scripts/om_initialize_tenant.ps1")) | Should -Match ([regex]::Escape('[string]$TenantId = "my-custom-app-InspectionsApp"'))
    }

    It "refuses <Case> with exit code 2 and changes no file" -ForEach @(
        @{ Case = "a camelCase app name"; Arguments = @("--app-name", "fieldInspections", "--yes"); Expect = "neither PascalCase" }
        @{ Case = "an app name with a dash and capitals"; Arguments = @("--app-name", "Field-Inspections", "--yes"); Expect = "neither PascalCase" }
        @{ Case = "a kebab-case name with a double dash"; Arguments = @("--app-name", "field--inspections", "--yes"); Expect = "neither PascalCase" }
        @{ Case = "a kebab-case part starting with a digit"; Arguments = @("--app-name", "app-2go", "--yes"); Expect = "neither PascalCase" }
        @{ Case = "an option-like client id"; Arguments = @("--app-name", "Inspections", "--client-id", "-x", "--yes"); Expect = "client id '-x' is invalid" }
        @{ Case = "a client id with a slash"; Arguments = @("--app-name", "Inspections", "--client-id", "a/b", "--yes"); Expect = "client id 'a/b' is invalid" }
        @{ Case = "a missing app name"; Arguments = @("--tenant-id", "test-ordi", "--yes"); Expect = "app name is required: pass --app-name" }
        @{ Case = "a missing --yes"; Arguments = @("--app-name", "Inspections"); Expect = "confirmation required: pass --yes" }
        @{ Case = "an option-like tenant id"; Arguments = @("--app-name", "Inspections", "--tenant-id", "-y", "--yes"); Expect = "tenant id '-y' is invalid" }
        @{ Case = "a tenant id with a blank"; Arguments = @("--app-name", "Inspections", "--tenant-id", "test ordi", "--yes"); Expect = "tenant id 'test ordi' is invalid" }
        @{ Case = "a tenant id with a slash"; Arguments = @("--app-name", "Inspections", "--tenant-id", "a/b", "--yes"); Expect = "tenant id 'a/b' is invalid" }
        @{ Case = "the system tenant"; Arguments = @("--app-name", "Inspections", "--tenant-id", "OctoSystem", "--yes"); Expect = "system tenant" }
        @{ Case = "an invalid default language"; Arguments = @("--app-name", "Inspections", "--lang", "english", "--yes"); Expect = "default language 'english' is invalid" }
        @{ Case = "an invalid additional language"; Arguments = @("--app-name", "Inspections", "--extra-langs", "de-AT,fr", "--yes"); Expect = "additional language 'fr' is invalid" }
        @{ Case = "an injection attempt in a language"; Arguments = @("--app-name", "Inspections", "--extra-langs", "de-AT');print('x", "--yes"); Expect = "is invalid" }
        @{ Case = "an unknown option"; Arguments = @("--app-name", "Inspections", "--tenant", "x", "--yes"); Expect = "unknown option '--tenant'" }
        @{ Case = "an option without a value"; Arguments = @("--yes", "--app-name"); Expect = "--app-name needs a value" }
    ) {
        $copy = New-TemplateCopy
        $before = Get-TreeSnapshot -Root $copy
        $r = Invoke-Init -Copy $copy -Arguments $Arguments
        $r.ExitCode | Should -Be 2 -Because $r.Output
        $r.Output | Should -Match ([regex]::Escape($Expect))
        $r.Output | Should -Match 'Nothing was changed'
        Get-TreeSnapshot -Root $copy | Should -Be $before
    }

    It "refuses a template that is initialized already" {
        $copy = New-TemplateCopy
        Rename-Item -Path (Join-Path $copy "src/custom-app") -NewName "inspections"
        $before = Get-TreeSnapshot -Root $copy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--yes")
        $r.ExitCode | Should -Be 2
        $r.Output | Should -Match 'initialized already'
        Get-TreeSnapshot -Root $copy | Should -Be $before
    }

    It "--help lists every option and variable and changes nothing" {
        $copy = New-TemplateCopy
        $before = Get-TreeSnapshot -Root $copy
        $r = Invoke-Init -Copy $copy -Arguments @("--help")
        $r.ExitCode | Should -Be 0
        foreach ($word in @("--app-name", "--tenant-id", "--client-id", "--lang", "--extra-langs", "--yes", "--help", "kebab-case", "INIT_APP_NAME", "INIT_TENANT_ID", "INIT_CLIENT_ID", "INIT_DEFAULT_LANG", "INIT_EXTRA_LANGS", "INIT_ASSUME_YES", "INIT_INTERACTIVE")) {
            $r.Output | Should -Match ([regex]::Escape($word))
        }
        Get-TreeSnapshot -Root $copy | Should -Be $before
    }
}

Describe "init.sh asking for the values (INIT_INTERACTIVE=1, answers on stdin)" -Skip:(-not $script:HasBash) {
    It "asks for the tenant id with the derived value as default" {
        $copy = New-TemplateCopy
        # App name, tenant id (empty = default), default language, additional languages, confirmation
        $r = Invoke-Init -Copy $copy -Environment @{ INIT_INTERACTIVE = "1" } -InputText "Inspections`n`n`n`ny`n"
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "inspections"
    }

    It "takes the tenant id that is typed in" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Environment @{ INIT_INTERACTIVE = "1" } -InputText "Inspections`ntest-ordi`nen-GB`nde-AT`ny`n"
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
    }

    It "asks only for the values that are missing" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -Copy $copy -Arguments @("--app-name", "Inspections", "--lang", "en-GB", "--extra-langs", "") -Environment @{ INIT_INTERACTIVE = "1" } -InputText "test-ordi`ny`n"
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
    }

    It "changes nothing when the confirmation is declined" {
        $copy = New-TemplateCopy
        $before = Get-TreeSnapshot -Root $copy
        $r = Invoke-Init -Copy $copy -Environment @{ INIT_INTERACTIVE = "1" } -InputText "Inspections`ntest-ordi`n`n`nn`n"
        $r.ExitCode | Should -Be 0
        $r.Output | Should -Match 'Aborted\. Nothing was changed'
        Get-TreeSnapshot -Root $copy | Should -Be $before
    }
}

Describe "init.ps1" -Skip:(-not $script:HasBash) {
    It "initialises with parameters and a separate tenant id without a prompt" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -PowerShell -Copy $copy -Arguments @("-AppName", "Inspections", "-TenantId", "test-ordi", "-Lang", "en-GB", "-ExtraLangs", "de-AT", "-Yes") -Environment @{ INIT_INTERACTIVE = "0" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "test-ordi"
        $config = Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/config.json") | ConvertFrom-Json
        @($config.supportedLanguages.cultureCode) | Should -Be @("en-GB", "de-AT")
        foreach ($removed in @("init.sh", "init.ps1", "scripts/ci", "scripts/tests/Init.Tests.ps1")) {
            Join-Path $copy $removed | Should -Not -Exist
        }
        Assert-Client -Copy $copy -Kebab "inspections" -ClientId "inspections-frontend-debug"
        (Get-Content -Raw (Join-Path $copy "src/inspections/src/assets/i18n/de-AT.json") | ConvertFrom-Json).APP.HOME | Should -Be "Startseite"
        Get-Flags -Copy $copy -Kebab "inspections" | Should -Be @("gb", "at")
    }

    It "accepts a kebab-case app name, a client id and gives other languages English placeholders" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -PowerShell -Copy $copy -Arguments @("-AppName", "ordi-terminplan", "-TenantId", "test-ordi", "-ClientId", "ordi-frontend", "-ExtraLangs", "fr-FR", "-Yes") -Environment @{ INIT_INTERACTIVE = "0" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Match "OrdiTerminplan \(converted from 'ordi-terminplan'\)"
        Assert-Tenant -Copy $copy -Kebab "ordi-terminplan" -TenantId "test-ordi"
        Assert-Client -Copy $copy -Kebab "ordi-terminplan" -ClientId "ordi-frontend"
        $i18n = Join-Path $copy "src/ordi-terminplan/src/assets/i18n"
        (Get-Content -Raw (Join-Path $i18n "fr-FR.json") | ConvertFrom-Json).APP.HOME | Should -Be "Home"
        Join-Path $i18n "de-AT.json" | Should -Not -Exist
        $r.Output | Should -Match 'Translate the English placeholder texts of: fr-FR'
        Get-Flags -Copy $copy -Kebab "ordi-terminplan" | Should -Be @("gb", "fr")
    }

    It "uses the derived tenant id from the environment variables" {
        $copy = New-TemplateCopy
        $r = Invoke-Init -PowerShell -Copy $copy -Environment @{ INIT_INTERACTIVE = "0"; INIT_APP_NAME = "Inspections"; INIT_ASSUME_YES = "1" }
        $r.ExitCode | Should -Be 0 -Because $r.Output
        $r.Output | Should -Match 'Tenant ID:\s+inspections \(derived from the app name\)'
        Assert-Tenant -Copy $copy -Kebab "inspections" -TenantId "inspections"
    }

    It "refuses <Case> with exit code 2 and changes no file" -ForEach @(
        @{ Case = "a missing app name"; Arguments = @("-Yes"); Expect = "app name is required" }
        @{ Case = "a camelCase app name"; Arguments = @("-AppName", "fieldInspections", "-Yes"); Expect = "neither PascalCase" }
        @{ Case = "an invalid client id"; Arguments = @("-AppName", "Inspections", "-ClientId", "a/b", "-Yes"); Expect = "client id 'a/b' is invalid" }
        @{ Case = "an invalid tenant id"; Arguments = @("-AppName", "Inspections", "-TenantId", "a/b", "-Yes"); Expect = "tenant id 'a/b' is invalid" }
        @{ Case = "a missing -Yes"; Arguments = @("-AppName", "Inspections"); Expect = "confirmation required" }
    ) {
        $copy = New-TemplateCopy
        $before = Get-TreeSnapshot -Root $copy
        $r = Invoke-Init -PowerShell -Copy $copy -Arguments $Arguments -Environment @{ INIT_INTERACTIVE = "0" }
        $r.ExitCode | Should -Be 2 -Because $r.Output
        $r.Output | Should -Match ([regex]::Escape($Expect))
        Get-TreeSnapshot -Root $copy | Should -Be $before
    }
}
