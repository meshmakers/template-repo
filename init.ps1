#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Turns the template into your app (Windows counterpart of init.sh).
.DESCRIPTION
    Renames the placeholders (custom-app, CustomApp, ...), sets the tenant id and the languages, removes the
    template-only files and finally the init scripts. On a terminal it asks for every value that is not given; without
    one (input redirected, an AI agent, CI) it never asks: pass -AppName and -Yes, everything else has a default.
    Each parameter also reads the environment variable named below; a parameter wins over the variable.
    INIT_INTERACTIVE=1 or 0 forces asking or never asking. Invalid input stops the script with exit code 2 before it
    changes any file.
.PARAMETER AppName
    App name in PascalCase (FieldInspections) or kebab-case (field-inspections, converted to FieldInspections)
    (INIT_APP_NAME). Required.
.PARAMETER TenantId
    OctoMesh tenant of the app, e.g. test-ordi (INIT_TENANT_ID). Default: the kebab-case app name.
.PARAMETER ClientId
    OIDC client of the app in that tenant, e.g. a client your tenant administrator registered on a hosted tenant
    (INIT_CLIENT_ID). Default: <kebab-case app name>-frontend-debug, the client that
    scripts/om_setupIdentityService_local.ps1 registers.
.PARAMETER Lang
    Default language, e.g. en-GB (INIT_DEFAULT_LANG). Default: en-GB.
.PARAMETER ExtraLangs
    Additional languages, comma-separated, e.g. de-AT,fr-FR (INIT_EXTRA_LANGS). Default: none. German (de-*) gets
    translated texts; every other language starts as a copy of the English texts (placeholders to translate).
.PARAMETER Yes
    Do not ask for confirmation (INIT_ASSUME_YES=1). Required without a terminal.
.EXAMPLE
    ./init.ps1 -AppName Inspections -TenantId test-ordi -Lang en-GB -ExtraLangs de-AT -Yes
#>
param(
    [string]$AppName,
    [string]$TenantId,
    [string]$ClientId,
    [string]$Lang,
    [string]$ExtraLangs,
    [switch]$Yes
)
$ErrorActionPreference = "Stop"

function Stop-Init([string]$Message) {
    Write-Host "Error: $Message" -ForegroundColor Red
    Write-Host "Nothing was changed. See Get-Help ./init.ps1 -Detailed"
    exit 2
}

function Test-True([string]$Value) { return $Value -match '^(1|true|yes|y)$' }

Write-Host "=== OctoMesh Custom App Initializer ===" -ForegroundColor Cyan
Write-Host ""

# --- 1. Gather input ---

if (-not $PSBoundParameters.ContainsKey('AppName')) { $AppName = $env:INIT_APP_NAME }
if (-not $PSBoundParameters.ContainsKey('TenantId')) { $TenantId = $env:INIT_TENANT_ID }
if (-not $PSBoundParameters.ContainsKey('ClientId')) { $ClientId = $env:INIT_CLIENT_ID }
if (-not $PSBoundParameters.ContainsKey('Lang')) { $Lang = $env:INIT_DEFAULT_LANG }
$ExtraLangsGiven = $PSBoundParameters.ContainsKey('ExtraLangs') -or -not [string]::IsNullOrEmpty($env:INIT_EXTRA_LANGS)
if (-not $PSBoundParameters.ContainsKey('ExtraLangs')) { $ExtraLangs = $env:INIT_EXTRA_LANGS }
$AssumeYes = $Yes.IsPresent -or (Test-True $env:INIT_ASSUME_YES)

if ($env:INIT_INTERACTIVE) {
    $Interactive = Test-True $env:INIT_INTERACTIVE
}
else {
    $Interactive = -not [Console]::IsInputRedirected
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path (Join-Path $ScriptDir "src" "custom-app"))) {
    Stop-Init "src/custom-app/ not found next to init.ps1: the template seems to be initialized already."
}

if ([string]::IsNullOrWhiteSpace($AppName)) {
    if (-not $Interactive) {
        Stop-Init "the app name is required: pass -AppName <Name> or set INIT_APP_NAME (no terminal to ask)."
    }
    $AppName = Read-Host "App Name (PascalCase or kebab-case, e.g. FieldInspections or field-inspections)"
}
if ([string]::IsNullOrWhiteSpace($AppName)) { Stop-Init "the app name is required." }
# PascalCase (FieldInspections) is used as it is. kebab-case (field-inspections: lower-case words of letters and
# digits, each starting with a letter, joined by single dashes) is converted to PascalCase. Anything else is refused.
$AppNameGiven = $AppName
if ($AppName -cmatch '\A[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*\z') {
    $AppName = -join ($AppName -split '-' | ForEach-Object { $_.Substring(0, 1).ToUpper() + $_.Substring(1) })
}
elseif ($AppName -cnotmatch '\A[A-Z][a-zA-Z0-9]*\z') {
    Stop-Init "app name '$AppName' is neither PascalCase (FieldInspections: an uppercase letter first, then letters and digits) nor kebab-case (field-inspections: lower-case words joined by '-', each starting with a letter)."
}

# --- 2. Derive naming variants ---

# kebab-case: AcmeProject -> acme-project
$KebabCase = ($AppName -creplace '([A-Z])', '-$1').TrimStart('-').ToLower()
# snake_case: AcmeProject -> acme_project
$SnakeCase = $KebabCase -replace '-', '_'
# camelCase: AcmeProject -> acmeProject (GraphQL field names, for example customAppItem -> acmeItem)
$CamelCase = $AppName.Substring(0, 1).ToLower() + $AppName.Substring(1)

$TenantSource = "given"
if ([string]::IsNullOrEmpty($TenantId) -and $Interactive) { $TenantId = Read-Host "Tenant ID [$KebabCase]" }
if ([string]::IsNullOrEmpty($TenantId)) {
    $TenantId = $KebabCase
    $TenantSource = "derived from the app name"
}
# Same rule as Assert-OctoTenantId in scripts/om_common.ps1.
if ($TenantId -notmatch '\A[A-Za-z0-9][A-Za-z0-9_-]{0,62}\z') {
    Stop-Init "tenant id '$TenantId' is invalid: use letters, digits, '-' and '_' only, starting with a letter or digit (at most 63 characters)."
}
if ($TenantId -ieq 'octosystem') { Stop-Init "the system tenant 'octosystem' cannot be the tenant of the app." }

# The client id is never asked for: the default is the client of om_setupIdentityService_local.ps1.
$ClientSource = "given"
if ([string]::IsNullOrEmpty($ClientId)) {
    $ClientId = "$KebabCase-frontend-debug"
    $ClientSource = "default, registered by scripts/om_setupIdentityService_local.ps1"
}
# Same rule as om_setupIdentityService_local.ps1.
if ($ClientId -notmatch '\A[A-Za-z0-9][A-Za-z0-9._:-]{0,99}\z') {
    Stop-Init "client id '$ClientId' is invalid: use letters, digits, '.', '_', ':' and '-' only, starting with a letter or digit (at most 100 characters)."
}

if ([string]::IsNullOrEmpty($Lang) -and $Interactive) { $Lang = Read-Host "Default Language [en-GB]" }
$DefaultLang = if ([string]::IsNullOrWhiteSpace($Lang)) { "en-GB" } else { $Lang }
if (-not $ExtraLangsGiven -and $Interactive) {
    $ExtraLangs = Read-Host "Additional Languages (comma-separated, e.g. de-AT,fr-FR) [none]"
}

$LangPattern = '\A[a-z]{2,3}-[A-Z]{2}\z'
if ($DefaultLang -cnotmatch $LangPattern) {
    Stop-Init "default language '$DefaultLang' is invalid: use a culture code such as en-GB or de-AT."
}
# Normalise the additional languages: trim, drop empty entries and duplicates (also of the default language).
$AllLangs = [System.Collections.Generic.List[string]]::new()
$AllLangs.Add($DefaultLang)
foreach ($raw in (("$ExtraLangs") -split ',')) {
    $item = $raw.Trim()
    if ($item -eq '') { continue }
    if ($item -cnotmatch $LangPattern) { Stop-Init "additional language '$item' is invalid: use culture codes such as de-AT,fr-FR." }
    if (-not $AllLangs.Contains($item)) { $AllLangs.Add($item) }
}
$AdditionalLangs = ($AllLangs | Select-Object -Skip 1) -join ','

Write-Host "Configuration:" -ForegroundColor Yellow
if ($AppNameGiven -cne $AppName) { Write-Host "  App Name (PascalCase): $AppName (converted from '$AppNameGiven')" }
else { Write-Host "  App Name (PascalCase): $AppName" }
Write-Host "  kebab-case:            $KebabCase"
Write-Host "  snake_case:            $SnakeCase"
Write-Host "  Tenant ID:             $TenantId ($TenantSource)"
Write-Host "  Client ID:             $ClientId ($ClientSource)"
Write-Host "  Default Language:      $DefaultLang"
Write-Host "  Additional Languages:  $(if ($AdditionalLangs) { $AdditionalLangs } else { 'none' })"
Write-Host ""

if (-not $AssumeYes) {
    if (-not $Interactive) { Stop-Init "confirmation required: pass -Yes or set INIT_ASSUME_YES=1 (no terminal to ask)." }
    $Confirm = Read-Host "Continue? (y/N)"
    if ($Confirm -ne 'y' -and $Confirm -ne 'Y') {
        Write-Host "Aborted. Nothing was changed."
        exit 0
    }
}

Write-Host ""
Write-Host "Starting initialization..." -ForegroundColor Cyan

# --- 3. Template-only files and tenant id ---

Write-Host "[1/7] Removing template-only files, setting the tenant id..." -ForegroundColor Green

# Checks of the template itself (they run init.sh, which is gone afterwards).
foreach ($templateFile in @('scripts/ci/verify-template.sh', 'scripts/ci/check-public-files.sh', 'scripts/tests/Init.Tests.ps1')) {
    $path = Join-Path $ScriptDir $templateFile
    if (Test-Path $path) {
        Remove-Item $path
        Write-Host "  Removed $templateFile"
    }
}
$ciDir = Join-Path $ScriptDir "scripts" "ci"
if ((Test-Path $ciDir) -and -not (Get-ChildItem $ciDir -Force)) { Remove-Item $ciDir }

# The tenant id goes into a placeholder first, so that the name replacement below cannot touch it, and is written in
# the last step. Every place the app and the scripts read the tenant from is listed here; a missing place stops.
$TenantPlaceholder = '__INIT_TENANT_ID__'
function Set-TenantPlaceholder([string]$RelativePath, [string]$Pattern, [string]$Replacement) {
    $path = Join-Path $ScriptDir $RelativePath
    if (-not (Test-Path $path)) { throw "$RelativePath not found, the tenant id could not be set." }
    $content = [System.IO.File]::ReadAllText($path)
    $updated = $content -creplace $Pattern, $Replacement
    if ($updated -notmatch $TenantPlaceholder) { throw "No tenant id found in $RelativePath, the tenant id could not be set." }
    [System.IO.File]::WriteAllText($path, $updated)
    Write-Host "  $RelativePath"
}
Set-TenantPlaceholder 'src/custom-app/src/assets/config.json' '"tenantId": "custom-app"' "`"tenantId`": `"$TenantPlaceholder`""
Set-TenantPlaceholder 'src/charts/custom-app/values.yaml' '(?m)^(  tenantId: )"custom-app"' "`$1`"$TenantPlaceholder`""
foreach ($script in @('om_create_tenants', 'om_delete_tenants', 'om_importck', 'om_importrt', 'om_initialize_tenant', 'om_setupIdentityService_local')) {
    Set-TenantPlaceholder "scripts/$script.ps1" '\[string\]\$TenantId = "custom-app"' "[string]`$TenantId = `"$TenantPlaceholder`""
}
# The client id the same way: the app (config.json) and the script that registers the client must agree.
$ClientPlaceholder = '__INIT_CLIENT_ID__'
function Set-ClientPlaceholder([string]$RelativePath, [string]$Pattern, [string]$Replacement) {
    $path = Join-Path $ScriptDir $RelativePath
    if (-not (Test-Path $path)) { throw "$RelativePath not found, the client id could not be set." }
    $content = [System.IO.File]::ReadAllText($path)
    $updated = $content -creplace $Pattern, $Replacement
    if ($updated -notmatch $ClientPlaceholder) { throw "No client id found in $RelativePath, the client id could not be set." }
    [System.IO.File]::WriteAllText($path, $updated)
    Write-Host "  $RelativePath (client id)"
}
Set-ClientPlaceholder 'src/custom-app/src/assets/config.json' '"clientId": "custom-app-frontend-debug"' "`"clientId`": `"$ClientPlaceholder`""
Set-ClientPlaceholder 'scripts/om_setupIdentityService_local.ps1' '\[string\]\$ClientId = "custom-app-frontend-debug"' "[string]`$ClientId = `"$ClientPlaceholder`""

# --- 4. Text replacements in all files ---

Write-Host "[2/7] Replacing placeholders in files..." -ForegroundColor Green

$excludeDirs = @('.git', 'node_modules', '.angular', 'dist')
$excludeExtensions = @('.ico', '.png', '.jpg', '.woff', '.woff2')
$initScripts = @('init.ps1', 'init.sh')

$files = Get-ChildItem -Path $ScriptDir -Recurse -File -Force | Where-Object {
    $path = $_.FullName
    $excluded = $false
    foreach ($dir in $excludeDirs) {
        if ($path -match "[/\\]$([regex]::Escape($dir))[/\\]") { $excluded = $true; break }
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
        # -creplace: case sensitive, so that customApp (GraphQL fields) and CustomApp (types) differ
        $content = $content -creplace 'customApp', $CamelCase
        $content = $content -creplace 'CustomApp', "${AppName}App"
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
# In .html, .json, .md, .ts, .yaml, .yml, .csproj files revert {Name}App back to {Name}
$fixExtensions = @('.html', '.json', '.md', '.ts', '.yaml', '.yml', '.csproj')
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

Write-Host "[3/7] Renaming directories..." -ForegroundColor Green

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

$ckModelDir = Join-Path $ScriptDir "src" "CustomAppCkModel"
if (Test-Path $ckModelDir) {
    Rename-Item -Path (Join-Path $ckModelDir "CustomAppCkModel.csproj") -NewName "${AppName}CkModel.csproj"
    Rename-Item -Path $ckModelDir -NewName "${AppName}CkModel"
    Write-Host "  src/CustomAppCkModel/ -> src/${AppName}CkModel/"
}

$blueprintDir = Join-Path $ScriptDir "src" "blueprints" "CustomApp"
if (Test-Path $blueprintDir) {
    Rename-Item -Path $blueprintDir -NewName $AppName
    Write-Host "  src/blueprints/CustomApp/ -> src/blueprints/$AppName/"
}

# Write the tenant id and the client id into the places marked in step 1.
Get-ChildItem -Path $ScriptDir -Recurse -File -Force |
    Where-Object { $_.FullName -notmatch '[/\\](\.git|node_modules)[/\\]' } |
    ForEach-Object {
        $content = [System.IO.File]::ReadAllText($_.FullName)
        if ($content.Contains($TenantPlaceholder) -or $content.Contains($ClientPlaceholder)) {
            [System.IO.File]::WriteAllText($_.FullName, $content.Replace($TenantPlaceholder, $TenantId).Replace($ClientPlaceholder, $ClientId))
        }
    }

# --- 5. Language configuration ---

Write-Host "[4/7] Configuring languages..." -ForegroundColor Green

$FrontendDir = Join-Path $ScriptDir "src" $KebabCase
$ConfigFile = Join-Path $FrontendDir "src" "assets" "config.json"

$LangNames = @{
    'en-GB' = 'English'
    'de-AT' = 'Deutsch (AT)'
    'de-DE' = 'Deutsch (DE)'
    'de-CH' = 'Deutsch (CH)'
    'fr-FR' = "Fran`u{00e7}ais"
    'it-IT' = 'Italiano'
    'es-ES' = "Espa`u{00f1}ol"
    'pt-BR' = "Portugu`u{00ea}s"
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
$PlaceholderLangs = @()
foreach ($lang in $AllLangs) {
    $flag = ($lang -replace '^.*-', '').ToLower()
    $name = if ($LangNames.ContainsKey($lang)) { $LangNames[$lang] } else { $lang }
    $SupportedLanguages += @{
        cultureCode = $lang
        name        = $name
        flagIcon    = $flag
    }

    # i18n files: the template ships en-GB.json and a German translation (de-AT.json). Every other German language
    # starts from the German file, any other language from the English one; those texts are placeholders.
    $i18nDir = Join-Path $FrontendDir "src" "assets" "i18n"
    $langFile = Join-Path $i18nDir "$lang.json"
    if ($lang -ne 'en-GB' -and -not (Test-Path $langFile)) {
        if ($lang -clike 'de-*') {
            Copy-Item -Path (Join-Path $i18nDir "de-AT.json") -Destination $langFile
            Write-Host "  Created i18n file: $lang.json (German texts)"
        }
        else {
            Copy-Item -Path (Join-Path $i18nDir "en-GB.json") -Destination $langFile
            Write-Host "  Created i18n file: $lang.json with the English texts as placeholders - translate them" -ForegroundColor Yellow
            $PlaceholderLangs += $lang
        }
    }
}
if ($AllLangs -ccontains 'de-AT') { Write-Host "  i18n file de-AT.json (German texts)" }
else { Remove-Item -Path (Join-Path $FrontendDir "src" "assets" "i18n" "de-AT.json") -ErrorAction SilentlyContinue }

# Update config.json
$config = Get-Content $ConfigFile -Raw | ConvertFrom-Json
$config.defaultLanguage = $DefaultLang
$config.supportedLanguages = $SupportedLanguages
$config | ConvertTo-Json -Depth 10 | Set-Content $ConfigFile -Encoding UTF8

# Flags of the language picker in styles.scss
$StylesFile = Join-Path $FrontendDir "src" "styles.scss"
$flags = @($SupportedLanguages | ForEach-Object { $_.flagIcon } | Select-Object -Unique)
$styles = [System.IO.File]::ReadAllText($StylesFile)
$flagPattern = '(\$flag-icons-included-countries: \()[^)]*(\))'
if ($styles -notmatch $flagPattern) { throw "`$flag-icons-included-countries not found in $StylesFile" }
$flagList = "`n    " + ($flags -join ",`n    ") + ",`n  "
$styles = [regex]::new($flagPattern).Replace($styles, { param($m) $m.Groups[1].Value + $flagList + $m.Groups[2].Value }, 1)
[System.IO.File]::WriteAllText($StylesFile, $styles)


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

# --- 8. Self-destruct ---

Write-Host "[7/7] Cleaning up..." -ForegroundColor Green

Write-Host ""
Write-Host "=== Initialization complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tenant of the app: $TenantId"
Write-Host "OIDC client:       $ClientId"
if ($PlaceholderLangs.Count -gt 0) {
    Write-Host "Translate the English placeholder texts of: $($PlaceholderLangs -join ', ') (src/$KebabCase/src/assets/i18n/)" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. If step 5 could not create the certificates: pwsh scripts/generate-dev-certs.ps1 (needed by npm start)"
Write-Host "  2. cd src/$KebabCase"
Write-Host "  3. npm install"
Write-Host "  4. npm start"
Write-Host ""
Write-Host "See README.md for full documentation."

# Remove init scripts
$initSh = Join-Path $ScriptDir "init.sh"
if (Test-Path $initSh) { Remove-Item $initSh }
Remove-Item $MyInvocation.MyCommand.Path
