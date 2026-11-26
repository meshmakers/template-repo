// Tests of graphql/sample.schema.graphql against the sample CK model (npm run test:codegen).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, '..');

test('the fresh tenant schema has no sample type, so it really stands for a fresh tenant', () => {
  const schema = fs.readFileSync(path.join(appDir, 'graphql/ci.schema.graphql'), 'utf8');
  assert.doesNotMatch(schema, /customAppItem/i);
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
