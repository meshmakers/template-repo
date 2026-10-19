param (
    [string]$TenantId = "custom-app",
    # Version of the public Basic Construction Kit to import
    [string]$basicVersion = "2.5.0"
)

Write-Host "=== Initializing the tenant '$TenantId' ===" -ForegroundColor Cyan

Write-Host "Deleting the tenant if it exists..." -ForegroundColor Yellow
& "$PSScriptRoot/om_delete_tenants.ps1" -TenantId $TenantId

Write-Host "Creating the tenant..." -ForegroundColor Yellow
& "$PSScriptRoot/om_create_tenants.ps1" -TenantId $TenantId

Write-Host "Importing the Construction Kits..." -ForegroundColor Yellow
& "$PSScriptRoot/om_importck.ps1" -TenantId $TenantId -basicVersion $basicVersion

Write-Host "Importing the sample data..." -ForegroundColor Yellow
& "$PSScriptRoot/om_importrt.ps1" -TenantId $TenantId

Write-Host "=== Tenant initialization complete ===" -ForegroundColor Green
