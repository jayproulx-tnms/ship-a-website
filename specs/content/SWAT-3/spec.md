# SWAT-3: Content specification

**Work item:** Add a short FAQ section to the home page
**Inputs:** `specs/content/SWAT-3/audit.md`, SWAT-3 work item
**Date:** 2026-10-20 (re-run; checked against the latest 2026-10-20 audit)

## Summary

The audit found that the FAQ section SWAT-3 asks for is **already in
`src/pages/index.astro` (lines 125–151)**. Earlier SWAT-3 runs merged it: `a4b35d7` (#10), `2d91af5` (#11),
`24050dd` (#12), `516f057` (#13), `c41ba49` (#14) and, most recently, `c3e7435` (#16).
It is already on `main`: `git diff main -- src/ public/` is empty.
The existing section already meets the content requirements of every acceptance criterion.

This run therefore needs **no source edits**. The implementation stage must not add, duplicate,
reword or move content. Its job is to check the existing section against the acceptance criteria
below and confirm the build passes.

> Note for oversight: the work item says it should be "a run that really delivers a change".
> Earlier merged runs delivered that change, most recently #16. Adding content now would either
> duplicate the FAQ or break AC-3 ("the rest of the page renders exactly as before").
> This run is a verification run.

## 1. Content changes

### New copy
None. The required copy already exists:

| # | Question (`<h3>`) | Answer (`<p>`) | Sentences |
|---|---|---|---|
| 1 | What is ship-a-website? | It's a ready-made starting point for building a fast, professional website. You copy it, add your own words and branding, and publish it. | 2 |
| 2 | What is TNMS Ship? | TNMS Ship lets AI assistants make updates to your site for you, like adding a page or improving how it shows up in search. Every change goes through automatic checks and a review before it goes live. | 2 |
| 3 | How do I get started? | Copy the project, add your own site name and details, and preview it on your computer. The "Get started" section above walks you through each step. | 2 |

Container: `<Section variant="sunken" kicker={{ num: '04', label: 'FAQ' }} heading="Frequently asked questions" id="faq">`.
It comes after section `03 About` (`id="about"`, line 118) and before the closing `<CtaStrip>` ("Ready to ship?", line 153).

### Updated copy
None.

### Deleted content
None.

## 2. Keyword zones addressed

`src/seo/keywords.ts` is empty, so no keywords are registered for `src/pages/index.astro`.
That means the title, description, heading and body zones have no gaps to address.
This spec makes **no keyword changes**, and `npm run lint:seo` must stay at 0 errors.

Registering home-page keywords is out of scope and should be a separate work item.

## 3. CTA analytics attributes

- **FAQ section:** it has no links or CTAs, so it needs no `data-analytics-id`.
- **No attributes are to be added in this run.**

The audit found gaps that were there before SWAT-3. They stay out of scope, because AC-3 requires
the rest of the page to render exactly as before:
  - The inline "About" link at `index.astro:108` has no `data-analytics-id`.
  - The external GitHub links at `index.astro:33` and `:158` have no UTM parameters.
  - The hero and CtaStrip CTAs use the components' generic default IDs.

Track these as a separate work item.

## 4. Redirects

None. No routes are added, moved, renamed or deleted, so `public/_redirects` stays unchanged.

## 5. Acceptance criteria for this pipeline run

The run passes when **all** of these hold:

1. **AC-1: section present below existing content.** The built `dist/index.html` has exactly one
   section with the heading text "Frequently asked questions" and `id="faq"`. In document order it
   comes after the "About" section (`id="about"`) and before the CTA strip ("Ready to ship?").
2. **AC-2: three plain-language Q&As.** The FAQ section has exactly three question headings (`<h3>`).
   Each has one answer paragraph of one or two sentences that matches the copy in §1.
3. **AC-3: rest of page unchanged.** `git diff HEAD -- src/ public/` is empty for this run, and
   `git diff main -- src/ public/` stays empty. The hero, sections 01–03 and the CTA strip render as before.
4. **Build passes.** `npm run build` exits 0 with no errors.
5. **Lint passes.** `npm run lint` (BEM, SEO and token checks) exits 0, and `npm run lint:seo` reports 0 errors.
6. **No duplicates.** `src/pages/index.astro` contains the string "Frequently asked questions" exactly once.
