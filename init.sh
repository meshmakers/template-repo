#!/bin/bash
# Turns the template into your app: renames the placeholders (custom-app, CustomApp, ...), sets the tenant id and the
# languages, removes the template-only files and finally this script. Run ./init.sh --help for the flags.
set -e

# Portable in-place sed: GNU sed (Linux, Git Bash) takes -i without a suffix argument, BSD sed (macOS) needs ''.
sedi() {
  if sed --version >/dev/null 2>&1; then sed -i "$@"; else sed -i '' "$@"; fi
}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

usage() {
  cat <<'EOF'
Usage: ./init.sh [options]

Turns the template into your app. Without options it asks for every value on the terminal.
Without a terminal (an AI agent, CI) it never asks: pass --app-name and --yes, everything else has a default.

Options (each option also reads the environment variable named next to it; an option wins over the variable):
  --app-name <Name>        INIT_APP_NAME      App name in PascalCase, e.g. Inspections (required)
  --tenant-id <id>         INIT_TENANT_ID     OctoMesh tenant of the app, e.g. test-ordi
                                              (default: the kebab-case app name, e.g. inspections)
  --lang <code>            INIT_DEFAULT_LANG  Default language (default: en-GB)
  --extra-langs <a,b>      INIT_EXTRA_LANGS   Additional languages, comma-separated, e.g. de-AT,fr-FR (default: none)
  --yes, -y                INIT_ASSUME_YES=1  Do not ask for confirmation (required without a terminal)
  --help, -h                                  Show this help and exit

  INIT_INTERACTIVE=1|0     Force asking (1, e.g. answers piped into stdin) or never asking (0). Default: ask only when
                           stdin is a terminal.

Language codes look like en-GB or de-AT. A tenant id uses letters, digits, '-' and '_' and starts with a letter or
digit; the system tenant octosystem is refused.

Example (no prompts):
  ./init.sh --app-name Inspections --tenant-id test-ordi --lang en-GB --extra-langs de-AT --yes

Invalid input stops the script before it changes any file (exit code 2).
EOF
}

fail() {
  echo -e "${RED}Error: $1${NC}" >&2
  echo "Nothing was changed. See ./init.sh --help" >&2
  exit 2
}

is_true() {
  case "$1" in 1|true|TRUE|True|yes|YES|Yes|y|Y) return 0 ;; *) return 1 ;; esac
}

# --- 1. Gather input ---

APP_NAME="${INIT_APP_NAME:-}"
TENANT_ID="${INIT_TENANT_ID:-}"
DEFAULT_LANG="${INIT_DEFAULT_LANG:-}"
ADDITIONAL_LANGS="${INIT_EXTRA_LANGS:-}"
EXTRA_LANGS_GIVEN=0
[ -n "${INIT_EXTRA_LANGS:-}" ] && EXTRA_LANGS_GIVEN=1
ASSUME_YES=0
is_true "${INIT_ASSUME_YES:-}" && ASSUME_YES=1

# need_value <option> <remaining argument count>: an option that takes a value must have one.
need_value() {
  if [ "$2" -lt 2 ]; then fail "$1 needs a value."; fi
}

while [ $# -gt 0 ]; do
  case "$1" in
    --app-name) need_value "$1" $#; APP_NAME="$2"; shift 2 ;;
    --app-name=*) APP_NAME="${1#*=}"; shift ;;
    --tenant-id) need_value "$1" $#; TENANT_ID="$2"; shift 2 ;;
    --tenant-id=*) TENANT_ID="${1#*=}"; shift ;;
    --lang) need_value "$1" $#; DEFAULT_LANG="$2"; shift 2 ;;
    --lang=*) DEFAULT_LANG="${1#*=}"; shift ;;
    --extra-langs) need_value "$1" $#; ADDITIONAL_LANGS="$2"; EXTRA_LANGS_GIVEN=1; shift 2 ;;
    --extra-langs=*) ADDITIONAL_LANGS="${1#*=}"; EXTRA_LANGS_GIVEN=1; shift ;;
    --yes|-y) ASSUME_YES=1; shift ;;
    --help|-h) usage; exit 0 ;;
    *) fail "unknown option '$1'." ;;
  esac
done

if [ -n "${INIT_INTERACTIVE:-}" ]; then
  if is_true "$INIT_INTERACTIVE"; then INTERACTIVE=1; else INTERACTIVE=0; fi
elif [ -t 0 ]; then
  INTERACTIVE=1
else
  INTERACTIVE=0
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${CYAN}=== OctoMesh Custom App Initializer ===${NC}"
echo ""

if [ ! -d "$SCRIPT_DIR/src/custom-app" ]; then
  fail "src/custom-app/ not found next to init.sh: the template seems to be initialized already."
fi

if [ -z "$APP_NAME" ]; then
  if [ "$INTERACTIVE" = 1 ]; then
    read -r -p "App Name (PascalCase, e.g. Acme): " APP_NAME || true
  else
    fail "the app name is required: pass --app-name <Name> or set INIT_APP_NAME (no terminal to ask)."
  fi
fi
if [ -z "$APP_NAME" ]; then
  fail "the app name is required."
fi
# Validate: must start with uppercase letter, alphanumeric only
if ! [[ "$APP_NAME" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
  fail "app name '$APP_NAME' is not PascalCase (start with an uppercase letter, letters and digits only)."
fi

# --- 2. Derive naming variants ---

# kebab-case: AcmeProject -> acme-project
KEBAB_CASE=$(echo "$APP_NAME" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
# snake_case: AcmeProject -> acme_project
SNAKE_CASE=$(echo "$KEBAB_CASE" | tr '-' '_')
# camelCase: AcmeProject -> acmeProject (GraphQL field names, for example customAppItem -> acmeItem)
CAMEL_CASE="$(echo "${APP_NAME:0:1}" | tr '[:upper:]' '[:lower:]')${APP_NAME:1}"

TENANT_SOURCE="given"
if [ -z "$TENANT_ID" ] && [ "$INTERACTIVE" = 1 ]; then
  read -r -p "Tenant ID [$KEBAB_CASE]: " TENANT_ID || true
fi
if [ -z "$TENANT_ID" ]; then
  TENANT_ID="$KEBAB_CASE"
  TENANT_SOURCE="derived from the app name"
fi
# Same rule as Assert-OctoTenantId in scripts/om_common.ps1.
if ! [[ "$TENANT_ID" =~ ^[A-Za-z0-9][A-Za-z0-9_-]{0,62}$ ]]; then
  fail "tenant id '$TENANT_ID' is invalid: use letters, digits, '-' and '_' only, starting with a letter or digit (at most 63 characters)."
fi
if [ "$(echo "$TENANT_ID" | tr '[:upper:]' '[:lower:]')" = "octosystem" ]; then
  fail "the system tenant 'octosystem' cannot be the tenant of the app."
fi

if [ -z "$DEFAULT_LANG" ] && [ "$INTERACTIVE" = 1 ]; then
  read -r -p "Default Language [en-GB]: " DEFAULT_LANG || true
fi
DEFAULT_LANG=${DEFAULT_LANG:-en-GB}

if [ "$EXTRA_LANGS_GIVEN" = 0 ] && [ "$INTERACTIVE" = 1 ]; then
  read -r -p "Additional Languages (comma-separated, e.g. de-AT,fr-FR) [none]: " ADDITIONAL_LANGS || true
fi

LANG_PATTERN='^[a-z]{2,3}-[A-Z]{2}$'
if ! [[ "$DEFAULT_LANG" =~ $LANG_PATTERN ]]; then
  fail "default language '$DEFAULT_LANG' is invalid: use a culture code such as en-GB or de-AT."
fi
# Normalise the additional languages: trim, drop empty entries and duplicates (also of the default language).
ALL_LANGS="$DEFAULT_LANG"
EXTRA_CLEAN=""
IFS=',' read -ra EXTRA_ARRAY <<< "$ADDITIONAL_LANGS"
for raw in "${EXTRA_ARRAY[@]}"; do
  lang=$(echo "$raw" | tr -d '[:space:]')
  [ -z "$lang" ] && continue
  if ! [[ "$lang" =~ $LANG_PATTERN ]]; then
    fail "additional language '$lang' is invalid: use culture codes such as de-AT,fr-FR."
  fi
  case ",$ALL_LANGS," in *",$lang,"*) continue ;; esac
  ALL_LANGS="$ALL_LANGS,$lang"
  EXTRA_CLEAN="${EXTRA_CLEAN:+$EXTRA_CLEAN,}$lang"
done
ADDITIONAL_LANGS="$EXTRA_CLEAN"

if ! command -v python3 >/dev/null 2>&1; then
  fail "python3 is required to write the language configuration (src/custom-app/src/assets/config.json)."
fi

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Name (PascalCase): $APP_NAME"
echo "  kebab-case:            $KEBAB_CASE"
echo "  snake_case:            $SNAKE_CASE"
echo "  Tenant ID:             $TENANT_ID ($TENANT_SOURCE)"
echo "  Default Language:      $DEFAULT_LANG"
echo "  Additional Languages:  ${ADDITIONAL_LANGS:-none}"
echo ""

if [ "$ASSUME_YES" != 1 ]; then
  if [ "$INTERACTIVE" != 1 ]; then
    fail "confirmation required: pass --yes or set INIT_ASSUME_YES=1 (no terminal to ask)."
  fi
  CONFIRM=""
  read -r -p "Continue? (y/N): " CONFIRM || true
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Aborted. Nothing was changed."
    exit 0
  fi
fi

echo ""
echo -e "${CYAN}Starting initialization...${NC}"

# --- 3. Remove template-only files ---

echo -e "${GREEN}[1/7] Removing template-only files...${NC}"

# Checks of the template itself (they run init.sh, which is gone afterwards).
for template_file in scripts/ci/verify-template.sh scripts/ci/check-public-files.sh scripts/tests/Init.Tests.ps1 init.ps1; do
  if [ -e "$SCRIPT_DIR/$template_file" ]; then
    rm -f "$SCRIPT_DIR/$template_file"
    echo "  Removed $template_file"
  fi
done
rmdir "$SCRIPT_DIR/scripts/ci" 2>/dev/null || true

# --- 4. Tenant id ---

echo -e "${GREEN}[2/7] Setting the tenant id...${NC}"

# The tenant id goes into a placeholder first, so that the name replacement below cannot touch it (a tenant id may
# contain custom-app or the app name), and is written in the last step. Every place the app and the scripts read the
# tenant from is listed here; a place that is missing stops the script.
TENANT_PLACEHOLDER="__INIT_TENANT_ID__"

# set_tenant <file> <sed expression>: replaces the template tenant in one line of <file> and checks that it did.
set_tenant() {
  local file="$SCRIPT_DIR/$1"
  if [ ! -f "$file" ]; then
    echo -e "${RED}Error: $1 not found, the tenant id could not be set.${NC}" >&2
    exit 1
  fi
  sedi "$2" "$file"
  if ! grep -q "$TENANT_PLACEHOLDER" "$file"; then
    echo -e "${RED}Error: no tenant id found in $1, the tenant id could not be set.${NC}" >&2
    exit 1
  fi
  echo "  $1"
}

set_tenant "src/custom-app/src/assets/config.json" "s/\"tenantId\": \"custom-app\"/\"tenantId\": \"$TENANT_PLACEHOLDER\"/"
set_tenant "src/charts/custom-app/values.yaml" "s/^\(  tenantId: \)\"custom-app\"/\1\"$TENANT_PLACEHOLDER\"/"
for script in om_create_tenants om_delete_tenants om_importck om_importrt om_initialize_tenant om_setupIdentityService_local; do
  set_tenant "scripts/$script.ps1" "s/\[string\]\$TenantId = \"custom-app\"/[string]\$TenantId = \"$TENANT_PLACEHOLDER\"/"
done

# --- 5. Text replacements in all files ---

echo -e "${GREEN}[3/7] Replacing placeholders in files...${NC}"

# Find all text files (exclude .git, node_modules, .angular, dist)
find "$SCRIPT_DIR" \( -name .git -o -name node_modules -o -name .angular -o -name dist \) -prune -o -type f \
  -not -name 'init.sh' \
  -not -name '*.ico' \
  -not -name '*.png' \
  -not -name '*.jpg' \
  -not -name '*.woff' \
  -not -name '*.woff2' \
  -print \
  | while read -r file; do
    if grep -Iq . "$file" 2>/dev/null; then
      # Order matters: longest match first
      sedi \
        -e "s/customApp/${CAMEL_CASE}/g" \
        -e "s/CustomApp/${APP_NAME}App/g" \
        -e "s/custom-app/${KEBAB_CASE}/g" \
        -e "s/custom_app/${SNAKE_CASE}/g" \
        "$file" 2>/dev/null || true
    fi
  done

# Fix: CustomApp -> {Name}App was too aggressive for some cases
# The app.html title, index.html title, etc. should just be {AppName}
find "$SCRIPT_DIR" \( -name .git -o -name node_modules -o -name .angular -o -name dist \) -prune -o -type f \
  \( -name '*.html' -o -name '*.json' -o -name '*.md' -o -name '*.ts' -o -name '*.yaml' -o -name '*.yml' -o -name '*.csproj' \) \
  -print | while read -r file; do
    sedi "s/${APP_NAME}App/${APP_NAME}/g" "$file" 2>/dev/null || true
  done

# --- 6. Rename directories ---

echo -e "${GREEN}[4/7] Renaming directories...${NC}"

if [ -d "$SCRIPT_DIR/src/custom-app" ]; then
  mv "$SCRIPT_DIR/src/custom-app" "$SCRIPT_DIR/src/${KEBAB_CASE}"
  echo "  src/custom-app/ -> src/${KEBAB_CASE}/"
fi

if [ -d "$SCRIPT_DIR/src/charts/custom-app" ]; then
  mv "$SCRIPT_DIR/src/charts/custom-app" "$SCRIPT_DIR/src/charts/${KEBAB_CASE}"
  echo "  src/charts/custom-app/ -> src/charts/${KEBAB_CASE}/"
fi

if [ -d "$SCRIPT_DIR/src/CustomAppCkModel" ]; then
  mv "$SCRIPT_DIR/src/CustomAppCkModel/CustomAppCkModel.csproj" "$SCRIPT_DIR/src/CustomAppCkModel/${APP_NAME}CkModel.csproj"
  mv "$SCRIPT_DIR/src/CustomAppCkModel" "$SCRIPT_DIR/src/${APP_NAME}CkModel"
  echo "  src/CustomAppCkModel/ -> src/${APP_NAME}CkModel/"
fi

if [ -d "$SCRIPT_DIR/src/blueprints/CustomApp" ]; then
  mv "$SCRIPT_DIR/src/blueprints/CustomApp" "$SCRIPT_DIR/src/blueprints/${APP_NAME}"
  echo "  src/blueprints/CustomApp/ -> src/blueprints/${APP_NAME}/"
fi

# Write the tenant id into the places marked in step 4.
grep -rl --exclude-dir=.git --exclude-dir=node_modules "$TENANT_PLACEHOLDER" "$SCRIPT_DIR" | while read -r file; do
  sedi "s/$TENANT_PLACEHOLDER/$TENANT_ID/g" "$file"
done

# --- 7. Language configuration ---

echo -e "${GREEN}[5/7] Configuring languages...${NC}"

FRONTEND_DIR="$SCRIPT_DIR/src/${KEBAB_CASE}"

# Create i18n JSON files for the languages other than en-GB (copies of en-GB)
IFS=',' read -ra LANG_ARRAY <<< "$ALL_LANGS"
for lang in "${LANG_ARRAY[@]}"; do
  if [ "$lang" != "en-GB" ] && [ ! -f "$FRONTEND_DIR/src/assets/i18n/${lang}.json" ]; then
    cp "$FRONTEND_DIR/src/assets/i18n/en-GB.json" "$FRONTEND_DIR/src/assets/i18n/${lang}.json"
    echo "  Created i18n file: ${lang}.json"
  fi
done

# Default and supported languages in config.json. The values go in through the environment, never into the code.
INIT_CONFIG_FILE="$FRONTEND_DIR/src/assets/config.json" INIT_ALL_LANGS="$ALL_LANGS" python3 - <<'PY'
import json, os
path = os.environ['INIT_CONFIG_FILE']
langs = os.environ['INIT_ALL_LANGS'].split(',')
names = {'en-GB': 'English', 'de-AT': 'Deutsch (AT)', 'de-DE': 'Deutsch (DE)', 'de-CH': 'Deutsch (CH)',
         'fr-FR': 'Français', 'it-IT': 'Italiano', 'es-ES': 'Español', 'pt-BR': 'Português',
         'nl-NL': 'Nederlands', 'pl-PL': 'Polski', 'cs-CZ': 'Čeština', 'ja-JP': 'Japanese', 'zh-CN': 'Chinese'}
with open(path, 'r', encoding='utf-8') as f:
    config = json.load(f)
config['defaultLanguage'] = langs[0]
config['supportedLanguages'] = [
    {'cultureCode': lang, 'name': names.get(lang, lang), 'flagIcon': lang[-2:].lower()} for lang in langs
]
with open(path, 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)
    f.write('\n')
PY

# --- 8. Clean up solution file (no longer needed) ---

echo -e "${GREEN}[6/7] Cleaning up .NET artifacts...${NC}"

if [ -f "$SCRIPT_DIR/Octo.Template.sln" ]; then
  rm "$SCRIPT_DIR/Octo.Template.sln"
  echo "  Removed Octo.Template.sln"
fi

# --- 9. Self-destruct ---

echo -e "${GREEN}[7/7] Cleaning up...${NC}"

echo ""
echo -e "${CYAN}=== Initialization complete! ===${NC}"
echo ""
echo "Tenant of the app: $TENANT_ID"
echo ""
echo "Next steps:"
echo "  1. cd src/${KEBAB_CASE}"
echo "  2. npm install"
echo "  3. npm start"
echo ""
echo "See README.md for full documentation."

# Remove this script
rm -- "$0"
