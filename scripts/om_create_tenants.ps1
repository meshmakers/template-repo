param (
    [string]$TenantId = "custom-app"
)
# Creates the tenant of the app below the system tenant, provisions the current user as its admin and enables
# communication and stream data. Leaves the octo-cli context on the new tenant.
# Only on a local stack (localhost, 127.0.0.1, *.127-0-0-1.nip.io); refused before any write for every other
# octo-cli context. On a hosted tenant use om_initialize_tenant.ps1 without -Recreate.
. "$PSScriptRoot/om_common.ps1"

function Invoke-Retry {
    # Tenant creation and deletion finish in the background (a create right after a delete can still answer
    # "already in use", the identity setup of a new tenant can still answer "forbidden"), so repeat for a while.
    # A rejected login (and, with -StopOnForbidden, a missing right) stops at once with octo-cli's own message.
    param([string]$Description, [string[]]$CliArgs, [int]$Attempts = 20, [switch]$StopOnForbidden)
    for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
        $lines = @(& octo-cli @CliArgs 2>&1 | ForEach-Object { "$_" })
        $exitCode = $LASTEXITCODE
        $lines | ForEach-Object { Write-Host $_ }
        if ($exitCode -eq 0) { return }
        if (Test-OctoAuthFailure -Lines $lines -IncludeForbidden:$StopOnForbidden) {
            throw ("$Description failed (exit code $exitCode)$(Get-OctoCliReason -Lines $lines). Not retried: " +
                "this step needs a login of the system tenant '$SystemTenantId' with the right to manage tenants.")
        }
        if ($attempt -lt $Attempts) {
            Write-Host "$Description failed (attempt $attempt of $Attempts), retrying in 10 seconds..." -ForegroundColor Yellow
            Start-Sleep -Seconds 10
        }
    }
    throw "$Description failed after $Attempts attempts. If the tenant exists already, delete it first (om_delete_tenants.ps1 -Force)."
}

Assert-OctoTenantId -TenantId $TenantId -NotSystem
$context = Get-OctoCliContext
Assert-OctoLocalContext -Context $context -Action "create the tenant '$TenantId'"
Write-OctoTarget -Context $context -TenantId $TenantId
Set-OctoCliTenant -TenantId $SystemTenantId -Context $context
Confirm-OctoContextUnchanged -Expected $context -TenantId $SystemTenantId -Action "create the tenant '$TenantId'"
$pin = @("--context", $context.name)
Invoke-Retry -Description "Creating the tenant '$TenantId'" -CliArgs (@("-c", "Create", "-tid", $TenantId, "-db", $TenantId, "-np") + $pin) -StopOnForbidden
Invoke-Retry -Description "Provisioning the current user as admin of '$TenantId'" -CliArgs (@("-c", "ProvisionCurrentUser", "-ttid", $TenantId) + $pin)
Set-OctoCliTenant -TenantId $TenantId -Context $context
Invoke-OctoCli -CliArgs (@("-c", "EnableCommunication") + $pin)
Invoke-OctoCli -CliArgs (@("-c", "EnableStreamData") + $pin)
