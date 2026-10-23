/**
 * Test Suite for motion-lint
 */

const assert = require('assert');
const path = require('path');
const { lintFiles } = require('../src/linter');
const { formatTerminal } = require('../src/reporter');

console.log('Running motion-lint test suite...\n');

const fixturesDir = path.join(__dirname, 'fixtures');

// 1. Test scanning bad fixtures
const badResults = lintFiles([
  path.join(fixturesDir, 'bad-drawer.jsx'),
  path.join(fixturesDir, 'bad-styles.css')
]);

console.log(`Scanned ${badResults.filesCount} bad fixture files.`);
console.log(`Detected ${badResults.issues.length} issues. Score: ${badResults.score}/100 [Grade: ${badResults.grade}]`);

// Assertions on bad files
const ruleIds = badResults.issues.map(i => i.ruleId);
assert(ruleIds.includes('ML001'), 'Must flag ML001: layout-thrashing');
assert(ruleIds.includes('ML002'), 'Must flag ML002: ban-transition-all');
assert(ruleIds.includes('ML004'), 'Must flag ML004: cheap-easing');
assert(ruleIds.includes('ML005'), 'Must flag ML005: reduced-motion');
assert(badResults.score < 60, 'Score should be low for bad fixtures');
console.log('✔ Bad fixtures properly triggered ML001, ML002, ML004, ML005.');

// 2. Test scanning good fixture
const goodResults = lintFiles(path.join(fixturesDir, 'good-drawer.jsx'));
console.log(`Scanned good fixture: Score: ${goodResults.score}/100 [Grade: ${goodResults.grade}]`);
assert(goodResults.score >= 95, 'Good fixture must achieve Grade S/A');
assert.strictEqual(goodResults.issues.length, 0, 'Good fixture must have 0 errors');
console.log('✔ Good fixture passed with score >= 95 and zero violations.');

// 3. Test terminal reporter formatting
const output = formatTerminal(badResults);
assert(output.includes('MOTION-LINT'), 'Output must include header');
assert(output.includes('Nishant Choudhary'), 'Output must include author attribution');
assert(output.includes('F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf'), 'Output must include Solana address');
console.log('✔ Terminal reporter renders header, rules, and monetization/attribution banner.');

console.log('\nAll motion-lint tests passed successfully! 🚀\n');
