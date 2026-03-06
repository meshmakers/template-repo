#!/usr/bin/env pwsh
param (
    [string]$TargetDir
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir

# Auto-detect target directory: find the Angular app under src/
if (-not $TargetDir) {
    $candidates = Get-ChildItem -Path (Join-Path $RepoRoot "src") -Directory |
        Where-Object { $_.Name -ne 'charts' -and (Test-Path (Join-Path $_.FullName "angular.json")) }

    if ($candidates.Count -eq 1) {
        $TargetDir = $candidates[0].FullName
    }
    elseif ($candidates.Count -eq 0) {
        Write-Host "Error: No Angular app found under src/. Pass -TargetDir explicitly." -ForegroundColor Red
        exit 1
    }
    else {
        Write-Host "Error: Multiple Angular apps found under src/. Pass -TargetDir explicitly." -ForegroundColor Red
        exit 1
    }
}

if (-not (Test-Path $TargetDir)) {
    Write-Host "Error: Target directory '$TargetDir' does not exist." -ForegroundColor Red
    exit 1
}

# Check openssl is available
if (-not (Get-Command openssl -ErrorAction SilentlyContinue)) {
    Write-Host "Error: openssl is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

Write-Host "Generating dev certificates for: $TargetDir" -ForegroundColor Cyan

# Work in a temp directory to keep things clean
$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) "dev-certs-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir | Out-Null

try {
    Push-Location $tempDir

    # Generate CA
    openssl req -x509 -nodes -new -sha512 -days 365 -newkey rsa:4096 -keyout ca.key -out ca.pem -subj "/C=AT/CN=DevCA" 2>&1 | Out-Null
    openssl x509 -outform pem -in ca.pem -out ca.crt 2>&1 | Out-Null

    # Write v3.ext
    @'
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = 127.0.0.1
DNS.3 = ::1
'@ | Set-Content -Path "v3.ext"

    # Generate server certificate
    openssl req -new -nodes -newkey rsa:4096 -keyout localhost.key -out localhost.csr -subj "/C=AT/ST=Salzburg/L=Salzburg/O=meshmakers GmbH/CN=localhost" 2>&1 | Out-Null
    openssl x509 -req -sha512 -days 365 -extfile v3.ext -CA ca.crt -CAkey ca.key -CAcreateserial -in localhost.csr -out localhost.crt 2>&1 | Out-Null

    # Copy certificates to target
    Copy-Item -Path localhost.crt -Destination (Join-Path $TargetDir "localhost.crt")
    Copy-Item -Path localhost.key -Destination (Join-Path $TargetDir "localhost.key")

    Write-Host "  localhost.crt -> $TargetDir" -ForegroundColor Green
    Write-Host "  localhost.key -> $TargetDir" -ForegroundColor Green
}
finally {
    Pop-Location
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
