---
target: A closer look / Inspect layers in Mwasalaty, PwC and InnerAura case studies
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:C:\\portfolio\\src\\components\\ProjectLayers.vue"
target_fingerprint: "sha256:dfebba2fbf29e46792b0c767fe0fc5f699d4e7f2d9d9a274e8961654b1bf54a1"
target_path: "C:\\portfolio\\src\\components\\ProjectLayers.vue"
timestamp: 2026-10-23T11-37-26Z
slug: src-components-projectlayers-vue
closed: true
---
Method: dual-agent (A: layers_design_review · B: layers_evidence_review)

The editorial frame feels authored, but the inspection itself needs a clearer purpose. Mwasalaty has the strongest desktop result; PwC reveals an incomplete fragment, and InnerAura emphasizes an illustration rather than the contribution described in the case study.

**Each case study**

| Project | What works | Main weakness |
|---|---|---|
| Mwasalaty | The route comparison and Cairo map form a meaningful pair on desktop. | At 390px, the route detail is about 192×51px and the map 86×128px. Their enlargement over the base is only about 1.08× and 1.00×. |
| PwC | The real Home design and reversible control fit the portfolio. | The 144×115px mobile crop cuts through a photograph before the insight title; it neither enlarges the source nor reveals a complete card. |
| InnerAura | The landing capture retains its own colors and gives project context. | The mobile illustration is about 79×65px—only 0.76× its scale in the base. It does not demonstrate the scheduling and assessment work described below. |

**Design health: 21/32 — Acceptable (66%)**

These are heuristic judgments, not usability-study measurements.

| Heuristic | Score | Evidence |
|---|---:|---|
| Visibility of status | 4/4 | Toggle label, pressed state and visible composition update. |
| Real-world match | 2/4 | “Inspect layers” describes the effect without explaining the benefit. |
| Control and freedom | 3/4 | Easy to flatten; no full-capture action in this section. |
| Consistency | 3/4 | Same pattern across projects, uneven explanatory value. |
| Error prevention | 3/4 | One reversible action with adequate target height. |
| Recognition | 2/4 | No captions connect details to contribution or design decisions. |
| Expert efficiency | n/a | Optional portfolio experience; shortcuts are unnecessary. |
| Aesthetic restraint | 2/4 | Strong desktop frame, miniature mobile details and generous empty stages. |
| Error recovery | 2/4 | Component provides no local image-failure recovery; source assessed, not failure-injection tested. |
| Help/documentation | n/a | This simple optional presentation needs no documentation system. |

**What works**

- Explicit, reversible native controls work with Enter and Space. Focus is visible and each button is 44px high.
- Real screenshots remain visually distinct in light and dark themes.
- Mwasalaty’s desktop route/map pairing adds useful geographic context.

**Priority issues**

1. **[P2] Mobile inspection needs meaningful enlargement.** All three current details remain miniature; InnerAura shrinks. Give mobile one complete detail at the available content width, while retaining the optional desktop composition. Source: [project-artwork.css](C:/portfolio/src/project-artwork.css:85), including mobile overrides at line 152. Suggested command: `$impeccable adapt`.

2. **[P2] PwC’s crop ends before the insight becomes a complete unit.** Desktop inspection includes a sliver of the preceding story, the Featured Insights header and part of a photograph, then cuts off before the title. Choose a complete insight card and size the presentation around it. Source: [project-artwork.css](C:/portfolio/src/project-artwork.css:91). Suggested command: `$impeccable layout`.

3. **[P2] The highlighted detail does not explain what it proves.** Mwasalaty needs a short connection to the actual interface/integration work; PwC needs the reason that insight matters to the mobile design; InnerAura needs an honest distinction between the available landing-page reference and the scheduling/assessment contribution. Use existing factual content and do not invent missing screens or credit. Source: [ProjectLayers.vue](C:/portfolio/src/components/ProjectLayers.vue:16), before the contribution section in [ProjectView.vue](C:/portfolio/src/views/ProjectView.vue:113). Suggested command: `$impeccable clarify`.

4. **[P2] Collapsed close-ups remain in the accessibility tree.** Opacity-zero detail nodes still expose their image labels in all three projects. Hide inactive duplicates semantically, or treat them as decorative when the base image already supplies equivalent information. This was observed in accessible snapshots; screen-reader speech was not tested. Source: [ProjectLayers.vue](C:/portfolio/src/components/ProjectLayers.vue:19). Suggested command: `$impeccable harden`.

5. **[P2] There is no local full-capture action.** Inspection offers only “Flatten layers” after the reveal. Add a quiet full-capture action alongside it. Full-image access already exists later in the case studies, so this is a detour rather than a page-wide absence. Source: [ProjectLayers.vue](C:/portfolio/src/components/ProjectLayers.vue:18). Suggested command: `$impeccable clarify`.

**Visitor experience**

Cognitive load is moderate: three of eight checklist items fail—single focus, visual hierarchy and working memory. There is only one local decision, so choice overload is low. Curiosity leads to a useful desktop reveal for Mwasalaty, but mobile creates a valley when the inspection gesture yields tiny fragments; flattening provides a clean exit.

- Jordan, a first-time recruiter, can find the action but must infer why each detail matters.
- Casey, scanning on a phone, still cannot read the extracted card or map comfortably.
- Sam, using a keyboard, can operate the control and sees focus; the collapsed accessibility tree nevertheless announces invisible close-ups.

**Minor observations and limits**

Mwasalaty’s desktop painted map extends about 23px below its stage, but spacing prevents overlap with the next section. At 320px the heading wraps to two lines; no confident component-level horizontal overflow was established. Mobile button text is only 10.72px although its target is 44px high. Reduced-motion styles are present in source.

The deterministic scans of ProjectLayers.vue and ProjectView.vue returned zero findings. Independent screenshots, measurements and accessible snapshots established the issues above; a clean detector result does not prove useful enlargement or crop selection. A checked all three projects at 1440×1000 and 390×844 in both themes; B independently checked 1280×720 and 390×844, with additional 320px checks. Physical-device, 200% zoom and screen-reader speech testing were not performed.

**Questions to consider**

- Should mobile use a full-width detail within the page or a full-screen image viewer?
- Should InnerAura keep a plainly labeled landing-page reference or replace the lifted illustration with existing contribution-focused evidence?
