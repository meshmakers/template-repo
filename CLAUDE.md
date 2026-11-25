# CustomApp - OctoMesh Custom App Template

## Project Overview

This is a template repository for building OctoMesh Custom Apps. It provides an Angular frontend that connects to OctoMesh backend services (Identity Server, Tenant API, Asset Services) via configuration.

After cloning, run `./init.sh` to customize the template for your project. As an agent (no terminal) pass every value:
`./init.sh --app-name <PascalCase|kebab-case> --tenant-id <tenant> [--client-id <id>] --lang en-GB --extra-langs de-AT --yes`
(or the `INIT_*` variables, `./init.sh --help`); it never prompts without a terminal and exits 2 on invalid input
before changing a file. A kebab-case app name (`field-inspections`) is converted to PascalCase (`FieldInspections`).
The tenant id is separate from the app name (default: kebab-case app name) and lands in `config.json`, the Helm
values and the `-TenantId` default of the scripts. The client id (default `<kebab>-frontend-debug`; on a hosted tenant
the client the tenant administrator registered) lands in `config.json` and the `-ClientId` default of
`om_setupIdentityService_local.ps1`. `de-*` languages get the German texts of `de-AT.json`, other languages a copy of
the English texts (placeholders); init adds their flags to `styles.scss`. `npm start` needs the dev certificates
(`pwsh scripts/generate-dev-certs.ps1`); without them it stops with that hint (`scripts/check-dev-certs.js`).

Template-only checks (removed by `init.sh`): `scripts/ci/check-public-files.sh` (no internal work item references or
open verification markers in this public repo), `scripts/ci/verify-template.sh` (non-interactive init of a copy,
result checks, lint/test/build of the generated app) and `scripts/tests/Init.Tests.ps1`. Never put work item IDs into
files of this repository; they belong in commit messages.

## Architecture

- **Frontend**: Standalone Angular SPA at `src/custom-app/`
- **Layout**: Kendo AppBar + Kendo Drawer (Demo-App pattern)
- **Auth**: OIDC via `angular-oauth2-oidc` + `@meshmakers/shared-auth`
- **API**: GraphQL via Apollo Angular to OctoMesh Tenant API
- **Styling**: design of the Meshmakers apps (Refinery Studio, Meshmakers App): Kendo Material theme
  (`@progress/kendo-theme-material`) + Octo tokens and component styles of `@meshmakers/octo-ui` (`styles/_index.scss`
  via `stylePreprocessorOptions.includePaths`); `ThemeService` follows the OS preference until the user toggles the
  theme (stored in localStorage) and always sets `data-theme="light"|"dark"` (the Octo token defaults alone are dark);
  Tailwind CSS 4 for layout utilities. Never add own `--kendo-color-*` values in `styles.scss`; use the `--theme-*` and
  `--octo-*` tokens.
- **Sign-in tenant**: `applyClientConfig` passes `tenantId` of `config.json` as `defaultTenantId`, so the login sends
  `acr_values=tenant:<tenantId>` and skips the tenant discovery
- **i18n**: `@ngx-translate/core` with JSON translation files
- **Deployment**: nginx Docker container, Helm charts for Kubernetes
- **Construction Kit & Blueprints**: example CK model at `src/CustomAppCkModel/`, example blueprint at `src/blueprints/CustomApp/`

## Tech Stack

- Angular 22 (standalone components, signals)
- Kendo UI for Angular 24
- Apollo GraphQL Client
- Tailwind CSS 4
- Vitest (testing, via `@angular/build:unit-test`, jsdom — no browser)
- TypeScript 6.0

## Pre-Commit Rules (CRITICAL)

- **ALWAYS write tests** for every code change (new features, bug fixes, refactoring)
- **ALWAYS run `npm run lint && npm run test:ci && npm run build:prod`** locally before committing and pushing
- This catches lint errors, test failures, and TypeScript compilation errors before CI
- Test files follow the pattern `*.spec.ts` next to the source file they test
- Unit tests only, on Vitest: extract logic out of components that render `@meshmakers/*` widgets into pure, testable units and test those first.

## Unit tests

Tests run on Vitest via the `@angular/build:unit-test` builder (jsdom, no real browser — there
is no `vitest.config.ts`; the builder takes its config from `angular.json`'s `test` target).
`npm run test:ci` writes `test-results/TESTS-junit.xml`, which the pipeline's
`PublishTestResults@2` task picks up via the `**/test-results/**/*.xml` glob for the CI Tests
tab.

## Build & Development

```bash
cd src/custom-app

# Install dependencies
npm install

# Start dev server (default: http://localhost:4200)
npm start

# Lint
npm run lint

# Run tests
npm test

# Production build
npm run build:prod

# GraphQL codegen (after adding .graphql files)
npm run codegen

# Generate the GraphQL code from the committed schema (CI, Docker; once after cloning), and its tests
npm run codegen:check && npm run test:codegen
```

## npm install-script policy

`src/custom-app/package.json` carries an `allowScripts` field approving the six dependencies that ship install scripts: `@parcel/watcher`, `@progress/kendo-licensing`, `esbuild`, `fsevents`, `lmdb` and `msgpackr-extract`. All but `@progress/kendo-licensing` (Kendo license activation) only unpack prebuilt native binaries. Entries are name-only, written by `npm approve-scripts --no-allow-scripts-pin --all` after a full install; re-run that command when a new package starts warning.

In npm 11.16 the field is advisory — an unapproved install script still runs, npm only warns. The image is unaffected either way because `src/custom-app/Dockerfile` installs with `npm ci --ignore-scripts`, so no install script runs during the Docker build and the policy is inert there.

## Key Patterns

### Standalone Components (Angular 22)
All components are standalone. No NgModules. Use `imports` array directly:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, KendoGridModule],
  templateUrl: './example.html',
})
export class ExampleComponent {}
```

### Signals
Use Angular signals for reactive state:
```typescript
readonly data = signal<MyData[]>([]);
readonly loading = signal(false);
readonly count = computed(() => this.data().length);
```

### File Naming
Short names without `.component` suffix: `home.ts`, `home.html`, `home.scss`.

### Configuration
Runtime config loaded from `/assets/config.json`. In Docker, environment variables override config via `entrypoint.sh`.

### GraphQL Codegen Workflow
1. Save the tenant schema as `schema.json` (introspection JSON of the MCP tool `export_runtime_graphql_sdl`), or set
   `OCTO_GRAPHQL_SCHEMA=<file>` for another file (e.g. an SDL `schema.graphql`); both are gitignored
2. Create `.graphql` query files in `src/app/graphQL/`
3. Run `npm run codegen`
4. Import generated services in your components

`codegen.yml` covers only `src/app/graphQL/*.graphql`; those queries must work on a fresh tenant (System CKs + Basic).
Generated types and services carry the suffix `Dto` (`typesSuffix`: `GetAssetsQueryDto`, `GetAssetsDtoGQL`).
Codegen is graphql-codegen 8: the operation files import the schema types from the generated `globalTypes.ts`
(`importSchemaTypesFrom`), every object type has a required `__typename` (`nonOptionalTypename`, the root query none:
`skipTypeNameForRoot`), all schema scalars are mapped, and `scripts/codegen-strip-incremental.mjs` (hook
`afterAllFileWrite`) removes the per-file `Incremental` type. **Generated code is not committed** (`globalTypes.ts` and
`*.generated.ts` are gitignored): `npm run codegen:check` generates `codegen.yml` and `codegen.sample.yml` against the
first schema that exists: the argument, `OCTO_GRAPHQL_SCHEMA`, the local `schema.json`, a committed
`graphql/ci.schema.json` (a partner's own model, introspection JSON), the committed `graphql/ci.schema.graphql` (fresh
tenant, the template's CI). The pipeline (`devops-build/run-tests.yml`) and the Dockerfile run it before lint, tests and
build; it fails on a query the schema cannot answer. `npm run test:codegen` tests that check. The optional sample
(items table on the home page) lives in `src/app/sample/`: its query has its own `codegen.sample.yml`
(`npm run codegen:sample`), which reads `graphql/ci.schema.graphql` plus `graphql/sample.schema.graphql`, a hand-derived
excerpt of the sample CK model (a test fails when it drifts from `src/CustomAppCkModel`; never put app types there), and
is switched on with `SAMPLE_ITEMS_ENABLED` in `src/app/sample/sample-items.config.ts` (default `false`).

Example query file (`src/app/graphQL/getAssets.graphql`):
```graphql
query GetAssets($first: Int) {
  basicAssets(first: $first) {
    edges {
      node {
        rtId
        name
      }
    }
  }
}
```

### Drawer Navigation (CommandSettingsService)
Edit `src/app/services/my-command-settings.service.ts` to add/modify navigation items:
```typescript
{
  id: 'my-page',
  type: 'link',
  text: 'My Page',
  svgIcon: myIcon,
  link: async (): Promise<string> => 'my-page',
}
```

### Adding a New Page
1. Create component in `src/app/pages/my-page/my-page.ts` (+ `.html`, `.scss`)
2. Add route in `app.routes.ts` under `:lang` children
3. Add drawer item in `my-command-settings.service.ts`
4. Add breadcrumb data to the route

### Localization
- Translation files in `src/assets/i18n/{lang}.json`
- Use `translate` pipe in templates: `{{ 'APP.TITLE' | translate }}`
- Add new languages: create JSON file + add to `config.json` supportedLanguages + add flag to `styles.scss`
  (init does all three for its `--lang`/`--extra-langs`)
- `de-AT.json` must keep exactly the keys of `en-GB.json` (`src/app/translations.spec.ts`)

### Construction Kit & Blueprints
- CK model sources: `src/CustomAppCkModel/ConstructionKit/` (`ckModel.yaml`, `types/`, `attributes/`, `enums/`)
- Blueprints: `src/blueprints/<Name>/` (`blueprint.yaml` + `seed-data/`)
- Validation and publishing come ONLY from the shared steps `templates/steps/validate-and-publish-ck-versions.yml` and
  `templates/steps/validate-and-publish-blueprints.yml` of `octo-pipeline-templates` (job `catalogs` in `devops-build/azure-pipelines.yml`,
  commented out in the template). No repo-local publish scripts, no catalog names in this repo.
- Published versions are immutable: bump `modelId` / `blueprintId` whenever the content changes
- Never publish CK models from `dotnet build` in CI — pass `/p:OctoPublishCkModel=false` if a step builds the csproj

## Project Structure

```
src/custom-app/
├── src/
│   ├── app/
│   │   ├── config/          — Auth & service options
│   │   ├── directives/      — Custom directives
│   │   ├── graphQL/         — GraphQL queries & generated code
│   │   ├── guards/          — Route guards
│   │   ├── models/          — TypeScript interfaces
│   │   ├── pages/           — Page components
│   │   ├── sample/          — Optional sample items (query, service, model; off by default)
│   │   └── services/        — Application services
│   ├── assets/
│   │   ├── config.json      — Runtime configuration
│   │   └── i18n/            — Translation files
│   ├── environments/        — Version info
│   └── testing/             — Test utilities
├── graphql/ci.schema.graphql — Fresh-tenant schema for the codegen CI check
├── graphql/sample.schema.graphql — Hand-derived excerpt of the sample CK model for codegen.sample.yml
├── codegen.yml / codegen.sample.yml
├── angular.json
├── package.json
├── Dockerfile               — nginx production image
└── nginx.conf
```

## Scripts (PowerShell)

```bash
# Import CK + sample data into an existing tenant (hosted or local); never deletes or creates
cd scripts && pwsh om_initialize_tenant.ps1 -TenantId <tenant> [-SkipSampleData]

# Local stack only: delete + create + import CK + import RT
cd scripts && pwsh om_initialize_tenant.ps1 -Recreate

# Register OIDC client for local development
cd scripts && pwsh om_setupIdentityService_local.ps1

# Tests of the scripts (Pester 5, fake octo-cli, no OctoMesh needed)
pwsh scripts/tests/Invoke-ScriptTests.ps1
```

Invariant: no script deletes or creates a tenant unless every service URL of the active octo-cli context is local
(`localhost`, loopback IP, `*.127-0-0-1.nip.io`); deleting also needs `-Recreate` (`om_delete_tenants.ps1`: `-Force`),
and `om_initialize_tenant.ps1` creates only with `-Recreate`. Every refusal happens before the first octo-cli write,
including `Config`; after `Config` the context is read again and delete/create name it with `--context`. Deleting
checks `GetTenants` first, uses `Delete --disable-features -y` and fails on error; failures pass on octo-cli's last
output line, and `om_create_tenants.ps1` does not retry a rejected login (exit code 252, an expired session,
invalid_grant, 401) or a 403 of the create (also with a named missing role or a problem code). The scripts follow only the active
context: with `OCTO_CLI_CONTEXT` set, `Config` refuses and they stop before the first write. Changes to the tenant scripts need a test in
`scripts/tests/TenantScripts.Tests.ps1`.

## Dependency pins

- Angular, Kendo UI and the other npm packages are pinned to exact versions in `src/custom-app/package.json`;
  the `@meshmakers/*` libraries are declared as `*` and resolved by `package-lock.json` to the published
  versions on the public npm registry. The Docker build can rewrite them to one version (build argument
  `OCTO_LIB_VERSION`).
- Dependabot (`.github/dependabot.yml`) proposes npm and Docker updates weekly; a maintainer of this
  repository reviews and merges them. Keep the lockfile and the Angular major in step with the published
  `@meshmakers/*` libraries, whose peer dependency decides the Angular major.
