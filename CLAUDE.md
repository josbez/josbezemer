# josbezemer.nl

Astro 6 + Tailwind v4 portfolio and notes site. Content in `src/content/` (edited via Obsidian).

- Commands: `npm run dev`, `npm run build`, `npm run check`, `npm run format:check`, `npm test` (Playwright: axe + visual), `npm run icons`.
- After UI changes run `npm test`. Update baselines (`npm run test:update`) only for intentional visual changes.
- Before any UI work, read the design system (<https://claude.ai/artifact/4TWe4XZQ4TdDyvgTZuQEes>, it leads) and `DESIGN.md`, and follow its tokens and rules. Visual reference: `/styleguide`.
- Every UI PR updates the design system artifact first or in the same change, and the PR description says what changed in it (see `DESIGN.md`, Design system first).
- Formatting: Prettier (160 cols, 4 spaces, single quotes). Run `npx prettier --write` on changed files.
