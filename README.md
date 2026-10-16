# CustomApp - OctoMesh Custom App Template

Template repository for building OctoMesh Custom Apps with Angular frontend, Kendo UI, and GraphQL.

## Quick Start

### 1. Clone & Initialize

```bash
git clone <this-repo-url> my-app
cd my-app
./init.sh
```

The init script will ask for:
- **App Name** (e.g., `Acme`) - used for naming throughout the project
- **Default Language** (default: `en-GB`)
- **Additional Languages** (optional, comma-separated)

### 2. Install & Run

```bash
cd src/<your-app-name>/
npm install
npm start
```

See **Local Development** below for the tenant, the configuration and the Telerik licence the dev server needs.

## Prerequisites

- **Node.js 24.15** (see `.nvmrc`), npm comes with it
- **A running OctoMesh stack.** The easiest is the local kind stack of
  [meshmakers/getting-started](https://github.com/meshmakers/getting-started) (OctoMesh 3.5.23 or newer);
  its services are reached at `https://identity.127-0-0-1.nip.io`, `https://assets.127-0-0-1.nip.io` and so on
- **octo-cli 3.5.0 or newer**, logged in to that stack (`om-login-local.ps1` of getting-started does this)
- **PowerShell 7.4+** for the `scripts/om_*.ps1` helpers
- **A Telerik licence for Kendo UI for Angular.** The app uses Kendo UI, a commercial component library, and
  `npm start` and `npm run build:prod` stop without a licence. External readers get a trial or paid licence from
  [Telerik](https://www.telerik.com/account/your-products). Students of the FH Salzburg lab receive a lab
  licence from the lab; it is not part of this repository and must never be committed. Provide the licence
  text in the environment variable `TELERIK_LICENSE` of your shell before you start or build the app; the
  build then activates it.

No Duende or AutoMapper licence is needed with OctoMesh 3.5.23 or newer.

## Local Development

### 1. Set up the tenant

Run the scripts from the `scripts` folder while octo-cli is logged in to your stack:

```bash
cd scripts
pwsh om_setupIdentityService_local.ps1  # register the OIDC client of the dev server (once)
pwsh om_initialize_tenant.ps1            # create the tenant, import the Basic Construction Kit and the sample data
pwsh generate-dev-certs.ps1              # certificate for the https dev server on port 4300
```

`om_initialize_tenant.ps1` first **deletes** the tenant of the app if it exists, so use it only for a fresh
tenant. The tenant id is the kebab-case name of your app (`custom-app` in the template).

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
<!-- TODO(verify): the complete run on the getting-started stack (init.sh, the three scripts, npm start, sign-in, tenant data), AB#6775 window -->

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
├── scripts/                  — Tenant management scripts
├── data/                     — Sample runtime data (queries)
├── devops-build/             — Azure DevOps CI/CD pipeline
├── CLAUDE.md                 — AI assistant instructions
└── init.sh                   — Project initialization script
```

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
- Do not publish from `dotnet build` in CI. If a pipeline step builds the CK project,
  pass `/p:OctoPublishCkModel=false`.

The `catalogs` job in `devops-build/azure-pipelines.yml` is commented out in the template,
so the example is never published. Uncomment it after `./init.sh`, once the model and
the blueprint are your own.

## Docker

The image is configured at **start**, not at build: the entrypoint writes the `CONFIG_*` variables into
`assets/config.json`, so one image serves any OctoMesh installation.

```bash
cd src/custom-app
docker build --build-arg TELERIK_LICENSE="$TELERIK_LICENSE" -t my-app .
docker run -p 8080:80 \
  -e CONFIG_TENANT_ID=my-tenant \
  -e CONFIG_API_URL=https://assets.example.com \
  -e CONFIG_AUTHORITY_URL=https://identity.example.com/ \
  -e CONFIG_ASSET_SERVICES_URL=https://assets.example.com \
  -e CONFIG_CLIENT_ID=my-app-frontend \
  my-app
```

Supported variables: `CONFIG_TENANT_ID`, `CONFIG_API_URL`, `CONFIG_AUTHORITY_URL`, `CONFIG_ASSET_SERVICES_URL`,
`CONFIG_CLIENT_ID` and `CONFIG_SCOPE`.
<!-- TODO(verify): docker build of the image (needs a Telerik licence and the published @meshmakers libraries); see the story for the build arguments -->

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed architecture, coding patterns, and how to extend the app.
