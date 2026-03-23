# Register OIDC debug client for local development
# Ensure that you have logged in to identity services first (e.g. octo-cli -c LogIn -i)

$clientId = "custom-app-frontend-debug"
$clientUri = "https://localhost:4300/"
$redirectUri = "https://localhost:4300/"
$clientName = "CustomApp Frontend (Debug)"

Write-Host "=== Setting up Identity Service for local development ===" -ForegroundColor Cyan
Write-Host "Client ID: $clientId"
Write-Host "Client URI: $clientUri"
Write-Host ""

# Register the debug frontend client
octo-cli -c AddAuthorizationCodeClient `
    --clienturi $clientUri `
    --clientid $clientId `
    --redirectUri $redirectUri `
    --name $clientName

# Add required scopes
octo-cli -c AddScopeToClient --clientid $clientId --name "octo_api"
octo-cli -c AddScopeToClient --clientid $clientId --name "offline_access"

Write-Host ""
Write-Host "=== Identity Service setup complete ===" -ForegroundColor Green
Write-Host "You can now start the frontend with 'npm start' in src/custom-app/"
