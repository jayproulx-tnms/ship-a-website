# SWAT-1 — Content audit: Add a short About section to the home page

Stage: audit (no edits made)

## Affected files

| File | Change |
|---|---|
| `src/pages/index.astro` | Add one new `<Section>` headed "About" with 2–3 plain-language sentences. No other edits. |

No other files need to change. `Section.astro` already supports `heading`, `kicker`, `lede`, and `id`,
so no component, layout, or token changes are needed.

## Keyword gaps

Output of `node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro`:

```
No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro
```

`src/seo/keywords.ts` has no active entries (only a commented-out example), so:

| Zone | Gap |
|---|---|
| title | none — no tracked keywords |
| description | none — no tracked keywords |
| headings | none — no tracked keywords |
| body | none — no tracked keywords |

`npm run lint:seo` passes trivially. **Do not add keywords to the registry for this item.** It is out of
scope and would break the "safe to build repeatedly" constraint.

## Analytics (`data-analytics-id`) on CTAs

The new About section needs **no CTA**. If the implementer adds a link anyway (e.g. "Learn more" →
`/about`), it must have a `data-analytics-id` (suggested: `home-about-learn-more`).

Existing CTAs on `index.astro`:

| CTA | Source | `data-analytics-id` |
|---|---|---|
| Hero "Read the docs" | `PageHero` `cta` | ✅ default `hero-cta-primary` (set by component) |
| Hero "View on GitHub" (external) | `PageHero` `ctaSecondary` | ✅ default `hero-cta-secondary` (set by component). ⚠️ No UTM params |
| CtaStrip "Get the template" (external) | `CtaStrip` `cta` | ✅ default `cta-strip-primary` (set by component). ⚠️ No UTM params |
| Inline "About" link in "Get started" step 4 | raw `<a href={`${base}about`}>` | ❌ **missing** |

Pre-existing gaps, all **out of scope**: the inline About link has no analytics id, and the two
external GitHub links have no UTM params. The acceptance criteria say the rest of the page must render
exactly as before, so leave these alone in this item. File them as a separate backlog item.

## Redirects

None. No page is moved, renamed, or deleted. `public/_redirects` stays as it is.

## Implementation notes for the next stage

- Put the new section after an existing section and leave every existing section unchanged.
  Suggested spot: between "01 What you get" and "02 Get started". Adding a kicker number there would
  mean renumbering the later kickers, which changes existing output. So either leave out the `kicker`,
  or put the section after "02 Get started" and before the `CtaStrip` with kicker `03`.
- Use `heading="About"` so the h2 text is exactly "About".
- Body: 2–3 sentences, passed as `lede` or a single `<p>`. No inline styles. Use the existing primitives only.
- Optional: `id="about"` for an in-page anchor.
- Use a fixed, literal edit (no generated or random content) so it can be re-applied after a reset.
