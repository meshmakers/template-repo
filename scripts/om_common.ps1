# Shared helpers of the om_*.ps1 scripts (dot-source this file).
#
# octo-cli works on one tenant per context: creating or deleting a tenant has to run against the system
# tenant (octosystem), everything else against the tenant of the app. `Config` replaces the options of the
# active context (keeping the login), so the service URLs are read from the active context and passed again.
#
# Safety rule: a script deletes or creates a tenant only when every service URL of the active octo-cli context is a
# local stack (Assert-OctoLocalContext) and the user asked for it with a switch; otherwise it stops before any write,
# also before `Config`. The decision uses the URLs, never the name of the context.
$ErrorActionPreference = "Stop"
$SystemTenantId = "octosystem"

function Invoke-OctoCli {
    param([string[]]$CliArgs, [switch]$IgnoreFailure)
    & octo-cli @CliArgs
    if ($LASTEXITCODE -ne 0 -and -not $IgnoreFailure) {
        throw "octo-cli $($CliArgs -join ' ') failed (exit code $LASTEXITCODE)."
    }
}

function Assert-OctoTenantId {
    # A tenant id is a plain name; it is passed to octo-cli as an argument and must not look like an option.
    param([Parameter(Mandatory)][AllowEmptyString()][string]$TenantId, [switch]$NotSystem)
    if ($TenantId -notmatch '^[A-Za-z0-9][A-Za-z0-9_-]{0,62}$') {
        throw "Invalid tenant id '$TenantId': use letters, digits, '-' and '_' only, starting with a letter or digit."
    }
    if ($NotSystem -and $TenantId -ieq $SystemTenantId) {
        throw "Refusing to use the system tenant '$SystemTenantId' as the tenant of the app. Nothing was changed."
    }
}

function Get-OctoCliContext {
    # Returns the effective octo-cli context (name, tenant, services, authStatus). Throws when octo-cli cannot list
    # its contexts, when no context is active or when the active context has no login.
    # octo-cli prints a banner before the JSON list, only keep the output from the opening '[' onward.
    $lines = octo-cli -c ListContexts -j
    if ($LASTEXITCODE -ne 0) { throw "octo-cli ListContexts failed (exit code $LASTEXITCODE). Log in first (octo-cli -c LogIn -i)." }
    $start = ($lines | Select-String -Pattern '^\s*\[' | Select-Object -First 1).LineNumber
    if (-not $start) { throw "Could not read the octo-cli contexts. Log in first (octo-cli -c LogIn -i)." }
    $context = (($lines | Select-Object -Skip ($start - 1)) -join "`n" | ConvertFrom-Json) |
        Where-Object { $_.isEffective } | Select-Object -First 1
    if (-not $context) { throw "No active octo-cli context. Log in first (octo-cli -c LogIn -i)." }
    if (-not $context.services -or [string]::IsNullOrWhiteSpace($context.services.identity)) {
        throw "The active octo-cli context '$($context.name)' has no identity service URL. Configure it (octo-cli -c Config) and log in."
    }
    if ($context.authStatus -eq "none") {
        throw "The active octo-cli context '$($context.name)' is not logged in. Log in first (octo-cli -c LogIn -i)."
    }
    return $context
}

function Test-OctoLocalUrl {
    # True only for http(s) URLs of a local stack: localhost, a loopback IP address, or the getting-started host
    # names below 127-0-0-1.nip.io. Anything else - including URLs with user info, which can hide the real host - is
    # not local. `*.localhost` is not accepted: not every resolver keeps those names on the loopback interface.
    param([AllowNull()][AllowEmptyString()][string]$Url)
    if ([string]::IsNullOrWhiteSpace($Url)) { return $false }
    $uri = $null
    if (-not [Uri]::TryCreate($Url, [UriKind]::Absolute, [ref]$uri)) { return $false }
    if ($uri.Scheme -ne "http" -and $uri.Scheme -ne "https") { return $false }
    if ($uri.UserInfo) { return $false }
    $hostName = $uri.IdnHost.ToLowerInvariant().TrimStart('[').TrimEnd(']')
    if ($hostName -eq "localhost") { return $true }
    if ($hostName -eq "127-0-0-1.nip.io" -or $hostName.EndsWith(".127-0-0-1.nip.io")) { return $true }
    $ip = $null
    if ([System.Net.IPAddress]::TryParse($hostName, [ref]$ip)) { return [System.Net.IPAddress]::IsLoopback($ip) }
    return $false
}

function Assert-OctoLocalContext {
    # Throws unless the identity and asset URLs are set and every service URL of the context is local.
    param([Parameter(Mandatory)]$Context, [Parameter(Mandatory)][string]$Action)
    $svc = $Context.services
    $urls = [ordered]@{
        identity = $svc.identity; asset = $svc.asset; bot = $svc.bot
        communication = $svc.communication; reporting = $svc.reporting; ai = $svc.ai
    }
    $notLocal = @()
    foreach ($key in $urls.Keys) {
        $url = $urls[$key]
        $required = $key -eq "identity" -or $key -eq "asset"
        if ([string]::IsNullOrWhiteSpace($url)) {
            if ($required) { $notLocal += "$key (not set)" }
            continue
        }
        if (-not (Test-OctoLocalUrl -Url $url)) { $notLocal += "$key $url" }
    }
    if ($notLocal.Count -gt 0) {
        throw ("Refusing to $Action`: the active octo-cli context '$($Context.name)' is not a local stack " +
            "($($notLocal -join ', ')). Deleting or creating tenants is only allowed on a local stack " +
            "(localhost, 127.0.0.1 or *.127-0-0-1.nip.io). Nothing was changed.")
    }
}

function Write-OctoTarget {
    # Prints where the script is about to write. Call it before the first write.
    param([Parameter(Mandatory)]$Context, [Parameter(Mandatory)][string]$TenantId)
    $asset = if ($Context.services.asset) { $Context.services.asset } else { "(not set)" }
    Write-Host "Target: context '$($Context.name)', identity $($Context.services.identity), asset $asset, tenant '$TenantId'" -ForegroundColor Cyan
}

function Set-OctoCliTenant {
    # Points the active octo-cli context at the tenant. Pass the context returned by Get-OctoCliContext so the
    # service URLs that were checked are the ones written back.
    param([Parameter(Mandatory)][string]$TenantId, $Context)
    if (-not $Context) { $Context = Get-OctoCliContext }
    $svc = $Context.services
    $cfg = @("-c", "Config", "-isu", $svc.identity, "-tid", $TenantId)
    if ($svc.asset) { $cfg += @("-asu", $svc.asset) }
    if ($svc.bot) { $cfg += @("-bsu", $svc.bot) }
    if ($svc.communication) { $cfg += @("-csu", $svc.communication) }
    if ($svc.reporting) { $cfg += @("-rsu", $svc.reporting) }
    if ($svc.ai) { $cfg += @("-aisu", $svc.ai) }
    Invoke-OctoCli -CliArgs $cfg
}
