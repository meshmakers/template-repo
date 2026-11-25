// Tests of scripts/codegen.js (npm run test:codegen).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { check, generateInMemory, resolveSchema, CODEGEN_CONFIGS, DEFAULT_SCHEMAS } = require('./codegen');

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

test('the sample query is rejected by the fresh tenant schema without the sample excerpt', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-test-'));
  try {
    const config = path.join(dir, 'codegen.yml');
    fs.writeFileSync(
      config,
      [
        "schema: '${OCTO_GRAPHQL_SCHEMA:schema.json}'",
        "documents: 'src/app/sample/graphQL/*.graphql'",
        'generates:',
        `  ${path.join(dir, 'out.ts').replace(/\\/g, '/')}:`,
        '    plugins:',
        "      - 'typescript-operations'",
        '',
      ].join('\n'),
    );
    await assert.rejects(check(config, 'graphql/ci.schema.graphql'), /customAppItem/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('the sample config reads the fresh tenant schema plus the sample excerpt, whatever schema the check resolves', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-test-'));
  try {
    const unrelatedSchema = path.join(dir, 'unrelated.graphql');
    fs.writeFileSync(unrelatedSchema, 'type Query { unrelated: Int }\n');
    const sampleOutputs = await generateInMemory('codegen.sample.yml', unrelatedSchema);
    assert.ok(sampleOutputs.some((output) => output.filename.endsWith('getItems.generated.ts')));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('npm run codegen generates the app config and the sample config', () => {
  assert.deepEqual(CODEGEN_CONFIGS, ['codegen.yml', 'codegen.sample.yml']);
});

test('a query that needs a type the schema does not have fails the check', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-test-'));
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
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codegen-test-'));
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
  assert.match(generated.content, /import type \* as Types from '\.\/globalTypes'/);
});

test('the sample config uses the Dto suffix too, and the generated sample code exports the Dto names', async () => {
  for (const file of ['codegen.yml', 'codegen.sample.yml']) {
    const config = fs.readFileSync(path.join(appDir, file), 'utf8');
    assert.doesNotMatch(config, /\btypeSuffix\b/, `${file} uses typeSuffix, which codegen ignores`);
    assert.match(config, /typesSuffix: 'Dto'/);
  }
  const outputs = await generateInMemory('codegen.sample.yml', 'graphql/ci.schema.graphql');
  const sample = outputs.find((output) => output.filename.endsWith('getItems.generated.ts'));
  assert.ok(sample, 'no output for getItems.graphql');
  assert.match(sample.content, /export type GetItemsQueryDto\b/);
  assert.match(sample.content, /export class GetItemsDtoGQL\b/);
});

test('the sample schema excerpt matches the sample CK model (attributes, optionality and enum values)', () => {
  const YAML = require('yaml');
  const { parse } = require('graphql');
  // The CK model folder is src/<App>CkModel; init renames it with the app.
  const srcDir = path.resolve(appDir, '..');
  const ckModelFolder = fs.readdirSync(srcDir).find((entry) => entry.endsWith('CkModel'));
  assert.ok(ckModelFolder, `no *CkModel folder in ${srcDir}`);
  const ckDir = path.join(srcDir, ckModelFolder, 'ConstructionKit');
  const readCk = (file) => YAML.parse(fs.readFileSync(path.join(ckDir, file), 'utf8'));

  const sampleFiles = ['types/Item.yaml', 'attributes/ItemAttributes.yaml', 'enums/ItemStatus.yaml'];
  const missingSampleFiles = sampleFiles.filter((file) => !fs.existsSync(path.join(ckDir, file)));
  const removeSampleHint = 'remove the sample as the README says ("Removing the sample")';
  assert.deepEqual(missingSampleFiles, [], `the sample CK model is gone: ${removeSampleHint}`);
  const itemType = readCk('types/Item.yaml').types.find((type) => type.typeId === 'Item');
  const attributeDefinitions = readCk('attributes/ItemAttributes.yaml').attributes;
  const statusEnum = readCk('enums/ItemStatus.yaml').enums.find((ckEnum) => ckEnum.enumId === 'ItemStatus');
  assert.ok(itemType && statusEnum, `the sample CK model has no type Item or enum ItemStatus: ${removeSampleHint}`);

  // GraphQL names a CK type <model><type>: model CustomApp, type Item -> CustomAppItem.
  const modelName = readCk('ckModel.yaml').modelId.split('-')[0];
  const itemTypeName = `${modelName}${itemType.typeId}`;
  const statusEnumName = `${modelName}${statusEnum.enumId}`;
  const graphQlTypeOfValueType = { String: 'String', Double: 'Float', Enum: statusEnumName };
  const expectedFields = { rtId: 'OctoObjectId!' };
  for (const attribute of itemType.attributes) {
    const fieldName = attribute.name.charAt(0).toLowerCase() + attribute.name.slice(1);
    const localId = attribute.id.replace('${this}/', '');
    const definition = attributeDefinitions.find((candidate) => candidate.id === localId);
    const valueType = definition ? definition.valueType : 'String';
    expectedFields[fieldName] = graphQlTypeOfValueType[valueType] + (attribute.isOptional ? '' : '!');
  }

  const excerpt = parse(fs.readFileSync(path.join(appDir, 'graphql/sample.schema.graphql'), 'utf8'));
  const definitionNamed = (name) => excerpt.definitions.find((node) => node.name && node.name.value === name);
  const typeText = (typeNode) =>
    typeNode.kind === 'NonNullType' ? `${typeText(typeNode.type)}!` : typeNode.name.value;

  const itemDefinition = definitionNamed(itemTypeName);
  assert.ok(itemDefinition, `graphql/sample.schema.graphql has no type ${itemTypeName}`);
  for (const field of itemDefinition.fields) {
    assert.equal(
      typeText(field.type),
      expectedFields[field.name.value],
      `${itemTypeName}.${field.name.value} does not match the CK model`,
    );
  }

  const enumDefinition = definitionNamed(statusEnumName);
  assert.ok(enumDefinition, `graphql/sample.schema.graphql has no enum ${statusEnumName}`);
  const excerptEnumValues = enumDefinition.values.map((value) => value.name.value).sort();
  // GraphQL enum values split words and digits: Draft -> DRAFT, InReview -> IN_REVIEW, KWh -> K_WH, L1 -> L_1.
  const graphQlEnumValueName = (ckName) =>
    ckName
      .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/([A-Za-z])([0-9])/g, '$1_$2')
      .replace(/([0-9])([A-Za-z])/g, '$1_$2')
      .toUpperCase();
  const ckEnumValues = statusEnum.values.map((value) => graphQlEnumValueName(value.name)).sort();
  assert.deepEqual(excerptEnumValues, ckEnumValues);
});
