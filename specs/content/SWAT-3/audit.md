# SWAT-3 — Content audit: SEO & analytics gap analysis

**Work item:** Add a short FAQ section to the home page
**Stage:** Audit (read-only — no site edits made)
**Date:** 2026-10-20 (re-run; replaces the 2026-10-18 audit)

## Key finding: the FAQ section is already on the page

Earlier SWAT-3 runs were merged to this branch (`a4b35d7`, `2d91af5`, `24050dd`, `516f057`, `c41ba49`).
`src/pages/index.astro` (lines 125–151) already contains a section that meets the acceptance criteria:

- `<Section variant="sunken" kicker={{ num: '04', label: 'FAQ' }} heading="Frequently asked questions" id="faq">`
- It sits below the existing content (Hero → 01 What you get → 02 Get started → 03 About), just before the closing `CtaStrip`.
- It has exactly three questions, each with a two-sentence plain-language answer:
  1. What is ship-a-website?
  2. What is TNMS Ship?
  3. How do I get started?

Downstream stages should **check the existing section** against the acceptance criteria
and must not add a second FAQ section.

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

- The `keywords` array in `src/seo/keywords.ts` is empty (only a commented-out example), so nothing is tracked.
- **Gaps in title / description / headings / body: none can be measured**, because no keywords are registered.
- `npm run lint:seo` passes: `T1 keywords: 0/0 covered | 0 warning(s) | 0 error(s)`.
- Recommendation (outside this item's scope): register home-page keywords in `src/seo/keywords.ts` so future audits have something to measure.

## CTA analytics attributes (`data-analytics-id`)

| Location | Element | Status |
|---|---|---|
| `PageHero` primary CTA ("Read the docs") | `<a>` in `PageHero.astro:90–92` | ✅ Gets the default `hero-cta-primary` |
| `PageHero` secondary CTA ("View on GitHub") | `<a>` in `PageHero.astro:97–99` | ✅ Gets the default `hero-cta-secondary` |
| `CtaStrip` primary CTA ("Get the template") | `<a>` in `CtaStrip.astro:55–57` | ✅ Gets the default `cta-strip-primary` |
| Inline "About" link, Get started step 4 | `index.astro:108` `<a href={`${base}about`}>` | ❌ **Missing `data-analytics-id`** (existed before SWAT-3) |
| FAQ section | No links or CTAs | ✅ Nothing to tag |

Other analytics notes (existed before SWAT-3, not part of the FAQ change):

- The external GitHub links (hero secondary CTA, `index.astro:33`; CtaStrip CTA, `index.astro:158`) have **no UTM parameters**.
  `src/pages/AGENTS.md` requires `?utm_source=website&utm_medium=referral&utm_campaign=<page-slug>` on these.
- The hero and CtaStrip CTAs use the component default IDs rather than their own `analyticsId` values.
  They are tagged, but the IDs are generic.

Recommendation: these gaps were already there and fall outside the SWAT-3 acceptance criteria
("the rest of the page renders exactly as before"). Track them as a separate item rather than
fixing them here.

## Redirects

None needed. No pages are moved, renamed or deleted. The FAQ is an in-page section (`/#faq`) on an existing route.

## Summary for downstream stages

- **Edits required for SWAT-3:** none. The FAQ section already exists and appears to meet all three acceptance criteria.
- **Verification to perform:** run `npm run lint` and `npm run build`, and confirm the FAQ renders below the existing sections.
- **Out of scope, flag separately:** no home-page keywords registered; inline About link (`index.astro:108`) has no analytics ID; external GitHub CTAs have no UTM parameters.
