import { defineConfig, devices } from '@playwright/test';

const PORT = 4400;

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: [['list'], ['html', { open: 'never' }]],
    // Baselines are per platform, so they only match on the OS they were recorded on
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}-{platform}{ext}',
    expect: {
        toHaveScreenshot: { maxDiffPixels: 10, animations: 'disabled', caret: 'hide' }
    },
    use: {
        baseURL: `http://localhost:${PORT}`,
        reducedMotion: 'reduce'
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } }
    ],
    webServer: {
        // Test the production build, not the dev server. CI has already built it.
        command: process.env.CI ? `npx astro preview --port ${PORT}` : `npm run build && npx astro preview --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000
    }
});
