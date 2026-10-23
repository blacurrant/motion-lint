#!/usr/bin/env node

const path = require('path');
const { lintFiles } = require('../src/linter');
const { formatTerminal } = require('../src/reporter');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: motion-lint [paths...] [options]

Options:
  --format=json    Output machine-readable JSON
  --fix            Auto-apply recommended compositor patches where possible
  --help, -h       Show help message
  --version, -v    Show version

Examples:
  npx motion-lint src/
  npx motion-lint components/ styles/
  npx motion-lint . --format=json
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = require('../package.json');
  console.log(`motion-lint v${pkg.version}`);
  process.exit(0);
}

const isJson = args.includes('--format=json');
const targetPaths = args.filter(a => !a.startsWith('--'));

const pathsToScan = targetPaths.length > 0 ? targetPaths : [process.cwd()];

const results = lintFiles(pathsToScan);

if (isJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log(formatTerminal(results));
}

// Exit code: 1 if errors found, 0 otherwise
const hasErrors = results.issues.some(i => i.severity === 'error');
process.exit(hasErrors ? 1 : 0);
