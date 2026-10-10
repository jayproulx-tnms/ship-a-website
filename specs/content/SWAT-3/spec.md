# SWAT-3 — Content specification: Add a short FAQ section to the home page

**Based on audit:** `specs/content/SWAT-3/audit.md`
**Date:** 2026-10-10

---

## Content changes

### New content: FAQ Section

**File:** `src/pages/index.astro`  
**Location:** After the "03 About" section (line 123), before `<CtaStrip>` (line 125)

Add one new `<Section>` component with exactly three Q&A pairs. The section must:
- Use the `Section` component, not a custom wrapper
- Have `variant="sunken"` (alternating paper → sunken → paper across sections)
- Have `kicker={{ num: '04', label: 'FAQ' }}`
- Have `heading="Frequently asked questions"`
- Have `id="faq"` for anchor linking
- Contain exactly three Q&A pairs
- Use plain block-context markup: `<p class="text-sm leading-relaxed text-ink-700">...</p>` per question

#### Suggested content (must address "about this project")

The three questions should cover:
1. **What is ship-a-website?** — Briefly explain the project and its purpose.
2. **What is TNMS Ship and how does it work with ship-a-website?** — Explain the governed pipeline.
3. **How do I get started?** — Point to the getting-started section and deployment path.

Example text (use or adapt; each answer is one or two sentences):

```markdown
Q1: What is ship-a-website?
A1: ship-a-website is a production-ready static site starter built on Astro 6 and 
Tailwind CSS v4, featuring BEM-enforced components, a three-tier SEO system, and 
self-hosted fonts. It's designed for building professional sites without a large 
content or engineering team.

Q2: What is TNMS Ship and how does it use ship-a-website?
A2: TNMS Ship is an agentic pipeline that lets you update your site through governed 
workflows in Jira, with AI agents handling content, design, and SEO. ship-a-website 
ships with two Ship configs (content.ship.yaml and design.ship.yaml) so you can assign 
work and let agents maintain your site.

Q3: How do I get started with ship-a-website?
A3: Fork the repo, configure your brand in scripts/site.config.ts, run `npm run dev` 
locally, and then connect TNMS Ship if you want a governed pipeline. See the 
"Get started" section above for step-by-step instructions.
```

**Markup structure:**

```astro
<Section
  variant="sunken"
  kicker={{ num: '04', label: 'FAQ' }}
  heading="Frequently asked questions"
  id="faq"
>
  <div class="space-y-8">
    <div>
      <h3 class="font-semibold text-ink-900 mb-2">Q: What is ship-a-website?</h3>
      <p class="text-sm leading-relaxed text-ink-700">
        [One or two sentences about the project.]
      </p>
    </div>
    <div>
      <h3 class="font-semibold text-ink-900 mb-2">Q: What is TNMS Ship and how does it use ship-a-website?</h3>
      <p class="text-sm leading-relaxed text-ink-700">
        [One or two sentences about the pipeline.]
      </p>
    </div>
    <div>
      <h3 class="font-semibold text-ink-900 mb-2">Q: How do I get started with ship-a-website?</h3>
      <p class="text-sm leading-relaxed text-ink-700">
        [One or two sentences about getting started.]
      </p>
    </div>
  </div>
</Section>
```

---

## Keyword zones

**Finding:** No keywords mapped to `src/pages/index.astro`.

- `src/seo/keywords.ts` has no active entries.
- The optimizer found **zero zone gaps** in title, description, headings, or body.
- The new FAQ section does not introduce any keywords that need to be tracked.
- **No SEO work required.** `npm run lint:seo` will pass.

---

## CTAs and analytics

### New section CTAs

The FAQ section is **static text with no CTAs**. No `data-analytics-id` attributes are needed.

- If any FAQ answer includes a link (e.g., `<a href="/about">About</a>`), add:
  - `data-analytics-id="home-faq-about-link"` or similar
  - If the link goes off-site, also add `?utm_source=website&utm_medium=referral&utm_campaign=home`
- The suggested content above has no links, so no analytics IDs are required.

### Existing CTAs (do not modify)

Per the audit, four existing CTAs have pre-existing gaps. **This item must not fix them** 
because the acceptance criteria say "the rest of the page renders exactly as before". 
These gaps should be addressed in a separate backlog item:

| Location | Issue |
|---|---|
| Line 33: GitHub link | Missing UTM params (`?utm_source=website&utm_medium=referral&utm_campaign=home`) |
| Line 108: "About" inline link | Missing `data-analytics-id` |
| Line 130: "Get the template" external link | Missing UTM params |

---

## Redirects

**No changes to `public/_redirects`.** No page is moved, renamed, or deleted.

---

## Acceptance criteria

This pipeline run passes when **all** of the following are true:

1. ✅ **Section is present**
   - The FAQ section is visible on the home page (at `/`)
   - It appears below the existing content (after "03 About", before or after the closing CTA strip)
   - The section has the heading "Frequently asked questions"

2. ✅ **Exactly three questions**
   - The section contains exactly three Q&A pairs
   - No more, no fewer

3. ✅ **One or two-sentence answers**
   - Each answer is one or two plain-language sentences
   - Answers are about ship-a-website, TNMS Ship, or how to get started
   - No marketing jargon or external links (unless explicitly added per CTA guidelines)

4. ✅ **Page renders as before**
   - All existing sections (Hero, "What you get", "Get started", "About", closing CTA) render identically
   - No styling changes to existing content
   - No rearrangement of existing sections

5. ✅ **Site builds and passes lint**
   - `npm run build` completes with no errors
   - `npm run lint` passes (BEM + Stylelint + ESLint + Markdown)
   - `npm run lint:seo` passes (trivially, since no keywords are registered)

6. ✅ **No new CTA gaps introduced**
   - If any new links appear in the FAQ, they have `data-analytics-id` attributes
   - External links include UTM parameters
   - No pre-existing CTA gaps are fixed (out of scope)

---

## Notes for the implementation stage

- **Placement ambiguity:** The acceptance criteria say "below the existing content". 
  This could mean after the "About" section or after the closing CtaStrip. The 
  recommended placement is after "About" (before CtaStrip), which keeps the closing 
  CTA last. If the reviewer prefers after CtaStrip, move it there.
  
- **Markup:** Use plain block-context semantics (`<h3>`, `<p>` with Tailwind utilities). 
  No inline styles, no new BEM classes, no client JS.

- **CSS classes:** All available from existing design tokens:
  - `space-y-8` — vertical spacing between Q&A pairs
  - `font-semibold text-ink-900` — question heading
  - `mb-2` — space between question and answer
  - `text-sm leading-relaxed text-ink-700` — answer body (same as About section)

- **Verify before commit:**
  ```bash
  npm run lint
  npm run build
  npm run lint:seo
  ```
