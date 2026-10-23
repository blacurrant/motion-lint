/**
 * Rule ML003: Missing will-change GPU Layer Promotion
 * Frequent transform or opacity animations without will-change may cause late texture rasterization stutters.
 */

module.exports = {
  id: 'ML003',
  name: 'missing-will-change',
  severity: 'info',
  description: 'Suggest will-change for heavy transform or opacity animations to promote elements to GPU layers.',
  url: 'https://nishant.world/works',

  check(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    const isCss = /\.(css|scss|sass|less)$/i.test(filePath);

    if (isCss) {
      let currentSelector = '';
      let hasTransformTransition = false;
      let hasWillChange = false;
      let selectorStartLine = 1;

      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.replace(/\/\*[\s\S]*?\*\//g, '').trim();

        if (trimmed.includes('{')) {
          currentSelector = trimmed.split('{')[0].trim();
          hasTransformTransition = false;
          hasWillChange = false;
          selectorStartLine = lineNum;
        }

        if (/transition\s*:.*transform/i.test(trimmed) || /animation\s*:/i.test(trimmed)) {
          hasTransformTransition = true;
        }

        if (/will-change\s*:/i.test(trimmed)) {
          hasWillChange = true;
        }

        if (trimmed.includes('}')) {
          if (hasTransformTransition && !hasWillChange && currentSelector && !currentSelector.startsWith('@')) {
            issues.push({
              ruleId: this.id,
              name: this.name,
              severity: this.severity,
              file: filePath,
              line: selectorStartLine,
              message: `Selector '${currentSelector}' animates transform but lacks 'will-change: transform'.`,
              suggestion: "Add 'will-change: transform;' to inform compositor ahead of time, preventing paint stutters on first interaction.",
              snippet: currentSelector
            });
          }
          currentSelector = '';
          hasTransformTransition = false;
          hasWillChange = false;
        }
      });
    } else {
      // In JSX/TSX components
      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        if (/transition\s*:\s*['"][^'"]*transform/i.test(trimmed) && !/willChange/i.test(content)) {
          issues.push({
            ruleId: this.id,
            name: this.name,
            severity: this.severity,
            file: filePath,
            line: lineNum,
            message: "Inline transform transition lacks 'willChange: \"transform\"' GPU layer promotion.",
            suggestion: "Add willChange: 'transform' to avoid paint re-rasterization on gesture initiation.",
            snippet: trimmed
          });
        }
      });
    }

    return issues;
  }
};
