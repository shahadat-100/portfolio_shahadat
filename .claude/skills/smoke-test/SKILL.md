---
name: smoke-test
description: >-
  Verify the Shahadat portfolio site still works after a change. Use after
  editing index.html, css/styles.css, js/main.js, or js/tailwind-config.js —
  or whenever the user says "test the site", "does it still work", "check the
  build", "smoke test", or "verify my changes". Starts the dev server, opens
  the page in the browser pane, and runs a fixed checklist.
---

# Portfolio smoke test

A fast manual regression pass for this single-page site. It has no unit-test
framework — verification is: does the page load clean and do the key pieces
still work.

## Steps

1. **Start the server** (or reuse it): `preview_start` with name `start`
   (launches `npm start` on port 3001). If it fails, check `.claude/launch.json`
   has `"port": 3001` matching `server.js`.
2. **Open** `http://localhost:3001` in the browser pane and wait ~4s for the
   preloader.
3. **Console**: `read_console_messages` with `onlyErrors: true` — must be empty.
   A `feDisplacement`/`lenis`/`emailjs` error means a script broke.
4. **Preloader**: the `#loading-screen` counts 0→100 then wipes up; afterward
   `document.getElementById('loading-screen').className` contains `hidden` and
   `window.lenis.isStopped === false` (scroll released).
5. **Hero**: `#hero-scramble` resolves to `BUILDING APPS` / `PEOPLE LOVE.`
   (all `.sc-char[data-final]` have `dataset.resolved === 'true'`), the binary
   particle `#hero-canvas` exists with non-zero width, and the stat grid shows
   iOS · Swift · UIKit / SwiftUI · MVC / MVVM · Combine · Fintech.
6. **Reveals on scroll**: `lenis.scrollTo` each section (`#projects`, `#about`,
   `#skills`, `#contact`); each section's `.fade-in` gets `visible` and its
   `<h2>` `.reveal-word` spans reach `opacity: 1`. If a section stays blank the
   reveal safety-net in `initRevealSafetyNet()` regressed.
7. **Nav**: clicking a nav `<a href="#…">` smooth-scrolls (Lenis) to the target;
   the mobile menu closes on click.
8. **Interactions**: project card opens the App Store modal (`openAppModal`);
   About tabs switch (`switchAboutTab`); Deadpool avatar tilts toward the
   pointer and shows a speech-bubble quote; chatbot `sendQuick('What is your
   tech stack?')` returns the SwiftUI/Combine/MVC/MVVM answer.
9. **Responsive**: `resize_window` to 390px wide — grid drops to a readable
   layout, no horizontal body scroll, marquee still animates.
10. **Reduced motion**: nothing to click here, but confirm the CSS block under
    `@media (prefers-reduced-motion: reduce)` still lists the marquee,
    `#loading-screen`, `.reveal-word`, and the reveal classes.

## Notes

- The browser pane in this environment often stops compositing when hidden —
  `requestAnimationFrame`, CSS transitions, and screenshots freeze. Prefer DOM
  assertions via `javascript_tool` over screenshots, and never `await` a bare
  `requestAnimationFrame` in a test script (it can hang). Use `setTimeout`.
- Report pass/fail per numbered step. Don't "fix" anything as part of the test —
  surface regressions and let the user decide.
