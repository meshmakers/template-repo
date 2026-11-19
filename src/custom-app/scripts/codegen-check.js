#!/usr/bin/env node
/**
 * Checks that the app's GraphQL documents are valid for a fresh tenant.
 *
 * Runs codegen.yml in memory against the checked-in schema graphql/ci.schema.graphql (the schema
 * of a tenant with only the System CKs and Basic). A query in src/app/graphQL/ that needs a type
 * this schema does not have fails with codegen's validation error. Nothing is written: the
 * committed generated files stay as they are.
 *
 * Usage:
 *   node scripts/codegen-check.js [config] [schema]
 *   npm run codegen:check
 *
 * Exit codes: 0 valid, 1 invalid or the check could not run.
 */

const path = require('path');
const fs = require('fs');
const { generate, loadCodegenConfig } = require('@graphql-codegen/cli');

const appDir = path.resolve(__dirname, '..');

async function check(configFile, schemaFile) {
  const configFilePath = path.resolve(appDir, configFile);
  const schemaPath = path.resolve(appDir, schemaFile);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  // codegen.yml reads the schema from OCTO_GRAPHQL_SCHEMA (default schema.json).
  process.env.OCTO_GRAPHQL_SCHEMA = schemaPath;
  const { config } = await loadCodegenConfig({ configFilePath });

  // saveToFile=false: validate and generate in memory only.
  const outputs = await generate({ ...config, cwd: appDir, silent: true, errorsOnly: true }, false);
  return outputs.length;
}

if (require.main === module) {
  const configFile = process.argv[2] || 'codegen.yml';
  const schemaFile = process.argv[3] || 'graphql/ci.schema.graphql';
  check(configFile, schemaFile)
    .then((count) => {
      console.log(`codegen check passed: ${configFile} against ${schemaFile} (${count} outputs)`);
    })
    .catch((error) => {
      console.error(`codegen check failed: ${configFile} against ${schemaFile}`);
      console.error(error && error.message ? error.message : error);
      process.exit(1);
    });
}

module.exports = { check };
