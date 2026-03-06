#!/usr/bin/env pwsh
param (
    [string]$TargetDir,
    [switch]$Trust
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

$caCrtTarget = Join-Path $TargetDir "ca.crt"

try {
    Push-Location $tempDir

    # Generate CA
    openssl req -x509 -nodes -new -sha512 -days 365 -newkey rsa:4096 -keyout ca.key -out ca.pem -subj "/C=AT/CN=OctoMesh DevCA" 2>&1 | Out-Null
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
    Copy-Item -Path ca.crt -Destination $caCrtTarget
    Copy-Item -Path localhost.crt -Destination (Join-Path $TargetDir "localhost.crt")
    Copy-Item -Path localhost.key -Destination (Join-Path $TargetDir "localhost.key")

    Write-Host "  ca.crt        -> $TargetDir" -ForegroundColor Green
    Write-Host "  localhost.crt -> $TargetDir" -ForegroundColor Green
    Write-Host "  localhost.key -> $TargetDir" -ForegroundColor Green
}
finally {
    Pop-Location
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}

# Trust the CA certificate in the OS trust store
if ($Trust) {
    Write-Host ""
    Write-Host "Importing CA certificate into OS trust store..." -ForegroundColor Cyan

    if ($IsWindows) {
        # Windows: Import into CurrentUser Trusted Root CAs
        try {
            $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($caCrtTarget)
            $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
            $store.Open("ReadWrite")
            $store.Add($cert)
            $store.Close()
            Write-Host "  CA imported into Windows CurrentUser\Root trust store" -ForegroundColor Green
        }
        catch {
            Write-Host "  Failed to import CA on Windows: $_" -ForegroundColor Red
            Write-Host "  Try running PowerShell as Administrator" -ForegroundColor Yellow
            exit 1
        }
    }
    elseif ($IsMacOS) {
        # macOS: Import into user login keychain as trusted
        try {
            $keychain = security default-keychain -d user 2>&1 | ForEach-Object { $_.Trim().Trim('"') }
            security add-trusted-cert -r trustRoot -k $keychain $caCrtTarget
            Write-Host "  CA imported into macOS login keychain as trusted" -ForegroundColor Green
        }
        catch {
            Write-Host "  Failed to import CA on macOS: $_" -ForegroundColor Red
            Write-Host "  You may be prompted for your password" -ForegroundColor Yellow
            exit 1
        }
    }
    elseif ($IsLinux) {
        # Linux: Detect distro and use appropriate method
        $imported = $false

        # Debian/Ubuntu (update-ca-certificates)
        if (Test-Path "/usr/local/share/ca-certificates") {
            try {
                Write-Host "  Detected Debian/Ubuntu style CA store" -ForegroundColor Gray
                sudo cp $caCrtTarget /usr/local/share/ca-certificates/octomesh-devca.crt
                sudo update-ca-certificates
                $imported = $true
                Write-Host "  CA imported via update-ca-certificates" -ForegroundColor Green
            }
            catch {
                Write-Host "  Failed: $_" -ForegroundColor Red
            }
        }

        # RHEL/Fedora/CentOS (update-ca-trust)
        if (-not $imported -and (Test-Path "/etc/pki/ca-trust/source/anchors")) {
            try {
                Write-Host "  Detected RHEL/Fedora style CA store" -ForegroundColor Gray
                sudo cp $caCrtTarget /etc/pki/ca-trust/source/anchors/octomesh-devca.crt
                sudo update-ca-trust extract
                $imported = $true
                Write-Host "  CA imported via update-ca-trust" -ForegroundColor Green
            }
            catch {
                Write-Host "  Failed: $_" -ForegroundColor Red
            }
        }

        if (-not $imported) {
            Write-Host "  Could not detect Linux CA store location." -ForegroundColor Yellow
            Write-Host "  Manually import $caCrtTarget into your system trust store." -ForegroundColor Yellow
            exit 1
        }

        # Hint about browser-specific stores
        Write-Host ""
        Write-Host "  Note: Firefox uses its own certificate store." -ForegroundColor Yellow
        Write-Host "  To trust in Firefox: Settings > Privacy & Security > Certificates > Import '$caCrtTarget'" -ForegroundColor Yellow
    }
    else {
        Write-Host "  Unknown OS. Manually import $caCrtTarget into your trust store." -ForegroundColor Yellow
        exit 1
    }

    Write-Host ""
    Write-Host "CA certificate trusted. Browsers will accept https://localhost without warnings." -ForegroundColor Green
    Write-Host "Note: You may need to restart your browser for changes to take effect." -ForegroundColor Yellow
}
else {
    Write-Host ""
    Write-Host "Tip: Run with -Trust to import the CA into your OS trust store:" -ForegroundColor Yellow
    Write-Host "  ./scripts/generate-dev-certs.ps1 -Trust" -ForegroundColor Yellow
}
