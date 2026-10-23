/**
 * Rule ML002: Ban `transition: all`
 * `transition: all` causes accidental interpolation of layout, fonts, margins,
 * and borders during viewport resizes or dynamic DOM updates.
 */

module.exports = {
  id: 'ML002',
  name: 'ban-transition-all',
  severity: 'error',
  description: "Enforce explicit property transitions instead of blanket 'transition: all'.",
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const stripped = line.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
      if (!stripped) return;

      // CSS transition: all ...
      if (/(?:transition|transition-property)\s*:\s*all\b/i.test(stripped)) {
        issues.push({
          ruleId: this.id,
          name: this.name,
          severity: this.severity,
          file: filePath,
          line: lineNum,
          message: "'transition: all' inadvertently interpolates padding, width, and font geometry on resize.",
          suggestion: "Specify exact properties: e.g. 'transition: transform 200ms ease, opacity 200ms ease;'",
          snippet: stripped
        });
      }

      // Tailwind class 'transition-all'
      if (/\btransition-all\b/.test(stripped)) {
        issues.push({
          ruleId: this.id,
          name: this.name,
          severity: 'warning',
          file: filePath,
          line: lineNum,
          message: "Tailwind 'transition-all' triggers layout calculations on unexpected DOM shifts.",
          suggestion: "Replace 'transition-all' with 'transition-transform' or 'transition-opacity'.",
          snippet: stripped
        });
      }
    });

    return issues;
  }
};
