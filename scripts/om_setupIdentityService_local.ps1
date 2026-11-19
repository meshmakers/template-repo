param (
    [string]$TenantId = "custom-app",
    [string]$ClientId = "custom-app-frontend-debug"
)
# Registers the OIDC client of the local dev server (https://localhost:4300/) in the tenant of the app.
# -ClientId must match clientId in src/custom-app/src/assets/config.json (init.sh --client-id sets both).
# Run it after om_initialize_tenant.ps1: clients belong to the tenant, deleting the tenant deletes them.
# octo-cli has to be logged in (octo-cli -c LogIn -i).
. "$PSScriptRoot/om_common.ps1"

$clientUri = "https://localhost:4300/"
$redirectUri = "https://localhost:4300/"
$clientName = "CustomApp Frontend (Debug)"

Write-Host "=== Setting up Identity Service for local development ===" -ForegroundColor Cyan
Write-Host "Tenant: $TenantId, client ID: $ClientId, client URI: $clientUri"
Write-Host ""

Assert-OctoTenantId -TenantId $TenantId
# A client id is passed to octo-cli as an argument and must not look like an option.
if ($ClientId -notmatch '\A[A-Za-z0-9][A-Za-z0-9._:-]{0,99}\z') {
    throw "Invalid client id '$ClientId': use letters, digits, '.', '_', ':' and '-' only, starting with a letter or digit."
}
$context = Get-OctoCliContext
Write-OctoTarget -Context $context -TenantId $TenantId
Set-OctoCliTenant -TenantId $TenantId -Context $context

# Register the debug frontend client
Invoke-OctoCli -CliArgs @("-c", "AddAuthorizationCodeClient", "--clientUri", $clientUri, "--clientId", $ClientId, "--redirectUri", $redirectUri, "--name", $clientName)

# Add required scopes
Invoke-OctoCli -CliArgs @("-c", "AddScopeToClient", "--clientId", $ClientId, "--name", "octo_api")
Invoke-OctoCli -CliArgs @("-c", "AddScopeToClient", "--clientId", $ClientId, "--name", "offline_access")

Write-Host ""
Write-Host "=== Identity Service setup complete ===" -ForegroundColor Green
Write-Host "You can now start the frontend with 'npm start' in src/custom-app/"
