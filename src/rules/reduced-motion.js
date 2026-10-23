/**
 * Rule ML005: Missing prefers-reduced-motion accessibility guard
 * Ensure stylesheets and components provide a motion override for vestibular accessibility.
 */

module.exports = {
  id: 'ML005',
  name: 'reduced-motion',
  severity: 'warning',
  description: 'Verify accessibility compliance for users requesting reduced motion.',
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];

    // Only run on CSS / root stylesheet files or when substantial animations exist
    const isStylesheet = /\.(css|scss|sass|less)$/i.test(filePath);
    const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
    const hasTransitions = /transition\s*:/i.test(cleanContent) || /animation\s*:/i.test(cleanContent);

    if (isStylesheet && hasTransitions) {
      const hasReducedMotion = /@media\s*\([^)]*prefers-reduced-motion/i.test(cleanContent);
      if (!hasReducedMotion) {
        issues.push({
          ruleId: this.id,
          name: this.name,
          severity: this.severity,
          file: filePath,
          line: 1,
          message: "Stylesheet defines transitions/animations but contains no '@media (prefers-reduced-motion: reduce)' rule.",
          suggestion: "Add a token-level override: @media (prefers-reduced-motion: reduce) { :root { --duration-fast: 0.01ms; --duration-normal: 0.01ms; } }",
          snippet: "/* Missing @media (prefers-reduced-motion: reduce) guard */"
        });
      }
    }

    return issues;
  }
};
