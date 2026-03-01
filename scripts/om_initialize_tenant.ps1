param (
    [string]$configuration = "Release"
)

Write-Host "=== Initializing CustomApp Tenant ===" -ForegroundColor Cyan

# Step 1: Delete existing tenant (ignore errors if it doesn't exist)
Write-Host "Deleting existing tenant..." -ForegroundColor Yellow
& "$PSScriptRoot/om_delete_tenants.ps1"

# Step 2: Create tenant
Write-Host "Creating tenant..." -ForegroundColor Yellow
& "$PSScriptRoot/om_create_tenants.ps1"

# Step 3: Import Construction Kit
Write-Host "Importing Construction Kit..." -ForegroundColor Yellow
& "$PSScriptRoot/om_importck.ps1" -configuration $configuration

# Step 4: Import Runtime data
Write-Host "Importing Runtime data..." -ForegroundColor Yellow
& "$PSScriptRoot/om_importrt.ps1"

Write-Host "=== Tenant initialization complete ===" -ForegroundColor Green
