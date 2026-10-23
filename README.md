# `motion-lint`

> **120 FPS Compositor Contract & Motion Auditor for React, Vue, Svelte, and CSS.**
> Enforce zero-reflow transforms, tokenized spring physics, and eliminate animation jank in CI/CD and AI agent workflows.

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/motion-lint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Author: Nishant Choudhary](https://img.shields.io/badge/Author-Nishant%20Choudhary-00f0ff.svg)](https://nishant.world)
[![Solana Sponsor](https://img.shields.io/badge/Solana-Sponsor-9945FF.svg)](https://explorer.solana.com/address/F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf)

---

## Why `motion-lint`?

Most web animations feel cheap not because of poor design taste, but because of **accidental main-thread layout thrashing**. 

Animating `height`, `width`, `top`, or using `transition: all` forces the browser's Blink/WebKit engine to recalculate layout geometry for the entire DOM on every single animation frame (an 8.3ms window at 120Hz). On desktop M-series Macs, brute CPU conceals the damage; on mobile devices and battery-saver mode, frame rates drop to a stuttering 18 FPS.

`motion-lint` performs instant static analysis on your components and stylesheets, scoring your codebase from 0 to 100 with actionable compositor-safe fixes.

Read the engineering thesis: [**Why Your React Animations Feel Cheap (And How to Build 120 FPS Fluid Interfaces)**](https://nishant.world/journey).

---

## Quick Start

Run instantly with zero installation:

```bash
npx @blacurrant/motion-lint src/
```

Or install as a dev dependency in your project:

```bash
npm install -D motion-lint
# or
pnpm add -D motion-lint
```

Add to `package.json`:

```json
{
  "scripts": {
    "lint:motion": "motion-lint src/ components/ styles/"
  }
}
```

---

## Rules Enforced

| Rule ID | Name | Severity | Description |
| :--- | :--- | :--- | :--- |
| **`ML001`** | `layout-thrashing` | **Error** | Flags animating layout properties (`height`, `width`, `top`, `left`, `margin`, `padding`). Suggests `transform: translate3d/scale` or `clip-path`. |
| **`ML002`** | `ban-transition-all` | **Error** | Flags `transition: all` and Tailwind `transition-all` which cause accidental reflows on viewport resize. |
| **`ML003`** | `missing-will-change` | **Info** | Detects active transform transitions lacking `will-change: transform` GPU layer promotion. |
| **`ML004`** | `cheap-easing` | **Warn** | Flags `linear` or default symmetric browser `ease` curves. Suggests tokenized asymmetric cubic beziers. |
| **`ML005`** | `reduced-motion` | **Warn** | Verifies root `@media (prefers-reduced-motion: reduce)` accessibility token collapse. |
| **`ML006`** | `framer-springs` | **Warn** | Audits Framer Motion spring physics (flags muddy high-damping values > 50). |

---

## Output Example

```text
◆ MOTION-LINT v1.0.0 — 120 FPS Compositor Contract & Motion Linter
  Enforcing zero-reflow transforms, tokenized spring physics, and fluid web UI

● src/components/Drawer.jsx
   REF_ERR  L9: [ML001] Framer Motion animating layout property 'height' on main thread.
     › animate={{ height: isOpen ? 320 : 0 }}
     → Fix: Replace 'height' with scaleX/scaleY or use Framer Motion's GPU-accelerated 'layout' / 'layoutId' prop.

   WARN  L6: [ML002] Tailwind 'transition-all' triggers layout calculations on unexpected DOM shifts.
     › <div className="drawer-container transition-all">
     → Fix: Replace 'transition-all' with 'transition-transform' or 'transition-opacity'.

----------------------------------------------------------------------
MOTION HEALTH AUDIT:
  Files Scanned:   18
  Motion Score:    88/100 [Grade: A]
  Compositor Violations: 1 error, 2 warnings, 0 suggestions
  Scan Duration:   4ms

⚡ Built by Nishant Choudhary (Creative Developer & Design Engineer)
  Portfolio & Case Studies: https://nishant.world
  Solana Tip Jar / Sponsor: F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf
```

---

## Claude Code & OpenBot Skill Integration

`motion-lint` includes a native **Claude Code / OpenBot Skill** definition (`SKILL.md`). When installed in `.agents/skills/motion-lint` or Claude Code skills directory, AI coding agents automatically run `motion-lint` on generated frontend components to ensure they adhere to 120 FPS compositor standards before committing code.

---

## CI/CD GitHub Actions Integration

Fail PRs that introduce layout-thrashing animations:

```yaml
name: Motion Health CI
on: [push, pull_request]

jobs:
  audit-motion:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx @blacurrant/motion-lint src/ --format=json
```

---

## Support & Attribution

Crafted by **Nishant Choudhary** — Design Engineer & Creative Developer specializing in GPU shaders, motion systems, and SaaS frontend architecture.

- **Portfolio**: [https://nishant.world](https://nishant.world)
- **Twitter / X**: [@nishantcy](https://x.com/nishantcy)
- **GitHub**: [@blacurrant](https://github.com/blacurrant)
- **Solana Tip Jar & Sponsor Address**: `F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf`
