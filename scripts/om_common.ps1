# Shared helpers of the om_*.ps1 scripts (dot-source this file).
#
# octo-cli works on one tenant per context: creating or deleting a tenant has to run against the system
# tenant (octosystem), everything else against the tenant of the app. `Config` replaces the options of the
# active context (keeping the login), so the service URLs are read from the active context and passed again.
$ErrorActionPreference = "Stop"
$SystemTenantId = "octosystem"

function Invoke-OctoCli {
    param([string[]]$CliArgs, [switch]$IgnoreFailure)
    & octo-cli @CliArgs
    if ($LASTEXITCODE -ne 0 -and -not $IgnoreFailure) {
        throw "octo-cli $($CliArgs -join ' ') failed (exit code $LASTEXITCODE)."
    }
}

function Set-OctoCliTenant {
    param([Parameter(Mandatory)][string]$TenantId)
    # octo-cli prints a banner before the JSON list, only keep the output from the opening '[' onward.
    $lines = octo-cli -c ListContexts -j
    $start = ($lines | Select-String -Pattern '^\s*\[' | Select-Object -First 1).LineNumber
    if (-not $start) { throw "Could not read the octo-cli contexts. Log in first (octo-cli -c LogIn -i)." }
    $context = (($lines | Select-Object -Skip ($start - 1)) -join "`n" | ConvertFrom-Json) |
        Where-Object { $_.isEffective } | Select-Object -First 1
    if (-not $context) { throw "No active octo-cli context. Log in first (octo-cli -c LogIn -i)." }
    $svc = $context.services
    $cfg = @("-c", "Config", "-isu", $svc.identity, "-tid", $TenantId)
    if ($svc.asset) { $cfg += @("-asu", $svc.asset) }
    if ($svc.bot) { $cfg += @("-bsu", $svc.bot) }
    if ($svc.communication) { $cfg += @("-csu", $svc.communication) }
    if ($svc.reporting) { $cfg += @("-rsu", $svc.reporting) }
    if ($svc.ai) { $cfg += @("-aisu", $svc.ai) }
    Invoke-OctoCli -CliArgs $cfg
}
