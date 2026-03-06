# Register OIDC debug client for local development
# Run this once after setting up the OctoMesh Identity Service

$identityUrl = "https://localhost:5003"
$clientId = "custom-app-frontend-debug"
$redirectUri = "https://localhost:4300"
$postLogoutRedirectUri = "https://localhost:4300"

Write-Host "=== Setting up Identity Service for local development ===" -ForegroundColor Cyan
Write-Host "Identity URL: $identityUrl"
Write-Host "Client ID: $clientId"
Write-Host ""

# Register the debug frontend client
octo-cli -c RegisterClient `
    -cid $clientId `
    -cn "CustomApp Frontend (Debug)" `
    -ru $redirectUri `
    -plru $postLogoutRedirectUri `
    -gt authorization_code `
    -sc "openid profile custom-app.tenantAPI.full_access"

Write-Host ""
Write-Host "=== Identity Service setup complete ===" -ForegroundColor Green
Write-Host "You can now start the frontend with 'npm start' in src/custom-app/"
