/**
 * Rule ML004: Cheap / Stiff Easing Curves
 * Linear easings or browser-default symmetric 'ease' make UI feel robotic or sluggish.
 * Modern fluid design systems use calibrated cubic-bezier curves or spring physics.
 */

module.exports = {
  id: 'ML004',
  name: 'cheap-easing',
  severity: 'warning',
  description: "Flag linear or generic browser-default easings on user-facing animations.",
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check transition with linear
      if (/transition\s*:.*?\blinear\b/i.test(trimmed)) {
        issues.push({
          ruleId: this.id,
          name: this.name,
          severity: this.severity,
          file: filePath,
          line: lineNum,
          message: "'linear' timing function feels robotic and mechanical for UI state changes.",
          suggestion: "Use an emphasized curve like 'cubic-bezier(0.16, 1, 0.3, 1)' (quick start, smooth settle) or spring physics.",
          snippet: trimmed
        });
      }

      // Check transition: ... 0.3s ease; or similar default ease on long transitions
      if (/transition\s*:.*?(?:0\.[3-9]|[1-9])s\s+ease\b/i.test(trimmed)) {
        issues.push({
          ruleId: this.id,
          name: this.name,
          severity: 'info',
          file: filePath,
          line: lineNum,
          message: "Default 'ease' curve over 300ms has sluggish decelerations at the end.",
          suggestion: "Adopt tokenized curves: e.g. '--ease-emphasized-enter: cubic-bezier(0.05, 0.7, 0.1, 1)'",
          snippet: trimmed
        });
      }
    });

    return issues;
  }
};
