/**
 * Automated code patches for common motion anti-patterns
 */

function generatePatch(content, issue) {
  // If rule is ban-transition-all
  if (issue.ruleId === 'ML002') {
    return content.replace(/(?:transition|transition-property)\s*:\s*all\s*([^;]*);/gi, (match, rest) => {
      return `/* motion-lint: replaced transition: all */\n  transition: transform ${rest.trim() || '200ms ease'}, opacity ${rest.trim() || '200ms ease'};`;
    });
  }

  // If rule is layout-thrashing top/left to transform
  if (issue.ruleId === 'ML001') {
    return content
      .replace(/top\s*:\s*100%;/gi, 'transform: translate3d(0, 100%, 0);')
      .replace(/top\s*:\s*0(?:px)?;/gi, 'transform: translate3d(0, 0, 0);')
      .replace(/transition\s*:\s*top\s+([^;]+);/gi, 'transition: transform $1;');
  }

  return content;
}

module.exports = {
  generatePatch
};
