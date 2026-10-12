# SWAT-3 — Content audit: FAQ section on the home page

**Stage:** audit (read-only, no edits made)
**Date:** 2026-10-12
**Branch:** `swat-3` @ `2d91af5`

## Summary

The home page (`src/pages/index.astro`) **already has** the FAQ section this item asks for. Two earlier SWAT-3 runs merged it: #10 added it and #11 changed the third answer to use `<code>` tags. The section is at lines 125–151:

- `Section` with `variant="sunken"`, kicker `04 / FAQ`, `heading="Frequently asked questions"`, `id="faq"`
- Exactly **three** questions as `<h3>`, each followed by a two-sentence `<p>` answer about the project:
  1. What is ship-a-website?
  2. What is TNMS Ship and how does it work with ship-a-website?
  3. How do I get started with ship-a-website?
- Placement: after the `03 About` section and before the closing `CtaStrip`. This keeps the page-closing call to action last, which matches the "below the existing content" criterion as #10 read it.

The section uses no new class names, no inline styles, and no links. Later stages should check that it still meets the criteria. They should only edit it if a defect turns up.

## Files affected

| File | Role | Status |
|---|---|---|
| `src/pages/index.astro` | Home page (`/`). This is where the FAQ section lives. | FAQ already present |

No other pages, collections, or components need changes.

## Keyword gaps (by zone)

Command: `node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro`

```
No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro
```

`src/seo/keywords.ts` has an empty `keywords` array, so there are no tracked keywords to measure.

| Zone | Gaps |
|---|---|
| title | none (no registered keywords) |
| description | none (no registered keywords) |
| headings | none (no registered keywords) |
| body | none (no registered keywords) |

`npm run lint:seo` passes trivially. This item does not require adding keywords to the registry.

Informational only: the page `title` is still the placeholder `"Hello World"`. That is outside SWAT-3's scope.

## CTA analytics attributes (`data-analytics-id`)

| Location | Element | Attribute | Status |
|---|---|---|---|
| `index.astro:32` | `PageHero` primary CTA "Read the docs" | component default `hero-cta-primary` | OK |
| `index.astro:33` | `PageHero` secondary CTA "View on GitHub" | component default `hero-cta-secondary` | OK, but external link has **no UTM params** |
| `index.astro:108` | inline `<a href={`${base}about`}>About</a>` in Get started list | **missing** | Gap (existing) |
| `index.astro:158` | `CtaStrip` CTA "Get the template" | component default `cta-strip-primary` | OK, but external link has **no UTM params** |
| `index.astro:125–151` | FAQ section | no links or CTAs | N/A |

**The new FAQ content has no analytics gaps.** The three gaps listed above were already on the page before this item. The third acceptance criterion says "the rest of the page renders exactly as before", so this item should **not** fix them. Run #10 made the same call. They should go in a separate backlog item:
- Add `data-analytics-id="get-started-about-link"` (or similar) at line 108.
- Add `?utm_source=website&utm_medium=referral&utm_campaign=home` to the two GitHub links.

## Redirects

None needed. No page is moved, renamed, or deleted. `public/_redirects` stays as it is.

## Acceptance criteria check (current state)

| Criterion | Status |
|---|---|
| Section headed "Frequently asked questions" below the existing content | Met (lines 125–151, after About, before closing CTA strip) |
| Exactly three questions, each with a 1–2 sentence plain-language answer about the project | Met (3 × `<h3>` + two-sentence answers) |
| Rest of page unchanged; site builds with no errors | Not checked in this stage. The verify stage should run `npm run lint` and `npm run build`. |

## Recommendation for downstream stages

No content change is needed. Downstream stages should check the FAQ against the criteria, run `npm run lint` and `npm run build`, and change nothing else on the page.
