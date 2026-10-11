# SWAT-3 — Content audit: FAQ section on the home page

**Stage:** audit (no edits made)
**Date:** 2026-10-11
**Branch:** `swat-3` @ `a4b35d7`

## Important: the FAQ section already exists

An earlier SWAT-3 run (`run-20261010204332`, merged as `a4b35d7`, PR #10) already added
a `Section` with `id="faq"` to `src/pages/index.astro` (lines ~125–152). This audit
looks at the page as it is now. Later stages should **verify and refine** that
section rather than add a second FAQ.

Status against the acceptance criteria:

| AC | Status | Notes |
|---|---|---|
| Section headed "Frequently asked questions" sits below the existing content | Met | Kicker `04 / FAQ`, `variant="sunken"`, after the `03 About` section and before the closing `CtaStrip`. The CtaStrip is a footer call to action, so placing the FAQ just above it is consistent with "below the existing content". |
| Exactly three questions, each answered in 1–2 plain-language sentences | Met, with one formatting defect | 3 `<h3>` questions, each followed by a 2-sentence answer. **Defect:** answer 3 contains Markdown backticks (`` `npm run dev` ``) inside an `.astro` `<p>`, so the backticks show up as literal characters. Use `<code>npm run dev</code>`. You may also wrap `scripts/site.config.ts` in `<code>` to match the "Get started" section. |
| Rest of the page renders as before; site builds | To verify in the build stage | The diff in `a4b35d7` only adds lines (+28, 0 deletions) to `index.astro`. Run `npm run lint && npm run build` to confirm. |

## Affected files

| File | Change needed |
|---|---|
| `src/pages/index.astro` | Small fix only: replace the backticks in FAQ answer 3 with `<code>`. No structural change. |

No other files are affected. `src/content/` holds only design-system docs, so the home page content is not in a collection.

## Keyword zone gaps

`node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro`:

```
No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro
```

- `src/seo/keywords.ts` contains no keywords; the only entry is a commented-out example.
- `npm run lint:seo` → `T1 keywords: 0/0 covered | 0 warning(s) | 0 error(s)` (passes).
- **Zone gaps (title / description / headings / body): none, because no keywords are tracked.**
  Without a registered keyword, the tool cannot measure gaps.

Observations (not blocking, outside SWAT-3 scope):
- Page `<title>` is the placeholder `"Hello World"`. When keywords are registered, the title zone will probably be the first gap.
- The FAQ adds headings and body text with the terms "ship-a-website", "Astro 6", "Tailwind CSS v4", "SEO", and "TNMS Ship". These would count as coverage if those keywords are added later.
- Optional follow-up (separate work item): add `FAQPage` JSON-LD structured data for the FAQ.

## CTAs and `data-analytics-id`

| CTA | Component | Attribute |
|---|---|---|
| "Read the docs" (hero primary) | `PageHero` | `hero-cta-primary` (component default) |
| "View on GitHub" (hero secondary) | `PageHero` | `hero-cta-secondary` (component default) |
| "Get the template" | `CtaStrip` | `cta-strip-primary` (component default) |
| Inline link "About" in the Get started list (`<a href={`${base}about`}>`) | raw `<a>` in `index.astro` | **Missing.** This was there before SWAT-3. It is an inline prose link, not a CTA button. Optional: add `data-analytics-id="get-started-about-link"`. |

**The FAQ section has no links or CTAs**, so SWAT-3 does not need any new analytics attributes.

## Redirects

None needed. No pages are moved, renamed, or deleted. `public/_redirects` stays unchanged.

## Recommended next steps

1. In FAQ answer 3, replace `` `npm run dev` `` with `<code>npm run dev</code>` (and optionally `<code>scripts/site.config.ts</code>`).
2. Do not add a second FAQ section.
3. Run `npm run lint` and `npm run build` to confirm the page still builds cleanly.
