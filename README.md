# CustomApp - OctoMesh Custom App Template

Template repository for building OctoMesh Custom Apps with Angular frontend, Kendo UI, and GraphQL.

## Quick Start

### 1. Clone & Initialize

```bash
git clone <this-repo-url> my-app
cd my-app
./init.sh
```

On a terminal the init script asks for:
- **App Name** in PascalCase (`FieldInspections`) or kebab-case (`field-inspections`, converted to `FieldInspections`) -
  used for naming throughout the project
- **Tenant ID** - the OctoMesh tenant the app and the scripts work in (default: the kebab-case app name, e.g. `acme`)
- **Default Language** (default: `en-GB`)
- **Additional Languages** (optional, comma-separated)

**Without prompts** (an AI agent, CI, a hosted tenant whose id is not the app name), pass the values as options:

```bash
./init.sh --app-name Inspections --tenant-id test-ordi --lang en-GB --extra-langs de-AT --yes
```

| Option | Environment variable | Meaning |
|---|---|---|
| `--app-name <Name>` | `INIT_APP_NAME` | App name in PascalCase or kebab-case (required) |
| `--tenant-id <id>` | `INIT_TENANT_ID` | Tenant of the app (default: the kebab-case app name; the script prints the value it uses) |
| `--client-id <id>` | `INIT_CLIENT_ID` | OIDC client the app signs in with (default: `<kebab-case app name>-frontend-debug`, see [Hosted tenant](#hosted-tenant-partner)) |
| `--lang <code>` | `INIT_DEFAULT_LANG` | Default language (default: `en-GB`) |
| `--extra-langs <a,b>` | `INIT_EXTRA_LANGS` | Additional languages (default: none) |
| `--yes`, `-y` | `INIT_ASSUME_YES=1` | No confirmation question |
| | `INIT_INTERACTIVE=1` or `0` | Ask (`1`) or never ask (`0`); default: ask only when stdin is a terminal |

Without a terminal the script never asks: `--app-name` and `--yes` are required, the rest has defaults. The client id
is never asked for; pass `--client-id` when it is not the default. Invalid input (an app name that is neither
PascalCase nor kebab-case, an invalid tenant id, client id or language code, a missing required option) stops it with
exit code 2 before it changes any file. `./init.sh --help` lists all options. The tenant id goes into
`src/<app>/src/assets/config.json`, the Helm values (`config.tenantId`) and the default `-TenantId` of every script in
`scripts/`; the client id goes into `config.json` (`clientId`) and the default `-ClientId` of
`scripts/om_setupIdentityService_local.ps1`. On Windows without bash, `init.ps1` takes the same values (`-AppName`,
`-TenantId`, `-ClientId`, `-Lang`, `-ExtraLangs`, `-Yes`) and also creates the dev certificates (step 2 below).

**Languages**: English (`en-GB`) and German (`de-AT`; `de-DE`, `de-CH` and other `de-*` codes get a copy of it) come
with translated texts. Any other language starts as a copy of the English texts: init prints which files hold these
placeholders, translate them in `src/<app>/src/assets/i18n/<code>.json`. init also adds the flags of your languages to
the language picker (`$flag-icons-included-countries` in `src/<app>/src/styles.scss`).

### 2. Create the dev certificates

`npm start` serves the app over https on `https://localhost:4300` and needs a certificate (`localhost.crt` and
`localhost.key` in `src/<app>/`, set in `angular.json`). Create it once, from the repository root, with PowerShell 7
and openssl:

```bash
pwsh scripts/generate-dev-certs.ps1          # localhost.crt, localhost.key and ca.crt in src/<app>/
pwsh scripts/generate-dev-certs.ps1 -Trust   # the same, and trusts the CA so the browser shows no warning
```

Without the files `npm start` stops at once and prints these commands. The files are gitignored; never commit them.

### 3. Install & Run

```bash
cd src/<your-app-name>/
npm install
npm start   # generates the GraphQL code first
```

See **Local Development** below for the tenant, the configuration and the Telerik licence the dev server needs.

The app uses the design of the Meshmakers apps (Refinery Studio, Meshmakers App): the Kendo Material theme with the
Octo tokens and component styles of `@meshmakers/octo-ui` (`src/<app>/src/styles.scss`). The light or dark
theme follows the setting of the operating system until the user switches it with the toggle in the app bar; the
app remembers that choice in the browser. Change colours through the `--theme-*` and `--octo-*` tokens, not with own
`--kendo-color-*` values.

## Prerequisites

- **The Node.js version in `.nvmrc`**, npm comes with it; with [nvm](https://github.com/nvm-sh/nvm) run `nvm use`
  (or `nvm install`) in the repository root
- **A running OctoMesh stack.** The easiest is the local kind stack of
  [meshmakers/getting-started](https://github.com/meshmakers/getting-started) (OctoMesh 3.5.23 or newer);
  its services are reached at `https://identity.127-0-0-1.nip.io`, `https://assets.127-0-0-1.nip.io` and so on
- **octo-cli 3.5.0 or newer**, logged in to that stack (`om-login-local.ps1` of getting-started does this)
- **PowerShell 7.4+** for the `scripts/om_*.ps1` helpers
- **Your own Telerik licence for Kendo UI for Angular.** The app uses Kendo UI, a commercial component library, and
  `npm start` and `npm run build:prod` stop without a licence. We do not provide a key. Telerik offers a
  [free 30-day trial](https://www.telerik.com/try/kendo-angular-ui) (no credit card needed); with a trial or a
  purchased licence you download your licence key on the
  [License Keys page](https://www.telerik.com/account/your-licenses/license-keys) of your Telerik account (see
  the [Telerik licensing documentation](https://www.telerik.com/kendo-angular-ui/components/my-license/)). Set the
  licence text in the environment variable `TELERIK_LICENSE` of your shell before you start or build the app; the
  build then activates it. Never commit the key.

No Duende or AutoMapper licence is needed with OctoMesh 3.5.23 or newer.

## Local Development

### 1. Set up the tenant

`scripts/om_initialize_tenant.ps1` imports what the app needs into a tenant: the public Basic Construction Kit, the
own model of the app (`src/<App>CkModel`, compiled with `octo-ckc`, see
[Start creating libraries](https://docs.meshmakers.cloud/docs/technologyGuide/constructionKits/createConstructionKitLibrary#install-the-compiler))
and, unless you pass `-SkipSampleData`, the sample data of the blueprint (`src/blueprints/<App>/seed-data/entities.yaml`,
one item). All scripts take `-TenantId` (default: the tenant id you gave `init.sh`) and print the octo-cli context,
its service URLs and the tenant before they write anything.

**By default the script never deletes or creates a tenant.** Only `-Recreate` does, and only on a local stack: the
scripts check every service URL of the active octo-cli context and refuse (non-zero exit, nothing changed) unless all
of them are `localhost`, a loopback address such as `127.0.0.1`, or a host below `127-0-0-1.nip.io`. The name of the
context does not count. `om_delete_tenants.ps1` follows the same rule and also needs `-Force`; it switches off the
capabilities of the tenant (Communication, Stream Data, …) before it deletes it, skips a tenant that does not exist and
stops when the delete fails. A login without the rights of the system tenant (for example a tenant-admin client of
a hosted tenant) makes `-Recreate`, `om_delete_tenants.ps1` and `om_create_tenants.ps1` stop at once with octo-cli's
own reason ("No token for tenant 'octosystem' was issued …", an expired session, "Authorization failed", a missing
role); only transient errors of the create are retried.

The scripts work on the **active** octo-cli context and point it at the tenant (`octo-cli -c Config`). `--context` and
`OCTO_CLI_CONTEXT` do not select another context for them: with `OCTO_CLI_CONTEXT` set they stop before the first write.

#### Local stack (getting-started)

Log in with octo-cli as an administrator of the **system tenant** (`octosystem`) of your local stack, because
`-Recreate` creates the tenant below it: `pwsh om-login-local.ps1 -tenantId octosystem` of getting-started does this
and makes that context the active one (without `-tenantId` it logs in to `meshtest`). Then run the scripts from the
`scripts` folder:

```bash
cd scripts
pwsh om_initialize_tenant.ps1 -Recreate  # delete + create the tenant, import the Construction Kits and the sample item
pwsh om_setupIdentityService_local.ps1   # register the OIDC client of the dev server in the new tenant
pwsh generate-dev-certs.ps1              # certificate for the https dev server on port 4300
```

`-Recreate` deletes the tenant if it exists (deleting finishes in the background and can take a minute or two, the
script waits), creates it, provisions your user as its admin and enables communication and stream data before the
imports. Run `om_setupIdentityService_local.ps1` **after** it: the client belongs to the tenant, so recreating the
tenant deletes it. To import again into the existing local tenant, run the script without `-Recreate`.

#### Hosted tenant (partner)

On a hosted OctoMesh (for example a staging cluster run by Meshmakers) the tenant already exists and you log in as an
administrator of **that tenant**; you need no system-tenant rights. The tenant user needs the role
`DataModelManagement` for the Construction Kit imports. Initialise the template with the id of that tenant
(`./init.sh --tenant-id <your-tenant> …`, so the app and the scripts use it), point octo-cli at the stack and your
tenant, log in, and run the script **without** `-Recreate`:

```bash
octo-cli -c Config -isu <identity-url> -asu <asset-url> -tid <your-tenant>
octo-cli -c LogIn -i
cd scripts
pwsh om_initialize_tenant.ps1 -TenantId <your-tenant>                   # Construction Kits + sample item
pwsh om_initialize_tenant.ps1 -TenantId <your-tenant> -SkipSampleData   # Construction Kits only
```

Nothing is deleted or created, and communication and stream data are left as they are. The sample data is imported
as new entities: a second run fails on the existing `Example Item`, so pass `-SkipSampleData` then.

With an AI agent and the OctoMesh MCP server of your tenant you can do the same without the script:

| Step | Script (octo-cli) | MCP tool |
|---|---|---|
| Basic Construction Kit | `octo-cli -c ImportFromCatalog -cn PublicGitHubCatalog -m Basic-2.5.0 -w` | `import_ck_from_catalog` (catalog `PublicGitHubCatalog`, model `Basic-2.5.0`) |
| Model of the app | `octo-ckc -c Compile …`, then `octo-cli -c ImportCk -f <compiled ck yaml> -w` | compile with `octo-ckc`, then `prepare_file_upload` and `import_ck_model` with the compiled `ck-<model>-<major>.yaml` |
| Sample data (optional) | `octo-cli -c ImportRt -f src/blueprints/<App>/seed-data/entities.yaml -w` | `prepare_file_upload` and `import_runtime_model` (strategy `InsertOnly`) with `entities.yaml` |

**The OIDC client on a hosted tenant.** The app signs in with the client in `clientId` of `config.json`. By default
that is `<app>-frontend-debug`, the client `om_setupIdentityService_local.ps1` registers for
`https://localhost:4300/`; run it against your tenant (it only adds the client, and needs the right to manage clients
there):

```bash
cd scripts
pwsh om_setupIdentityService_local.ps1 -TenantId <your-tenant>
```

When your tenant administrator registered the client for you instead (with redirect URI `https://localhost:4300/` and
the scopes `octo_api` and `offline_access`), pass its id to `init.sh`, so the app and the script use it:
`./init.sh --app-name <App> --tenant-id <your-tenant> --client-id <their-client-id> --yes`. In an app that is
initialised already, set `clientId` in `src/<app>/src/assets/config.json` and pass `-ClientId <id>` to the script.
A client id that the tenant does not know ends the sign-in with an "invalid_client" or "unknown client" page of the
identity service.

The app sends the tenant id of `config.json` with the sign-in (`acr_values=tenant:<tenant>`), so the identity
service opens the login page of your tenant directly and does not ask for the tenant first.

Before `npm start`, create the dev certificates (`pwsh scripts/generate-dev-certs.ps1`, see
[Quick Start](#2-create-the-dev-certificates)); the hosted tenant does not change that.

### 2. Configure

Edit `src/<your-app>/src/assets/config.json`. For the getting-started stack:

```json
{
  "tenantId": "<your-app-tenant>",
  "apiUrl": "https://assets.127-0-0-1.nip.io",
  "authorityUrl": "https://identity.127-0-0-1.nip.io/",
  "assetServicesUrl": "https://assets.127-0-0-1.nip.io",
  "clientId": "<your-app>-frontend-debug",
  "scope": "openid profile octo_api offline_access"
}
```

For a **hosted tenant** use the URLs of that OctoMesh installation (ask its operator; they are the identity and
asset URLs you gave `octo-cli -c Config`), your tenant id and the client id from [Hosted tenant](#hosted-tenant-partner):

```json
{
  "tenantId": "<your-tenant>",
  "apiUrl": "https://<asset-host>",
  "authorityUrl": "https://<identity-host>/",
  "assetServicesUrl": "https://<asset-host>",
  "clientId": "<your-client-id>",
  "scope": "openid profile octo_api offline_access"
}
```

The dev server still runs on `https://localhost:4300`, so the client needs that redirect URI.

| Key | Meaning |
|---|---|
| `tenantId` | The tenant the app works in; GraphQL is called at `<apiUrl>/tenants/<tenantId>/graphQL` |
| `apiUrl` | Base URL of the asset repository (tenant API) |
| `authorityUrl` | Identity service that issues the tokens (OIDC authority) |
| `assetServicesUrl` | Base URL of the asset services (files and similar) |
| `clientId` | OIDC client the app signs in with: `init.sh --client-id`, by default the client `om_setupIdentityService_local.ps1` registers (`custom-app-frontend-debug` in the template) |
| `scope` | Requested scopes; `octo_api` gives access to the OctoMesh APIs |

On a developer stack of OctoMesh itself the URLs are `https://localhost:5001`, `https://localhost:5003/` and
`https://localhost:5005` instead.

Your browser has to trust the local root CA of the stack, otherwise the sign-in fails with a certificate error;
`om-install.ps1` of getting-started installs it unless you used `-SkipTrustCa`.

### 3. Develop

```bash
cd src/<your-app>
npm install
npm start       # https dev server at https://localhost:4300 with hot reload
npm run lint    # Check code quality
npm test        # Run unit tests
npm run build   # Production build
```
### 4. What you see

After sign-in the home page shows a welcome text. The **sample items table** is off by default, because it reads the
type of the sample Construction Kit model (`src/<App>CkModel`), which a fresh tenant does not have; the page then
says how to turn it on.

With the sample on (see [Generate the GraphQL types](#5-generate-the-graphql-types), case "With the sample model")
the home page shows the items of your tenant as a table (name, code, quantity, status). With the sample data you see
one row, `Example Item` (`ITEM-0001`, quantity 1, status Active). While the data loads the page says so, a tenant
without items shows a hint to import the sample data, and a failed query shows an error with a **Retry** button.

Everything of the sample lives in `src/<app>/src/app/sample/`. To drop it, delete that folder and its use in
`src/<app>/src/app/pages/home/`.

### 5. Generate the GraphQL types

The GraphQL code is generated, not committed: `globalTypes.ts` and one `*.generated.ts` per query are ignored by git.
`npm run codegen` in `src/<app>` generates them; `npm start`, `npm test`, `npm run lint` and the builds run it first, the
pipeline runs it after `npm ci`, and the Docker build runs it through `npm run build:prod`. A query the schema cannot
answer fails it.

**Schema.** `codegen.yml` reads the first that exists: the file in `OCTO_GRAPHQL_SCHEMA`; `src/<app>/schema.json`, the
export of your own tenant (with your AI agent, the MCP tool `export_runtime_graphql_sdl` returns it; gitignored);
`src/<app>/graphql/ci.schema.json`, an export you commit for CI; `src/<app>/graphql/ci.schema.graphql`, the committed
schema of a fresh tenant (only the System Construction Kits and Basic). SDL and introspection JSON both work. Your own
queries go into `src/<app>/src/app/graphQL/`. As soon as they use your own CK model, commit your tenant's export as
`graphql/ci.schema.json`, or the pipeline cannot generate them; refresh it the same way when the model changes. Keep
`graphql/ci.schema.graphql`: the tests use it as the fresh tenant schema.

**The sample** (`src/<app>/src/app/sample/`) has its own config, `codegen.sample.yml`, which `npm run codegen` runs
too. It reads `graphql/ci.schema.graphql` plus `graphql/sample.schema.graphql`, a small hand-derived excerpt of the
sample CK model, so it generates the same code everywhere. To show the items on the home page, import the sample CK
model into your tenant (the tenant script does that, see [Set up the tenant](#1-set-up-the-tenant)) and set
`SAMPLE_ITEMS_ENABLED` to `true` in `src/<app>/src/app/sample/sample-items.config.ts`. When you change the sample query
or the sample CK model, update the excerpt; `npm run test:codegen` fails when it no longer matches the CK model. Never
add your own types to it.

**Removing the sample**: delete `src/<app>/src/app/sample/` and its use in the home page, `codegen.sample.yml`,
`graphql/sample.schema.graphql`, the `codegen.sample.yml` entry of `CODEGEN_CONFIGS` in `scripts/codegen.js`, and the
sample tests in `scripts/codegen.test.js` (the ones that name the sample, `codegen.sample.yml` or the sample schema
excerpt). When you replace the sample type `Item` of the CK model with your own types, do the same: the excerpt test
needs `Item` and `ItemStatus`.

Generated types and services end in `Dto` (a query `GetAssets` gives `GetAssetsQueryDto` and the service
`GetAssetsDtoGQL`), ids are `string`, and every object type carries a required `__typename` (the root query type
none), so test fixtures of a query result name it. `npm run test:codegen` tests the codegen driver and the sample
excerpt (and the certificate check of `npm start`).

## Project Structure

```
.
├── src/
│   ├── custom-app/           — Angular frontend
│   │   ├── src/app/          — Application code
│   │   ├── Dockerfile        — nginx production image
│   │   └── package.json
│   ├── charts/custom-app/    — Helm charts for Kubernetes
│   ├── CustomAppCkModel/     — Example Construction Kit model (ConstructionKit/ + .csproj)
│   └── blueprints/CustomApp/ — Example blueprint seeding the CK model
├── scripts/                  — Tenant management scripts (tests in scripts/tests/)
│   └── ci/                   — Checks of the template itself (removed by init.sh)
├── devops-build/             — Azure DevOps CI/CD pipeline
├── CLAUDE.md                 — AI assistant instructions
└── init.sh / init.ps1        — Project initialization scripts (remove themselves)
```

### Checks of the template

Before `init.sh` runs, two scripts check the template itself (both are removed by `init.sh`):

- `scripts/ci/check-public-files.sh` fails when a file of this public repository carries an internal work item
  reference or an open verification marker.
- `scripts/ci/verify-template.sh` runs the public file check, initialises a copy of the repository without a terminal
  (`--app-name Inspections --tenant-id test-ordi --lang en-GB --extra-langs de-AT --yes`), checks that no template
  name is left, that the tenant id and the client id are in every place the app and the scripts read them and that
  de-AT got the German texts and its flag, runs the script tests in the copy and then `npm ci`, the codegen check,
  lint, unit tests and the production build of the generated app, and finally that the built styles contain the
  Kendo theme and the Octo tokens (`--skip-app` stops after the checks of the copy).

`pwsh scripts/tests/Invoke-ScriptTests.ps1` also runs the tests of `init.sh` (`scripts/tests/Init.Tests.ps1`).

## Construction Kit & Blueprints

The template ships an example Construction Kit model (`src/CustomAppCkModel/ConstructionKit`)
and an example blueprint (`src/blueprints/CustomApp`) that seeds one entity of it.
Replace both with your own model and seed data.

Build the model locally (compiles it and publishes it to your local catalog):

```bash
dotnet build src/CustomAppCkModel/CustomAppCkModel.csproj
```

### Publishing

Construction Kit models and blueprints are published **only** by the shared steps of
[octo-pipeline-templates](https://github.com/meshmakers/octo-pipeline-templates):
`validate-and-publish-ck-versions.yml` and `validate-and-publish-blueprints.yml`. Each step validates the
version and the schema, then publishes. A validation failure blocks the publish.

| | main | `r*` tag | other branches |
|---|---|---|---|
| CK models | private catalog | private **and** public catalog | validate only |
| Blueprints | private catalog | private **and** public catalog | validate only |

- The catalogs come from the shared `update-build-number.yml`. Never declare them in this repo.
- Published versions are never overwritten. An already published version is skipped.
  Bump `modelId` in `ckModel.yaml` / `blueprintId` in `blueprint.yaml` whenever their content changes.
- List CK models and blueprints in dependency order. CK models come before blueprints.
- The `octo-ckc` / `octo-bpm` tool comes from the shared step `resolve-octo-release-tools.yml`: the highest released
  version (nuget.org only) of the configured major that exists for both tools. It sets `OctoReleaseToolVersion`
  (exact, passed as `toolVersion`) and `OctoReleaseLine` (`X.Y.*`, for `/p:OctoVersion=` where an app compiles Octo
  packages on an app r-tag). The step fails below its floor (range retention) or when nuget.org is unreachable. This
  repo names no tool line and needs no edit for the next release line.
- Do not publish from `dotnet build` in CI. If a pipeline step builds the CK project,
  pass `/p:OctoPublishCkModel=false`.

The `catalogs` job in `devops-build/azure-pipelines.yml` is commented out in the template,
so the example is never published. Uncomment it after `./init.sh`, once the model and
the blueprint are your own.

## Docker

The image is configured at **start**, not at build: the entrypoint writes the `CONFIG_*` variables into
`assets/config.json`, so one image serves any OctoMesh installation.

Build from the **repository root** (the Dockerfile copies `src/custom-app/` from there). The build needs your own
Telerik licence in `TELERIK_LICENSE` (`--build-arg TELERIK_LICENSE` without a value passes it from your shell, so it
does not end up in the shell history) and installs the published `@meshmakers/*` libraries from the public npm
registry (build argument `OCTO_LIB_VERSION`, default `latest`).

```bash
docker build -f src/custom-app/Dockerfile --build-arg TELERIK_LICENSE -t my-app .
docker run -p 8080:80 \
  -e CONFIG_TENANT_ID=my-tenant \
  -e CONFIG_API_URL=https://assets.example.com \
  -e CONFIG_AUTHORITY_URL=https://identity.example.com/ \
  -e CONFIG_ASSET_SERVICES_URL=https://assets.example.com \
  -e CONFIG_CLIENT_ID=my-app-frontend \
  my-app
```

Supported variables: `CONFIG_TENANT_ID`, `CONFIG_API_URL`, `CONFIG_AUTHORITY_URL`, `CONFIG_ASSET_SERVICES_URL`,
`CONFIG_CLIENT_ID` and `CONFIG_SCOPE`. The container serves the app on port 80; `http://localhost:8080/assets/config.json`
shows the configuration it got.

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed architecture, coding patterns, and how to extend the app.
