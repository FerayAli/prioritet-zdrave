# Technical architecture

Implement **after** [visual-phase-1.md](visual-phase-1.md) is approved. Product rules live in [mvp_plan.md](mvp_plan.md).

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Content (MVP) | Markdown + YAML frontmatter in `content/posts/` |
| UI strings | `locales/messages.csv` → `t(key)`; English active, `bg` later |
| Deploy (later) | Vercel or static export; local-first until agreed |

## Repository layout

```
content/posts/              # one .md file per post
public/images/posts/        # cover and inline images
locales/messages.csv        # key, en, bg
src/i18n/                   # types, getMessages, t()
src/lib/content/            # content seam (see below)
src/app/
  layout.tsx                # shell: header, footer
  page.tsx                  # home (visual phase 1)
  about/page.tsx
  recipes/page.tsx
  start-here/page.tsx
  search/page.tsx
  blog/[slug]/page.tsx      # single post (phase 2)
src/components/             # Header, Hero, PostCard, TagPicker, …
docs/
```

## Content seam

All pages use this API — never read `content/posts` directly from UI components.

```ts
// Conceptual surface
listPosts(): Post[]
getPostBySlug(slug: string): Post | null
listAllTags(): string[]
filterPostsByTags(tags: string[], mode: 'and' | 'or'): Post[]
```

**MVP:** implementations read Markdown at build time (or via `fs` in server components).

**Later:** swap to CMS fetch; keep the same function signatures and `Post` type.

### Post type

```ts
type Post = {
  title: string
  slug: string
  date: string       // ISO date
  excerpt: string
  body: string       // HTML or MD source
  cover?: string     // public path
  tags: string[]
}
```

### Example Markdown post

```markdown
---
title: "Blend for better sleep"
date: 2026-10-06
excerpt: "A simple evening routine with lavender and bergamot."
tags: ["essential-oils", "sleep", "stress"]
cover: /images/posts/sleep.jpg
---

Article body in Markdown…
```

## Routing

| Path | Behavior |
|------|----------|
| `/` | Homepage (hero, tiles, circles; phase 2 adds post feed) |
| `/about` | Static / MD page |
| `/recipes` | Posts filtered by food/recipe tags |
| `/start-here` | Questionnaire (stub → future multi-step flow) |
| `/search` | Tag multi-select + AND filter |
| `/blog/[slug]` | Single post |

Hero tiles and topic circles link to `/search` with preset tag query or dedicated filter routes — same `filterPostsByTags` underneath.

## Internationalization

1. Authoritative file: `locales/messages.csv` (`key`, `en`, `bg`)
2. Build step or runtime loader exposes `messages.en` for MVP
3. TypeScript union of keys in `src/i18n/keys.ts` for safety
4. Optional: `npm run i18n:check` for missing keys / empty `en`

Post **titles and bodies** stay in Markdown (English MVP), not in CSV.

## Search behavior

- Default: **AND** — post must include every selected tag
- UI: all tags from `listAllTags()`, sorted; checkboxes + Search button
- URL: `/search?tags=sleep,stress` for shareable state (recommended in phase 2)

## Tag authoring

- Free-form tags on each post
- Autocomplete: aggregate unique tags from `listAllTags()` when editing (phase 2: CLI `npm run tags` or dev-only `/studio`)

## Visual phase 1 vs phase 2

| Concern | Phase 1 | Phase 2 |
|---------|---------|---------|
| Header / hero / tiles | Real UI + i18n | Wire links to search/recipes |
| `src/lib/content/` | Optional mock posts | Markdown loader |
| `/search` | Static mock layout | Live filter |
| `/blog/[slug]` | — | Full post render |

## Code structure (not one HTML per page)

- Shared `layout.tsx` for header/footer
- One dynamic route `blog/[slug]` for all posts
- HTML generated at build/dev time — sources are TSX + Markdown, not hand-written `.html` per URL

## Images

- Store under `public/images/`
- No stock API required; download from Unsplash/Pexels into repo
- Use consistent aspect ratio for cards (e.g. 4:3 or 16:10)

## Future (not in initial technical MVP)

- Headless CMS behind content seam
- Locale prefix `/bg/...` and filled CSV `bg` column
- Questionnaire → ranked tags → redirect to `/search?tags=...`
- Body map UI → same tag filter
- `next-intl` or similar if routing per locale grows

## Risks

| Risk | Mitigation |
|------|------------|
| Tag sprawl (synonyms) | Document naming conventions; merge tags later |
| AND too strict for users | Document OR mode; add toggle if needed |
| CSV merge conflicts | Optional codegen to JSON; keep CSV for translators |

## Related docs

- [repo-setup.md](repo-setup.md) — Git
- [mvp_plan.md](mvp_plan.md) — product scope
- [visual-phase-1.md](visual-phase-1.md) — homepage spec
