/**
 * Core Motion Linter Engine
 */

const fs = require('fs');
const path = require('path');

// Load all rules
const rules = [
  require('./rules/layout-thrashing'),
  require('./rules/ban-transition-all'),
  require('./rules/missing-will-change'),
  require('./rules/cheap-easing'),
  require('./rules/reduced-motion'),
  require('./rules/framer-springs')
];

const VALID_EXTENSIONS = new Set(['.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte', '.css', '.scss']);
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.turbo', 'coverage']);

function collectFiles(targetPath, fileList = []) {
  if (!fs.existsSync(targetPath)) return fileList;
  const stat = fs.statSync(targetPath);

  if (stat.isFile()) {
    const ext = path.extname(targetPath).toLowerCase();
    if (VALID_EXTENSIONS.has(ext)) {
      fileList.push(targetPath);
    }
    return fileList;
  }

  if (stat.isDirectory()) {
    const base = path.basename(targetPath);
    if (IGNORED_DIRS.has(base)) return fileList;

    const entries = fs.readdirSync(targetPath);
    for (const entry of entries) {
      collectFiles(path.join(targetPath, entry), fileList);
    }
  }

  return fileList;
}

function lintFiles(targetPaths, options = {}) {
  const startTime = Date.now();
  const allFiles = [];

  const targets = Array.isArray(targetPaths) ? targetPaths : [targetPaths];
  for (const t of targets) {
    collectFiles(t, allFiles);
  }

  const allIssues = [];

  for (const filePath of allFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const rule of rules) {
        const issues = rule.check(content, filePath);
        if (issues && issues.length > 0) {
          allIssues.push(...issues);
        }
      }
    } catch (err) {
      // Skip binary or unreadable files
    }
  }

  const durationMs = Date.now() - startTime;

  // Calculate Health Score
  let score = 100;
  allIssues.forEach(iss => {
    if (iss.severity === 'error') score -= 15;
    else if (iss.severity === 'warning') score -= 6;
    else score -= 2;
  });
  score = Math.max(0, Math.min(100, score));

  let grade = 'F';
  if (score >= 95) grade = 'S';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';

  return {
    filesCount: allFiles.length,
    durationMs,
    issues: allIssues,
    score,
    grade,
    files: allFiles
  };
}

module.exports = {
  lintFiles,
  rules
};
