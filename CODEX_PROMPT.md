Build a complete production-ready personal portfolio website for Shahd Sameh Ahmed.

The website must be built as a real Vue application, not a static mockup.

## Primary objective

Create a distinctive editorial-style portfolio that presents Shahd as a multidisciplinary candidate targeting:

- UI/UX Design
- Product Design
- Responsive Web Design
- Front-End Development
- Software Engineering

The portfolio should balance strong visual design with clear technical credibility. It must not present Shahd as the sole designer of projects where the design work was shared or handled by other team members.

## Technology stack

Use:

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Vue Router
- Composition API with `<script setup lang="ts">`
- Motion One or GSAP for animation
- Iconify or Lucide icons
- Local storage for theme persistence
- Formspree, EmailJS, or a configurable API endpoint for the contact form

Use Pinia only if genuinely required.

The application must be responsive, accessible, maintainable, and structured as a production project.

## Domain and deployment

The intended production domain is:

shahd.me

Prepare the application for deployment to Vercel first.

Expected routes:

- /
- /projects
- /projects/mwasalaty
- /projects/inneraura
- /projects/service-hub
- /resume

Add proper SPA routing support for Vercel.

## Visual direction

Create a modern editorial portfolio inspired by fashion-editorial, graphic-design, and UI/UX portfolio layouts.

Reference direction:

- Large editorial typography
- Strong hierarchy
- Controlled asymmetry
- Layered paper-card compositions
- Warm neutral backgrounds
- Deep charcoal dark mode
- Burgundy accent color
- Thin rules and decorative lines
- Subtle paper textures
- Oversized section numbers
- Small labels and metadata
- Large project screenshots
- Magazine-style compositions
- Minimal scrapbook details such as paperclips, clipped cards, torn-paper edges, and dotted patterns
- Elegant rather than playful
- Expressive but still easy for recruiters to scan

Avoid:

- Generic SaaS-template appearance
- Excessive rounded cards
- Bright gradient-heavy visuals
- Glassmorphism everywhere
- Overloaded animations
- Cartoonish scrapbook styling
- Fake metrics
- Fake testimonials
- Invented user research
- Invented project outcomes
- Claiming Shahd designed interfaces she did not design

## Color direction

Create a reusable design-token system.

Suggested light theme:

- Background: warm off-white
- Secondary background: light beige
- Text: deep charcoal
- Muted text: warm gray
- Accent: burgundy or deep muted red
- Borders: soft gray-beige

Suggested dark theme:

- Background: deep charcoal
- Secondary background: slightly lighter charcoal
- Text: warm off-white
- Muted text: muted gray
- Accent: burgundy or muted rose
- Borders: dark neutral gray

Do not use pure white or pure black as the primary page background.

## Typography

Use a strong serif and sans-serif combination.

Suggested direction:

- Editorial serif for large headings
- Clean modern sans-serif for body text, navigation, labels, and metadata

Use free web fonts that can be loaded through Google Fonts or included safely in the project.

Potential pairings:

- Cormorant Garamond with Inter
- Instrument Serif with Manrope
- Playfair Display with DM Sans

Choose one pairing and use it consistently.

## Theme behavior

Support both light and dark modes.

Requirements:

- Default to the visitor’s system preference
- Include a visible theme switcher
- Store manual preference in local storage
- Avoid flashing the wrong theme during initial loading
- Maintain visual quality in both modes
- Add appropriate `aria-label` values
- Respect reduced-motion preferences

## Global navigation

Desktop navigation:

- Home
- About
- Projects
- Services
- Résumé
- Contact

Behavior:

- About, Services, and Contact scroll to sections on the homepage
- Projects opens the dedicated projects page
- Résumé opens the dedicated résumé page
- Sticky or semi-sticky header
- Mobile navigation drawer
- Visible theme toggle
- Download CV button

## Homepage structure

### 1. Hero section

Create a strong editorial hero.

Content:

Name:
Shahd Sameh Ahmed

Primary title:
UI/UX-Focused Front-End Developer

Supporting positioning:
I combine product thinking, interface development, and technical implementation to build accessible digital products from concept to deployment.

Target roles may appear as an animated or rotating label:

- UI/UX Design
- Product Design
- Front-End Development
- Software Engineering

Hero actions:

- View Projects
- Download CV
- Contact Me

Use the supplied edited portrait.

Portrait treatment:

- Display it as a slightly tilted editorial paper/photo card
- Include a subtle paperclip
- Use soft shadows
- Use minimal dotted or torn-paper details
- Do not place a circle behind the person
- Maintain a clean off-white portrait background
- Do not overdecorate the photo

Add subtle introduction animation when the page loads.

### 2. About section

Use this biography:

I’m a UI/UX-focused front-end developer with a background in Business Information Systems and hands-on experience in designing and building responsive digital products. I enjoy turning complex ideas into clear, accessible, and visually engaging experiences using tools such as Figma, Vue.js, TypeScript, and Tailwind CSS. I recently led a five-person team in developing and deploying Mwasalaty, a multimodal Cairo transit platform.

Keep the About section concise.

Include a small details grid:

- Based in Cairo, Egypt
- BSc in Business Information Systems
- Helwan University
- Graduated in 2025
- GPA: 3.95/4.0
- Arabic: Native
- English: Professional working proficiency
- French: Beginner

The résumé confirms the degree, university, dates, and GPA. :contentReference[oaicite:0]{index=0}

### 3. Featured projects

Show only the three strongest projects:

1. Mwasalaty
2. InnerAura
3. Service Hub

Mwasalaty must be the largest and most prominent card.

Use an asymmetrical project layout rather than three identical cards.

Each project card should include:

- Project name
- Short description
- Role
- Year
- Technology tags
- Main image
- View case study link
- GitHub or live-demo link when available

Add tasteful hover effects and image movement.

### 4. Services section

Show these services:

- UI/UX Design
- Product Design
- Responsive Web Design
- Front-End Development
- Prototyping and Wireframing

Each service should have a concise description.

Suggested copy:

UI/UX Design:
Designing clear, accessible interfaces centered on user needs and practical product goals.

Product Design:
Turning product requirements and business logic into structured digital experiences.

Responsive Web Design:
Creating layouts that remain usable and visually consistent across screen sizes.

Front-End Development:
Building responsive interfaces using Vue, TypeScript, JavaScript, and modern CSS tools.

Prototyping and Wireframing:
Translating ideas into user flows, wireframes, and interactive prototypes before development.

### 5. Experience preview

Create a concise editorial timeline containing:

- UI/UX Development Intern, ITI — January 2026 to June 2026
- Finance Intern, The Egyptian Airport Company — August 2024
- WordPress Developer Intern, WAW-Book — July 2024
- Digital Banking and Fintech Intern, CIB — August 2023 to September 2023

The work history and dates are taken from the supplied CV. :contentReference[oaicite:1]{index=1}

Add a link to the full résumé page.

### 6. Contact section

Create a two-column contact section.

Left side:

- Short invitation to collaborate
- Email
- Phone number
- LinkedIn
- GitHub
- Behance

Use:

Email:
s.samehahmed2003@gmail.com

Phone:
+20 112 123 8913

LinkedIn:
https://linkedin.com/in/shahd-sameh-21

GitHub:
https://github.com/shahddsameh

Behance:
https://behance.net/shahddsameh

These details are present in the supplied CV. :contentReference[oaicite:2]{index=2}

Right side:

Contact form fields:

- Name
- Email
- Subject
- Message
- Send Message button

The form should send submissions to:

s.samehahmed2003@gmail.com

Contact-form requirements:

- Client-side validation
- Accessible labels
- Clear loading, success, and error states
- Hidden honeypot field
- Basic rate-limit protection where supported
- Do not expose secrets in the front end
- Keep the form-provider configuration in environment variables

## Projects listing page

Create a dedicated Projects page.

Projects:

- Mwasalaty
- InnerAura
- Service Hub

Do not feature Island as a portfolio case study because usable assets are currently unavailable.

Island may remain mentioned only in the résumé experience under WAW-Book.

Include filters only if they add real value. Do not create unnecessary filtering for three projects.

## Mwasalaty case-study page

### Project information

Name:
Mwasalaty

Subtitle:
A multimodal Cairo transit-planning and digital-ticketing platform.

Year:
2026

Team size:
Five members

Shahd’s role:
Team Lead and Front-End Integration Developer

Do not describe Shahd as the visual designer.

### Accurate role description

Use:

Led a five-person team by assigning tasks, tracking progress, and coordinating delivery. Defined the project’s business logic and researched available Cairo transit data. Personally implemented route retrieval, AI-powered natural-language route requests, JWT authentication, the payment flow, QR-code ticketing and validation, the operator scanning interface, IndexedDB caching, PWA functionality, and deployment.

### Personal contributions

Display clearly:

- Team leadership and task coordination
- Product and business logic
- Cairo transit-data research
- Route retrieval
- Natural-language route requests using AI
- JWT authentication
- Payment flow
- QR-code ticket generation
- QR-ticket validation
- Operator scanning interface
- IndexedDB caching
- PWA and offline functionality
- Deployment and cloud configuration

Do not list the admin dashboard or live navigation under Shahd’s personal contribution.

### Project overview

Mwasalaty is an offline-first Progressive Web App that helps Cairo residents plan trips, navigate transit routes, and purchase digital tickets. The product includes a passenger application, an operator ticket scanner, an admin interface, a backend, and a custom Cairo routing engine.

The supplied presentation describes it as an end-to-end system covering the passenger app, operator scanner, admin app, and Cairo transit routing engine. :contentReference[oaicite:3]{index=3}

### Problem statement

Use this direction:

Cairo’s public-transit network is extensive but fragmented. Riders often rely on personal knowledge or word of mouth to understand routes, transfers, and fares. Existing mapping tools provide limited coverage of informal and semi-formal transit routes, while unreliable mobile connectivity creates additional difficulties.

Do not present unsupported statistics as verified facts unless they are clearly sourced in the case study.

### Target users

- Students
- Daily commuters
- Cairo residents
- Newcomers and visitors

These user groups appear in the supplied project presentation. :contentReference[oaicite:4]{index=4}

### Main platform areas

Explain and visualize:

1. Passenger application
2. Route-planning system
3. Natural-language route search
4. Payment and digital ticketing
5. QR-ticket wallet
6. Operator QR scanner
7. Offline caching
8. Admin dashboard
9. Backend and routing engine

### Completed features

Show:

- Route planning
- Natural-language route requests
- Digital ticketing
- Payment integration
- QR validation
- Operator scanner
- Offline-first experience
- Favorite places
- Support and notifications
- Live navigation
- Admin dashboard

Make it clear that some features were team contributions rather than Shahd’s individual work.

The presentation lists route planning, digital ticketing, offline support, favorite places, operator scanning, support, live navigation, and admin control as project features. :contentReference[oaicite:5]{index=5}

### Technical architecture

Show a clean architecture diagram connecting:

Passenger PWA
→ Vue 3 and TypeScript front end
→ Node.js and Express API
→ Authentication and database
→ OpenTripPlanner
→ GTFS and OpenStreetMap data
→ Payment provider
→ Ticketing system
→ Operator scanner
→ IndexedDB and service-worker cache

Use the actual confirmed technologies:

- Vue 3
- TypeScript
- Tailwind CSS
- Node.js
- Express
- Supabase
- OpenTripPlanner
- GTFS
- OpenStreetMap
- PayMob
- Groq
- IndexedDB
- Workbox
- AWS EC2

### Case-study sections

Use this order:

1. Hero
2. Project overview
3. My role
4. Problem
5. Target users
6. Product ecosystem
7. Route-planning flow
8. Natural-language search
9. Authentication
10. Payment and ticketing
11. Operator QR scanning
12. Offline-first strategy
13. Architecture and integrations
14. Team contributions
15. Challenges and limitations
16. Future improvements
17. Reflection
18. Project links

### Future improvements

Clearly label these as future concepts, not completed features:

- Live vehicle tracking
- Seat booking
- Voice-assistant support
- Operator usage analytics
- Social trip sharing
- Expanded city coverage

These are described as future features in the project presentation. :contentReference[oaicite:6]{index=6}

### Mwasalaty links

Passenger application:
https://mwasalaty.duckdns.org

Operator scanner:
https://operator.mwasalaty.duckdns.org

Admin dashboard:
https://mwasalaty.duckdns.org/admin

GitHub:
https://github.com/shahddsameh/mwasalaty

Figma:
https://www.figma.com/make/xrIBn7o6xvlqa0FJKseLak/mwaslaty-final-verson?t=IufxclSN6VpV0c4H-1

LinkedIn demo:
https://www.linkedin.com/posts/mennatallah-radwan-954097267_mwasalaty-graduationproject-iti-ugcPost-7482228936958107648-NJ84/

Security requirement:

- Never expose the admin secret
- Never include the default admin secret in the UI, source code, README, screenshots, or environment files
- Do not provide public access instructions for the protected admin dashboard
- Treat the admin URL as a project reference only

### Mwasalaty assets

Use:

- Supplied Mwasalaty logo
- Supplied PowerPoint presentation
- Screenshots from the live passenger app
- Screenshots from the operator app
- Screenshots from the admin dashboard only after authenticating securely
- Supplied Figma screens
- Demo-video frames only when direct screenshots are not available

Do not use blurry video screenshots when a clean application screenshot can be taken.

## InnerAura case-study page

### Project information

Name:
InnerAura

Subtitle:
An online therapy platform connecting users with suitable therapists.

Year:
2025

Team size:
Two members

Shahd’s role:
Full-Stack Developer

### Accurate role description

Use:

Developed the core appointment and therapist-scheduling system for InnerAura, including the database schema, backend APIs, booking, rescheduling, refunds, and therapist availability management. Also implemented a rule-based therapist recommendation assessment that scored user responses and suggested suitable therapists using predefined matching criteria.

### Personal contributions

- Appointment database tables
- Appointment backend APIs
- Therapist-availability database tables
- Therapist-availability form
- Therapist scheduling logic
- Booking workflow
- Rescheduling workflow
- Refund workflow
- Related front-end interfaces
- Rule-based therapist recommendation assessment
- Fixed scoring and matching criteria

Clarification:

- Shahd implemented the back end for the appointment, booking, rescheduling, refund, and therapist-availability features
- Shahd implemented the assessment front end and scoring flow
- Do not describe the recommendation system as AI or machine learning
- Do not claim Shahd built the full platform alone

### Project overview

InnerAura is a full-stack online therapy platform with multi-role support, therapist matching, appointment management, video communication, secure REST APIs, and a responsive accessible interface.

The CV lists Node.js, Express, PostgreSQL, Tailwind CSS, Jitsi API, JWT, and bcrypt among the project technologies and features. :contentReference[oaicite:7]{index=7}

### Technologies

- Node.js
- Express
- PostgreSQL
- Tailwind CSS
- Jitsi API
- JWT
- bcrypt
- REST APIs

### Case-study structure

1. Hero
2. Platform overview
3. My role
4. Problem
5. Main user journey
6. Therapist recommendation assessment
7. Booking flow
8. Therapist availability
9. Rescheduling and refunds
10. Backend and database work
11. Security
12. Team collaboration
13. Reflection
14. Demo link

### InnerAura assets

A LinkedIn demo video is currently the primary visual source.

LinkedIn demo:
https://www.linkedin.com/posts/shahd-sameh21_mentalhealthtech-nodejs-postgresql-activity-7348096270147682304-3O2r

Use screenshots manually exported from the best frames of the video.

Do not use generic therapy stock photography as a substitute for product screens.

## Service Hub case-study page

### Project information

Name:
Service Hub

Subtitle:
A freelancing platform connecting clients with freelancers.

Project type:
Team project

Shahd’s role:
Front-End Contributor

### Verified personal contribution

Use:

Contributed to a freelancing platform built with PHP, MySQL, JavaScript, and Bootstrap. Responsible for the freelancer profile pages and the chat initiation flow that automatically populated the selected freelancer’s email when a client started a conversation.

Do not claim additional features unless verified from the repository.

### Technologies

- PHP
- MySQL
- JavaScript
- Bootstrap

The CV identifies Service Hub as a freelancing platform built with these technologies. :contentReference[oaicite:8]{index=8}

### Repository

https://github.com/shahddsameh/Service-Hub

### Case-study length

Keep this project shorter and more visual than Mwasalaty and InnerAura.

Use these sections:

1. Overview
2. Team context
3. My contribution
4. Freelancer profile pages
5. Client-to-freelancer contact flow
6. Technologies
7. What I learned
8. GitHub link

Inspect the repository to recover verified screenshots and project details.

Do not infer ownership from file names or commit history unless it is clearly attributable.

## Résumé page

Create a dedicated web résumé.

Sections:

- Profile
- Education
- Experience
- Projects
- Skills
- Tools
- Soft skills
- Languages
- Download CV

Do not show Shahd’s phone number on the résumé page.

The phone number should appear only:

- In the downloadable CV
- In the contact section

### Résumé profile

Use:

UI/UX-focused front-end developer with a BSc in Business Information Systems and a 3.95 GPA, experienced in designing and delivering responsive, accessible, WCAG-compliant web applications from wireframe to deployment. Recently led a five-person team in completing and deploying Mwasalaty, a multimodal Cairo transit PWA, on AWS. Strong in Figma, Vue 3, TypeScript, Tailwind CSS, and JavaScript, with product thinking across the full software delivery lifecycle.

This profile is based on the supplied CV. :contentReference[oaicite:9]{index=9}

### Education

Helwan University
BSc in Business Information Systems
August 2021 – June 2025
GPA: 3.95/4.0

### Experience

#### UI/UX Development Intern
Information Technology Institute, ICCP
January 2026 – June 2026

Use concise bullets based on the CV and Mwasalaty contribution.

#### Finance Intern
The Egyptian Airport Company
August 2024

Use:

- Rotated across four departments
- Used Excel pivot tables, VLOOKUP, and data validation
- Used Oracle ERP
- Reconciled datasets
- Prepared cost reports
- Converted raw data into structured entries

#### WordPress Developer Intern
WAW-Book
July 2024

Use:

- Designed and launched a responsive travel website
- Worked with WordPress
- Integrated Amelia booking

Do not create a separate Island case study unless assets become available.

#### Digital Banking and Fintech Intern
Commercial International Bank
August 2023 – September 2023

Use:

- Analyzed digital-banking and fintech product experiences
- Reviewed AI/ML-powered customer-facing tools
- Gained exposure to enterprise Agile workflows

### Skills

UI/UX and Design:

- Figma
- Adobe Illustrator
- Adobe Photoshop
- Adobe Premiere Pro
- Wireframing
- Prototyping
- User flows
- Heuristic evaluation
- Design thinking
- User-centered design
- Responsive design
- WCAG 2.1
- Accessibility

Front-End:

- HTML5
- CSS3
- JavaScript
- TypeScript
- Vue 3
- Tailwind CSS
- Bootstrap
- WordPress
- PWA
- Workbox
- IndexedDB

Back-End and Data:

- Node.js
- Express
- PHP
- PostgreSQL
- MySQL
- REST APIs
- Python
- Pandas
- NumPy
- Matplotlib
- SQL
- Power BI
- Oracle

Tools and Platforms:

- Git
- GitHub
- Linear
- Agile
- Scrum
- Linux
- AWS EC2
- Microsoft Office
- Excel
- SEO

Soft skills:

- Team leadership
- Teamwork
- Presentation
- Communication
- Problem-solving
- Adaptability

The complete skills inventory comes from the supplied CV. :contentReference[oaicite:10]{index=10}

## Downloadable CV

Use the supplied PDF as the downloadable résumé.

Expected asset location:

public/files/Shahd_Sameh_CV.pdf

Use the button label:

Download CV

Do not alter the PDF content.

## Animation system

Use subtle controlled animation.

Include:

- Hero text reveal
- Portrait card entrance
- Section reveal on scroll
- Project-image parallax with minimal movement
- Project-card hover effects
- Page transitions
- Animated navigation underline
- Smooth theme transition
- Small button microinteractions

Requirements:

- Animations must not delay access to content
- Support `prefers-reduced-motion`
- Avoid large cursor-following effects
- Avoid excessive scroll hijacking
- Avoid long loading animations
- Keep transitions between 150 ms and 600 ms in most cases

## Accessibility

Target WCAG 2.1 AA.

Requirements:

- Semantic HTML
- Keyboard-accessible navigation
- Visible focus styles
- Skip-to-content link
- Correct heading hierarchy
- Accessible mobile menu
- Proper labels for all form fields
- Alt text for meaningful images
- Decorative images marked appropriately
- Sufficient color contrast
- Reduced-motion support
- Theme-toggle accessibility
- Do not rely only on color to communicate state
- Minimum comfortable touch-target size

## Responsiveness

Design for:

- Small mobile
- Large mobile
- Tablet
- Laptop
- Wide desktop

Avoid simply stacking every desktop section vertically.

Create thoughtful mobile compositions:

- Simplify decorative layers
- Reduce oversized typography appropriately
- Keep project imagery prominent
- Preserve editorial personality
- Avoid horizontal overflow
- Test navigation at narrow widths

## Performance

Requirements:

- Lazy-load project images
- Use responsive image sizes
- Prefer WebP or AVIF where practical
- Avoid loading all case-study assets on the homepage
- Split route bundles
- Minimize animation libraries
- Optimize font loading
- Add width and height attributes to images
- Prevent layout shifts
- Target strong Lighthouse performance

## SEO

Add:

- Unique title and description for every route
- Open Graph metadata
- Twitter card metadata
- Canonical URLs
- Sitemap
- robots.txt
- Semantic project information
- JSON-LD Person schema
- JSON-LD CreativeWork or SoftwareApplication schema for relevant projects

Suggested homepage title:

Shahd Sameh — UI/UX & Front-End Developer

Suggested homepage description:

Portfolio of Shahd Sameh, a UI/UX-focused front-end developer building accessible digital products with Vue, TypeScript, product thinking, and full-stack experience.

## Content and data architecture

Do not hardcode repeated project content across components.

Create typed data files, for example:

- src/data/profile.ts
- src/data/projects.ts
- src/data/experience.ts
- src/data/services.ts
- src/data/skills.ts

Create reusable TypeScript interfaces.

Suggested component structure:

- AppHeader
- MobileNavigation
- ThemeToggle
- HeroSection
- EditorialPortrait
- SectionHeading
- ProjectCard
- FeaturedProjectCard
- ProjectMetadata
- CaseStudySection
- TechnologyList
- ExperienceTimeline
- ServicesGrid
- ContactForm
- SocialLinks
- AppFooter
- PageTransition
- RevealOnScroll
- DownloadCvButton

## Asset structure

Use a clean structure such as:

public/
  files/
  images/
    profile/
    projects/
      mwasalaty/
      inneraura/
      service-hub/
  icons/

Do not use remote project images when local optimized assets are available.

## Required materials to place in the repository

Add these assets before implementation:

1. Edited portrait image without a circular background
2. Shahd’s CV PDF
3. Mwasalaty logo
4. Mwasalaty presentation
5. Mwasalaty desktop screenshots
6. Mwasalaty mobile screenshots
7. Operator scanner screenshots
8. Admin-dashboard screenshots
9. InnerAura demo screenshots
10. Service Hub screenshots recovered from the repository

Suggested filenames:

- public/images/profile/shahd-portrait.webp
- public/files/Shahd_Sameh_CV.pdf
- public/images/projects/mwasalaty/logo.webp
- public/images/projects/mwasalaty/hero.webp
- public/images/projects/mwasalaty/route-planning.webp
- public/images/projects/mwasalaty/natural-language.webp
- public/images/projects/mwasalaty/ticket.webp
- public/images/projects/mwasalaty/operator-scanner.webp
- public/images/projects/mwasalaty/admin-dashboard.webp
- public/images/projects/inneraura/hero.webp
- public/images/projects/inneraura/assessment.webp
- public/images/projects/inneraura/booking.webp
- public/images/projects/inneraura/availability.webp
- public/images/projects/service-hub/hero.webp
- public/images/projects/service-hub/profile.webp
- public/images/projects/service-hub/contact-flow.webp

## Footer

Include:

- Shahd Sameh Ahmed
- Short role statement
- Email
- LinkedIn
- GitHub
- Behance
- Back-to-top link
- Current year generated programmatically

## Error handling

Create:

- Custom 404 page
- Contact-form error state
- Image fallback behavior
- Safe handling for unavailable live-demo links

If a live application is unavailable, show the case study normally and label the link as temporarily unavailable rather than breaking the page.

## Quality requirements

Before considering the project complete:

- Run TypeScript checks
- Run production build
- Fix all build errors
- Fix all console errors
- Test every route
- Test light and dark modes
- Test mobile navigation
- Test keyboard navigation
- Test reduced-motion mode
- Test contact validation
- Verify the CV download
- Verify all external links
- Ensure no secrets are committed
- Ensure `.env` files are ignored
- Add an `.env.example`
- Add a clear README with installation and deployment instructions

## Final output

Deliver:

1. Complete Vue 3 and TypeScript source code
2. Responsive light and dark themes
3. Homepage
4. Projects listing page
5. Three project case studies
6. Résumé page
7. Contact form
8. Animations and transitions
9. SEO files
10. Vercel deployment configuration
11. README
12. `.env.example`

Do not stop after generating a plan. Inspect the available assets and existing repository, create the files, implement the application, run it, test it, and fix errors until the production build succeeds.