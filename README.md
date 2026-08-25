# Shahd Sameh — Portfolio

A production-oriented Vue 3 portfolio for Shahd Sameh Ahmed, designed as an editorial experience with explicit project-contribution boundaries.

## Stack

- Vue 3, TypeScript, Vite, and Vue Router
- Tailwind CSS design pipeline with a custom token system
- Motion One for controlled hero animation
- Lucide icons
- Configurable contact-form endpoint
- Vercel SPA routing

## Run locally

```bash
npm install
npm run dev
```

Type-check and create a production build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Contact form

Copy `.env.example` to `.env.local` and set:

```text
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

The endpoint should accept a JSON `POST`. Do not place API secrets in any `VITE_` variable because Vite exposes those values to browser code. When the endpoint is absent, the form validates normally and directs visitors to email Shahd instead of reporting a false success.

## Assets

The supplied CV, portrait, and Mwasalaty logos are stored under `public/`. The original PDF is copied without alteration.

Real product captures are stored alongside each project and presented in the case-study galleries. The supplied PNG files are preserved, while optimized WebP derivatives are used by the application:

- Mwasalaty: route planner, route results, route details, and natural-language assistant
- InnerAura: complete landing page
- Service Hub: homepage, freelancer profile/discovery, and registration

Additional screenshots would still strengthen the following sections:

- Mwasalaty: payment/ticket wallet, operator scanner, and admin overview
- InnerAura: assessment, booking, therapist availability, and rescheduling/refund
- Service Hub: the populated-email contact result after chat initiation

Do not add admin credentials, secrets, or protected access instructions to assets or source code.

## Deployment

The project is prepared for Vercel:

1. Import the repository into Vercel.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Add `VITE_CONTACT_FORM_ENDPOINT` in project environment variables.
4. Deploy, then connect `shahd.me`.

`vercel.json` rewrites application routes to `index.html`, while static files remain directly cacheable. `robots.txt`, `sitemap.xml`, canonical metadata, Open Graph metadata, Twitter metadata, and route-specific JSON-LD are included.

## Verification

Before release:

- Run `npm run typecheck` and `npm run build`.
- Verify all routes at desktop and mobile widths.
- Check both themes, keyboard navigation, reduced motion, form validation, and the CV download.
- Add future screenshots only when they are real product captures.
- Configure the contact endpoint and complete one real submission test.
