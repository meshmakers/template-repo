#!/usr/bin/env node
/**
 * Checks before `npm start` that the certificate of the https dev server exists.
 *
 * angular.json serves https on port 4300 with sslCert localhost.crt and sslKey localhost.key in this folder. Without
 * them ng serve fails with a bare file error, so this script stops first and says how to create them:
 * scripts/generate-dev-certs.ps1 in the repository root (PowerShell 7 and openssl).
 *
 * Usage:
 *   node scripts/check-dev-certs.js        (runs as part of npm start)
 *
 * Exit codes: 0 both files exist, 1 a file is missing.
 */

const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, '..');
const REQUIRED_FILES = ['localhost.crt', 'localhost.key'];

/** The required files that do not exist in dir. */
function missingCertFiles(dir = appDir, exists = fs.existsSync) {
  return REQUIRED_FILES.filter((file) => !exists(path.join(dir, file)));
}

/** The hint printed when files are missing. */
function hint(missing) {
  return [
    `The https dev server needs ${missing.join(' and ')} in ${appDir}, which do not exist yet.`,
    'Create them once from the repository root (PowerShell 7 and openssl):',
    '  pwsh scripts/generate-dev-certs.ps1          # creates localhost.crt, localhost.key and ca.crt',
    '  pwsh scripts/generate-dev-certs.ps1 -Trust   # also trusts the CA, so the browser shows no warning',
    'Then run npm start again. The files are gitignored; never commit them.',
  ].join('\n');
}

if (require.main === module) {
  const missing = missingCertFiles();
  if (missing.length > 0) {
    console.error(`\x1b[31m${hint(missing)}\x1b[0m`);
    process.exit(1);
  }
}

module.exports = { missingCertFiles, hint, REQUIRED_FILES };
