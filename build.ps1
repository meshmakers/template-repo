param(
    [string]$configuration = "Release"
)

$scriptPath = $PSScriptRoot
$exitCode = 0

Write-Host "Building custom-app with configuration: $configuration" -ForegroundColor Green

# Build frontend-libraries first (dependencies) - located in sibling repo
$librariesPath = Join-Path $scriptPath "../octo-frontend-libraries/src/frontend-libraries"
Write-Host "Building frontend-libraries in $librariesPath" -ForegroundColor Cyan

Push-Location $librariesPath
try {
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm ci failed for frontend-libraries" -ForegroundColor Red
        $exitCode = 1
        throw "npm ci failed"
    }

    Write-Host "Building libraries..." -ForegroundColor Yellow
    if ($configuration -eq "Release") {
        npm run build:prod
    } else {
        npm run build
    }
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed for frontend-libraries" -ForegroundColor Red
        $exitCode = 1
        throw "Build failed"
    }
    Write-Host "frontend-libraries built successfully" -ForegroundColor Green
}
catch {
    Write-Host "Error building frontend-libraries: $_" -ForegroundColor Red
    $exitCode = 1
}
finally {
    Pop-Location
}

if ($exitCode -ne 0) {
    exit $exitCode
}

# Then build custom-app
$appPath = Join-Path $scriptPath "src/custom-app"
Write-Host "Building custom-app in $appPath" -ForegroundColor Cyan

Push-Location $appPath
try {
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm ci failed for custom-app" -ForegroundColor Red
        $exitCode = 1
        throw "npm ci failed"
    }

    Write-Host "Building application..." -ForegroundColor Yellow
    npm run build:prod
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed for custom-app" -ForegroundColor Red
        $exitCode = 1
        throw "Build failed"
    }
    Write-Host "custom-app built successfully" -ForegroundColor Green
}
catch {
    Write-Host "Error building custom-app: $_" -ForegroundColor Red
    $exitCode = 1
}
finally {
    Pop-Location
}

if ($exitCode -eq 0) {
    Write-Host "All frontend builds completed successfully" -ForegroundColor Green
} else {
    Write-Host "Frontend build failed" -ForegroundColor Red
}

exit $exitCode
