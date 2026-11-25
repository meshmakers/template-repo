#!/usr/bin/env node
/**
 * Generates the app's GraphQL code from a GraphQL schema and fails when a document is not valid against it.
 *
 * Runs a codegen config (default codegen.yml) against a schema and writes its outputs, the afterAllFileWrite hook
 * included. The generated files are not committed (.gitignore): CI and the Docker build run this before lint, test
 * and build, so all generated code comes from a committed schema. A query that needs a type the schema does not have
 * fails with codegen's validation error.
 *
 * Which schema (the first that applies):
 *   1. the second argument:            node scripts/codegen-check.js codegen.yml schema.json
 *   2. the environment variable OCTO_GRAPHQL_SCHEMA (the same variable npm run codegen reads)
 *   3. schema.json in this folder: the introspection JSON of your own tenant (MCP tool export_runtime_graphql_sdl),
 *      gitignored, so this applies on your machine only
 *   4. graphql/ci.schema.json: the introspection JSON of a tenant with your own model, committed for CI
 *   5. graphql/ci.schema.graphql: the committed SDL of a fresh tenant (System CKs and Basic), the template's own CI
 * Both SDL (.graphql) and introspection JSON (.json) files are accepted. codegen.sample.yml adds its own committed
 * excerpt graphql/sample.schema.graphql to that schema.
 *
 * Usage:
 *   node scripts/codegen-check.js [config] [schema]
 *   npm run codegen:check
 *
 * Exit codes: 0 generated, 1 invalid or the generation could not run.
 */

const path = require('path');
const fs = require('fs');
const { generate, loadCodegenConfig } = require('@graphql-codegen/cli');

const appDir = path.resolve(__dirname, '..');

/** Schema files tried when neither an argument nor OCTO_GRAPHQL_SCHEMA names one, in this order. */
const DEFAULT_SCHEMAS = ['schema.json', 'graphql/ci.schema.json', 'graphql/ci.schema.graphql'];

/**
 * Picks the schema file: the argument, then OCTO_GRAPHQL_SCHEMA, then the first of DEFAULT_SCHEMAS that exists
 * (relative to the app folder). Returns the path as given (relative or absolute) and where it came from.
 */
function resolveSchema(argument, env = process.env, exists = (file) => fs.existsSync(path.resolve(appDir, file))) {
  if (argument) {
    return { schema: argument, source: 'argument' };
  }
  if (env.OCTO_GRAPHQL_SCHEMA) {
    return { schema: env.OCTO_GRAPHQL_SCHEMA, source: 'OCTO_GRAPHQL_SCHEMA' };
  }
  const found = DEFAULT_SCHEMAS.find((file) => exists(file));
  return { schema: found || DEFAULT_SCHEMAS[DEFAULT_SCHEMAS.length - 1], source: found ? 'default' : 'missing' };
}

/** Runs the config against the schema; saveToFile=false validates and generates in memory only. */
async function runCodegen(configFile, schemaFile, saveToFile) {
  const configFilePath = path.resolve(appDir, configFile);
  const schemaPath = path.resolve(appDir, schemaFile);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  // The codegen configs read the schema from OCTO_GRAPHQL_SCHEMA (default schema.json).
  const previous = process.env.OCTO_GRAPHQL_SCHEMA;
  process.env.OCTO_GRAPHQL_SCHEMA = schemaPath;
  try {
    const { config } = await loadCodegenConfig({ configFilePath });
    return await generate({ ...config, cwd: appDir, silent: true, errorsOnly: true }, saveToFile);
  } finally {
    if (previous === undefined) {
      delete process.env.OCTO_GRAPHQL_SCHEMA;
    } else {
      process.env.OCTO_GRAPHQL_SCHEMA = previous;
    }
  }
}

/** Runs the config in memory against the schema and returns codegen's outputs ({ filename, content }). */
function generateInMemory(configFile, schemaFile) {
  return runCodegen(configFile, schemaFile, false);
}

/** Runs the config against the schema, writes its outputs and returns them. */
function generateToFiles(configFile, schemaFile) {
  return runCodegen(configFile, schemaFile, true);
}

async function check(configFile, schemaFile) {
  const outputs = await generateInMemory(configFile, schemaFile);
  return outputs.length;
}

/** The configs npm run codegen:check generates, in this order. */
const CHECKED_CONFIGS = ['codegen.yml', 'codegen.sample.yml'];

async function generateAll(configFiles, schemaFile) {
  const counts = [];
  for (const configFile of configFiles) {
    const outputs = await generateToFiles(configFile, schemaFile);
    counts.push(`${configFile}: ${outputs.length} outputs`);
  }
  return counts;
}

if (require.main === module) {
  const configFiles = process.argv[2] ? [process.argv[2]] : CHECKED_CONFIGS;
  const { schema: schemaFile, source } = resolveSchema(process.argv[3]);
  generateAll(configFiles, schemaFile)
    .then((counts) => {
      console.log(`codegen check passed against ${schemaFile} (${source}): ${counts.join(', ')}`);
    })
    .catch((error) => {
      console.error(`codegen check failed: ${configFiles.join(', ')} against ${schemaFile} (${source})`);
      console.error(error && error.message ? error.message : error);
      process.exit(1);
    });
}

module.exports = { check, generateInMemory, generateToFiles, resolveSchema, CHECKED_CONFIGS, DEFAULT_SCHEMAS };
