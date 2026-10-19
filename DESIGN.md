---
name: Shahd Sameh — Portfolio
description: An editorial proof sheet for a UI/UX designer. Warm newsprint, ink burgundy, serif display, ruled sections.
colors:
  ink-burgundy: "#7a2638"
  faded-ink: "#c67b8c"
  warm-newsprint: "#f4efe7"
  newsprint-fold: "#e9e1d5"
  newsprint-shade: "#ddd2c3"
  press-ink: "#292625"
  pencil-gray: "#645d58"
  proof-rule: "#cfc5b8"
  burgundy-ground-light: "#fff7ec"
  press-black: "#22201f"
  press-black-fold: "#2c2928"
  press-black-shade: "#363230"
  chalk: "#f1e9dd"
  ash-gray: "#b3aaa3"
  night-rule: "#4a4541"
  burgundy-ground-dark: "#211d1d"
  available-green: "#4d8a61"
  error-red: "#b13b3b"
  error-red-dark: "#d17676"
  success-green: "#377047"
  success-green-dark: "#4fa065"
  ink-well: "#292625"
  ink-well-dark: "#171514"
  band-text: "#f4efe7"
  band-text-dark: "#f1e9dd"
  band-muted: "#b3afa9"
  band-muted-dark: "#aba59d"
  band-accent: "#c67b8c"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(5rem, 8.8vw, 8.25rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.35rem, 4.8vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1
  lead:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.85rem)"
    fontWeight: 500
    lineHeight: 1.45
  numeral:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(4.5rem, 10vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.75
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.19em"
  control:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  none: "0"
spacing:
  gutter: "1.5rem"
  gutter-mobile: "1rem"
  section: "clamp(6rem, 11vw, 11rem)"
  case-section: "clamp(5rem, 9vw, 9rem)"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.1rem"
    height: "46px"
  button-accent:
    backgroundColor: "{colors.ink-burgundy}"
    textColor: "{colors.burgundy-ground-light}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.1rem"
    height: "46px"
  button-small:
    padding: "0.55rem 0.85rem"
    height: "39px"
  icon-button:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    size: "42px"
  input:
    backgroundColor: "{colors.warm-newsprint}"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.55rem"
  contact-panel:
    backgroundColor: "{colors.newsprint-fold}"
    padding: "clamp(1.5rem, 4vw, 3rem)"
---

# Design System: Shahd Sameh — Portfolio

## Overview

**Creative North Star: "The Editorial Proof"**

The site reads like a magazine spread at the proof stage. It sits on warm newsprint (or press black at night), uses big Cormorant Garamond display type, thin proof rules between every block, oversized section numbers in a barely-there tone, and burgundy marks where an editor would pencil corrections. Depth is printed: hard offset shadows like stacked card stock, a fine paper grain over the whole page, and a portrait clipped slightly askew on a tilted backing sheet. The tone is elegant and calm, never playful. The tactility is in the craft, not in props.

The proof is a **frame**, and the work inside it stays quiet. The tactile marks belong to the editorial chrome: the header, section numbers, the homepage project cards, the hero, the contact panel and the footer. Case-study pages step down into a calmer monograph register, with long ruled sections, generous measure and muted body text. Project screenshots are never marked up. The approved project-showcase extension below permits folded presentation, a static Home-only PwC phone preview and optional screenshot-layer inspection in their named surfaces; the rest of the system keeps its plain capture treatment.

The pages are dense but the eye has plenty of room. Each section opens with a heading paired with its number and closes with a rule. The grids are deliberately uneven: 1.16 / .84 in the hero, 1 / 3 in case sections, and a staggered third project card. That unevenness keeps the page editorial rather than templated, while the content still scans in seconds.

**Key Characteristics:**
- Warm two-theme paper world: Warm Newsprint by day, Press Black by night, both with grain.
- Serif display (Cormorant Garamond 600, tight -0.035em tracking) over a small, precise sans (Manrope).
- One accent, Ink Burgundy, used as an editor's mark: emphasis in headlines, underlines, focus rings, one primary button per view.
- Square portfolio corners; the physical PwC phone and its captured UI retain their rounded forms. Hairline 1px rules carry the structure.
- Hard print-offset shadows in the frame, never on top of the work.
- Motion is small and quick, and it always has a static path.

## Colors

A warm, low-chroma paper palette with a single deep burgundy accent. Each theme is a full set of tokens (`--bg`, `--surface`, `--surface-strong`, `--text`, `--muted`, `--accent`, `--accent-contrast`, `--border`, `--shadow`, `--danger`, `--success`) swapped on `:root[data-theme='dark']`. The easing token `--ease` is shared by both themes.

### Primary
- **Ink Burgundy** (light, `--accent`): the editor's mark. Used for `<em>` emphasis inside h1/h2, the hand-set underline under the hero name, nav underlines, focus outlines, list arrows, section and caption numerals in galleries, the accent button, the portrait note, and the contact panel's top rule. It reaches 8.5:1 on Warm Newsprint, so it is safe as text.
- **Faded Ink** (dark, `--accent`): the same role at night, lightened to pass 4.5:1 on Press Black (5.1:1) and on Press Black Fold (4.55:1).

### Neutral
- **Warm Newsprint** (light `--bg`): the page. It also sets `<meta name="theme-color">`.
- **Newsprint Fold** (light `--surface`): a second paper tone for full-bleed bands (the projects section, role section), the contact panel, and hover fills.
- **Newsprint Shade** (light `--surface-strong`): the ghost tone for oversized section numbers, the "PORTFOLIO" watermark, the 404 numerals, and the portrait's backing sheet. It is never used for readable text.
- **Press Ink** (light `--text`): body and heading text.
- **Pencil Gray** (light `--muted`): secondary copy, metadata, captions, dates. It holds 4.5:1 on Newsprint Fold as well as on the page.
- **Proof Rule** (light `--border`): every 1px rule and border, and the colour of the hard offset shadows.
- **Press Black / Press Black Fold / Press Black Shade / Chalk / Ash Gray / Night Rule**: the dark-theme counterparts of the six roles above, in that order.
- **Burgundy Ground** (`--accent-contrast`, light and dark): text placed on the accent fill.

### Ink Well (bands)
- **Ink Well** (`--band`, light and dark): the background of the footer and the Mwasalaty architecture band. It is darker than the page in both themes, so the band reads as a deep printed well rather than flipping to a bright slab at night. In dark mode a hairline edge (`--band-edge`) separates it from the page.
- **Band Text / Band Muted** (`--band-text`, `--band-muted`): text and secondary text on the well. Muted is 6.9:1 (light) and 7.5:1 (dark).
- **Band Accent** (`--band-accent`): the burgundy for `<em>`, list arrows and focus rings on the well. It is 4.7:1 (light) and 5.7:1 (dark), because the page accent fails on ink.
- **Band Rule / Band Ghost** (`--band-rule`, `--band-ghost`): hairlines and ghost numerals on the well.

### Signal
- **Error Red** (`--danger`) and **Success Green** (`--success`): contact-form validation and status messages. Both have a dark-theme value, and each passes 4.5:1 on its theme's page and fold.
- **Available Green** (hardcoded): the 7px availability dot in the hero kicker. It is decoration, so 3:1 is enough.

### Named Rules
**The Editor's Mark Rule.** Burgundy marks something, the way a correction is marked on a proof. Emphasis, focus, the one primary action, a numeral. It never floods a surface larger than a button or a 4px rule, and it never sits on a project screenshot.

**The Band Token Rule.** Anything placed on an ink-well band takes its colour from `--band-*`. Page tokens (`--accent`, `--muted`, `--surface-strong`) fail or glare on the well.

**The Ghost Numeral Rule.** Newsprint Shade exists for huge decorative type (section numbers, the watermark, the 404). Anything meant to be read uses Press Ink or Pencil Gray.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif). Weights loaded: 500, 600 and 700.
**Body Font:** Manrope (with Arial, sans-serif). Weights loaded: 400, 500, 600 and 700.

**Character:** A high-contrast literary serif set large and tight, over a small, wide-tracked geometric sans. The serif speaks and the sans annotates, like headline and caption.

### Hierarchy
- **Display** (600, clamp(5rem → 8.25rem), lh 1, -0.035em): the hero name only. Interior page titles use larger clamps (up to 10rem on intros, 13rem on case-study titles), and the 404 numerals reach 25rem.
- **Headline** (600, clamp(2.35rem → 4.6rem), lh 1): section h2s. An `<em>` inside turns Ink Burgundy at weight 500.
- **Title** (Cormorant, ~2rem): card, timeline and resume-entry headings. Project-card titles scale up to 4.7rem.
- **Lead** (Cormorant 500, clamp(1.25rem → 1.85rem), lh 1.45): intro paragraphs and case subtitles. Bio and role paragraphs switch to Manrope for readability at length.
- **Body** (Manrope 400, 15px, lh 1.7): running text. Long-form blocks cap at 62–70ch.
- **Label** (Manrope 700, 0.65–0.72rem, 0.08–0.19em tracking, uppercase): metadata, dt terms, form labels, dates, the scroll cue.
- **Control** (Manrope 700, 0.75rem, 0.04em): button and link text, set small and firm.

### Named Rules
**The Speak / Annotate Rule.** Cormorant sets anything meant to be felt: names, headlines, numerals, the lead, the mobile menu items. Manrope sets anything meant to be used: controls, metadata, body copy. Never set a control in the serif or a headline in the sans.

**The Two Fonts Rule.** Cormorant Garamond and Manrope are the whole type system. Don't add a third family, and don't use monospace as decoration.

## Layout

- **Container:** `min(1280px, 100% − 3rem)` (`.page-shell`), shrinking to a 1rem gutter under 600px. Full-bleed bands (header, footer, role and architecture sections) pad their content to the same 1280px column with `max(1.5rem, (100vw − 1280px) / 2)`.
- **Vertical rhythm:** home sections use `clamp(6rem, 11vw, 11rem)` padding, case sections `clamp(5rem, 9vw, 9rem)`. Section headings leave `clamp(3rem, 7vw, 6rem)` below their rule.
- **Grids are asymmetric by default:** hero 1.16fr / .84fr, about and contact .9 / 1.1, section heading 1 / 4 (numeral and title), case section 1 / 3, timeline 1 / 3, resume 1 / 4. The featured project spans the full width. The third project card drops 10rem (8rem on /projects) to stagger the column.
- **Breakpoints:** 900px collapses two-column grids to one and swaps the desktop nav for the menu button. 600px collapses the remaining grids, tightens the hero type, and sets gallery frames to 4:3.
- **Header:** sticky, 76px, a three-column grid (wordmark, centred nav, actions) on a 91% bg tint with blur.

## Elevation & Depth

Depth is printed by default. The approved selected-work artwork adds directional light and folded paper; elsewhere there are three devices:
1. **Hard offset shadows** in the Proof Rule colour, read as stacked card stock.
2. **Soft ambient shadows** (`--shadow`) only where a physical object floats: the portrait, its backing sheet, and the open mobile menu.
3. A **paper-grain overlay**: a fixed fractal-noise SVG over the whole page at low opacity, ignoring pointer events.

### Shadow Vocabulary
- **Press offset (small)** (`box-shadow: 4px 5px 0 var(--border)`): buttons on hover and on keyboard focus.
- **Press offset (card)** (`box-shadow: 8px 8px 0 var(--border)`): homepage and /projects project image frames only. These sit in the editorial frame.
- **Plain frame** (`border: 1px solid var(--border)`, no shadow): the case-study hero image and gallery frames.
- **Floating sheet** (`box-shadow: 0 18px 40px var(--shadow)` / `0 22px 50px var(--shadow)`): the portrait photo and its backing sheet, and the mobile menu.

### Named Rules
**The Frame, Not the Work Rule.** Tactile depth, tilt and burgundy belong to the editorial frame. On case-study pages the frame recedes. A product capture may sit in a plain frame, but nothing decorative is ever laid over it. The approved PwC Home preview uses a rounded physical phone shell with a soft shadow and a fixed visual navigation strip; this exception does not extend to portfolio cards or galleries.

**Approved exception:** the "Open full capture" chip on gallery frames stays. It is a functional affordance in the inverted ink colour, not decoration, and the owner chose to keep it. The burgundy "Screenshot pending" badge for placeholder frames is inactive, because no project uses a placeholder. Don't revive it.

**Approved project-showcase exception (2026-10-18):** selected work on `/` and `/projects` may print real capture crops onto one broad, continuous 3D paper sheet with unequal folds, fine grain, a paper border and directional lighting. Case-study pages alone may offer an explicit, reversible inspection of lifted screenshot details with soft ambient shadows. These exceptions do not extend to ordinary cards, galleries or screenshot annotations. Visual authority: `.impeccable/mocks/approved-folded-atlas.png`; approval and scope: the adjacent JSON file.

### Browser Surfaces
Text selection uses the accent fill with Burgundy Ground text. Scrollbars use Proof Rule on the page colour, and native controls take `accent-color: var(--accent)`.

## Shapes

Portfolio corners are square (`border-radius: 0`, explicitly reset on inputs). Structure comes from 1px Proof Rule hairlines: border-top and border-bottom on sections, rows and list items, and 1px boxes on tags, links and icon buttons. The 7px availability dot is round. The approved PwC Home preview alone uses a physical phone shell (34px radius) and inset screen (23px radius), including the rounded language treatment from the captured UI. These forms describe the phone and its screen; they do not introduce rounded portfolio cards or controls. Rotation is the one organic gesture and stays small: the portrait at +1.8°, its backing sheet at −4°, the portrait note at +4°, and the hero underline at −2°.

## Components

### Buttons
Pressed and precise. A square, hairline-ruled slip of type that lifts off the page as if pressed onto it.
- **Shape:** square, 1px Proof Rule border, 46px minimum height (39px for the small variant).
- **Default:** transparent fill with Manrope 700 at 0.75rem. An icon can sit inline with a 0.55rem gap.
- **Accent:** an Ink Burgundy fill and border with Burgundy Ground text. Use one per view, for its primary action: View projects, Send message, Download CV, Return home.
- **Hover / Focus:** lifts 3px and shows the small press-offset shadow. `:focus-visible` gets the same lift and shadow plus the global 3px accent outline at 4px offset. Under `prefers-reduced-motion` the lift is removed and the shadow alone marks the state.
- **Disabled / busy:** 60% opacity, a progress cursor, and no lift or shadow (for example while the contact form sends).
- **Icon button:** 42px square with a 1px border. Hover fills it with Newsprint Fold and lifts it 2px. Used for the theme toggle and the menu button.
- **Text link:** Manrope 700 at 0.78rem with a 1px currentColor underline. Its arrow icon nudges up and to the right on hover.

### Tags
- **Style:** a 1px Proof Rule box with no fill and 0.65rem text. Used for technology lists on cards and case studies.

### Cards / Containers
- **Project card:** not a box. It is an image frame (Newsprint Shade fill, 8px press offset, 16:10 crop anchored to the top) above an uppercase index label, a large Cormorant title, muted summary text, and tags. On hover the image scales to 1.025.
- **Contact panel:** a Newsprint Fold field with a 4px Ink Burgundy top rule and no other border.
- **Ink-well bands:** the footer and the architecture section sit on `--band` with `--band-text`. Their rules, ghost numerals, burgundy and focus rings all use the `--band-*` tokens, never page tokens.

### Inputs / Fields
- **Style:** square, with a 1px Proof Rule border, a Warm Newsprint fill inside the Newsprint Fold panel, and 0.85rem padding. Labels sit above in the uppercase label style.
- **Focus:** the global 3px Ink Burgundy outline at 4px offset.
- **Error:** an Error Red (`--danger`) message at 0.7rem below the field. The form status line uses `--danger` or `--success`.
- **Caret:** the accent colour.

### Navigation
- **Desktop:** Manrope 600 at 0.76rem with 0.06em tracking. A 1px burgundy underline wipes in from the left on hover and stays visible on the active route.
- **Wordmark:** Cormorant 700 at 1.7rem, with a small burgundy Manrope suffix.
- **Mobile (≤900px):** a menu button opens a full-width sheet under the header. Its links are Cormorant at 2rem, each separated by a hairline rule, and the sheet has the floating-sheet shadow.
- **Skip link:** a burgundy slip that drops in from above on focus.

### Signature: Section Heading
A ghost numeral in Newsprint Shade (clamp up to 8.5rem, lh 0.75) beside the h2. The pair sits on a 1fr / 4fr grid closed by a Proof Rule, so the section reads like a numbered magazine department. Case sections use the same numeral at a larger 10rem in their left column.

### Signature: Hero Portrait
The portrait hangs at +1.8° in front of a Newsprint Shade backing sheet at −4°, both with floating-sheet shadows. An italic Cormorant caption sits below, and a small burgundy note is pinned at +4°. It is the most tactile object on the site, and nothing else repeats it.

### Motion
The house easing is `--ease: cubic-bezier(.22, 1, .36, 1)`. Every CSS transition uses it, and the Motion One hero entrance (0.5s and 0.6s) uses the same curve. Other transitions are short (0.18s to 0.55s): scroll reveals rise 30px and fade in, page transitions move 12px, and the menu moves 10px. The role ticker loops for 22s and stops under reduced motion. Every effect has a static path under `prefers-reduced-motion`.

### Approved extension: Project Showcase

The shared selected-work collection keeps the existing palette, two fonts, square forms, burgundy emphasis, quiet captions and ruled project index. Its large Cormorant heading and artwork lead into real-text project identity, contribution, summary and case-study link; existing project data remains the content authority.

- **Mwasalaty:** a folded transport-map sheet supports unfold/refold by pointer or keyboard. Interface details lift only in the separate case-study inspection, never in the selected-work artwork.
- **PwC:** the real Home export alone sits inside a static rounded phone, approved in `.impeccable/mocks/approved-pwc-home-mobile.html`. A fixed visual navigation strip uses the cropped PwC wordmark, EN/Arabic treatment and Lucide search/menu icons; it is an `aria-hidden` presentation, not working product navigation. The labelled, focusable Home region scrolls natively by pointer, touch or keyboard, with a quiet Scroll to explore hint. Capture-specific white, ink and gray remain faithful in both portfolio themes. There are no page selectors, publication turns, original/redesign montage or phone motion; the existing case-study comparison remains separate.
- **InnerAura:** a smaller, height-bounded illustrative neutral calendar leaves room around the heading and rotates by rows into the real landing capture. The entire paper is a native button that toggles between calendar and website, alongside the explicit Rotate calendar / Return to calendar action. It does not represent booking availability.
- **Case navigation:** project-specific opening overlays show a connecting route and pin, access layers resolving into an opening, or rotating calendar days. Navigation loads behind the scene; readiness follows the actual hero image. Skip works while an image is pending, cancellation clears obsolete scenes, and late images cannot dismiss a later destination. Direct entry remains immediate.
- **Accessible enhancement:** reduced motion uses static artwork and immediate navigation. Sounds follow deliberate project gestures, including their completion cues, and respect the independently persisted mute preference. Optional GPU rendering loads lazily, renders on demand and falls back to a real static capture when unavailable.

## Do's and Don'ts

### Do:
- **Do** use the portfolio token variables in both themes. Preserve the capture-specific white, ink and gray inside the approved PwC Home phone preview. Check every new portfolio colour against Warm Newsprint and against Press Black.
- **Do** keep text on Faded Ink and Ink Burgundy at 4.5:1 or better.
- **Do** build structure from 1px Proof Rule hairlines and asymmetric grids, and keep portfolio corners square (`0`); preserve the physical PwC phone and captured UI exception.
- **Do** give every hover state a matching `:focus-visible` state, and remove lifts and slides under `prefers-reduced-motion`.
- **Do** keep case-study pages calm: ruled sections, muted body text, plain frames around real captures.
- **Do** use `var(--ease)` for any new motion.
- **Do** colour form feedback with `--danger` and `--success`, never with literal hex.

### Don't:
- **Don't** put burgundy, badges, stickers or offset decoration on top of a project screenshot, or apply tilt outside the approved folded artwork and case-only layer inspection.
- **Don't** round portfolio corners beyond the approved physical PwC phone and its captured UI, add soft drop shadows to cards, or use glassmorphism beyond the header's functional blur.
- **Don't** add a third typeface, set controls in Cormorant, or set headlines in Manrope.
- **Don't** use Newsprint Shade (or its dark counterparts) for text anyone needs to read.
- **Don't** use bright gradients, cartoonish scrapbook props, or stock imagery.
- **Don't** use more than one accent-filled button in a single view.
