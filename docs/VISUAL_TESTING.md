# Visual Regression Testing

This project uses Playwright for visual regression testing to catch unintended changes to the website's appearance.

## How it works

Visual tests take screenshots of key components and pages, then compare them against baseline images to detect visual differences.

### What gets tested

- **Header/Banner**: Logo and navigation across different screen sizes
- **Footer**: Links and contact information
- **Main Content**: Overall page layout and structure
- **News Articles List**: Article grid layout and styling
- **Live Embed**: Facebook live integration component
- **Individual Article Pages**: Content page layout
- **Responsive Design**: Header across desktop, tablet, and mobile viewports

### Test Strategy for Dynamic Content

Since the homepage changes frequently with new articles, we use several strategies:

1. **Mocked Data Tests**: Use consistent test data instead of real articles
2. **Component-Level Testing**: Test stable layout components separately
3. **Specific Article Testing**: Use a specific stable article URL for content pages
4. **Layout Structure Testing**: Focus on overall structure rather than specific content

## Running Tests Locally

```bash
# Run all visual tests
yarn test:visual

# Run tests with UI mode (interactive)
yarn test:visual:ui

# Run tests in headed mode (see browser)
yarn test:visual:headed

# Update baseline screenshots after intentional changes
yarn test:visual:update

# Run against external URL (for testing deployed sites)
PLAYWRIGHT_BASE_URL=https://your-site.netlify.app yarn test:visual:external
```

## CI/CD Integration

Visual tests automatically run on Pull Requests against the Netlify preview environment:

### When tests run

- ✅ On PRs with code changes
- ❌ **Not** on content-only PRs (branches starting with `decap-cms/`)
- ❌ **Not** on merges to develop/main branches

### PR Process

1. Create a PR with code changes
2. Netlify builds a preview environment
3. GitHub Actions waits for the preview to be ready
4. Visual tests run against the preview URL
5. Results are posted as a PR comment

### If Tests Fail

When visual differences are detected:

1. **Review the differences**: Download the `visual-diff-screenshots` artifact from the GitHub Actions run
2. **Intentional changes**: If the changes are expected, update the baselines:
   ```bash
   yarn test:visual:update
   git add tests/
   git commit -m "Update visual test baselines"
   ```
3. **Unintentional changes**: Fix the code causing the visual regression

## File Structure

```
tests/
├── visual-snapshots.spec.js           # Main test file
└── visual-snapshots.spec.js-snapshots/  # Baseline images
    ├── homepage-banner-chromium-linux.png
    ├── homepage-footer-chromium-linux.png
    └── ...

.github/
├── workflows/
│   └── visual-tests-pr.yml           # GitHub Actions workflow
└── scripts/
    └── get-netlify-site-name.js      # Helper script
```

## Configuration

### Playwright Config (`playwright.config.js`)

- **Base URL**: Automatically uses `PLAYWRIGHT_BASE_URL` environment variable
- **Browser**: Primarily uses Chromium for consistency
- **Thresholds**: 0.2 pixel difference threshold
- **Animations**: Disabled for consistent screenshots

### Test Data Attributes

Components use `data-testid` attributes for reliable element targeting:

- `data-testid="site-header"` - Main header
- `data-testid="site-footer"` - Site footer
- `data-testid="main-news"` - Featured news section
- `data-testid="news-articles"` - Article list
- `data-testid="live-embed"` - Facebook live component

## Best Practices

### For Developers

1. **Add test IDs**: Use `data-testid` attributes for testable elements
2. **Stable content**: Mock dynamic content when possible
3. **Update baselines**: Run `yarn test:visual:update` after intentional UI changes
4. **Test locally**: Run visual tests before pushing changes

### For Content Editors

- Content changes through Decap CMS won't trigger visual tests
- Visual tests focus on layout and design, not content
- New articles won't break existing visual tests

## Troubleshooting

### Tests timeout

- Check if the preview URL is accessible
- Ensure all `data-testid` selectors exist in the DOM
- Verify network conditions aren't causing slow loads

### False positives

- Font loading can cause minor differences
- Anti-aliasing differences between environments
- Adjust threshold in `playwright.config.js` if needed

### Baseline updates

```bash
# Update specific test
yarn test:visual:update --grep "homepage visual snapshots"

# Update all baselines
yarn test:visual:update
```

## Environment Variables

- `PLAYWRIGHT_BASE_URL`: Override the base URL for tests (used in CI)
- `CI`: Enables CI-specific settings (retries, workers, etc.)
