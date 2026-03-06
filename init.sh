#!/bin/bash
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=== OctoMesh Custom App Initializer ===${NC}"
echo ""

# --- 1. Gather input ---

read -p "App Name (PascalCase, e.g. Acme): " APP_NAME
if [ -z "$APP_NAME" ]; then
  echo -e "${RED}Error: App name is required.${NC}"
  exit 1
fi

# Validate: must start with uppercase letter, alphanumeric only
if ! [[ "$APP_NAME" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
  echo -e "${RED}Error: App name must be PascalCase (start with uppercase, alphanumeric only).${NC}"
  exit 1
fi

read -p "Default Language [en-GB]: " DEFAULT_LANG
DEFAULT_LANG=${DEFAULT_LANG:-en-GB}

read -p "Additional Languages (comma-separated, e.g. de-AT,fr-FR) [none]: " ADDITIONAL_LANGS

echo ""

# --- 2. Derive naming variants ---

# kebab-case: AcmeProject -> acme-project
KEBAB_CASE=$(echo "$APP_NAME" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
# snake_case: AcmeProject -> acme_project
SNAKE_CASE=$(echo "$KEBAB_CASE" | tr '-' '_')
# lowercase: AcmeProject -> acmeproject
LOWERCASE=$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]')

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Name (PascalCase): $APP_NAME"
echo "  kebab-case:            $KEBAB_CASE"
echo "  snake_case:            $SNAKE_CASE"
echo "  Tenant ID:             $KEBAB_CASE"
echo "  Default Language:      $DEFAULT_LANG"
echo "  Additional Languages:  ${ADDITIONAL_LANGS:-none}"
echo ""
read -p "Continue? (y/N): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
  echo "Aborted."
  exit 0
fi

echo ""
echo -e "${CYAN}Starting initialization...${NC}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- 3. Text replacements in all files ---

echo -e "${GREEN}[1/6] Replacing placeholders in files...${NC}"

# Find all text files (exclude .git, node_modules, .angular, dist)
find "$SCRIPT_DIR" -type f \
  -not -path '*/.git/*' \
  -not -path '*/node_modules/*' \
  -not -path '*/.angular/*' \
  -not -path '*/dist/*' \
  -not -name 'init.sh' \
  -not -name '*.ico' \
  -not -name '*.png' \
  -not -name '*.jpg' \
  -not -name '*.woff' \
  -not -name '*.woff2' \
  | while read -r file; do
    if file "$file" | grep -q text; then
      # Order matters: longest match first
      sed -i '' \
        -e "s/CustomApp/${APP_NAME}App/g" \
        -e "s/custom-app/${KEBAB_CASE}/g" \
        -e "s/custom_app/${SNAKE_CASE}/g" \
        "$file" 2>/dev/null || true
    fi
  done

# Fix: CustomApp -> {Name}App was too aggressive for some cases
# The app.html title, index.html title, etc. should just be {AppName}
find "$SCRIPT_DIR" -type f -name '*.html' -o -name '*.json' -o -name '*.md' -o -name '*.ts' | while read -r file; do
  if [ -f "$file" ]; then
    sed -i '' "s/${APP_NAME}App/${APP_NAME}/g" "$file" 2>/dev/null || true
  fi
done

# --- 4. Rename directories ---

echo -e "${GREEN}[2/6] Renaming directories...${NC}"

if [ -d "$SCRIPT_DIR/src/custom-app" ]; then
  mv "$SCRIPT_DIR/src/custom-app" "$SCRIPT_DIR/src/${KEBAB_CASE}"
  echo "  src/custom-app/ -> src/${KEBAB_CASE}/"
fi

if [ -d "$SCRIPT_DIR/src/charts/custom-app" ]; then
  mv "$SCRIPT_DIR/src/charts/custom-app" "$SCRIPT_DIR/src/charts/${KEBAB_CASE}"
  echo "  src/charts/custom-app/ -> src/charts/${KEBAB_CASE}/"
fi

# --- 5. Language configuration ---

echo -e "${GREEN}[3/6] Configuring languages...${NC}"

FRONTEND_DIR="$SCRIPT_DIR/src/${KEBAB_CASE}"

# Update default language in config.json
if [ "$DEFAULT_LANG" != "en-GB" ]; then
  sed -i '' "s/\"defaultLanguage\": \"en-GB\"/\"defaultLanguage\": \"$DEFAULT_LANG\"/" "$FRONTEND_DIR/src/assets/config.json"
fi

# Build supported languages array
build_lang_entry() {
  local code="$1"
  local flag=""
  local name=""

  # Extract flag from culture code (last 2 chars, lowercase)
  flag=$(echo "$code" | grep -oE '[A-Z]{2}$' | tr '[:upper:]' '[:lower:]')

  case "$code" in
    en-GB) name="English" ;;
    de-AT) name="Deutsch (AT)" ;;
    de-DE) name="Deutsch (DE)" ;;
    de-CH) name="Deutsch (CH)" ;;
    fr-FR) name="Fran\u00e7ais" ;;
    it-IT) name="Italiano" ;;
    es-ES) name="Espa\u00f1ol" ;;
    pt-BR) name="Portugu\u00eas" ;;
    nl-NL) name="Nederlands" ;;
    pl-PL) name="Polski" ;;
    cs-CZ) name="Cestina" ;;
    ja-JP) name="Japanese" ;;
    zh-CN) name="Chinese" ;;
    *) name="$code" ;;
  esac

  echo "    {\"cultureCode\": \"$code\", \"name\": \"$name\", \"flagIcon\": \"$flag\"}"
}

# Build the full languages array
ALL_LANGS="$DEFAULT_LANG"
if [ -n "$ADDITIONAL_LANGS" ]; then
  ALL_LANGS="$DEFAULT_LANG,$ADDITIONAL_LANGS"
fi

# Build flag-icons list for styles.scss
FLAG_LIST=""
LANG_ENTRIES=""
IFS=',' read -ra LANG_ARRAY <<< "$ALL_LANGS"
for i in "${!LANG_ARRAY[@]}"; do
  lang=$(echo "${LANG_ARRAY[$i]}" | xargs) # trim whitespace
  entry=$(build_lang_entry "$lang")
  if [ $i -gt 0 ]; then
    LANG_ENTRIES="$LANG_ENTRIES,\n$entry"
  else
    LANG_ENTRIES="$entry"
  fi

  flag=$(echo "$lang" | grep -oE '[A-Z]{2}$' | tr '[:upper:]' '[:lower:]')
  if [ -z "$FLAG_LIST" ]; then
    FLAG_LIST="$flag"
  else
    FLAG_LIST="$FLAG_LIST $flag"
  fi

  # Create i18n JSON file for additional languages (copy from en-GB)
  if [ "$lang" != "en-GB" ] && [ ! -f "$FRONTEND_DIR/src/assets/i18n/${lang}.json" ]; then
    cp "$FRONTEND_DIR/src/assets/i18n/en-GB.json" "$FRONTEND_DIR/src/assets/i18n/${lang}.json"
    echo "  Created i18n file: ${lang}.json"
  fi
done

# Update supported languages in config.json
LANG_JSON=$(echo -e "[\n$LANG_ENTRIES\n  ]")
# Use python for reliable JSON manipulation if available
if command -v python3 &> /dev/null; then
  python3 -c "
import json, sys
with open('$FRONTEND_DIR/src/assets/config.json', 'r') as f:
    config = json.load(f)
config['defaultLanguage'] = '$DEFAULT_LANG'
config['supportedLanguages'] = []
langs = '$ALL_LANGS'.split(',')
for lang in langs:
    lang = lang.strip()
    flag = lang[-2:].lower()
    names = {'en-GB':'English','de-AT':'Deutsch (AT)','de-DE':'Deutsch (DE)','fr-FR':'Français','it-IT':'Italiano','es-ES':'Español'}
    name = names.get(lang, lang)
    config['supportedLanguages'].append({'cultureCode': lang, 'name': name, 'flagIcon': flag})
with open('$FRONTEND_DIR/src/assets/config.json', 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)
    f.write('\n')
"
fi

# Update flag-icons in styles.scss
SCSS_FLAGS=$(echo "$FLAG_LIST" | tr ' ' '\n' | sed 's/^/    /' | paste -sd ',' - | sed 's/,/,\n/g')
# Simple replacement of the flag list
sed -i '' "s/  \$fi-country-list: (/  \$fi-country-list: (/" "$FRONTEND_DIR/src/styles.scss" 2>/dev/null || true

# --- 6. Update CK import script path ---

echo -e "${GREEN}[4/6] Updating import scripts...${NC}"

# The CK import script should point to the customer's CK project if they add one
# For now, keep pointing to the standard SDK CK

# --- 7. Clean up solution file (no longer needed) ---

echo -e "${GREEN}[5/6] Cleaning up .NET artifacts...${NC}"

# Remove the old solution file if it exists
if [ -f "$SCRIPT_DIR/Octo.Template.sln" ]; then
  rm "$SCRIPT_DIR/Octo.Template.sln"
  echo "  Removed Octo.Template.sln"
fi

# Remove Directory.Build.props (not needed for frontend-only)
if [ -f "$SCRIPT_DIR/Directory.Build.props" ]; then
  rm "$SCRIPT_DIR/Directory.Build.props"
  echo "  Removed Directory.Build.props"
fi

# --- 8. Self-destruct ---

echo -e "${GREEN}[6/6] Cleaning up...${NC}"

echo ""
echo -e "${CYAN}=== Initialization complete! ===${NC}"
echo ""
echo "Next steps:"
echo "  1. cd src/${KEBAB_CASE}"
echo "  2. npm install"
echo "  3. npm start"
echo ""
echo "See README.md for full documentation."

# Remove this script
rm -- "$0"
