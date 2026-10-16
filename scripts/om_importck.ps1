param (
    # Version of the public Basic Construction Kit to import
    [string]$basicVersion = "2.5.0"
)

# Imports the public Basic Construction Kit from the public catalog into the tenant of the active
# octo-cli context (see README: log in with octo-cli first and select the tenant).
octo-cli -c ImportFromCatalog -cn PublicGitHubCatalog -m "Basic-$basicVersion" -w
