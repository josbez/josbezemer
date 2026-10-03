# Design system

Single source of truth for how josbezemer.nl looks. Live reference: `/styleguide` (`src/pages/styleguide.astro`), rendered with the real components.

## Tokens

Defined in `src/styles/global.css`. Two layers:

**Primitives** (raw palette, never used directly in components)

| Token               | Value     |
| ------------------- | --------- |
| `--color-paper-100` | `#f4efe6` |
| `--color-paper-200` | `#ece6da` |
| `--color-ink-800`   | `#271f1a` |
| `--color-ink-900`   | `#1c1714` |
| `--color-clay-600`  | `#a54c2a` |
| `--color-clay-400`  | `#d4724a` |

**Semantic** (what components use, switched by `html.dark`)

| Token           | Tailwind utility | Light     | Dark      | Use                         |
| --------------- | ---------------- | --------- | --------- | --------------------------- |
| `--bg-main`     | `bg-main`        | paper-100 | ink-900   | Page background             |
| `--bg-muted`    | `bg-muted`       | paper-200 | ink-800   | Hover fill, subtle surfaces |
| `--text-main`   | `text-main`      | ink-900   | paper-100 | All text                    |
| `--border-main` | `border-main`    | ink-900   | paper-100 | Borders, dividers           |
| `--accent`      | `text-accent`    | clay-600  | clay-400  | Links, active nav, emphasis |

All text/accent pairs pass WCAG AA (accent on muted is the lowest at 4.6:1).

## Typography

- **Syne** (`font-serif`): headings, nav, buttons.
- **Epilogue** (`font-sans`): body, meta, eyebrows.
- h1–h6 base styles live in `global.css` `@layer base`. Long-form content uses `prose sm:prose-lg max-w-none`.
- Page title: `text-3xl leading-tight sm:text-5xl sm:leading-tight`.
- Eyebrow: `text-xs font-medium tracking-[0.08em] uppercase opacity-55`.
- Meta / secondary text: `text-sm opacity-55`.

## Layout

- Page gutter `px-4 md:px-8`, content `max-w-3xl`, text blocks `max-w-xl`.
- Sections `mb-16 sm:mb-24`; list items `mb-10 sm:mb-12`.
- Containers and dividers: dashed `border-main`. Interactive controls: solid `rounded-full` pill.

## Components

`src/components/`: `Button`, `IconButton`, `NavLink`, `ProjectPreview`, `PostPreview`, `Pagination`, `AlsoWorkedWith`, `Subscribe`, `Hero`, `Header`, `Nav`, `Footer`. Reuse before creating new ones.

## Rules

1. No hex, rgb or arbitrary colour values in components. Use semantic utilities only.
2. Secondary text is `opacity-55`, not a new colour.
3. Accent for links, active state and at most one emphasis per view. Never large fills.
4. Two typefaces only.
5. New token: add primitive, map it semantically for light and dark, add it to `/styleguide`, this file and the Figma variables (collection "josbezemer.nl").
6. New or changed component: update `/styleguide` in the same change.
