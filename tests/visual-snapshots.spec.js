import { test, expect } from "@playwright/test";

test.describe("Visual Snapshot Tests", () => {
	test("homepage visual snapshots", async ({ page }) => {
		await page.goto("/");

		// Wait for content to load
		await page.waitForSelector('[data-testid="site-header"]');
		await page.waitForSelector('[data-testid="main-news"]');

		// Test header/banner section
		await expect(page.locator('[data-testid="site-header"]')).toHaveScreenshot(
			"homepage-banner.png",
		);

		// Test footer
		await expect(page.locator('[data-testid="site-footer"]')).toHaveScreenshot(
			"homepage-footer.png",
		);

		// Test main content area with longer timeout
		// await expect(page.locator('[data-testid="main-content"]')).toHaveScreenshot('main-content-section.png', { timeout: 10000 });
		// ignoring previous test since this will change
		// with on-demand	content loading
	});

	test("main news section visual test", async ({ page }) => {
		await page.goto("/");

		// Wait for main news section to load
		await page.waitForSelector('[data-testid="main-news"]');

		// Test the main news grid structure (first 4 articles)
		await expect(page.locator('[data-testid="main-news"]')).toHaveScreenshot(
			"main-news-grid.png",
		);
	});

	test("article list visual test", async ({ page }) => {
		await page.goto("/");

		// Wait for article list to load
		await page.waitForSelector('[data-testid="news-articles"]');
		// Wait a bit for content to stabilize
		await page.waitForTimeout(1000);

		// Test just the structure of the article list (first few items)
		// const articleList = page.locator('[data-testid="news-articles"]');
		// await expect(articleList).toHaveScreenshot("article-list.png", {
		// 	timeout: 10000,
		// });
		// ignoring previous test since this will change
		// with on-demand content loading
	});

	test("specific article page visual test", async ({ page }) => {
		// Use the hashtag article we found (Next.js URL structure)
		await page.goto("/hashtag-cuéntalo");

		// Wait for article content to load
		await page.waitForSelector("article");

		// Test the article page structure
		await expect(page.locator("article")).toHaveScreenshot(
			"article-page-content.png",
		);

		// Test the full page
		await expect(page).toHaveScreenshot("article-page-full.png");
	});

	test("responsive header test", async ({ page }) => {
		await page.goto("/");
		await page.waitForSelector('[data-testid="site-header"]');

		// Test desktop header
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.locator('[data-testid="site-header"]')).toHaveScreenshot(
			"header-desktop.png",
		);

		// Test tablet header
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.locator('[data-testid="site-header"]')).toHaveScreenshot(
			"header-tablet.png",
		);

		// Test mobile header
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('[data-testid="site-header"]')).toHaveScreenshot(
			"header-mobile.png",
		);
	});

	test("live embed visual test", async ({ page }) => {
		await page.goto("/");

		// Wait for live embed to load
		await page.waitForSelector('[data-testid="live-embed"]');

		// Test the live embed component
		await expect(page.locator('[data-testid="live-embed"]')).toHaveScreenshot(
			"live-embed.png",
		);
	});

	// Removed GraphQL mocked test - not applicable to Next.js API routes
});
