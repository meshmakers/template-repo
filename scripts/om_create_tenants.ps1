param (
    [string]$TenantId = "custom-app"
)
# Creates the tenant of the app below the system tenant, provisions the current user as its admin and enables
# communication and stream data. Leaves the octo-cli context on the new tenant.
. "$PSScriptRoot/om_common.ps1"

function Invoke-Retry {
    # Tenant creation and deletion finish in the background (a create right after a delete can still answer
    # "already in use", the identity setup of a new tenant can still answer "forbidden"), so repeat for a while.
    param([string]$Description, [string[]]$CliArgs, [int]$Attempts = 20)
    for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
        Invoke-OctoCli -CliArgs $CliArgs -IgnoreFailure
        if ($LASTEXITCODE -eq 0) { return }
        if ($attempt -lt $Attempts) {
            Write-Host "$Description failed (attempt $attempt of $Attempts), retrying in 10 seconds..." -ForegroundColor Yellow
            Start-Sleep -Seconds 10
        }
    }
    throw "$Description failed after $Attempts attempts. If the tenant exists already, delete it first (om_delete_tenants.ps1)."
}

Set-OctoCliTenant -TenantId $SystemTenantId
Invoke-Retry -Description "Creating the tenant '$TenantId'" -CliArgs @("-c", "Create", "-tid", $TenantId, "-db", $TenantId, "-np")
Invoke-Retry -Description "Provisioning the current user as admin of '$TenantId'" -CliArgs @("-c", "ProvisionCurrentUser", "-ttid", $TenantId)
Set-OctoCliTenant -TenantId $TenantId
Invoke-OctoCli -CliArgs @("-c", "EnableCommunication")
Invoke-OctoCli -CliArgs @("-c", "EnableStreamData")
