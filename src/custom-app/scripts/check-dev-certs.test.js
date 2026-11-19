// Tests of scripts/check-dev-certs.js (npm run test:codegen runs them with the codegen check tests).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { missingCertFiles, hint, REQUIRED_FILES } = require('./check-dev-certs');

const appDir = path.resolve(__dirname, '..');

test('the required files are the sslCert and sslKey of the dev server in angular.json', () => {
  const angular = JSON.parse(fs.readFileSync(path.join(appDir, 'angular.json'), 'utf8'));
  const project = Object.values(angular.projects)[0];
  const options = project.architect.serve.options;
  assert.equal(options.ssl, true);
  assert.deepEqual(REQUIRED_FILES, [options.sslCert, options.sslKey]);
});

test('missing files are listed, present files are not', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-certs-'));
  try {
    assert.deepEqual(missingCertFiles(dir), ['localhost.crt', 'localhost.key']);
    fs.writeFileSync(path.join(dir, 'localhost.crt'), 'x');
    assert.deepEqual(missingCertFiles(dir), ['localhost.key']);
    fs.writeFileSync(path.join(dir, 'localhost.key'), 'x');
    assert.deepEqual(missingCertFiles(dir), []);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('the hint names the missing files and the script that creates them', () => {
  const text = hint(['localhost.key']);
  assert.match(text, /localhost\.key/);
  assert.match(text, /pwsh scripts\/generate-dev-certs\.ps1/);
});

test('npm start runs the check before the dev server', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'));
  assert.match(pkg.scripts.prestart, /node scripts\/check-dev-certs\.js/);
});

test('the script exits 1 with the hint when the files are missing', () => {
  // A copy of the script in an empty folder below a scripts/ directory, so its app folder has no certificates.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-certs-run-'));
  try {
    fs.mkdirSync(path.join(dir, 'scripts'));
    fs.copyFileSync(path.join(__dirname, 'check-dev-certs.js'), path.join(dir, 'scripts', 'check-dev-certs.js'));
    const run = spawnSync(process.execPath, [path.join(dir, 'scripts', 'check-dev-certs.js')], { encoding: 'utf8' });
    assert.equal(run.status, 1);
    assert.match(run.stderr, /generate-dev-certs\.ps1/);
    fs.writeFileSync(path.join(dir, 'localhost.crt'), 'x');
    fs.writeFileSync(path.join(dir, 'localhost.key'), 'x');
    const ok = spawnSync(process.execPath, [path.join(dir, 'scripts', 'check-dev-certs.js')], { encoding: 'utf8' });
    assert.equal(ok.status, 0);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
