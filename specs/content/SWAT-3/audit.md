# SWAT-3 — Content audit: Add a short FAQ section to the home page

Stage: SEO + analytics gap analysis (no edits made).
Date: 2026-10-10

## Files affected

| File | Change |
|---|---|
| `src/pages/index.astro` | Add one new `<Section>` headed "Frequently asked questions" with exactly three Q&A pairs |

No other files need to change. Use the existing `Section` component (as the
`03 About` section does, `src/pages/index.astro:114-123`), so no new
components, tokens, or class names are needed.

## Keyword gaps

Command run:

```
node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro
```

Output:

```
No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro
```

- `src/seo/keywords.ts` has no active entries (only a commented-out example),
  so the optimizer found **no zone gaps** in title, description, headings, or body.
- `npm run lint:seo` passes trivially when the registry is empty, so the new
  section can't fail the SEO gate.
- No keyword work is needed for this item. Registering keywords is out of scope.

## Analytics (`data-analytics-id`)

### New section
- The FAQ is static text with no CTAs, so it needs no `data-analytics-id`.
- If an answer includes a link (for example to `/about/`), give it a
  descriptive id such as `data-analytics-id="home-faq-about-link"`. If the link
  is off-site, also add `?utm_source=website&utm_medium=referral&utm_campaign=home`.

### Existing CTAs on the page (for the record; do not change)

| Location | CTA | Status |
|---|---|---|
| `index.astro:32` PageHero `cta` | "Read the docs" | OK, the component defaults it to `hero-cta-primary` |
| `index.astro:33` PageHero `ctaSecondary` | "View on GitHub" (external) | Has id (`hero-cta-secondary`), but **no UTM params** |
| `index.astro:108` inline link | "About" in the Get started list | **Missing `data-analytics-id`** |
| `index.astro:130` CtaStrip `cta` | "Get the template" (external) | Has id (`cta-strip-primary`), but **no UTM params** |

These gaps were already there before this item. The acceptance criteria say
"the rest of the page renders exactly as before", so this item should **not**
fix them. They should go in a separate backlog item.

## Redirects

None. No page is moved, renamed, or deleted. `public/_redirects` stays as it is.

## Notes for the implementation stage

- **Placement:** put the section after the `03 About` section, before the
  closing `<CtaStrip>`. That keeps the closing CTA last on the page and leaves
  every existing section untouched. "Below the existing content" could also
  mean after the `CtaStrip`. If the reviewer reads it that way, the section
  should go after it instead.
- **Suggested props:** `variant="sunken"` (the variants alternate
  paper → sunken → paper), `kicker={{ num: '04', label: 'FAQ' }}`,
  `heading="Frequently asked questions"`, `id="faq"`.
- **Content:** exactly three questions. Each answer is one or two plain-language
  sentences about this project (for example: what ship-a-website is, what
  TNMS Ship does with it, how to get started).
- **Markup:** use plain block-context or utility markup that matches the About
  section (`text-sm leading-relaxed text-ink-700`). No inline styles, no new
  BEM classes, no client JS.
- **Verify:** `npm run lint` and `npm run build` must pass.
