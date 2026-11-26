#!/bin/bash
# Template check: initialises a copy of this repository the way an AI agent or CI does (init.sh without a terminal,
# app name and a separate tenant id), checks the result and runs build, lint and tests of the generated app.
#
# Usage: scripts/ci/verify-template.sh [--skip-app] [--keep] [--work-dir <dir>]
#   --skip-app        only init and the result checks, no npm install/lint/test/build
#   --keep            keep the generated copy (its path is printed)
#   --work-dir <dir>  create the copy below <dir> (default: a new temporary directory)
#
# Steps: 1. public file check (check-public-files.sh) of this checkout
#        2. copy of the checkout (tracked and new, not ignored files), init.sh --app-name Inspections
#           --tenant-id test-ordi --lang en-GB --extra-langs de-AT --yes with stdin from /dev/null
#        3. result checks: no template name left (custom-app, customApp, CustomApp, custom_app), the tenant id and the
#           default client id in every place the app and the scripts read them, languages (German de-AT texts,
#           flags), template-only files removed
#        4. tests of the tenant scripts (Pester) in the copy, when pwsh is installed
#        5. in the generated app: npm ci, codegen + test:codegen, lint, test:ci, production build
#           (npm run build:prod with TELERIK_LICENSE set; without it ng build --configuration production)
#        6. design of the built app: Kendo theme rules (.k-) and the Octo tokens of @meshmakers/octo-ui in the styles
# Needs bash, git, python3, node/npm (step 5) and network access to the npm registry. Exits non-zero on the first
# failure. The checkout itself is never changed. Removed by init.sh.
set -euo pipefail

APP_NAME="Inspections"
KEBAB="inspections"
TENANT_ID="test-ordi"
CLIENT_ID="inspections-frontend-debug"
SKIP_APP=0
KEEP=0
WORK_PARENT=""

while [ $# -gt 0 ]; do
  case "$1" in
    --skip-app) SKIP_APP=1; shift ;;
    --keep) KEEP=1; shift ;;
    --work-dir) WORK_PARENT="${2:?--work-dir needs a directory}"; shift 2 ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Unknown option '$1'" >&2; exit 2 ;;
  esac
done

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
if [ -n "$WORK_PARENT" ]; then
  mkdir -p "$WORK_PARENT"
  WORK="$(mktemp -d "$WORK_PARENT/verify-template.XXXXXX")"
else
  WORK="$(mktemp -d "${TMPDIR:-/tmp}/verify-template.XXXXXX")"
fi
COPY="$WORK/repo"

cleanup() {
  if [ "$KEEP" = 1 ]; then echo "Generated copy kept: $COPY"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

step() { echo ""; echo "=== $* ==="; }
failures=0
check() {
  # check <description> <command...>: runs the command, counts a failure instead of stopping.
  local description="$1"; shift
  if "$@"; then echo "  ok   $description"; else echo "  FAIL $description"; failures=$((failures + 1)); fi
}

step "1. Public file check"
bash "$REPO/scripts/ci/check-public-files.sh" "$REPO"

step "2. Copy and init.sh without a terminal"
mkdir -p "$COPY"
if git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  (cd "$REPO" && git ls-files -z --cached --others --exclude-standard) | while IFS= read -r -d '' file; do
    [ -f "$REPO/$file" ] || continue
    mkdir -p "$COPY/$(dirname "$file")"
    cp -p "$REPO/$file" "$COPY/$file"
  done
else
  (cd "$REPO" && tar --exclude=./.git --exclude=node_modules --exclude=.angular --exclude=dist -cf - .) | (cd "$COPY" && tar -xf -)
fi
# No INIT_* variable of the caller may change the run.
env -u INIT_APP_NAME -u INIT_TENANT_ID -u INIT_CLIENT_ID -u INIT_DEFAULT_LANG -u INIT_EXTRA_LANGS -u INIT_ASSUME_YES -u INIT_INTERACTIVE \
  bash "$COPY/init.sh" --app-name "$APP_NAME" --tenant-id "$TENANT_ID" --lang en-GB --extra-langs de-AT --yes </dev/null

step "3. Result checks"
APP="$COPY/src/$KEBAB"
leftovers=$(grep -rnI --exclude-dir=.git --exclude-dir=node_modules -e 'custom-app' -e 'customApp' -e 'CustomApp' -e 'custom_app' "$COPY" || true)
if [ -n "$leftovers" ]; then echo "$leftovers" | head -20; fi
check "no template name left (custom-app, customApp, CustomApp, custom_app)" test -z "$leftovers"
check "app folder src/$KEBAB" test -d "$APP"
check "chart folder src/charts/$KEBAB" test -d "$COPY/src/charts/$KEBAB"
check "config.json tenantId is $TENANT_ID" grep -q "^  \"tenantId\": \"$TENANT_ID\",\$" "$APP/src/assets/config.json"
check "chart values config.tenantId is $TENANT_ID" grep -q "^  tenantId: \"$TENANT_ID\"\$" "$COPY/src/charts/$KEBAB/values.yaml"
for script in om_create_tenants om_delete_tenants om_importck om_importrt om_initialize_tenant om_setupIdentityService_local; do
  check "scripts/$script.ps1 default -TenantId $TENANT_ID" grep -q "\[string\]\$TenantId = \"$TENANT_ID\"" "$COPY/scripts/$script.ps1"
done
tenant_lines=$(grep -rnI --exclude-dir=.git --exclude-dir=node_modules -e "TenantId = \"$KEBAB\"" -e "tenantId\": \"$KEBAB\"" -e "tenantId: \"$KEBAB\"" "$COPY" || true)
if [ -n "$tenant_lines" ]; then echo "$tenant_lines" | head -20; fi
check "no tenant reference derived from the app name ($KEBAB)" test -z "$tenant_lines"
check "no init placeholder left" bash -c "! grep -rqIE --exclude-dir=.git --exclude-dir=node_modules '__INIT_(TENANT|CLIENT)_ID__' '$COPY'"
check "config.json clientId is $CLIENT_ID" grep -q "^  \"clientId\": \"$CLIENT_ID\",\$" "$APP/src/assets/config.json"
check "om_setupIdentityService_local.ps1 default -ClientId $CLIENT_ID" grep -q "\[string\]\$ClientId = \"$CLIENT_ID\"" "$COPY/scripts/om_setupIdentityService_local.ps1"
check "languages en-GB (default) and de-AT in config.json" python3 -c "
import json, sys
c = json.load(open(sys.argv[1], encoding='utf-8'))
assert c['defaultLanguage'] == 'en-GB', c['defaultLanguage']
assert [l['cultureCode'] for l in c['supportedLanguages']] == ['en-GB', 'de-AT'], c['supportedLanguages']
" "$APP/src/assets/config.json"
check "i18n file de-AT.json" test -f "$APP/src/assets/i18n/de-AT.json"
check "de-AT.json holds German texts, not the English copy" python3 -c "
import json, sys
de = json.load(open(sys.argv[1], encoding='utf-8'))
en = json.load(open(sys.argv[2], encoding='utf-8'))
assert de['APP']['HOME'] == 'Startseite', de['APP']['HOME']
assert de['COMMON']['CANCEL'] != en['COMMON']['CANCEL']
" "$APP/src/assets/i18n/de-AT.json" "$APP/src/assets/i18n/en-GB.json"
check "flags gb and at in styles.scss" python3 -c "
import re, sys
styles = open(sys.argv[1], encoding='utf-8').read()
m = re.search(r'\\\$flag-icons-included-countries: \(([^)]*)\)', styles)
assert m, 'flag list not found'
flags = [f.strip() for f in m.group(1).split(',') if f.strip()]
assert flags == ['gb', 'at'], flags
" "$APP/src/styles.scss"
for removed in init.sh init.ps1 scripts/ci scripts/tests/Init.Tests.ps1 Octo.Template.sln; do
  check "template-only $removed removed" test ! -e "$COPY/$removed"
done
if [ "$failures" -gt 0 ]; then
  echo "Result checks failed: $failures" >&2
  exit 1
fi

step "4. Tests of the tenant scripts in the copy"
if command -v pwsh >/dev/null 2>&1; then
  pwsh -NoProfile -File "$COPY/scripts/tests/Invoke-ScriptTests.ps1"
else
  echo "  skipped: pwsh is not installed"
fi

if [ "$SKIP_APP" = 1 ]; then
  echo ""
  echo "Template verification passed (app build skipped)."
  exit 0
fi

step "5. Build, lint and tests of the generated app"
cd "$APP"
npm ci
npm run codegen
npm run test:codegen
npm run lint
npm run test:ci
if [ -n "${TELERIK_LICENSE:-}" ]; then
  npm run build:prod
else
  echo "TELERIK_LICENSE is not set: production build without licence activation (ng build --configuration production)."
  npx ng build --configuration production
fi

step "6. Design of the built app"
styles_css=$(ls "$APP/dist/$KEBAB/browser/"styles-*.css 2>/dev/null | head -1 || true)
check "built styles file" test -n "$styles_css"
if [ -n "$styles_css" ]; then
  # The Kendo theme: without it every Kendo component renders unstyled.
  kendo_rules=$( (grep -o "\.k-[a-z]" "$styles_css" || true) | wc -l | tr -d " ")
  echo "  Kendo rules (.k-) in $(basename "$styles_css"): $kendo_rules"
  check "Kendo theme rules (.k-) in the built styles" test "$kendo_rules" -gt 1000
  # The Octo tokens of @meshmakers/octo-ui (design of the Meshmakers apps), with the light theme.
  for token in --octo-mint --theme-bg-app --theme-text-primary; do
    check "Octo token $token in the built styles" grep -q -- "$token:" "$styles_css"
  done
  check "light theme block [data-theme=light] in the built styles" grep -qE 'data-theme="?light"?\]' "$styles_css"
fi
if [ "$failures" -gt 0 ]; then
  echo "Design checks failed: $failures" >&2
  exit 1
fi

echo ""
echo "Template verification passed."
