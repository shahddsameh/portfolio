# PwC Middle East — Mobile UX Concept (case study content)

Source of truth for the PwC project card and case-study page. Use this wording as written. Do not add facts, numbers or claims that are not in this file.

## Project card

- Title: PwC Middle East — Mobile UX Concept
- Role label: Solo · UI/UX design (Figma)
- Year: 2026
- One-line summary: Redesigning three PwC Middle East pages for phones: Home, Egypt offices and Careers.
- Cover image: /public/projects/pwc/cover.webp
- Link: the case-study page (until it's built: Behance)

## Case-study page

Keep it short: 6 sections, no repeated "Case study" label on every section, end with contact and CV links.

### Hero

- Title: PwC Middle East — Mobile UX Concept
- Lead: How quickly can someone reach what they came for on a phone? I explored that by redesigning three pages of PwC Middle East's website for mobile: Home, Egypt offices and Careers.
- Image: cover.webp (first screen must show work)
- Row: Role: UI/UX design · Team: Solo · Year: 2026 · Tool: Figma
- Buttons: "View on Behance" → https://www.behance.net/gallery/256733851/PwC-Middle-East-Mobile-UX-Concept
  · "Open Figma file" → https://www.figma.com/design/EZSnvdVcIHRdpgTzgcekpn/PwC-ME-%E2%80%94-Mobile-UX-Concept
- Note (small, under the row): Personal concept project. Not affiliated with, commissioned by or created for PwC.

### What I personally worked on

Everything: the audit, design decisions, design system and all screens. Solo project.

### 01 Starting with measurement

PwC's site is clean, consistent and rich in content. Before changing any visuals, I measured it at phone width.

| | Original | My concept |
|---|---|---|
| Home page length | 14+ screens | about 5.6 screens |
| Calling the Cairo office | 4 steps | 1 tap, on the first screen |

Images: original-home-length.webp (caption: "The original Home at phone width, about 14 screens"), offices-before-after.webp (caption: "Original offices page vs. my concept")

### 02 Key decisions

- Mobile-first 375px frames, keeping PwC's brand colours with more modern type and spacing.
- A flat accordion menu instead of drill-down navigation.
- Egypt offices: a map where tapping an office opens a bottom sheet with its details and a call button.
- Careers: segmented pills for the four audiences (Graduates & Interns, Alumni, UAE National, Egypt Tech Centre) and a sticky jump-to menu.
- An EN/AR language toggle, planned with right-to-left layout in mind.

Images: home-hero.webp, offices-cards.webp, offices-bottom-sheet.webp, careers-why-join.webp, careers-life.webp. Show phone screens in a row of plain frames, cropped to the top of each screen, with an "Open full screen" option that opens an in-page viewer (not a raw image tab). Extra screens available if needed: home-events.webp, home-topics-footer.webp, careers-what-we-look-for.webp, offices-original.webp.

### 03 A small design system

24 tokens, 10 text styles and 8 components in Figma. My early drafts had 3 different corner radii across 15 buttons; one Button component fixed that.

Image: design-system-components.webp (wide; let it scroll sideways on mobile inside its own container)

### 04 Tradeoffs and next steps

- Accordions make pages shorter, but they hide links behind a tap.
- My offices page covers Egypt only, while the original serves all 12 PwC Middle East countries.
- Next: Arabic right-to-left screens and testing with real users.

### End of page

Contact link and CV link, same as the other case studies.

## Images (already in /public/projects/pwc/)

All are WebP, exported from my Figma concept. Alt text:

- cover.webp: Three redesigned PwC mobile screens side by side: Home, Egypt offices and Careers.
- original-home-length.webp: The original PwC Middle East Home page at phone width, shown in five strips with the first screen outlined.
- offices-before-after.webp: The original offices page, a long text intro, next to the concept with the Cairo office details open in a bottom sheet.
- home-hero.webp: Concept Home page with a featured story and featured insights.
- home-events.webp: Concept Home section for events and webcasts.
- home-topics-footer.webp: Concept Home topics list and compact footer.
- offices-cards.webp: Concept Egypt offices page with office cards, Directions and Call office buttons.
- offices-bottom-sheet.webp: Concept map with the Cairo head office details in a bottom sheet.
- offices-original.webp: The original offices page at phone width.
- careers-why-join.webp: Concept Careers page with job search and audience pills.
- careers-life.webp: Concept Careers "Life at PwC" section.
- careers-what-we-look-for.webp: Concept Careers "What we look for" section.
- design-system-components.webp: Figma components: Button, Header, Accordion item, Sub-link, Tag, Chip, Tab and Language toggle.
