/**
 * Rule ML001: Ban Layout Thrashing
 * Animating layout properties (height, width, top, left, margin, padding, etc.)
 * forces reflow on every frame. Use transform (translate/scale) or clip-path instead.
 */

const LAYOUT_PROPERTIES = [
  'height',
  'max-height',
  'min-height',
  'width',
  'max-width',
  'min-width',
  'top',
  'bottom',
  'left',
  'right',
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right'
];

module.exports = {
  id: 'ML001',
  name: 'layout-thrashing',
  severity: 'error',
  description: 'Prohibit animating or transitioning geometric layout properties that cause browser reflows.',
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      // Strip comments
      const stripped = line.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '').trim();
      if (!stripped) return;

      // Check CSS transition: property
      const transitionMatch = stripped.match(/(?:transition|transition-property)\s*:\s*([^;]+)/i);
      if (transitionMatch) {
        const val = transitionMatch[1].toLowerCase();
        for (const prop of LAYOUT_PROPERTIES) {
          const propRegex = new RegExp(`\\b${prop}\\b`, 'i');
          if (propRegex.test(val)) {
            issues.push({
              ruleId: this.id,
              name: this.name,
              severity: this.severity,
              file: filePath,
              line: lineNum,
              message: `Animating layout property '${prop}' triggers full DOM reflow/layout pass every frame.`,
              suggestion: getAlternative(prop),
              snippet: stripped
            });
          }
        }
      }

      // Check Framer Motion / React inline animate={{ height: ... }}
      const animateMatch = stripped.match(/animate=\{\s*\{([^}]+)\}\s*\}/);
      if (animateMatch) {
        const propsStr = animateMatch[1];
        for (const prop of LAYOUT_PROPERTIES) {
          const camel = toCamelCase(prop);
          const regex = new RegExp(`\\b(?:${prop}|${camel})\\s*:`, 'i');
          if (regex.test(propsStr)) {
            issues.push({
              ruleId: this.id,
              name: this.name,
              severity: this.severity,
              file: filePath,
              line: lineNum,
              message: `Framer Motion animating layout property '${prop}' on main thread.`,
              suggestion: `Replace '${prop}' with scaleX/scaleY or use Framer Motion's GPU-accelerated 'layout' / 'layoutId' prop.`,
              snippet: stripped
            });
          }
        }
      }
    });

    return issues;
  }
};

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function getAlternative(prop) {
  if (['top', 'bottom', 'left', 'right', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'].includes(prop)) {
    return `Replace '${prop}' with 'transform: translate3d(x, y, 0)' to execute strictly on GPU compositor.`;
  }
  if (['height', 'max-height', 'min-height'].includes(prop)) {
    return `Replace '${prop}' with 'transform: scaleY(...)' or 'clip-path' with fixed bounding container.`;
  }
  if (['width', 'max-width', 'min-width'].includes(prop)) {
    return `Replace '${prop}' with 'transform: scaleX(...)' or 'clip-path'.`;
  }
  return `Promote to GPU compositor with 'transform' and 'opacity'.`;
}
