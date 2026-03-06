#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

Write-Host "=== OctoMesh Custom App Initializer ===" -ForegroundColor Cyan
Write-Host ""

# --- 1. Gather input ---

$AppName = Read-Host "App Name (PascalCase, e.g. Acme)"
if ([string]::IsNullOrWhiteSpace($AppName)) {
    Write-Host "Error: App name is required." -ForegroundColor Red
    exit 1
}

if ($AppName -notmatch '^[A-Z][a-zA-Z0-9]*$') {
    Write-Host "Error: App name must be PascalCase (start with uppercase, alphanumeric only)." -ForegroundColor Red
    exit 1
}

$DefaultLang = Read-Host "Default Language [en-GB]"
if ([string]::IsNullOrWhiteSpace($DefaultLang)) { $DefaultLang = "en-GB" }

$AdditionalLangs = Read-Host "Additional Languages (comma-separated, e.g. de-AT,fr-FR) [none]"

Write-Host ""

# --- 2. Derive naming variants ---

# kebab-case: AcmeProject -> acme-project
$KebabCase = ($AppName -creplace '([A-Z])', '-$1').TrimStart('-').ToLower()
# snake_case: AcmeProject -> acme_project
$SnakeCase = $KebabCase -replace '-', '_'
# lowercase: AcmeProject -> acmeproject
$Lowercase = $AppName.ToLower()

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  App Name (PascalCase): $AppName"
Write-Host "  kebab-case:            $KebabCase"
Write-Host "  snake_case:            $SnakeCase"
Write-Host "  Tenant ID:             $KebabCase"
Write-Host "  Default Language:      $DefaultLang"
Write-Host "  Additional Languages:  $(if ($AdditionalLangs) { $AdditionalLangs } else { 'none' })"
Write-Host ""

$Confirm = Read-Host "Continue? (y/N)"
if ($Confirm -ne 'y' -and $Confirm -ne 'Y') {
    Write-Host "Aborted."
    exit 0
}

Write-Host ""
Write-Host "Starting initialization..." -ForegroundColor Cyan

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# --- 3. Text replacements in all files ---

Write-Host "[1/7] Replacing placeholders in files..." -ForegroundColor Green

$excludeDirs = @('.git', 'node_modules', '.angular', 'dist')
$excludeExtensions = @('.ico', '.png', '.jpg', '.woff', '.woff2')
$initScripts = @('init.ps1', 'init.sh')

$files = Get-ChildItem -Path $ScriptDir -Recurse -File | Where-Object {
    $path = $_.FullName
    $excluded = $false
    foreach ($dir in $excludeDirs) {
        if ($path -match "[/\\]$dir[/\\]") { $excluded = $true; break }
    }
    if ($_.Name -in $initScripts) { $excluded = $true }
    if ($_.Extension -in $excludeExtensions) { $excluded = $true }
    -not $excluded
}

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $original = $content

        # Order matters: longest match first
        $content = $content -replace 'CustomApp', "${AppName}App"
        $content = $content -replace 'custom-app', $KebabCase
        $content = $content -replace 'custom_app', $SnakeCase

        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file.FullName, $content)
        }
    }
    catch {
        # Skip binary files that can't be read as text
    }
}

# Fix: CustomApp -> {Name}App was too aggressive for some cases
# In .html, .json, .md, .ts files revert {Name}App back to {Name}
$fixExtensions = @('.html', '.json', '.md', '.ts')
$fixFiles = $files | Where-Object { $_.Extension -in $fixExtensions }

foreach ($file in $fixFiles) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $original = $content
        $content = $content -replace "${AppName}App", $AppName

        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file.FullName, $content)
        }
    }
    catch {}
}

# --- 4. Rename directories ---

Write-Host "[2/7] Renaming directories..." -ForegroundColor Green

$customAppDir = Join-Path $ScriptDir "src" "custom-app"
$chartsDir = Join-Path $ScriptDir "src" "charts" "custom-app"

if (Test-Path $customAppDir) {
    $newDir = Join-Path $ScriptDir "src" $KebabCase
    Rename-Item -Path $customAppDir -NewName $KebabCase
    Write-Host "  src/custom-app/ -> src/$KebabCase/"
}

if (Test-Path $chartsDir) {
    Rename-Item -Path $chartsDir -NewName $KebabCase
    Write-Host "  src/charts/custom-app/ -> src/charts/$KebabCase/"
}

# --- 5. Language configuration ---

Write-Host "[3/7] Configuring languages..." -ForegroundColor Green

$FrontendDir = Join-Path $ScriptDir "src" $KebabCase
$ConfigFile = Join-Path $FrontendDir "src" "assets" "config.json"

$LangNames = @{
    'en-GB' = 'English'
    'de-AT' = 'Deutsch (AT)'
    'de-DE' = 'Deutsch (DE)'
    'de-CH' = 'Deutsch (CH)'
    'fr-FR' = "Fran\u00e7ais"
    'it-IT' = 'Italiano'
    'es-ES' = "Espa\u00f1ol"
    'pt-BR' = "Portugu\u00eas"
    'nl-NL' = 'Nederlands'
    'pl-PL' = 'Polski'
    'cs-CZ' = 'Cestina'
    'ja-JP' = 'Japanese'
    'zh-CN' = 'Chinese'
}

$AllLangs = @($DefaultLang)
if (-not [string]::IsNullOrWhiteSpace($AdditionalLangs)) {
    $AllLangs += ($AdditionalLangs -split ',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
}

# Build supported languages array
$SupportedLanguages = @()
foreach ($lang in $AllLangs) {
    $flag = ($lang -replace '^.*-', '').ToLower()
    $name = if ($LangNames.ContainsKey($lang)) { $LangNames[$lang] } else { $lang }
    $SupportedLanguages += @{
        cultureCode = $lang
        name        = $name
        flagIcon    = $flag
    }

    # Create i18n JSON file for additional languages (copy from en-GB)
    $i18nDir = Join-Path $FrontendDir "src" "assets" "i18n"
    $langFile = Join-Path $i18nDir "$lang.json"
    if ($lang -ne 'en-GB' -and -not (Test-Path $langFile)) {
        Copy-Item -Path (Join-Path $i18nDir "en-GB.json") -Destination $langFile
        Write-Host "  Created i18n file: $lang.json"
    }
}

# Update config.json
$config = Get-Content $ConfigFile -Raw | ConvertFrom-Json
$config.defaultLanguage = $DefaultLang
$config.supportedLanguages = $SupportedLanguages
$config | ConvertTo-Json -Depth 10 | Set-Content $ConfigFile -Encoding UTF8

Write-Host "[4/7] Updating import scripts..." -ForegroundColor Green

# --- 6. Generate dev certificates ---

Write-Host "[5/7] Generating dev certificates..." -ForegroundColor Green

$certsScript = Join-Path $ScriptDir "scripts" "generate-dev-certs.ps1"
if (Test-Path $certsScript) {
    Push-Location (Join-Path $ScriptDir "scripts")
    try {
        & $certsScript
        Write-Host "  SSL certificates generated successfully."
    }
    catch {
        Write-Host "  Warning: Could not generate SSL certificates. Run scripts/generate-dev-certs.ps1 manually." -ForegroundColor Yellow
    }
    finally {
        Pop-Location
    }
}
else {
    Write-Host "  Warning: generate-dev-certs.ps1 not found. HTTPS will not work until certificates are generated." -ForegroundColor Yellow
}

# --- 7. Clean up .NET artifacts ---

Write-Host "[6/7] Cleaning up .NET artifacts..." -ForegroundColor Green

$slnFile = Join-Path $ScriptDir "Octo.Template.sln"
if (Test-Path $slnFile) {
    Remove-Item $slnFile
    Write-Host "  Removed Octo.Template.sln"
}

$buildProps = Join-Path $ScriptDir "Directory.Build.props"
if (Test-Path $buildProps) {
    Remove-Item $buildProps
    Write-Host "  Removed Directory.Build.props"
}

# --- 8. Self-destruct ---

Write-Host "[7/7] Cleaning up..." -ForegroundColor Green

Write-Host ""
Write-Host "=== Initialization complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. cd src/$KebabCase"
Write-Host "  2. npm install"
Write-Host "  3. npm start"
Write-Host ""
Write-Host "See README.md for full documentation."

# Remove init scripts
$initSh = Join-Path $ScriptDir "init.sh"
if (Test-Path $initSh) { Remove-Item $initSh }
Remove-Item $MyInvocation.MyCommand.Path
