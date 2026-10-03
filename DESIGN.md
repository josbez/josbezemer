# Design system

Single source of truth for how josbezemer.nl looks. Live reference: `/styleguide` (`src/pages/styleguide.astro`), rendered with the real components.

## Tokens

Defined in `src/styles/global.css`. Two layers:

**Primitives** (raw palette, never used directly in components)

| Token                 | Value     |
| --------------------- | --------- |
| `--color-paper-100`   | `#f4efe6` |
| `--color-paper-200`   | `#ece6da` |
| `--color-ink-800`     | `#271f1a` |
| `--color-ink-900`     | `#1c1714` |
| `--color-ink-500`     | `#68635e` |
| `--color-paper-500`   | `#938e88` |
| `--color-clay-600`    | `#a54c2a` |
| `--color-clay-400`    | `#d4724a` |
| `--color-crimson-700` | `#9f1d2b` |
| `--color-crimson-300` | `#ef7f86` |

**Semantic** (what components use, switched by `html.dark`)

| Token           | Tailwind utility              | Light               | Dark                | Use                              |
| --------------- | ----------------------------- | ------------------- | ------------------- | -------------------------------- |
| `--bg-main`     | `bg-main`                     | paper-100           | ink-900             | Page background                  |
| `--bg-muted`    | `bg-muted`                    | paper-200           | ink-800             | Hover fill, subtle surfaces      |
| `--text-main`   | `text-main`                   | ink-900             | paper-100           | Primary text                     |
| `--text-subtle` | `text-subtle`                 | ink-500             | paper-500           | Meta, hints, eyebrows            |
| `--border-main` | `border-main`                 | ink-900             | paper-100           | Borders, dividers                |
| `--accent`      | `text-accent`                 | clay-600            | clay-400            | Links, active nav, focus ring    |
| `--danger`      | `text-danger`                 | crimson-700         | crimson-300         | Errors only                      |
| inverse         | `bg-inverse` / `text-inverse` | ink-900 / paper-100 | paper-100 / ink-900 | Filled controls (primary button) |

All text/accent/danger pairs pass WCAG AA (accent on muted is the lowest at 4.6:1; danger is 6.8:1 in both modes).

Focus: global `:focus-visible` outline, 2px `--accent`, 2px offset. Never remove it (no `outline-none`/`outline-hidden` without a replacement).

## Typography

- **Syne** (`font-serif`): headings, nav, buttons.
- **Epilogue** (`font-sans`): body, meta, eyebrows.
- h1–h6 base styles live in `global.css` `@layer base`. Long-form content uses `prose sm:prose-lg max-w-none`.
- Page title: `text-3xl leading-tight sm:text-5xl sm:leading-tight`.
- Eyebrow: `text-xs font-medium tracking-[0.08em] uppercase text-subtle`.
- Meta / secondary text: `text-sm text-subtle`.

## Layout

- Page gutter `px-4 md:px-8`, content `max-w-3xl`, text blocks `max-w-xl`.
- Sections `mb-16 sm:mb-24`; list items `mb-10 sm:mb-12`.
- Containers and dividers: dashed `border-main`.
- Buttons: solid border, `rounded-md`. Icon buttons and inputs: `rounded-full`.

## Icons

- Material Symbols **Sharp**, weight 400, from `@material-symbols/svg-400`.
- Only icons listed in `scripts/sync-icons.mjs` ship. To add one: add the name, run `npm run icons`. This copies the SVG to `src/assets/icons/` and regenerates the `IconName` type.
- Use `<Icon name="…" />`. Decorative next to text: no label. Standalone: pass `label`. Size via `size` (default `1.25em`).

## Components

`src/components/`: `Button`, `IconButton`, `Icon`, `TextField`, `NavLink`, `ProjectPreview`, `PostPreview`, `Pagination`, `Subscribe`, `Hero`, `Header`, `Nav`, `Footer`. Reuse before creating new ones.

`Button` has `variant="primary"` (`bg-inverse text-inverse`, hover accent) and `"secondary"` (default, outline). Max one primary per view. Optional `icon` (`IconName`) with `iconPosition="start" | "end"` (default end).

`TextField` takes `label`, `name`, optional `hint`, `error` and `hideLabel`. `error` renders the danger border, an error icon and message, and sets `aria-invalid` + `aria-describedby`. Use it for every text input.

## Rules

1. No hex, rgb or arbitrary colour values in components. Use semantic utilities only.
2. Secondary text is `text-subtle`. Never lower opacity on text (breaks contrast in light mode).
3. Accent for links, active state, focus and at most one emphasis per view. Never large surfaces.
4. Danger for errors only, always with icon and text (never colour alone).
5. Two typefaces only.
6. Icons only via `<Icon>` from the curated Material Symbols Sharp set.
7. New token: add primitive, map it semantically for light and dark, add it to `/styleguide`, this file and the Figma variables (collection "josbezemer.nl").
8. New or changed component: add or update its `<Spec>` block on `/styleguide` in the same change.

## Tests

`npm test` builds the site and runs Playwright (`tests/design-system.spec.ts`) on desktop and mobile, light and dark:

- **Accessibility**: axe WCAG 2.1 A/AA on `/styleguide`, every main page, and one note. Must stay at zero violations.
- **Visual**: a screenshot per styleguide section and component, compared to baselines in `tests/__screenshots__/` (max 10 px difference).

After an intentional visual change: check the diff in `playwright-report/`, run `npm run test:update` and commit the new baselines. Baselines are macOS-specific, so record them on the same machine. `npm run test:a11y` runs only the accessibility checks and works on any OS.
