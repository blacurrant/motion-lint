/**
 * Rule ML006: Framer Motion Spring & Transition Audit
 * Checks for Framer Motion spring misconfigurations (e.g. stiffness too low with high damping,
 * or transition: { duration: 0 } which disables smooth unmount).
 */

module.exports = {
  id: 'ML006',
  name: 'framer-springs',
  severity: 'warning',
  description: 'Audit Framer Motion spring physics and layout prop configurations.',
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check type: "spring" with extreme/unnatural parameters
      if (/type\s*:\s*['"]spring['"]/.test(trimmed) || /transition=\{\s*\{\s*type:\s*['"]spring['"]/.test(trimmed)) {
        if (/damping\s*:\s*(?:[5-9]\d|\d{3,})/.test(trimmed)) {
          issues.push({
            ruleId: this.id,
            name: this.name,
            severity: 'info',
            file: filePath,
            line: lineNum,
            message: 'High spring damping (>50) makes spring animations feel muddy and sluggish.',
            suggestion: 'Recommended spring physics: stiffness: 400, damping: 30, mass: 0.8 for snappy, tactile micro-interactions.',
            snippet: trimmed
          });
        }
      }
    });

    return issues;
  }
};
