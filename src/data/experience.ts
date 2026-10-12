import type { Experience } from '@/types'

export const experience: Experience[] = [
  {
    role: 'UI/UX Design & Development Intern',
    company: 'Information Technology Institute, ICCP',
    date: 'Jan 2026 — Jun 2026',
    bullets: [
      'Mwasalaty: Led a 5-person team to ship a multimodal Cairo transit and QR-ticketing platform of 3 apps (rider PWA, admin dashboard, operator scanner PWA; 52 routes in total) across 5 Agile phases in Linear, and usability-tested it with 6 users (5 riders, 1 operator).',
      'Architected the 29-route rider app in Vue 3, TypeScript, and Pinia with accessible EN/AR interfaces (WCAG 2.1, full RTL), OpenTripPlanner journey planning, PayMob payments, and offline-first support via Workbox and IndexedDB that keeps 95% of core features usable offline.',
      'Built a large part of the Node.js back end: 50 REST endpoints across 7 route modules (trip planning, ticketing, payments, admin) over an 8-table Supabase PostgreSQL database with Supabase Auth; deployed on AWS EC2.',
      'Co-built an LLM trip assistant on the Gemini API (Gemini Flash) that classifies trip intent and extracts origin and destination from free-text requests.',
      'Completed hands-on design work in design systems, component libraries, usability testing, and WCAG accessibility.',
    ],
  },
  {
    role: 'Finance Intern',
    company: 'The Egyptian Airport Company',
    date: 'Aug 2024',
    bullets: [
      'Completed a cross-functional rotation across four departments, using Excel and Oracle ERP to turn raw data into structured reports — building the data literacy used to support design decisions with evidence.',
    ],
  },
  {
    role: 'WordPress Developer Intern',
    company: 'WAW-Book',
    date: 'Jul 2024',
    bullets: [
      'Designed and launched a fully responsive travel website (Island), owning layout, theming, visual hierarchy and the Amelia booking flow end to end.',
    ],
  },
  {
    role: 'Digital Banking & Fintech Intern',
    company: 'Commercial International Bank',
    date: 'Aug 2023 — Sep 2023',
    bullets: [
      'Evaluated the UX of digital banking products, fintech interfaces and AI-driven customer-facing tools at one of Egypt’s largest private banks, applying heuristic evaluation to identify usability gaps within an enterprise Agile environment.',
    ],
  },
]
