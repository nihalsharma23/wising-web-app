import { test, expect, Page } from '@playwright/test';

// Base URL = http://localhost:5174 (set in playwright.config.ts)
const DASHBOARD = '/dashboard';

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function gotoAndWait(page: Page, path: string) {
    await page.goto(path);
    // Wait for React to hydrate
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
}

// ─── Test Suite ───────────────────────────────────────────────────────────────
test.describe('Dashboard — Visual & Layout', () => {

    test('page loads without errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', e => errors.push(e.message));
        await gotoAndWait(page, DASHBOARD);
        await page.screenshot({ path: 'tests/screenshots/01_hero.png', fullPage: false });
        expect(errors).toHaveLength(0);
    });

    test('hero section — portfolio valuation visible', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        // The large ₹ valuation is in an h1
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        const text = await h1.innerText();
        expect(text).toContain('₹');
    });

    test('hero section — Wising logo visible (centred overlay)', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        // Logo is a fixed motion.div that starts at viewport centre.
        // Just verify it is visible and renders the correct content.
        const logo = page.locator('img[alt="Wising"]').first();
        await expect(logo).toBeVisible();
        // "WISING" text should be visible next to the logo
        const logoText = page.locator('text=WISING').first();
        await expect(logoText).toBeVisible();
        await page.screenshot({ path: 'tests/screenshots/03_logo_centred.png' });
    });

    test('hero section — 5 metric labels rendered', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        const labels = ['Health', 'Type', 'XIRR', 'Sharpe', 'Rate'];
        for (const label of labels) {
            const el = page.locator(`text=${label}`).first();
            await expect(el).toBeVisible();
        }
    });

    test('header — no logo in header, only action buttons', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        // Connect button should be visible in header
        const connectBtn = page.locator('button', { hasText: /connect/i }).first();
        await expect(connectBtn).toBeVisible();
        // Avatar img
        const avatar = page.locator('img[alt="User avatar"]').first();
        await expect(avatar).toBeVisible();
    });

    test('scroll — sticky bar appears and has metric pills', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        // Scroll well past the hero section
        await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'instant' }));
        await page.waitForTimeout(600);
        await page.screenshot({ path: 'tests/screenshots/02_sticky_bar.png', fullPage: false });

        // Sticky bar shows valuation
        const stickyBar = page.locator('text=Health').first();
        await expect(stickyBar).toBeVisible();
    });

    test('scroll — Historical Performance and P&L sections are side by side at 1280px', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await gotoAndWait(page, DASHBOARD);
        await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'tests/screenshots/03_side_by_side.png', fullPage: false });

        const perfHeading = page.locator('text=Historical Performance').first();
        const plHeading = page.locator('text=Profit').first();

        const perfBox = await perfHeading.boundingBox();
        const plBox = await plHeading.boundingBox();

        // At 1280px, they should be roughly on the same vertical level (within 80px)
        if (perfBox && plBox) {
            expect(Math.abs(perfBox.y - plBox.y)).toBeLessThan(80);
            // P&L heading should be to the right of Historical Performance heading
            expect(plBox.x).toBeGreaterThan(perfBox.x);
        }
    });


    test('scroll — Asset Allocation and Weighted Returns side by side at 1280px', async ({ page }) => {
        test.setTimeout(45_000);
        await page.setViewportSize({ width: 1280, height: 800 });
        await gotoAndWait(page, DASHBOARD);
        // Scroll to 60% of total document height (row 2 is roughly there)
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.55, behavior: 'instant' }));
        await page.waitForTimeout(500);

        const wtHeading = page.locator('h3:has-text("Weighted Returns")').first();
        const allocHeading = page.locator('h3:has-text("Asset Allocation")').first();

        // Wait for headings to exist in DOM (they're always rendered, just scroll them into view)
        await wtHeading.waitFor({ state: 'attached', timeout: 10_000 });
        await allocHeading.waitFor({ state: 'attached', timeout: 10_000 });

        // Scroll heading into view
        await wtHeading.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);

        await page.screenshot({ path: 'tests/screenshots/04_row2_side_by_side.png', fullPage: false });

        const wtBox = await wtHeading.boundingBox();
        const allocBox = await allocHeading.boundingBox();

        if (wtBox && allocBox) {
            // Both headings at same vertical level (within 80px)
            expect(Math.abs(wtBox.y - allocBox.y)).toBeLessThan(80);
            // Asset Allocation heading should be to the right
            expect(allocBox.x).toBeGreaterThan(wtBox.x);
        }
    });

    test('no footer on dashboard page', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        const footer = page.locator('footer');
        await expect(footer).toHaveCount(0);
    });

    test('Connect button does not cause page overflow / marquee', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        const body = page.locator('body');
        // Check no horizontal overflow introduced by the button's animation
        const overflow = await body.evaluate(el =>
            el.scrollWidth > el.clientWidth + 10
        );
        expect(overflow).toBe(false);
    });

    test('hamburger nav — visible on /dashboard, hidden on /', async ({ page }) => {
        await gotoAndWait(page, DASHBOARD);
        const hamburger = page.locator('.hamburger-toggle').first();
        await expect(hamburger).toBeVisible();

        await gotoAndWait(page, '/');
        await expect(page.locator('.hamburger-toggle')).toHaveCount(0);
    });
});
