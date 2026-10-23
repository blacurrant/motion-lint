/**
 * Main module export for motion-lint programmatic usage
 */

const { lintFiles, rules } = require('./linter');
const { formatTerminal } = require('./reporter');
const { generatePatch } = require('./fixers');

module.exports = {
  lintFiles,
  formatTerminal,
  generatePatch,
  rules
};
