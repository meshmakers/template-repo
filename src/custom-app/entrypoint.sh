#!/bin/sh
# Runtime configuration injection
# Environment variables override the static config.json at container startup

CONFIG_FILE="/usr/share/nginx/html/assets/config.json"

if [ -n "$CONFIG_TENANT_ID" ] || [ -n "$CONFIG_API_URL" ] || [ -n "$CONFIG_AUTHORITY_URL" ]; then
  echo "Injecting runtime configuration..."

  # Use sed to replace values in config.json from environment variables
  if [ -n "$CONFIG_TENANT_ID" ]; then
    sed -i "s|\"tenantId\":.*|\"tenantId\": \"$CONFIG_TENANT_ID\",|" "$CONFIG_FILE"
  fi
  if [ -n "$CONFIG_API_URL" ]; then
    sed -i "s|\"apiUrl\":.*|\"apiUrl\": \"$CONFIG_API_URL\",|" "$CONFIG_FILE"
  fi
  if [ -n "$CONFIG_AUTHORITY_URL" ]; then
    sed -i "s|\"authorityUrl\":.*|\"authorityUrl\": \"$CONFIG_AUTHORITY_URL\",|" "$CONFIG_FILE"
  fi
  if [ -n "$CONFIG_ASSET_SERVICES_URL" ]; then
    sed -i "s|\"assetServicesUrl\":.*|\"assetServicesUrl\": \"$CONFIG_ASSET_SERVICES_URL\",|" "$CONFIG_FILE"
  fi
  if [ -n "$CONFIG_CLIENT_ID" ]; then
    sed -i "s|\"clientId\":.*|\"clientId\": \"$CONFIG_CLIENT_ID\",|" "$CONFIG_FILE"
  fi
  if [ -n "$CONFIG_SCOPE" ]; then
    sed -i "s|\"scope\":.*|\"scope\": \"$CONFIG_SCOPE\",|" "$CONFIG_FILE"
  fi

  echo "Configuration injected successfully."
fi
