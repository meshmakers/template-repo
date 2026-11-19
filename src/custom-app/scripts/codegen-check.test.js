// Tests of scripts/codegen-check.js (node --test scripts/, npm run test:codegen).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { check } = require('./codegen-check');

const appDir = path.resolve(__dirname, '..');

test('the app queries are valid for a fresh tenant schema', async () => {
  const outputs = await check('codegen.yml', 'graphql/ci.schema.graphql');
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
