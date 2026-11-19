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
- **App Name** (e.g., `Acme`) - used for naming throughout the project
- **Tenant ID** - the OctoMesh tenant the app and the scripts work in (default: the kebab-case app name, e.g. `acme`)
- **Default Language** (default: `en-GB`)
- **Additional Languages** (optional, comma-separated)

**Without prompts** (an AI agent, CI, a hosted tenant whose id is not the app name), pass the values as options:

```bash
./init.sh --app-name Inspections --tenant-id test-ordi --lang en-GB --extra-langs de-AT --yes
```

| Option | Environment variable | Meaning |
|---|---|---|
| `--app-name <Name>` | `INIT_APP_NAME` | App name in PascalCase (required) |
| `--tenant-id <id>` | `INIT_TENANT_ID` | Tenant of the app (default: the kebab-case app name; the script prints the value it uses) |
| `--lang <code>` | `INIT_DEFAULT_LANG` | Default language (default: `en-GB`) |
| `--extra-langs <a,b>` | `INIT_EXTRA_LANGS` | Additional languages (default: none) |
| `--yes`, `-y` | `INIT_ASSUME_YES=1` | No confirmation question |
| | `INIT_INTERACTIVE=1` or `0` | Ask (`1`) or never ask (`0`); default: ask only when stdin is a terminal |

Without a terminal the script never asks: `--app-name` and `--yes` are required, the rest has defaults. Invalid
input (an app name that is not PascalCase, an invalid tenant id or language code, a missing required option) stops
it with exit code 2 before it changes any file. `./init.sh --help` lists all options. The tenant id goes into
`src/<app>/src/assets/config.json`, the Helm values (`config.tenantId`) and the default `-TenantId` of every script in
`scripts/`. On Windows without bash, `init.ps1` takes the same values (`-AppName`, `-TenantId`, `-Lang`,
`-ExtraLangs`, `-Yes`).

### 2. Install & Run

```bash
cd src/<your-app-name>/
npm install
npm start
```

See **Local Development** below for the tenant, the configuration and the Telerik licence the dev server needs.

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

`om_setupIdentityService_local.ps1` works on a hosted tenant too, when you run the dev server on
`https://localhost:4300/` against it; it only adds the OIDC client to the tenant.

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

| Key | Meaning |
|---|---|
| `tenantId` | The tenant the app works in; GraphQL is called at `<apiUrl>/tenants/<tenantId>/graphQL` |
| `apiUrl` | Base URL of the asset repository (tenant API) |
| `authorityUrl` | Identity service that issues the tokens (OIDC authority) |
| `assetServicesUrl` | Base URL of the asset services (files and similar) |
| `clientId` | OIDC client registered by `om_setupIdentityService_local.ps1` (`custom-app-frontend-debug` in the template) |
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

`npm run codegen` turns the queries in `src/<app>/src/app/graphQL/*.graphql` into typed Angular services. It reads
the GraphQL schema of your tenant from `src/<app>/schema.json`:

1. Export the schema of your tenant: with your AI agent, the MCP tool `export_runtime_graphql_sdl` returns it as
   introspection JSON; save that JSON as `src/<app>/schema.json`. If you have the schema as SDL instead
   (`schema.graphql`), tell codegen with the environment variable `OCTO_GRAPHQL_SCHEMA`:
   `OCTO_GRAPHQL_SCHEMA=schema.graphql npm run codegen`. Both files are tenant specific and ignored by git.
2. Run `npm run codegen` in `src/<app>`.

**Fresh tenant** (only the System Construction Kits and Basic, no app model): this works right after `init.sh`. The
template's own query (`getMaintenanceMode.graphql`) uses only System types, and the sample query is not part of
`npm run codegen`. Put your own queries next to it in `src/<app>/src/app/graphQL/`.

**With the sample model**: import the sample CK model of this template into your tenant (the tenant script does
that, see [Set up the tenant](#1-set-up-the-tenant)), then set `SAMPLE_ITEMS_ENABLED` to `true`
in `src/<app>/src/app/sample/sample-items.config.ts`. The generated code of the sample query is committed, so that
is the only step. Only when you change the sample query, export the schema again and run `npm run codegen:sample`
(config `codegen.sample.yml`).

**CI check**: `npm run codegen:check` validates the queries in `src/app/graphQL/` against the committed schema
`src/<app>/graphql/ci.schema.graphql` (a fresh tenant) without writing files, and fails when a query needs a type
that schema does not have; `npm run test:codegen` tests the check itself. The pipeline runs both before lint. Once
your queries use your own CK model, replace `graphql/ci.schema.graphql` with the SDL of a tenant that has that model
(the tests in `scripts/codegen-check.test.js` expect that schema without the sample type).

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
  name is left and that the tenant id is in every place the app and the scripts read it, runs the script tests in
  the copy and then `npm ci`, the codegen check, lint, unit tests and the production build of the generated app
  (`--skip-app` stops after the checks of the copy).

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
