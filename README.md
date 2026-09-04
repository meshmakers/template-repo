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
│   └── charts/custom-app/    — Helm charts for Kubernetes
├── scripts/                  — Tenant management scripts
├── data/                     — Runtime import data
├── devops-build/             — Azure DevOps CI/CD pipeline
├── CLAUDE.md                 — AI assistant instructions
└── init.sh                   — Project initialization script
```

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
