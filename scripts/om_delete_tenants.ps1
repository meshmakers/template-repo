param (
    [string]$TenantId = "custom-app"
)
# Deletes the tenant of the app (all its data). A tenant that does not exist is not an error.
. "$PSScriptRoot/om_common.ps1"
Set-OctoCliTenant -TenantId $SystemTenantId
Invoke-OctoCli -CliArgs @("-c", "Delete", "-tid", $TenantId, "-y") -IgnoreFailure
