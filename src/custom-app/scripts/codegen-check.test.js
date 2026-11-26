// Tests of scripts/codegen-check.js (node --test scripts/, npm run test:codegen).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { check, generateInMemory, resolveSchema, DEFAULT_SCHEMAS } = require('./codegen-check');

const appDir = path.resolve(__dirname, '..');

test('the app queries are valid for the CI schema (graphql/ci.schema.json when committed, else the fresh tenant)', async () => {
  // The schema CI uses: the defaults without the local, gitignored schema.json.
  const exists = (file) => file !== 'schema.json' && fs.existsSync(path.join(appDir, file));
  const outputs = await check('codegen.yml', resolveSchema(undefined, {}, exists).schema);
  assert.ok(outputs > 0);
});

test('the fresh tenant schema has no sample type, so it really stands for a fresh tenant', () => {
  const schema = fs.readFileSync(path.join(appDir, 'graphql/ci.schema.graphql'), 'utf8');
  assert.doesNotMatch(schema, /customAppItem/i);
});

test('the sample query is rejected by the fresh tenant schema', async () => {
  await assert.rejects(
    check('codegen.sample.yml', 'graphql/ci.schema.graphql'),
    /customAppItem/,
  );
});

test('a query that needs a type the schema does not have fails the check', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-check-'));
  try {
    fs.mkdirSync(path.join(dir, 'graphQL'));
    fs.writeFileSync(
      path.join(dir, 'graphQL', 'getWidgets.graphql'),
      'query GetWidgets { runtime { acmeWidget(first: 1) { totalCount } } }\n',
    );
    const config = path.join(dir, 'codegen.yml');
    fs.writeFileSync(
      config,
      [
        "schema: '${OCTO_GRAPHQL_SCHEMA:schema.json}'",
        `documents: '${path.join(dir, 'graphQL').replace(/\\/g, '/')}/*.graphql'`,
        'generates:',
        `  ${path.join(dir, 'out.ts').replace(/\\/g, '/')}:`,
        '    plugins:',
        "      - 'typescript-operations'",
        '',
      ].join('\n'),
    );
    await assert.rejects(check(config, 'graphql/ci.schema.graphql'), /acmeWidget/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('a missing schema file fails with a clear message', async () => {
  await assert.rejects(check('codegen.yml', 'graphql/does-not-exist.graphql'), /Schema file not found/);
});

test('an introspection JSON schema (as the MCP tool export_runtime_graphql_sdl returns it) is accepted', async () => {
  const { buildSchema, introspectionFromSchema } = require('graphql');
  const sdl = fs.readFileSync(path.join(appDir, 'graphql/ci.schema.graphql'), 'utf8');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-check-'));
  try {
    const file = path.join(dir, 'schema.json');
    fs.writeFileSync(file, JSON.stringify({ data: introspectionFromSchema(buildSchema(sdl)) }));
    const outputs = await check('codegen.yml', file);
    assert.ok(outputs > 0);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('the schema is the argument first, then OCTO_GRAPHQL_SCHEMA, then the first default file that exists', () => {
  const none = () => false;
  assert.deepEqual(resolveSchema('own.json', { OCTO_GRAPHQL_SCHEMA: 'env.json' }, none), {
    schema: 'own.json',
    source: 'argument',
  });
  assert.deepEqual(resolveSchema(undefined, { OCTO_GRAPHQL_SCHEMA: 'env.json' }, none), {
    schema: 'env.json',
    source: 'OCTO_GRAPHQL_SCHEMA',
  });
  // Your own tenant's export on your machine wins over the committed CI schemas.
  assert.deepEqual(resolveSchema(undefined, {}, () => true), { schema: 'schema.json', source: 'default' });
  assert.deepEqual(
    resolveSchema(undefined, {}, (file) => file !== 'schema.json'),
    { schema: 'graphql/ci.schema.json', source: 'default' },
  );
  assert.deepEqual(
    resolveSchema(undefined, {}, (file) => file === 'graphql/ci.schema.graphql'),
    { schema: 'graphql/ci.schema.graphql', source: 'default' },
  );
  assert.deepEqual(DEFAULT_SCHEMAS, ['schema.json', 'graphql/ci.schema.json', 'graphql/ci.schema.graphql']);
});

test('without a local schema.json the check uses the committed ci.schema.json if there is one, else the fresh tenant schema', () => {
  const exists = (file) => file !== 'schema.json' && fs.existsSync(path.join(appDir, file));
  // Holds for the template (no ci.schema.json) and for an app that committed its own model as graphql/ci.schema.json.
  const expected = fs.existsSync(path.join(appDir, 'graphql/ci.schema.json'))
    ? 'graphql/ci.schema.json'
    : 'graphql/ci.schema.graphql';
  assert.equal(resolveSchema(undefined, {}, exists).schema, expected);
});

test('generated types and services carry the Dto suffix of codegen.yml', async () => {
  const exists = (file) => file !== 'schema.json' && fs.existsSync(path.join(appDir, file));
  const outputs = await generateInMemory('codegen.yml', resolveSchema(undefined, {}, exists).schema);
  const generated = outputs.find((output) => output.filename.endsWith('getMaintenanceMode.generated.ts'));
  assert.ok(generated, 'no output for getMaintenanceMode.graphql');
  assert.match(generated.content, /export type GetMaintenanceModeQueryDto\b/);
  assert.match(generated.content, /export class GetMaintenanceModeDtoGQL\b/);
  // The committed file (self-contained, used by the build) exports the same names.
  const committed = fs.readFileSync(path.join(appDir, 'src/app/graphQL/getMaintenanceMode.generated.ts'), 'utf8');
  assert.match(committed, /export type GetMaintenanceModeQueryDto\b/);
  assert.match(committed, /export class GetMaintenanceModeDtoGQL\b/);
});

test('the sample config uses the Dto suffix too, and the committed sample code exports the Dto names', () => {
  for (const file of ['codegen.yml', 'codegen.sample.yml']) {
    const config = fs.readFileSync(path.join(appDir, file), 'utf8');
    assert.doesNotMatch(config, /\btypeSuffix\b/, `${file} uses typeSuffix, which codegen ignores`);
    assert.match(config, /typesSuffix: 'Dto'/);
  }
  const sample = fs.readFileSync(path.join(appDir, 'src/app/sample/graphQL/getItems.generated.ts'), 'utf8');
  assert.match(sample, /export type GetItemsQueryDto\b/);
  assert.match(sample, /export class GetItemsDtoGQL\b/);
});
