param(
    [string]$configuration = "Release"
)

$scriptPath = $PSScriptRoot

Write-Host "Starting custom-app development server" -ForegroundColor Green

# Start custom-app
$appPath = Join-Path $scriptPath "src/custom-app"

if (!(Test-Path $appPath)) {
    Write-Host "Path not found: $appPath" -ForegroundColor Red
    exit 1
}

# Check if node_modules exists, if not run npm ci
$nodeModules = Join-Path $appPath "node_modules"
if (!(Test-Path $nodeModules)) {
    Write-Host "node_modules not found, running npm ci..." -ForegroundColor Yellow
    Push-Location $appPath
    npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm ci failed" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location
}

# Check if SSL certificates exist, if not generate them
$certFile = Join-Path $appPath "localhost.crt"
$keyFile = Join-Path $appPath "localhost.key"
if (!(Test-Path $certFile) -or !(Test-Path $keyFile)) {
    Write-Host "SSL certificates not found, generating..." -ForegroundColor Yellow
    $certScript = Join-Path $scriptPath "scripts/generate-dev-certs.ps1"
    if (Test-Path $certScript) {
        & $certScript -TargetDir $appPath
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Certificate generation failed" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "generate-dev-certs.ps1 not found at $certScript" -ForegroundColor Red
        exit 1
    }
}

Push-Location $appPath
try {
    Write-Host "Starting Angular development server on https://localhost:4300" -ForegroundColor Cyan
    npm start
}
finally {
    Pop-Location
}
