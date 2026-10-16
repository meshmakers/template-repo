# Imports the sample data of the app (the seed of the blueprint) into the tenant of the active octo-cli context.
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

$seed = Get-ChildItem -Path (Join-Path $repoRoot "src" "blueprints") -Directory |
    ForEach-Object { Join-Path $_.FullName "seed-data" "entities.yaml" } |
    Where-Object { Test-Path $_ } |
    Select-Object -First 1
if (-not $seed) { throw "No src/blueprints/<App>/seed-data/entities.yaml found." }

octo-cli -c ImportRt -f $seed -w
if ($LASTEXITCODE -ne 0) { throw "Importing the sample data failed." }
