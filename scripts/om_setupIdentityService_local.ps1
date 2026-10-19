param (
    [string]$TenantId = "custom-app"
)
# Registers the OIDC client of the local dev server (https://localhost:4300/) in the tenant of the app.
# Run it after om_initialize_tenant.ps1: clients belong to the tenant, deleting the tenant deletes them.
# octo-cli has to be logged in (octo-cli -c LogIn -i).
. "$PSScriptRoot/om_common.ps1"

$clientId = "custom-app-frontend-debug"
$clientUri = "https://localhost:4300/"
$redirectUri = "https://localhost:4300/"
$clientName = "CustomApp Frontend (Debug)"

Write-Host "=== Setting up Identity Service for local development ===" -ForegroundColor Cyan
Write-Host "Tenant: $TenantId, client ID: $clientId, client URI: $clientUri"
Write-Host ""

Set-OctoCliTenant -TenantId $TenantId

# Register the debug frontend client
Invoke-OctoCli -CliArgs @("-c", "AddAuthorizationCodeClient", "--clientUri", $clientUri, "--clientId", $clientId, "--redirectUri", $redirectUri, "--name", $clientName)

# Add required scopes
Invoke-OctoCli -CliArgs @("-c", "AddScopeToClient", "--clientId", $clientId, "--name", "octo_api")
Invoke-OctoCli -CliArgs @("-c", "AddScopeToClient", "--clientId", $clientId, "--name", "offline_access")

Write-Host ""
Write-Host "=== Identity Service setup complete ===" -ForegroundColor Green
Write-Host "You can now start the frontend with 'npm start' in src/custom-app/"
