# Design notes

## What this page is trying to do

The visitor to plan for is an exam-section clerk during results week. She is
retyping a stack of marksheets by hand, she is not technical, and she is wary
of putting named students' results onto someone else's server. The page has
about thirty seconds to show her that (a) this handles *her* kind of sheet,
(b) she stays in control of what gets read, and (c) nothing leaves her machine.

Everything below follows from that.

## The idea

The page is a sheet passing under a scan head. It alternates graphite
**machine** bands, where the software speaks, with warm **paper** bands, where
the document's own content lives:

| Section     | Band    | Contents                                     |
| ----------- | ------- | -------------------------------------------- |
| `bench`     | machine | Hero, plus the working extraction bench      |
| `workflow`  | machine | The four steps                               |
| `sheets`    | paper   | Sheet families, as paper thumbnails          |
| `controls`  | machine | What the operator can change                 |
| `local`     | paper   | Local versus cloud, as a register            |
| `output`    | machine | The exported table and the formats           |
| `questions` | paper   | FAQ, as a ruled register                     |
| `download`  | machine | The one centred moment                       |

The alternation replaces what used to be ten near-identical dark bands, and it
comes from the subject rather than being applied as decoration.

## The extraction bench

`components/sections/ExtractionBench.tsx` is the one place boldness is spent.
It is not a screenshot — the regions really are draggable, and the reading
really is computed.

The sample sheet in `data/sample-sheet.ts` declares every piece of text as a
positioned box. The sheet is **rendered** from those boxes and regions are
**hit-tested** against the same boxes, so one coordinate space serves both
jobs and the bench cannot lie. Consequences worth knowing:

- A token counts as inside a region when its **centre** is within it.
- Confidence falls in proportion to how badly a region clips its worst token,
  so a sloppy box genuinely produces a poor reading.
- Printed labels are extractable too. Draw a box too high and the value comes
  back as `Candidate name Aarav Mehta`, which is the lesson.
- "Show a misread" shrinks the marks region so the cross-field check fires:
  the rows inside the region no longer add up to the total printed on the
  sheet. That check is in `lib/extract.ts → crossCheckTotal`.
- The sheet is scaled with a CSS transform, never re-laid-out. Pointer deltas
  are divided by the measured scale, so dragging stays accurate at any size.

Keyboard: Tab to a region, arrows nudge, Shift+arrows resize. Changes are
announced through an `aria-live` region.

## Typography

Two families, and the mono one carries information rather than style.

- **Archivo** for display and body. Its width axis is used at display sizes
  (`font-stretch: 112%`), so headings read like a blown-up form header.
- **IBM Plex Mono** *only where there is real data* — table cells, field
  values, CSV output, pixel coordinates, confidence scores, row counts. Never
  for labels, buttons, navigation or prose.

Rules deliberately imposed, each removing something that was in the old page:

1. No tracked ALL-CAPS eyebrows. `Kicker` is sentence case, and only used
   where it adds something the heading does not already say.
2. No headline with one word accented in italic or colour.
3. No `A · B · C` middle-dot meta strings. Those facts are a `SpecTable`.
4. No `→` or `↓` appended to button labels. Labels name the action.
5. Numbered markers appear in exactly one place — the four steps — because
   that is the only content on the page that is genuinely a sequence.

## Colour

Signal colours carry meaning, not mood, and the bench depends on all three:
`--signal` is live, `--flag` is doubtful (the teacher's red pen), `--verified`
is checked and in range.

The base moved off `#0B0B0A` to a cooler graphite so it reads as a surface
rather than a void.

### Compatibility aliases

`globals.css` still defines the old token names (`--bg`, `--text`, `--accent`
and friends) mapped onto the new palette. That is deliberate: `app/service/`
has ~86 references to them and was out of scope, so it stays coherent for free.
Prefer the new names in new code.

## Motion

One orchestrated moment: the scan head crossing the sample sheet once on load
(`.scan-sweep`). There are no scroll-reveal animations anywhere — every other
movement answers something the visitor did. `prefers-reduced-motion` removes
the sweep entirely.

## Two things to know before editing

**Custom CSS must stay inside `@layer`.** Tailwind v4 emits utilities inside
`@layer utilities`, and an unlayered rule outranks any layered one regardless
of specificity. An unlayered `a { color: inherit }` silently beats
`text-[#17110D]` on every button.

**`cacheComponents: true` is set in `next.config.ts`.** A bare `new Date()` in
a server component aborts the prerender, which is why the footer year is a
constant (`COPYRIGHT_YEAR` in `components/layout/Footer.tsx`).

## Unused files, safe to delete together

These are no longer imported by `app/page.tsx`. They still type-check, so the
build passes either way, but nothing renders them:

```
components/sections/FeatureStrip.tsx
components/sections/TemplateDemo.tsx
components/sections/ExportPreview.tsx
components/sections/Control.tsx
components/ui/FAQItem.tsx
components/ui/Eyebrow.tsx              (a deprecated alias for Kicker)
components/illustrations/DocumentProcessingDiagram.tsx
components/motion/Reveal.tsx           (if app/service/ does not use it)
components/motion/Stagger.tsx          (likewise)
data/strip.ts
```

## Claims checked against your own content

Copy was kept to what the project already asserts, and pulled back where it
overreached:

- Handwriting is described as **not reliable**, matching `data/faqs.ts`.
  An earlier draft claimed neat handwritten digits read well; that is not what
  your FAQ says, so it was removed.
- Input formats are JPG, JPEG and PNG. No PDF or TIFF claim.
- Export is described as **CSV and plain text**, with CSV opening straight into
  Excel. `.xlsx` generation is not claimed, since only CSV and TXT are
  documented in `data/faqs.ts` — if the app really does write `.xlsx`, add it
  back in `components/sections/Output.tsx`.
- No installer size or accuracy percentage is stated anywhere, because neither
  is established.
