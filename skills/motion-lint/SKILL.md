---
name: motion-lint
description: Audit, lint, and refactor React, Vue, Svelte, and CSS animations to enforce the 120 FPS compositor contract, eliminate layout thrashing, and inject tokenized spring physics.
---

# `motion-lint` Agent Skill

Use this skill whenever building or refactoring UI components with animations, transitions, drawers, modals, accordions, or interactive micro-interactions.

## Why This Skill Exists

Default web animations frequently suffer from **layout thrashing**:
1. Animating `height`, `width`, `top`, `bottom`, `left`, `right`, `margin`, or `padding` forces Blink/WebKit to re-calculate layout geometry for the entire DOM tree on every single frame.
2. Blanket `transition: all` triggers unintended reflows during viewport resizes.
3. Lack of `prefers-reduced-motion` violates accessibility standards for vestibular sensitivity.

## Core Rules & Compositor Contract

1. **Only animate `transform` and `opacity`**:
   - Instead of animating `height: 0 -> 300px`, animate `transform: scaleY(0 -> 1)` or use a clipping container with `clip-path`.
   - Instead of animating `top: 100% -> 0`, animate `transform: translate3d(0, 100%, 0) -> translate3d(0, 0, 0)`.
2. **Promote active elements to GPU layers**:
   - Always include `will-change: transform` or `will-change: transform, opacity` on animated drawers, dialogs, and floating cards.
3. **Ban `transition: all`**:
   - Replace with explicit properties: `transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease;`
4. **Use Asymmetric Easing Tokens**:
   - Enter: `cubic-bezier(0.05, 0.7, 0.1, 1)` (snappy acceleration, gentle settle).
   - Exit: `cubic-bezier(0.3, 0, 0.8, 0.15)` (rapid exit without lingering).
5. **Enforce `prefers-reduced-motion` at root**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     :root {
       --duration-fast: 0.01ms;
       --duration-moderate: 0.01ms;
       --duration-deliberate: 0.01ms;
     }
   }
   ```

## How to Run Verification

Run the linter CLI on target files:
```bash
npx motion-lint <path-to-component-or-directory>
```

When reviewing or writing frontend code, run `motion-lint` to verify that the Motion Health Score achieves **Grade S or A (>= 90/100)** before delivering code.
