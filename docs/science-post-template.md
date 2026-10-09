# Science post template

Use this structure for every post under `content/posts/` with `format: science`.

## Front matter

```yaml
---
title: Plain-language title (no “cures”)
date: "YYYY-MM-DD"
excerpt: One honest sentence for cards and search.
cover: /images/home/science.jpg
format: science
focus:
  - stress   # blood-sugar | sleep | stress | back | energy | digestion
oils:
  - lavender # optional; must match content/oils slugs
everyday: false
featured: false
---
```

## Body sections (use `##` headings)

### Why this matters

One paragraph. Use cautious wording: “may,” “in this study,” “participants.”

### What researchers did

Study design (RCT, systematic review, in vitro), sample or model, route (inhaled, oral, topical), and **which preparation** (e.g. generic lavender oil vs a named oral extract).

### Main findings

- Bullet with direction of effect and key numbers when available
- 3–5 bullets total

### What this does not prove

Chemotype, dose, duration, population, blinding; in vitro ≠ clinical benefit.

### Practical context

What research often tested (diffusion, diluted topical, inhalation) without prescribing. Link to your oil pages, e.g. [Lavender](/book/lavender).

### Sources

- [Author et al., Journal, Year](https://pubmed.ncbi.nlm.nih.gov/PMID/)
- Prefer PubMed, PMC, or DOI links; anchor text = citation, not “click here.”

Reading time is shown automatically on each post page (from word count). Site-wide disclaimer stays in the footer only.

## Example excerpt (chemotype post)

See `content/posts/chemotype-why-same-plant-differs.md`.

## Source log

Track PMIDs and DOIs in [science-sources.csv](./science-sources.csv) when adding or refreshing posts.
