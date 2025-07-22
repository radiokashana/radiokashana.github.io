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
		// Use the hashtag article we found
		await page.goto("/noticias/hashtag-cuéntalo/");

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

	test("pagination component visual test", async ({ page }) => {
		await page.goto("/");

		// Wait for pagination to load
		await page.waitForSelector('[data-testid="pagination"]');

		// Test the pagination component
		await expect(page.locator('[data-testid="pagination"]')).toHaveScreenshot(
			"pagination-component.png",
		);
	});

	test("page 2 without main news test", async ({ page }) => {
		await page.goto("/page/2/");

		// Wait for content to load
		await page.waitForSelector('[data-testid="news-articles"]');
		
		// Verify that main news section is not present
		const mainNewsExists = await page.locator('[data-testid="main-news"]').count();
		expect(mainNewsExists).toBe(0);

		// Test the page 2 structure (ads + news list, no main news)
		await expect(page.locator('[data-testid="homepage-content"]')).toHaveScreenshot(
			"page2-content.png",
		);
	});

	test("mocked homepage data test", async ({ page }) => {
		// Set up GraphQL mock with consistent data
		await page.route("**/___graphql", async (route) => {
			await route.fulfill({
				json: {
					data: {
						allMdx: {
							edges: [
								{
									node: {
										id: "test-1",
										excerpt: "Test article excerpt for visual consistency.",
										fields: { slug: "/test-article/" },
										frontmatter: {
											title: "Test Article Title",
											date: "15 de enero de 2025",
											dateRaw: "2025-01-15",
											image: "/img/logo.svg",
										},
									},
								},
								{
									node: {
										id: "test-2",
										excerpt: "Second test article excerpt for visual testing.",
										fields: { slug: "/test-article-2/" },
										frontmatter: {
											title: "Second Test Article",
											date: "14 de enero de 2025",
											dateRaw: "2025-01-14",
											image: "/img/logo.svg",
										},
									},
								},
							],
						},
						allDataJson: {
							edges: [
								{
									node: {
										facebookLiveEmbedHtml:
											'<div style="padding:20px;background:#f0f0f0;text-align:center;">Test Facebook Live Embed</div>',
									},
								},
							],
						},
					},
				},
			});
		});

		await page.goto("/");
		await page.waitForSelector('[data-testid="main-news"]');

		// Test with consistent mocked data
		await expect(page.locator('[data-testid="main-news"]')).toHaveScreenshot(
			"main-news-mocked.png",
		);
	});
});
