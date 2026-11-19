param (
    [string]$TenantId = "custom-app",
    # Required: deleting removes the tenant with all its data.
    [switch]$Force
)
# Deletes the tenant of the app (all its data), switching off its capabilities first. A tenant that does not exist
# is not an error; any other failure stops the script.
# Only on a local stack (localhost, 127.0.0.1, *.127-0-0-1.nip.io) and only with -Force; refused before any write
# for every other octo-cli context.
. "$PSScriptRoot/om_common.ps1"
Assert-OctoTenantId -TenantId $TenantId -NotSystem
if (-not $Force) {
    throw "Refusing to delete the tenant '$TenantId' without -Force: deleting removes the tenant and all its data (local stack only). Nothing was changed."
}
$context = Get-OctoCliContext
Assert-OctoLocalContext -Context $context -Action "delete the tenant '$TenantId'"
Write-OctoTarget -Context $context -TenantId $TenantId
Set-OctoCliTenant -TenantId $SystemTenantId -Context $context
Confirm-OctoContextUnchanged -Expected $context -TenantId $SystemTenantId -Action "delete the tenant '$TenantId'"
if (-not (Test-OctoTenantExists -TenantId $TenantId -ContextName $context.name)) {
    Write-Host "The tenant '$TenantId' does not exist, nothing to delete." -ForegroundColor Yellow
    return
}
# --disable-features switches off Communication, Stream Data, Reporting and AI first: a tenant with an enabled
# capability cannot be deleted, and om_create_tenants.ps1 enables two. A failure stops the script.
Invoke-OctoCli -CliArgs @("-c", "Delete", "-tid", $TenantId, "--disable-features", "-y", "--context", $context.name)
