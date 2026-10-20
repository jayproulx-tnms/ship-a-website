# SWAT-3: Content audit, SEO and analytics gap analysis

**Work item:** Add a short FAQ section to the home page
**Stage:** Audit (read-only; no site edits made)
**Date:** 2026-10-20 (re-run; replaces the earlier 2026-10-20 audit)

## Key finding: the FAQ section is already on the page

Earlier SWAT-3 runs have already been merged: `a4b35d7` (#10), `2d91af5` (#11), `24050dd` (#12),
`516f057` (#13), `c41ba49` (#14) and, most recently, `c3e7435` "[SWAT-3] Add a short FAQ section to
the home page (#16)". `swat-3` and `main` point at the same history: each is an ancestor of the other,
and `git diff main -- src/ public/` is empty.

`src/pages/index.astro` (lines 125–151) already has a section that meets the acceptance criteria:

- `<Section variant="sunken" kicker={{ num: '04', label: 'FAQ' }} heading="Frequently asked questions" id="faq">`
- It comes after the existing content (Hero → 01 What you get → 02 Get started → 03 About) and just before the closing `CtaStrip` (line 153).
- It has exactly three questions (`<h3>`). Each has a two-sentence answer in plain language:
  1. What is ship-a-website?
  2. What is TNMS Ship?
  3. How do I get started?

Downstream stages should **check the existing section** against the acceptance criteria.
They must not add a second FAQ section.

## Files affected

| File | Role | Change needed |
|---|---|---|
| `src/pages/index.astro` | Home page (`/`), holds the FAQ section | None to meet the AC; verify only |

No other pages, content collections or components are involved.

## Keyword zone gaps

Output of `node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro`:

```
No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro

Add entries with source_file: 'src/pages/index.astro' to track this page.
```

- The `keywords` array in `src/seo/keywords.ts` is empty. It holds only a commented-out example.
- **Title / description / headings / body gaps: none can be measured**, because no keywords are registered.
- `npm run lint:seo` passes: `T1 keywords: 0/0 covered | 0 warning(s) | 0 error(s)`.
- Recommendation (outside this item's scope): register home-page keywords in `src/seo/keywords.ts` so future audits can measure coverage.

## CTA analytics attributes (`data-analytics-id`)

| Location | Element | Status |
|---|---|---|
| `PageHero` primary CTA ("Read the docs") | `<a>` in `PageHero.astro:92` | ✅ Default `hero-cta-primary` |
| `PageHero` secondary CTA ("View on GitHub") | `<a>` in `PageHero.astro:99` | ✅ Default `hero-cta-secondary` |
| `CtaStrip` primary CTA ("Get the template") | `<a>` in `CtaStrip.astro:57` | ✅ Default `cta-strip-primary` |
| Inline "About" link, Get started step 4 | `index.astro:108` `<a href={`${base}about`}>` | ❌ **Missing `data-analytics-id`** (was there before SWAT-3) |
| FAQ section | No links or CTAs | ✅ Nothing to tag |

Other analytics gaps. These were there before SWAT-3 and are not part of the FAQ change:

- The external GitHub links have **no UTM parameters**: the hero secondary CTA (`index.astro:33`) and the CtaStrip CTA (`index.astro:158`).
  `src/pages/AGENTS.md` requires `?utm_source=website&utm_medium=referral&utm_campaign=<page-slug>` on these.
- The hero and CtaStrip CTAs use the component's default IDs instead of their own `analyticsId` values.
  They are tagged, but the IDs are generic.

Recommendation: AC-3 says "the rest of the page renders exactly as before", so these gaps are outside
SWAT-3. Track them as a separate item.

## Redirects

None needed. No pages are moved, renamed or deleted. The FAQ is a section (`/#faq`) on an existing page.

## Summary for downstream stages

- **Edits required for SWAT-3:** none. The FAQ section already exists and meets all three acceptance criteria.
- **Verification to perform:** run `npm run lint` and `npm run build`, then confirm the FAQ renders below the existing sections.
- **Out of scope, flag separately:** no home-page keywords registered; the inline About link (`index.astro:108`) has no analytics ID; the external GitHub CTAs have no UTM parameters.
- **Note for oversight:** the work item asks for "a run that really delivers a change". That change was delivered by the earlier merged runs, most recently #16. Adding content now would duplicate the FAQ or break AC-3.
