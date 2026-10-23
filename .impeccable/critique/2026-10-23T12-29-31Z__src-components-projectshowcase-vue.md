---
target: Mobile Selected Work carousel composition with centered artwork and faded side previews
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:C:\\portfolio\\src\\components\\ProjectShowcase.vue"
target_fingerprint: "sha256:8947b8b38d5fdf4acc2d58afaafa2e96f68a5c5809face1225c6898a92b15978"
target_path: "C:\\portfolio\\src\\components\\ProjectShowcase.vue"
timestamp: 2026-10-23T12-29-31Z
slug: src-components-projectshowcase-vue
closed: true
---
⚠️ DEGRADED: single-context design assessment (design sub-agent hit its usage limit); independent browser evidence from whole_site_evidence.

The current carousel needs a visual pass. Its project objects are distinctive and authored, but the common stage and full-size clipped neighbors undermine their hierarchy.

Design health: 20/32 — Acceptable (63%). These are heuristic judgments.

| Heuristic | Score | Basis |
|---|---:|---|
| Visibility of status | 4 | Counter, caption and destination match the active object. |
| Real-world match | 2 | Cropped ghost controls make the side previews ambiguous. |
| Control and freedom | 4 | Previous/Next, circular wrapping and keyboard arrows work. |
| Consistency | 2 | Common frame does not produce equivalent optical scale. |
| Error prevention | 3 | Inactive slides are inert and hidden from accessibility. |
| Recognition | 2 | Neighbor fragments do not clearly identify the other projects. |
| Expert efficiency | n/a | Optional Experience surface. |
| Aesthetic restraint | 1 | Large empty areas and clipped secondary interfaces compete. |
| Error recovery | 2 | Fallbacks exist in artwork components; physical-device failures were not tested here. |
| Help/documentation | n/a | No documentation system needed. |

What works: circular navigation, matching captions and case-study URLs, keyboard ArrowRight, 44px navigation targets and source-level inactive-slide semantics. Original typography, palette and object identities remain consistent.

Priority issues:
1. [P2] Unequal optical scale in a shared tall stage. At 320px the stage is 444px high, the map 233.6×98.35px and the phone 180.9×392px. The map has about 157px above and 189px below it. Use per-object sizing and compact stage spacing. Source: src/project-artwork.css:27,29,36. Suggested command: $impeccable layout.
2. [P2] Side previews contain clipped controls. Opacity .42, scale .82 and 64px inward shifts still expose chopped calendar headings, phone text, Rotate calendar, Unfold map and Scroll to explore. Render restrained complete miniature artwork and suppress inactive controls/hints. Source: src/project-artwork.css:33; src/components/ProjectShowcase.vue:86. Suggested command: $impeccable distill.
3. [P2] Actions are detached from their objects. At 320px the map ends around y501.6 but Unfold map begins at y646.4, a 145px gap; calendar gap is about 104px. Group each action with its active object. Source: src/project-artwork.css:45. Suggested command: $impeccable layout.
4. [P2] Identification appears late. Caption begins around y734.5 at390×844 and y690.4 at320×740, leaving much of the role and summary below the first viewport. Bring the name and case-study link closer to the active artwork. Source: src/components/ProjectShowcase.vue:95. Suggested command: $impeccable layout.

Cognitive load: moderate, with hierarchy, grouping and single focus weakened. There are not excessive local choices. Emotional journey: the swipe hint creates curiosity, ghost interfaces create uncertainty, and the matching caption confirms the result only after additional scrolling.

Personas: a first-time visitor may read cropped inactive controls as broken actions; a mobile recruiter sees little project identity initially; keyboard users have working arrow navigation. Actual touch swipes and screen-reader speech were not tested in this pass.

Detector: ProjectShowcase.vue returned zero findings. DOM measurements and screenshots established the spatial problems. Browser evidence covers390×844 and320×740 in dark theme, with Previous/Next, circular wrap, caption matching and keyboard navigation verified.

Questions: prefer complete miniature side previews or larger cropped edges? Prefer height adapted to each object or a fixed-height stage?
