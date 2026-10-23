/**
 * Terminal UI and Formatting Reporter
 */

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gold: '\x1b[38;5;214m',
  bgRed: '\x1b[41m\x1b[37m',
  bgYellow: '\x1b[43m\x1b[30m',
  bgCyan: '\x1b[46m\x1b[30m'
};

function formatTerminal(results, options = {}) {
  const { filesCount, durationMs, issues, score, grade } = results;
  const out = [];

  out.push('');
  out.push(`${colors.bold}${colors.cyan}◆ MOTION-LINT v1.0.0${colors.reset} ${colors.dim}— 120 FPS Compositor Contract & Motion Linter${colors.reset}`);
  out.push(`${colors.dim}  Enforcing zero-reflow transforms, tokenized spring physics, and fluid web UI${colors.reset}`);
  out.push('');

  if (issues.length === 0) {
    out.push(`  ${colors.green}✔ Zero motion anti-patterns detected.${colors.reset} Perfect compositor isolation!`);
  } else {
    // Group issues by file
    const byFile = {};
    issues.forEach(iss => {
      byFile[iss.file] = byFile[iss.file] || [];
      byFile[iss.file].push(iss);
    });

    Object.keys(byFile).forEach(filePath => {
      out.push(`${colors.bold}${colors.cyan}● ${filePath}${colors.reset}`);
      byFile[filePath].forEach(iss => {
        const badge = getBadge(iss.severity);
        out.push(`  ${badge} ${colors.dim}L${iss.line}:${colors.reset} [${colors.bold}${iss.ruleId}${colors.reset}] ${iss.message}`);
        if (iss.snippet) {
          out.push(`     ${colors.dim}› ${iss.snippet}${colors.reset}`);
        }
        if (iss.suggestion) {
          out.push(`     ${colors.green}→ Fix: ${iss.suggestion}${colors.reset}`);
        }
        out.push('');
      });
    });
  }

  // Summary Card
  const errors = issues.filter(i => i.severity === 'error').length;
  const warnings = issues.filter(i => i.severity === 'warning').length;
  const infos = issues.filter(i => i.severity === 'info').length;

  out.push(`${colors.dim}----------------------------------------------------------------------${colors.reset}`);
  out.push(`${colors.bold}MOTION HEALTH AUDIT:${colors.reset}`);
  out.push(`  Files Scanned:   ${filesCount}`);
  out.push(`  Motion Score:    ${getGradeColor(grade)}${score}/100 [Grade: ${grade}]${colors.reset}`);
  out.push(`  Compositor Violations: ${errors > 0 ? colors.red : colors.green}${errors} errors${colors.reset}, ${warnings} warnings, ${infos} suggestions`);
  out.push(`  Scan Duration:   ${durationMs}ms`);
  out.push('');

  // Attribution & Sponsorship Block
  out.push(`${colors.gold}⚡ Built by Nishant Choudhary (Creative Developer & Design Engineer)${colors.reset}`);
  out.push(`  Portfolio & Case Studies: ${colors.cyan}https://nishant.world${colors.reset}`);
  out.push(`  Solana Tip Jar / Sponsor: ${colors.yellow}F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf${colors.reset}`);
  out.push(`${colors.dim}  Read the architecture thesis: "Why Your React Animations Feel Cheap"${colors.reset}`);
  out.push('');

  return out.join('\n');
}

function getBadge(severity) {
  if (severity === 'error') return `${colors.bgRed} REF_ERR ${colors.reset}`;
  if (severity === 'warning') return `${colors.bgYellow} WARN ${colors.reset}`;
  return `${colors.bgCyan} INFO ${colors.reset}`;
}

function getGradeColor(grade) {
  if (grade === 'S' || grade === 'A') return colors.green;
  if (grade === 'B') return colors.cyan;
  if (grade === 'C') return colors.yellow;
  return colors.red;
}

module.exports = {
  formatTerminal
};
