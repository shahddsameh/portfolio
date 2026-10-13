# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and design leads hiring junior UI/UX or product designers. They usually arrive from a CV, LinkedIn or Behance link, scan quickly, and decide whether Shahd is worth an interview. Front-end skill (Vue 3, TypeScript, Tailwind) is a selling point for design-to-development handoff. It is not a second career track the site has to pitch on equal terms.

Secondary: a hiring manager who has already shortlisted her and reads a case study in depth to check what she actually did.

## Product Purpose

A personal portfolio for Shahd Sameh Ahmed, a UI/UX designer based in Cairo (BSc Business Information Systems, Helwan University, 2025, GPA 3.95/4.0). It shows who she is, the projects she worked on and what she personally did on each, plus her experience, skills and CV.

A visit succeeds when it ends in an email, a contact-form message, or a CV download. Behance holds her standalone design work. The site links to Behance and does not copy that work.

## Positioning

Shahd is a UI/UX designer who can also build what she designs, and who is strict about crediting team work accurately. The case studies describe her own role on team projects precisely instead of inflating it. That honesty is part of the positioning.

Open tension, not yet resolved: the site is aimed at design hiring, but its three case studies are mostly engineering and leadership work (Mwasalaty: team lead and front-end integration; InnerAura: scheduling back end; Service Hub: front-end contribution). The site must not cover that gap by overstating her design role. Better design evidence has to come from her (for example Behance work) and must not be invented.

## Operating Context

- Visitors come through links on her CV, LinkedIn (`shahd-sameh21`), GitHub (`shahddsameh`) and Behance (`shahdsameh21`), and the site is reached at `https://shahd.site`.
- Recruiters scan on desktop and mobile. Some will read one case study closely.
- The CV PDF (`public/files/Shahd_Sameh_CV.pdf`) is a hiring document in its own right and is offered for download.
- The contact form posts to a configurable JSON endpoint (`VITE_CONTACT_FORM_ENDPOINT`). When no endpoint is set, the form tells visitors to email instead of faking success.

## Capabilities and Constraints

- Routes: `/`, `/projects`, `/projects/:slug` (`mwasalaty`, `inneraura`, `service-hub`), `/resume`, and a 404 page. Vue 3 + TypeScript + Vite SPA, deployed to Vercel.
- All content lives in `src/data/*.ts`, typed by `src/types.ts`. No new bio lines, skills, stats or project copy may be written. Content comes from the data files or from Shahd.
- **Mwasalaty role (confirmed 2026-10-11):** Shahd was Team Lead & Front-End Integration Developer. She was **not** the visual designer. Her personal contributions are the list in `src/data/projects.ts` and the "Accurate role description" in `CODEX_PROMPT.md`. The admin dashboard and live navigation are team outcomes and are not hers.
- **Known conflict to fix with the owner:** the Mwasalaty internship entry in `src/data/experience.ts` says she "owned end-to-end product design… to final developer-ready screens" and built the component library. That contradicts the confirmed role above and needs rewording by the owner. The CV PDF may say the same thing. It must not be altered here, so raise it with her.
- The Mwasalaty admin dashboard must never get access instructions, credentials or secrets anywhere (UI, source, README, screenshots). It may appear only as a protected reference link.
- InnerAura's therapist matching is rule-based scoring, not AI, and must not be described as AI.
- Theme (light/dark), keyboard navigation and reduced motion are supported product behavior and must keep working.

## Brand Commitments

- Name: Shahd Sameh Ahmed. Title: UI/UX Designer.
- Voice: calm, editorial, precise and plain-spoken. It states facts and does not hype.
- Credit honesty is binding: never present her as the sole or visual designer where design was shared or done by others, and never claim unverified features.

## Evidence on Hand

- Real product captures (WebP in `public/images/projects/`, originals in `screenshots/`):
  - Mwasalaty: route planning, results, details and natural-language search. Also its logo (owned by the project).
  - InnerAura: landing page.
  - Service Hub: home, freelancer profile and registration (the project is hidden from the site; its content and images are kept in the repo).
- Portrait: `public/images/profile/shahd-portrait.png`.
- CV PDF, plus the Mwasalaty presentation in `materials/`.
- Public links are listed in `PROJECT_LINKS.md`: the live Mwasalaty passenger app and operator scanner, GitHub repos, the Mwasalaty Figma Make file, and LinkedIn demo posts.
- **Absent, and must not be fabricated:** testimonials, metrics or outcomes, user research, usability-test results, process artifacts (wireframes, flows, design-system files) for any case study, clean InnerAura app frames, and stock or placeholder imagery presented as product.

## Product Principles

1. **Accurate credit beats impressive claims.** Every role statement must hold up if the reader asks a teammate.
2. **Make the recruiter's decision easy.** Who she is, what she did, and how to contact her or get the CV should be clear within seconds.
3. **Show real artifacts only.** Real captures and real links count as evidence. Anything missing is left missing, not simulated.
4. **Design first, build as the advantage.** Frame her as a designer whose implementation skill makes handoff smooth.

## Accessibility & Inclusion

Target is WCAG 2.1 AA (from the spec): keyboard-navigable, works with screen readers, holds up in both themes, and every motion effect has a static path under `prefers-reduced-motion`. She also designs bilingual EN/AR interfaces with RTL support professionally, but the portfolio itself is English-only.
