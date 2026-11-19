# Runs the Pester tests of the tenant scripts (scripts/tests/*.Tests.ps1) against a fake octo-cli; no OctoMesh is
# contacted. Installs Pester 5 for the current user when no Pester 5 or newer is available (CI agents).
# Writes NUnit XML to the path in -ResultPath when given. Exits non-zero when a test fails.
param(
    [string]$ResultPath
)
$ErrorActionPreference = "Stop"

$pester = Get-Module -ListAvailable -Name Pester | Where-Object { $_.Version.Major -ge 5 } |
    Sort-Object Version -Descending | Select-Object -First 1
if (-not $pester) {
    Write-Host "Installing Pester 5 for the current user..."
    Install-Module -Name Pester -MinimumVersion 5.5.0 -MaximumVersion 5.99.99 -Scope CurrentUser -Force -SkipPublisherCheck
    $pester = Get-Module -ListAvailable -Name Pester | Where-Object { $_.Version.Major -ge 5 } |
        Sort-Object Version -Descending | Select-Object -First 1
}
Import-Module $pester.Path -Force

$config = New-PesterConfiguration
$config.Run.Path = $PSScriptRoot
$config.Run.Exit = $true
$config.Output.Verbosity = "Normal"
if ($ResultPath) {
    $config.TestResult.Enabled = $true
    $config.TestResult.OutputFormat = "NUnitXml"
    $config.TestResult.OutputPath = $ResultPath
}
Invoke-Pester -Configuration $config
