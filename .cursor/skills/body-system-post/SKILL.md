---
name: body-system-post
description: >-
  Write prioritet-zdrave body-map system posts as Markdown. Use when creating
  or editing a body system note, a body-map guide, content/posts for nervous,
  endocrine, respiratory, cardiovascular, immune, digestive, urinary,
  musculoskeletal, skin, or women's health, or when the user asks for a system
  doc in this five-part shape.
---

# Body system post

English UI. One file per note under `content/posts/`. The guide for a system is the post the body-map icon opens.

## Required sections

Use these `##` headings, in this order, with this wording:

1. How does the system work?
2. Emotions and psychosomatics
3. Aromatherapy — oils and one practical recipe, when appropriate.
4. Daily care — food, movement, sleep, or other relevant habits.
5. Scientific sources — brief, at the end.

Heading text in the file:

```markdown
## How does the system work?
## Emotions and psychosomatics
## Aromatherapy
## Daily care
## Scientific sources
```

Section 3 still covers oils. Include **one** practical recipe only when a scent or diluted topical use is a fair everyday cue. Skip the recipe when it would imply treating infection, blood pressure, hormones, fertility, pregnancy, or the urinary tract — say that in one or two sentences instead.

Section 5 is a short bullet list. Do not invent PMIDs, journals, or quotes. Reuse `docs/science-sources.csv` and the Sources already published on related science posts. Two to four items is enough.

## Front matter

```yaml
---
title: A practical map of …
date: "YYYY-MM-DD"
excerpt: One honest sentence.
format: body-map
system: nervous   # nervous | endocrine | respiratory | cardiovascular | immune | digestive | urinary | musculoskeletal | skin | womens-health
guide: true       # exactly one guide per system
focus: []         # only a real overlap: blood-sugar, sleep, stress, back, energy, digestion
oils: []          # book slugs actually named in the body
everyday: false
featured: false
---
```

`system` is allowed only on `format: body-map`. Oil slugs must exist under `content/oils/`. Name oils with their book titles (Lavender, Tea tree) so the post page can link them.

## Voice

Educational, not a diagnosis and not a prescription. Emotions can change sleep, attention, pain, and habits; they do not mean a symptom is “only in your head.” No internal use of essential oils. No undiluted skin. No pregnancy protocol. Stop at irritation.

Recipe shape when you include one:

```markdown
**Evening wind-down** — inhalation

- Lavender — 2 drops
- On a tissue for a few minutes, or in a diffuser in a ventilated room for about 20 minutes
- Do not swallow. Stop if the scent bothers you.
```

## Checks

- Headings match the five lines above, in order.
- At most one recipe, and none where the skill says to skip it.
- Sources are real and brief.
- `npm test` still passes the body-map heading check in `src/lib/content/posts.test.ts`.
