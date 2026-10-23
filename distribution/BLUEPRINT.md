# `motion-lint` Distribution Blueprint & First Revenue Strategy

This blueprint outlines the zero-cost viral distribution strategy for `motion-lint` across developer ecosystems to drive package adoption, newsletter subscribers, Solana tips, and high-ticket design-engineering client leads to [https://nishant.world](https://nishant.world).

---

## 1. Positioning & Value Hook

- **The Villain**: Accidental 18 FPS mobile animation jank caused by `transition: all` and `height/top` reflows that go unnoticed on high-end M-series developer laptops.
- **The Solution**: `npx motion-lint src/` — an instant, zero-dependency CLI that scans codebases, scores compositor health, and outputs drop-in GPU-accelerated fixes.
- **The Companion Content**: Pairs seamlessly with Nishant's technical article: *"Why Your React Animations Feel Cheap (And How to Build 120 FPS Fluid Interfaces)"*.

---

## 2. Channel Playbooks

### Channel A: X (Twitter) Developer Thread (Targeting Frontend & Design Engineers)
- **Hook Tweet**: 
  > Stop writing `transition: all 0.3s ease`.
  > 
  > Animating `height` or `top` forces Blink/WebKit to recalculate layout for the entire DOM on every frame (an 8.3ms window at 120Hz). On an iPhone or Android, your animation collapses from 60 FPS to 18 FPS.
  > 
  > We built `motion-lint`, a zero-dependency CLI that audits your React/CSS codebase for compositor thrashing:
  > `npx motion-lint src/`
  > 
  > Here are the 4 compositor rules it enforces: 🧵👇
- **Media**: 15-second terminal demo GIF showing `npx motion-lint` catching `transition: all` and showing the ASCII score card + side-by-side Chrome DevTools performance trace.
- **Call-to-Action (Final Tweet)**:
  > Full breakdown on our compositor architecture: https://nishant.world
  > Try it on your repo: `npx motion-lint .`
  > If it helped you catch a layout bug, drop a tip to the Solana sponsor jar: `F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf`

### Channel B: Reddit (`r/webdev`, `r/reactjs`, `r/typescript`)
- **Title**: *I built a zero-dependency CLI (`motion-lint`) that catches layout-thrashing animations and enforces a 120 FPS compositor contract*
- **Content Outline**:
  1. The DevTools Performance recording realization (expanding accordion causing red layout shift bars).
  2. The distinction between Layout, Paint, and Composite stages.
  3. Why ESLint standard rules miss CSS / Tailwind `transition-all` reflows.
  4. Code before & after (top/height vs translate3d/scaleY).
  5. GitHub repo and link to deep-dive article on `nishant.world`.

### Channel C: Claude Code & OpenBot Plugin Ecosystem
- **Target Repositories**:
  - `anthropics/claude-code` community skills
  - `awesome-claude-skills` GitHub lists
  - OpenBot skill registry
- **Angle**: "Ensure AI coding agents write 120 FPS compositor-safe animations instead of default hallucinated `transition: all`."
- **Distribution**: Included `SKILL.md` in repository so any developer using Claude Code can install with one command:
  ```bash
  claude-code skills add blacurrant/motion-lint
  ```

### Channel D: npm Registry SEO
- **Keywords**: `motion`, `animation`, `compositor`, `framer-motion`, `120fps`, `web-vitals`, `design-engineering`, `linter`, `layout-thrashing`.
- **Command Line Hook**: Executable via `npx motion-lint` (zero installation friction).

---

## 3. Monetization & Revenue Funnel

```
          [Viral X Thread / Reddit Post / npx motion-lint Run]
                                   │
                                   ▼
             [Terminal CLI Banner / GitHub README / Article]
             Attribution: Nishant Choudhary | nishant.world
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
[Micro-Revenue / Sponsors]                           [High-Ticket Offerings]
• Solana Tip Jar ($1 - $25)                          • Design Engineering audits ($500-$2,500)
  `F9DJTXa6xP7mdG1niMNDhqcM3vDq8LZvg25JqJXGvDTf`     • Fractional Motion Architect consulting
• GitHub Sponsors & BuyMeACoffee                     • Enterprise custom linter ruleset
```
