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

The dev server starts at `http://localhost:4200`.

## Prerequisites

- **Node.js** 24+ (see `.nvmrc`)
- **npm** 10+
- **OctoMesh Platform** (Identity Server, API, Asset Services) running locally or accessible
- **octo-cli** for tenant management scripts

## Local Development

### 1. Set up OctoMesh Tenant

```bash
cd scripts
pwsh om_setupIdentityService_local.ps1  # Register OIDC client (once)
pwsh om_initialize_tenant.ps1            # Create tenant & import data
```

### 2. Configure

Edit `src/<your-app>/src/assets/config.json` with your OctoMesh service URLs:

```json
{
  "tenantId": "your-tenant",
  "apiUrl": "https://localhost:5001",
  "authorityUrl": "https://localhost:5003",
  "assetServicesUrl": "https://localhost:5005",
  "clientId": "your-app-frontend",
  "scope": "openid profile your-app.tenantAPI.full_access"
}
```

### 3. Develop

```bash
cd src/<your-app>
npm start       # Dev server with hot reload
npm run lint    # Check code quality
npm test        # Run unit tests
npm run build   # Production build
```

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
├── data/                     — Runtime import data
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

```bash
cd src/custom-app
docker build -t my-app .
docker run -p 8080:80 \
  -e CONFIG_TENANT_ID=my-tenant \
  -e CONFIG_API_URL=https://api.example.com \
  -e CONFIG_AUTHORITY_URL=https://auth.example.com \
  -e CONFIG_ASSET_SERVICES_URL=https://assets.example.com \
  my-app
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed architecture, coding patterns, and how to extend the app.
