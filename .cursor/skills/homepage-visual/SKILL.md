---
name: homepage-visual
description: >-
  Apply prioritet-zdrave homepage visual rules: Pinch of Yum layout pattern,
  design tokens, hero tiles/circles, image crop, header/nav, and i18n copy.
  Use when changing the homepage, hero, header, logo, tiles, topic circles,
  fonts, colors, or matching pinchofyum.com look-and-feel.
---

# Homepage visual

Reference: [pinchofyum.com](https://pinchofyum.com/) header through the **circle row**. Adapt for wellness; do not copy HTML/CSS/fonts wholesale. Commercial POY fonts (Drama, Domaine, ConsulSans) are off-limits — keep the Google Font substitutes in `src/app/layout.tsx`.

Phase 1 slice: **top through circle recipes list**. Do not add post cards, newsletter bar, or below-the-fold sections unless asked.

## Files

| Area | Path |
|------|------|
| Tokens | `src/app/globals.css` (`@theme`) |
| Fonts | `src/app/layout.tsx` |
| Header | `src/components/site-header.tsx`, `src/components/site-nav.tsx` |
| Hero | `src/components/hero.tsx` |
| Tile/circle data | `src/lib/hero.ts` |
| Copy | `locales/messages.csv` + `src/i18n/keys.ts` |
| Images | `public/images/hero/` — log sources in `SOURCES.txt` |
| Spec | `docs/visual-phase-1.md` |

## Tokens (do not invent new hex)

| Token | Value | Use |
|-------|--------|-----|
| `paper` | `#ffffff` | Page / mobile tile background |
| `band` | `#f7f7f7` | Circle strip; hero band **from `md:` only** |
| `ink` | `#1a1a1a` | Logo-adjacent text, nav, circle labels |
| `muted` | `#4d4d4d` | Body |
| `plum` | `#734060` | Logo, script headline, active nav, burger |
| `yellow` | `#edb654` | Tile labels |
| `line` | `#e6e6e6` | Header border |

Fonts: logo `font-logo` (Instrument Serif), nav `font-nav` (Outfit 700), kicker `font-slab` (Arvo), script `font-script` (Sacramento), body/tile labels `font-body` (Bitter).

## Layout contract

1. **Header** — wordmark left; Home · About · Recipes · Start here · Search icon. Burger + overlay **below `sm`**. Active link: `md:border-plum` 3px. Logo sizes: `w-60 text-[1.71875rem]` / `sm:w-80 sm:text-[2.03125rem]`.
2. **Headline** — kicker (uppercase Arvo, wide tracking) + script line (plum, lowercase) split on the comma in `hero.slogan`.
3. **Tiles** — four formats: oils, recipes, movement, stories.
   - Mobile: first tile featured (`col-span-2 -mx-4 h-80`); other three `size-44` in 2-col grid; **white** behind tiles.
   - Desktop (`md+`): four equal `aspect-[7/10]` portraits on `bg-band`.
   - Yellow overlapping labels, uppercase, Bitter.
4. **Circles** — eight topics from `heroCircles`; `size-[5.5rem]` / `md:size-[6.6rem]`; gray `bg-band` strip; horizontal scroll.

Nav and tile data live in `navLinks` / `heroTiles` / `heroCircles`. Keep search as the icon-only last item.

## Images

- Store under `public/images/hero/`. Hero tiles use `.jpg` names in `hero.ts` (`essential-oils.jpg`, `movement.jpg`, …).
- Prefer user files from `~/Downloads/` when they provide a path. Copy into `public/images/hero/`; update `SOURCES.txt`.
- Prefer Unsplash License or other clearly reusable sources for production. Do not use Cleveland Clinic or other non-licensed CDN assets.
- Tiles are portrait/square; landscape photos need `imageObjectPosition` on `HeroLink`. Movement photo: keep the person visible (`82% 42%` unless the user retunes).
- `HeroTile` must pass `imageObjectPosition` through to `next/image` `style.objectPosition`.
- After swapping images, tell the user to hard-refresh.

## Copy / i18n

- Never hardcode UI strings. Add the key to `src/i18n/keys.ts` and a row to `locales/messages.csv`.
- Headline copy is `hero.slogan` (comma-split). Do not add `hero.title` unless the user chooses a separate headline.

## Do not

- Paste Pinch of Yum CSS/HTML.
- Change tokens without asking.
- Expand scope below the circle row.
- Commit unless the user asks.

## Verify

If the change is layout/styling, check desktop and a narrow viewport: header/menu, featured vs compact tiles, circle row, and image crops (especially movement).
