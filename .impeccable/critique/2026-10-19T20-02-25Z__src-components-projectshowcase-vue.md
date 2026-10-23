---
target: "Selected work section: spacing, shadows and ease of UX (user referenced useSelectedProject.ts)"
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\portfolio\\src\\components\\ProjectShowcase.vue"
target_fingerprint: "sha256:c31321cc4591af5dc1b2ca758cc8de98c1574a3f6e90cd49396a39e686868d93"
target_path: "C:\\portfolio\\src\\components\\ProjectShowcase.vue"
timestamp: 2026-10-19T20-02-25Z
slug: src-components-projectshowcase-vue
---
Method: dual-agent (A: selected_work_design_review · B: selected_work_evidence_review)

The visual identity is strong and specific to your projects. The main weakness is the scrolling required to use the collection: choosing another project can leave its artwork outside the visible screen. I would preserve the map, phone, calendar, fonts and palette, and refine the layout around them.

The referenced useSelectedProject.ts remembers the selected project correctly within the running app. Spacing and shadows are controlled mainly by ProjectShowcase.vue and project-artwork.css.

**Priority issues**

1. **[P1] The project selector is too far from the artwork.** At 1280×720, the selector begins around document y929, below the first screen. Selecting PwC from the lower index left its phone largely or entirely above the viewport in the two independent tests. On mobile, switching from the longer PwC stage to InnerAura could leave the footer filling the screen. Put the ruled selector directly below Selected work, before the artwork. A lower selector needs intentional return-to-artwork behavior, with reduced-motion support. Sources: src/components/ProjectShowcase.vue:17 and :33; src/project-artwork.css:10. Suggested command: $impeccable layout, then $impeccable adapt.

2. **[P2] The phone needs real clearance beneath the heading.** The shared -2rem heading margin makes the phone's layout box overlap the heading's box by about 12px at desktop widths. The glyphs do not collide, but the phone feels tucked into the title while the calendar has much more breathing room. Give PwC a positive heading-to-object gap and recover that space elsewhere rather than increasing the section's total height. Source: src/project-artwork.css:6 and :34. Suggested command: $impeccable layout.

3. **[P2] Mobile project labels make the picker unnecessarily tall.** At 390px wide, PwC Middle East wraps to three lines while the other names remain single-line; the index grows to about 130px. The phone's 500px stage versus the map's 240px stage also moves this lower control substantially. Put numbers above labels, give names a deliberate line budget, or use the shorter PwC label in the selector while retaining the full project title. Source: src/project-artwork.css:19 and :129. Suggested command: $impeccable adapt / $impeccable typeset.

4. **[P3] Calendar shadows could be quieter at mobile scale.** Tiles about 27px high retain 4–5px downward shadow offsets and 5–7px blur. My visual judgment is that slightly smaller mobile shadows would reduce seam noise while preserving the approved cube geometry, rotation and burgundy date mark. This is optional polish, not a demonstrated shadow failure: the independent evidence review did not establish a functional shadow defect. The phone's softer shadow suits a physical device; the map's broad contact shadow suits folded paper. They do not need one identical shadow. Source: src/project-artwork.css:61 and :141. Suggested command: $impeccable polish.

**What works**

- The three distinct project objects feel authored and memorable; the real screenshots preserve credibility.
- The PwC phone has useful fixed navigation, native keyboard scrolling and a concise scroll cue. Testing did not reveal a keyboard trap.
- Project selection survives case-study Back navigation and moving between the home collection and Projects. Reload intentionally returns to Mwasalaty.

**Design health: 23/32 — Good (72%).** Scores are design judgments, not usability-study measurements. Two heuristics are inapplicable to this portfolio surface.

| Heuristic | Score | Main observation |
|---|---:|---|
| Visibility of status | 2/4 | Selection updates, but its artwork can be offscreen. |
| Real-world match | 4/4 | Familiar project names and clear physical metaphors. |
| Control and freedom | 3/4 | Reversible actions, scrolling and Back work. |
| Consistency | 3/4 | Strong identity; uneven spacing and mobile wrapping. |
| Error prevention | 3/4 | Artwork controls and case-study links are distinct. |
| Recognition over recall | 2/4 | Available projects initially sit below the viewport. |
| Expert efficiency | n/a | No power-user workflow is required here. |
| Aesthetic restraint | 3/4 | Clear composition; local spacing/shadow polish needed. |
| Error recovery | 3/4 | Plain image fallback in source; failure not simulated. |
| Help/documentation | n/a | Concise interaction cues are sufficient. |

**Cognitive load and visitor experience**

Choice overload is low: there are only three projects. One of eight cognitive-load checklist items failed: remembering the chosen project while scrolling back to see it. The emotional path is a strong first impression, interest in the object, then uncertainty when a selection changes something outside the viewport.

- Jordan, first-time visitor: the initial desktop view does not reveal the other project choices.
- Casey, mobile visitor: changing artwork heights can leave the footer in view after a selection.
- Sam, keyboard visitor: focus stays on the lower selector while the updated artwork is above it; native controls and visible focus work.

**Minor observations**

Add a quiet non-color selected marker to the project index. Artwork manipulation resets when switching away and back; this is acceptable for previews unless deeper persistence is desired. The module-level selection ref is not a spacing bug. No screen-reader speech, physical-device, failure-injection or 200% zoom session was performed.

**Independent evidence**

The deterministic detector returned zero findings for ProjectShowcase.vue, FoldedMap.vue, PwCMobilePreview.vue and CalendarArtwork.vue. Live browser/source measurements exposed the spatial-navigation issues above. Automated markup checks alone do not establish the quality of spacing, shadows or click-to-result continuity.

**Questions to consider**

Should the project picker move above the artwork, or should the lower picker intentionally return visitors to the changed object? Should mobile navigation use the concise PwC label or preserve PwC Middle East in an intentional two-line layout?
