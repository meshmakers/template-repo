param (
    [string]$configuration = "Release"
)

$basePath = Join-Path $ROOTPATH main octo-construction-kit

if (!(Test-Path -Path $basePath/src/ConstructionKits/Octo.Sdk.Packages.Basic/bin/$configuration/net9.0/octo-ck-libraries/Octo.Sdk.Packages.Basic/out/ck-basic.yaml)) {
    Write-Host "Octo.Sdk.Packages.Basic Construction Kit not found at $PSScriptRoot/../ConstructionKits/Octo.Sdk.Packages.Basic/bin/$configuration/net9.0/octo-ck-libraries/Octo.Sdk.Packages.Basic/out/ck-basic.yaml"
    exit 1
}


octo-cli -c importck -f $basePath/src/ConstructionKits/Octo.Sdk.Packages.Basic/bin/$configuration/net9.0/octo-ck-libraries/Octo.Sdk.Packages.Basic/out/ck-basic.yaml -w
