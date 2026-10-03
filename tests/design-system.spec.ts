import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const themes = ['light', 'dark'] as const;
type Theme = (typeof themes)[number];

// Every block on /styleguide that gets its own visual baseline.
const styleguideBlocks = [
    'sg-colors',
    'sg-type',
    'sg-icons',
    'sg-layout',
    'c-button',
    'c-icon-button',
    'c-text-field',
    'c-link',
    'c-project-preview',
    'c-post-preview',
    'c-pagination',
    'c-also-worked-with'
];

async function openWithTheme(page: Page, path: string, theme: Theme) {
    // theme-toggle.js reads this before first paint
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
}

async function expectNoA11yViolations(page: Page) {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`);
    expect(summary, summary.join('\n\n')).toEqual([]);
}

for (const theme of themes) {
    test.describe(`${theme} theme`, () => {
        test.describe('accessibility', () => {
            test('styleguide has no WCAG A/AA violations', async ({ page }) => {
                await openWithTheme(page, '/styleguide/', theme);
                await expectNoA11yViolations(page);
            });

            for (const path of ['/', '/projects/', '/notes/', '/about/', '/contact/']) {
                test(`${path} has no WCAG A/AA violations`, async ({ page }) => {
                    await openWithTheme(page, path, theme);
                    await expectNoA11yViolations(page);
                });
            }

            test('first project and note detail pages have no WCAG A/AA violations', async ({ page }) => {
                await openWithTheme(page, '/', theme);
                const detailLinks = [
                    await page.locator('a[href^="/projects/"]:not([href="/projects/"])').first().getAttribute('href'),
                    await page.locator('a[href^="/notes/"]:not([href="/notes/"])').first().getAttribute('href')
                ].filter((href): href is string => Boolean(href));
                expect(detailLinks.length).toBeGreaterThan(0);

                for (const href of detailLinks) {
                    await openWithTheme(page, href, theme);
                    await expectNoA11yViolations(page);
                }
            });
        });

        test.describe('visual', () => {
            for (const id of styleguideBlocks) {
                test(`styleguide ${id}`, async ({ page }) => {
                    await openWithTheme(page, '/styleguide/', theme);
                    await expect(page.locator(`#${id}`)).toHaveScreenshot(`${id}-${theme}.png`);
                });
            }
        });
    });
}
