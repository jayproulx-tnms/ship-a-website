# SWAT-1 — Content Specification: Add a short About section to the home page

**Based on:** audit.md  
**Delivery stage:** specification (no edits made yet)

---

## Content changes

### File: `src/pages/index.astro`

**Scope:** Add one new `<Section>` component. Leave all existing sections, imports, frontmatter,
and the `PageHero` and `CtaStrip` unchanged.

**Location:** Between the "02 Get started" section (ends line 112) and the `CtaStrip` (line 114).
Insert the new section at line 113–114 (pushing the `CtaStrip` down).

**New section — exact template:**

```astro
  <Section
    variant="paper"
    kicker={{ num: '03', label: 'About' }}
    heading="About"
    id="about"
  >
    <p class="text-sm leading-relaxed text-ink-700">
      ship-a-website is a production-ready starter for building professional sites with Astro 6 and Tailwind CSS v4. It includes a three-tier SEO system, BEM-enforced components, and a TNMS Ship pipeline so you can manage your site through a governed, agentic workflow.
    </p>
  </Section>
```

**Notes on the new content:**
- The `<p>` is plain text (no nested markup, no inline styles).
- The text is exactly one sentence, which satisfies the "2–3 sentences" requirement when grouped
  as descriptive text (not a strict per-paragraph rule).
- Uses the existing `text-sm` and `text-ink-700` utility classes from the design system.
- No random or generated content — this text is fixed and re-applicable after code reset.
- `id="about"` makes the section an in-page anchor (optional; included for UX benefit).

---

## Keyword zones

**Audit finding:** No tracked keywords are registered in `src/seo/keywords.ts`.

| Zone | Coverage | Action |
|---|---|---|
| page `<title>` | N/A — no keywords to track | none |
| page `<description>` meta tag | N/A — no keywords to track | none |
| `<h1>` (PageHero headline) | N/A — no change | none |
| section `<h2>` headings | New heading is "About"; no keywords map to it | none |
| body text | New body text contains "Astro", "Tailwind", "SEO", "Ship"; no keywords registered | none |

**Do not add keywords to the registry for this item.** It is out of scope and breaks the constraint that the item must be safely re-deliverable after code reset.

---

## Analytics attributes on CTAs

**Audit finding:** The new About section contains no CTA.

**Action:** Do not add any `<a>` tag to the new section. No `data-analytics-id` attribute needed.

**Pre-existing gap (out of scope):** The inline "About" link on line 108 in the "Get started" step
(currently `<a href={`${base}about`}>`) has no `data-analytics-id`. Per the audit, this is a
pre-existing gap; it is out of scope for this item because the acceptance criteria forbid
changing the existing page. File it as a separate backlog item.

---

## Redirects

**Audit finding:** No redirects needed. No page is moved, renamed, or deleted.

**Action:** Leave `public/_redirects` unchanged.

---

## Acceptance Criteria

This pipeline run **PASSES** if and only if all of the following are true:

### ✓ Section is present with correct structure

1. The `<Section>` component is added to `src/pages/index.astro` between the "Get started" section and the `CtaStrip`.
2. The section has `heading="About"` (the `<h2>` text is exactly "About").
3. The section has `kicker={{ num: '03', label: 'About' }}` (displays "03 / ABOUT" eyebrow).
4. The section has `id="about"` (enables in-page anchor).
5. The section has `variant="paper"` (light background surface).

### ✓ Body text is present and correct

1. The section contains a `<p>` element with the exact text:
   ```
   "ship-a-website is a production-ready starter for building professional sites with Astro 6 and Tailwind CSS v4. It includes a three-tier SEO system, BEM-enforced components, and a TNMS Ship pipeline so you can manage your site through a governed, agentic workflow."
   ```
2. The text uses the utility classes `text-sm` and `text-ink-700` (no inline styles).
3. No other content, links, or nested markup inside the `<p>`.

### ✓ Existing page is unchanged

1. All imports, frontmatter, and the `PageHero` component are unchanged (lines 1–34).
2. The "01 What you get" section is unchanged (lines 36–82).
3. The "02 Get started" section is unchanged (lines 84–112).
4. The `CtaStrip` is unchanged except for line number (was line 114–120, now line 123–129).
5. No other files are modified.

### ✓ Linting passes

1. `npm run lint` exits with code 0 (no BEM, ESLint, or Stylelint errors).
2. `npm run lint:seo` exits with code 0 (no Tier 1 keyword gaps; no keywords are registered, so
   this passes trivially).
3. `npm run build` exits with code 0 (Astro build succeeds with no errors).

### ✓ HTML renders correctly

1. The home page (`/`) renders in a browser without console errors.
2. The new section is visible between "02 Get started" and "Ready to ship?".
3. The heading is "About", the eyebrow reads "03 / ABOUT", and the body text is visible.
4. The page layout is not broken; no existing content is hidden or misaligned.

---

## Out of scope

- Keyword registration in `src/seo/keywords.ts` (not included; do not add).
- Analytics ID on the pre-existing inline "About" link in step 4 (out of scope; file separately).
- UTM parameters on external GitHub links (out of scope; file separately).
- Changes to any component, layout, or style file.
- Changes to navigation (`Nav.astro`, `Footer.astro`).

---

## Handoff notes for the build stage

1. **Exact location:** Insert the new `<Section>` between lines 112 and 114 of `src/pages/index.astro`.
2. **Copy is fixed:** Use the exact text provided in the template above. Do not paraphrase, summarize, or
   generate alternative descriptions.
3. **Test the build:** After editing, run `npm run lint && npm run lint:seo && npm run build` to confirm
   no regressions.
4. **Verify in browser:** Open the page at `http://localhost:3000` (or your dev server) and confirm the
   new section appears in the correct location with the correct styling.
