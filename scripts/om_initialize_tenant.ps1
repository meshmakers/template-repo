param (
    [string]$TenantId = "custom-app",
    # Version of the public Basic Construction Kit to import
    [string]$basicVersion = "2.5.0",
    # Delete and create the tenant first. Only on a local stack (localhost, 127.0.0.1, *.127-0-0-1.nip.io) with a
    # system-tenant admin login; refused for any other octo-cli context before anything is written.
    [switch]$Recreate,
    # Import the Construction Kits only, not the sample data of the blueprint.
    [switch]$SkipSampleData
)
# Prepares the tenant of the app: imports the Construction Kits and (unless -SkipSampleData) the sample data.
# Without -Recreate the tenant must exist and nothing is deleted or created - this is the path for a hosted tenant
# with a tenant-admin login. With -Recreate (local stack only) the tenant is deleted and created first.
. "$PSScriptRoot/om_common.ps1"

Assert-OctoTenantId -TenantId $TenantId -NotSystem
$context = Get-OctoCliContext
if ($Recreate) {
    Assert-OctoLocalContext -Context $context -Action "recreate the tenant '$TenantId'"
}

Write-Host "=== Initializing the tenant '$TenantId' ===" -ForegroundColor Cyan
Write-OctoTarget -Context $context -TenantId $TenantId

if ($Recreate) {
    Write-Host "Deleting the tenant if it exists..." -ForegroundColor Yellow
    & "$PSScriptRoot/om_delete_tenants.ps1" -TenantId $TenantId -Force

    Write-Host "Creating the tenant..." -ForegroundColor Yellow
    & "$PSScriptRoot/om_create_tenants.ps1" -TenantId $TenantId
}
else {
    Write-Host "Using the existing tenant: nothing is deleted or created (-Recreate recreates it on a local stack)." -ForegroundColor Yellow
}

Write-Host "Importing the Construction Kits..." -ForegroundColor Yellow
& "$PSScriptRoot/om_importck.ps1" -TenantId $TenantId -basicVersion $basicVersion

if ($SkipSampleData) {
    Write-Host "Skipping the sample data (-SkipSampleData)." -ForegroundColor Yellow
}
else {
    Write-Host "Importing the sample data..." -ForegroundColor Yellow
    & "$PSScriptRoot/om_importrt.ps1" -TenantId $TenantId
}

Write-Host "=== Tenant initialization complete ===" -ForegroundColor Green
