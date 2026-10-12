# SWAT-3 — Content spec: FAQ section on the home page

**Inputs:** `specs/content/SWAT-3/audit.md` and work item SWAT-3
**Target file:** `src/pages/index.astro` (only this file)

## Context

The audit found the FAQ already in place (lines 125–151, from runs #10 and #11). It has the right heading and exactly three Q&As. Its weak point is acceptance criterion 2, which asks for answers "in plain language about this project". The current answers rely on developer jargon that a site visitor won't follow:

- "BEM-enforced components", "three-tier SEO system", "self-hosted fonts" (answer 1)
- "agentic pipeline", "governed workflows", file names `content.ship.yaml` / `design.ship.yaml` (answer 2)
- `scripts/site.config.ts` and `npm run dev` shown as code. "Fork the repo" also clashes with the "Clone the repo" step above it (answer 3)

The work item notes ask for "a run that really delivers a change". This run rewrites the three Q&As in plain language. It does not change the section's structure, placement, or anything else on the page.

## 1. Exact content changes

### 1.1 New / updated copy (FAQ section only, `index.astro` lines 131–150)

Keep the `<Section>` wrapper exactly as it is: `variant="sunken"`, kicker `{ num: '04', label: 'FAQ' }`, `heading="Frequently asked questions"`, `id="faq"`. Also keep the `<div class="space-y-8">` container. Keep each Q&A's markup the same, changing only the text:

```astro
<div>
  <h3 class="font-semibold text-ink-900 mb-2">QUESTION</h3>
  <p class="text-sm leading-relaxed text-ink-700">
    ANSWER
  </p>
</div>
```

Replace the three questions and answers with this copy, word for word:

| # | Question (`<h3>`) | Answer (`<p>`) — exactly two sentences |
|---|---|---|
| 1 | What is ship-a-website? | It's a ready-made starting point for building a fast, professional website. You copy it, add your own words and branding, and publish it. |
| 2 | What is TNMS Ship? | TNMS Ship lets AI assistants make updates to your site for you, like adding a page or improving how it shows up in search. Every change goes through automatic checks and a review before it goes live. |
| 3 | How do I get started? | Copy the project, add your own site name and details, and preview it on your computer. The "Get started" section above walks you through each step. |

Rules for the copy:
- No `<code>` elements, file names, command names, or acronyms (BEM, SEO, CSS, Astro version numbers) in the FAQ.
- No links or buttons in the FAQ section.
- Plain text only, with no new classes and no inline styles.

### 1.2 Deleted content

The three current Q&A texts (lines 133, 135, 139, 141, 145, 147) are replaced as described in 1.1. Nothing else is deleted.

### 1.3 Unchanged (must not be touched)

- Frontmatter, imports, `Layout` title and description
- `PageHero`, the `01 What you get`, `02 Get started`, and `03 About` sections, and `CtaStrip`, including the existing analytics and UTM gaps the audit flagged
- The FAQ's position: after `03 About` and before the closing `CtaStrip`. This run reads "below the existing content" as "after the page's content sections", with the page-closing call to action staying last. This is the same reading run #10 used.

## 2. Keyword zones addressed

`src/seo/keywords.ts` has no registered keywords, so no zone (title, description, headings, body) has a gap. The FAQ `<h3>` headings and answer text sit in the **headings** and **body** zones but are not aimed at any keyword. Do not add entries to the keyword registry for this item.

## 3. CTAs needing `data-analytics-id`

**None for this item.** The FAQ section has no links or CTAs.

These gaps were on the page before this item and are **out of scope** (criterion 3 says the rest of the page must render exactly as before). Raise them as a follow-up backlog item:
- `index.astro:108`: the inline "About" link has no `data-analytics-id`
- `index.astro:33` and `index.astro:158`: the external GitHub links have no UTM parameters

## 4. Redirects

**None.** No page is moved, renamed, or deleted. Leave `public/_redirects` unchanged.

## 5. Acceptance criteria — this run passes when

1. `git diff main -- . ':!specs'` touches only `src/pages/index.astro`, and only lines inside the FAQ `<Section>` (the block with `id="faq"`).
2. The FAQ `<Section>` still has `heading="Frequently asked questions"` and `id="faq"`. It sits after the `03 About` section and before `<CtaStrip`.
3. The FAQ section has exactly **3** `<h3>` elements and exactly **3** answer `<p>` elements, and their text matches the table in 1.1 exactly.
4. Each answer has one or two sentences (each answer in 1.1 has two).
5. The FAQ section has no `<code>`, `<a>`, `<button>`, `style=` attributes, or new class names.
6. `npm run lint` exits 0 with no new warnings.
7. `npm run build` exits 0, and the built `dist/index.html` contains the heading "Frequently asked questions" and all three new questions.
8. Everything in the built home page outside the FAQ section is unchanged from the `main` build.
