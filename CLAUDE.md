# CustomApp - OctoMesh Custom App Template

## Project Overview

This is a template repository for building OctoMesh Custom Apps. It provides an Angular frontend that connects to OctoMesh backend services (Identity Server, Tenant API, Asset Services) via configuration.

After cloning, run `./init.sh` to customize the template for your project.

## Architecture

- **Frontend**: Standalone Angular SPA at `src/custom-app/`
- **Layout**: Kendo AppBar + Kendo Drawer (Demo-App pattern)
- **Auth**: OIDC via `angular-oauth2-oidc` + `@meshmakers/shared-auth`
- **API**: GraphQL via Apollo Angular to OctoMesh Tenant API
- **Styling**: Tailwind CSS 4 + Kendo Default Theme
- **i18n**: `@ngx-translate/core` with JSON translation files
- **Deployment**: nginx Docker container, Helm charts for Kubernetes

## Tech Stack

- Angular 21 (standalone components, signals)
- Kendo UI for Angular 21
- Apollo GraphQL Client
- Tailwind CSS 4
- Vitest + Playwright (testing)
- TypeScript 5.9

## Pre-Commit Rules (CRITICAL)

- **ALWAYS write tests** for every code change (new features, bug fixes, refactoring)
- **ALWAYS run `npm run lint && npm run test:ci && npm run build:prod`** locally before committing and pushing
- This catches lint errors, test failures, and TypeScript compilation errors before CI
- Test files follow the pattern `*.spec.ts` next to the source file they test
- Components that import `@meshmakers/shared-ui` cannot be tested directly in vitest (cronstrue ESM issue) — use pure logic tests or Playwright e2e tests instead

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
```

## Key Patterns

### Standalone Components (Angular 21)
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
1. Copy/update `schema.graphql` from OctoMesh API
2. Create `.graphql` query files in `src/app/graphQL/`
3. Run `npm run codegen`
4. Import generated services in your components

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
│   │   └── services/        — Application services
│   ├── assets/
│   │   ├── config.json      — Runtime configuration
│   │   └── i18n/            — Translation files
│   ├── environments/        — Version info
│   └── testing/             — Test utilities
├── angular.json
├── package.json
├── Dockerfile               — nginx production image
└── nginx.conf
```

## Scripts (PowerShell)

```bash
# Initialize tenant (delete + create + import CK + import RT)
cd scripts && pwsh om_initialize_tenant.ps1

# Register OIDC client for local development
cd scripts && pwsh om_setupIdentityService_local.ps1
```
