param (
    # Version of the public Basic Construction Kit to import
    [string]$basicVersion = "2.5.0"
)

# Imports the Construction Kits of the app into the tenant of the active octo-cli context (see README:
# log in with octo-cli first and select the tenant):
#   1. the public Basic Construction Kit from the public catalog,
#   2. the own model of the app (src/<App>CkModel/ConstructionKit), compiled with octo-ckc.
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

octo-cli -c ImportFromCatalog -cn PublicGitHubCatalog -m "Basic-$basicVersion" -w
if ($LASTEXITCODE -ne 0) { throw "Importing the Basic Construction Kit failed." }

$ckModelDir = Get-ChildItem -Path (Join-Path $repoRoot "src") -Directory -Filter "*CkModel" | Select-Object -First 1
if (-not $ckModelDir) { throw "No src/<App>CkModel folder found." }
$outDir = Join-Path $ckModelDir.FullName "out"

octo-ckc -c Compile -p (Join-Path $ckModelDir.FullName "ConstructionKit") -o $outDir
if ($LASTEXITCODE -ne 0) { throw "Compiling the Construction Kit of the app failed." }

$compiled = Get-ChildItem -Path $outDir -Filter "ck-*.yaml" | Select-Object -First 1
if (-not $compiled) { throw "The compiler produced no ck-*.yaml file in $outDir." }
octo-cli -c ImportCk -f $compiled.FullName -w
if ($LASTEXITCODE -ne 0) { throw "Importing the Construction Kit of the app failed." }
