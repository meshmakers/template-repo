#!/bin/sh
# Runtime configuration injection
# Environment variables override the static config.json at container startup, so the same image
# can be pointed at any OctoMesh installation without a rebuild.
#
#   CONFIG_TENANT_ID, CONFIG_API_URL, CONFIG_AUTHORITY_URL, CONFIG_ASSET_SERVICES_URL,
#   CONFIG_CLIENT_ID, CONFIG_SCOPE
#
# config.json keeps one key per line ("key": value,), which this script relies on.

CONFIG_FILE="${CONFIG_FILE:-/usr/share/nginx/html/assets/config.json}"
changed=0

# set_config <json key> <value>: replaces the line of the key, escaping characters that are special
# for sed (\ & |) and for JSON strings (\ "). Stops the container start if a replacement fails.
set_config() {
  key="$1"
  value="$2"
  escaped=$(printf '%s' "$value" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' -e 's/[\\&|]/\\&/g')
  if ! sed -i "s|^\( *\)\"$key\":.*|\1\"$key\": \"$escaped\",|" "$CONFIG_FILE"; then
    echo "Failed to set '$key' in $CONFIG_FILE" >&2
    exit 1
  fi
  changed=1
}

[ -n "$CONFIG_TENANT_ID" ] && set_config tenantId "$CONFIG_TENANT_ID"
[ -n "$CONFIG_API_URL" ] && set_config apiUrl "$CONFIG_API_URL"
[ -n "$CONFIG_AUTHORITY_URL" ] && set_config authorityUrl "$CONFIG_AUTHORITY_URL"
[ -n "$CONFIG_ASSET_SERVICES_URL" ] && set_config assetServicesUrl "$CONFIG_ASSET_SERVICES_URL"
[ -n "$CONFIG_CLIENT_ID" ] && set_config clientId "$CONFIG_CLIENT_ID"
[ -n "$CONFIG_SCOPE" ] && set_config scope "$CONFIG_SCOPE"

if [ "$changed" = "1" ]; then
  echo "Runtime configuration injected into $CONFIG_FILE"
fi
exit 0
