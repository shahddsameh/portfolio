# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio for Shahd Sameh Ahmed (UI/UX designer): Vue 3 + TypeScript + Vite + Vue Router, styled with a hand-written token system in `src/styles.css` (Tailwind is loaded but used only for its base/utilities, e.g. `sr-only`). Deployed to Vercel as an SPA.

## Commands

```bash
npm run dev        # Vite dev server
npm run typecheck  # vue-tsc --noEmit -p tsconfig.app.json
npm run build      # typecheck + vite build (output: dist/)
npm run preview    # serve dist/ — use this, not dev, for timing/perf checks
```

There is no linter and no test suite. Verification is `typecheck` + `build`, then checking routes at desktop and mobile widths in both themes, with keyboard navigation and reduced motion (see README "Verification").

`VITE_CONTACT_FORM_ENDPOINT` (in `.env.local`) is the only env var; the contact form accepts a JSON POST endpoint (e.g. Formspree). Without it the form validates but tells visitors to email instead of faking success. Never put secrets in `VITE_` vars — they ship to the browser.

## Architecture

- **Content lives in `src/data/*.ts`** (`profile`, `projects`, `experience`, `services`, `skills`), typed by `src/types.ts`. Views and components render from these; don't hardcode repeated content in templates. `Project.slug` is a closed union (`mwasalaty | inneraura | service-hub`) that is mirrored in the router regex in `src/router.ts` — adding a project means updating the type, the data, the route pattern, and `public/sitemap.xml`.
- **Routing** (`src/router.ts`): every view is lazy-loaded; `/projects/:slug` renders the single data-driven `ProjectView.vue`. `vercel.json` rewrites extension-less paths to `index.html` and caches `/assets/*` immutably.
- **SEO** is done client-side by `useSeo()` (`src/composables/useSeo.ts`), called per view: it sets title, description, OG/Twitter meta, canonical, and an optional JSON-LD `<script id="page-schema">`. The production domain `https://shahd.site` is hardcoded there, in `HomeView.vue`'s schema, and in `public/robots.txt` / `public/sitemap.xml`.
- **Theming**: light/dark tokens are CSS variables on `:root` and `:root[data-theme='dark']` in `src/styles.css`: `--bg`, `--surface`, `--surface-strong`, `--text`, `--muted`, `--accent`, `--accent-contrast`, `--border`, `--shadow`, `--danger`, `--success`, plus the shared `--ease`. `DESIGN.md` documents the visual system and its rules. An inline script in `index.html` sets `data-theme` before paint (from `localStorage['shahd-theme']` or `prefers-color-scheme`); `useTheme()` holds a module-level `currentTheme` ref shared by all callers and also updates `<meta name="theme-color">`.
- **Styling**: almost all styles are global, BEM-ish classes in `src/styles.css` (one file, with `@media (max-width: 900px)` and `(max-width: 600px)` blocks at the end and a global `prefers-reduced-motion` block that neutralises animations). Fonts are Cormorant Garamond (display: h1/h2, `.lead`, numerals) and Manrope (body), loaded from Google Fonts in `index.html`.
- **Motion**: `@motionone/vue` `<Motion>` for the hero entrance in `HomeView.vue`; `RevealOnScroll.vue` wraps whole home sections (IntersectionObserver → `.reveal.is-visible`). Every effect must have a static path under `prefers-reduced-motion: reduce`.
- **Assets**: app images are optimized WebP under `public/images/` (originals kept under `screenshots/` and `materials/`); the CV is `public/files/Shahd_Sameh_CV.pdf` and must not be altered.

`CODEX_PROMPT.md` is the original full product spec (page-by-page content, accessibility, performance, SEO requirements) — consult it before changing page structure or case-study copy.

## Content and identity rules

These come from the spec and from the owner, and override stylistic judgment:

- **Contribution honesty**: never present Shahd as the sole or visual designer where design was shared; follow the "Accurate role description" / "Personal contributions" sections of `CODEX_PROMPT.md` per project. Don't claim unverified features or present unsourced statistics as fact. The Mwasalaty admin dashboard must never get access instructions or secrets anywhere (UI, source, README, screenshots).
- **Do not invent text**: no new bio lines, skills, stats, or project copy — content comes from `src/data/*` or from the owner.
- **Keep the identity**: use only the existing CSS variables (both themes), the two fonts, and the shared easing `var(--ease)` (`cubic-bezier(.22,1,.36,1)`). Enhancements should not change layout, spacing, or tone (editorial, calm). Ask before adding dependencies.
- Use real product captures only — no stock imagery or blurry video frames as project screenshots.
