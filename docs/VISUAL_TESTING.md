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

Visual tests run automatically on Pull Requests with a **dual testing strategy**:

### When tests run

- ✅ On PRs with code changes
- ❌ **Not** on content-only PRs (branches starting with `decap-cms/`)
- ❌ **Not** on merges to develop/main branches
- ✅ Manual trigger via Actions tab with baseline regeneration option

### Dual Testing Process

1. **Create PR** with code changes
2. **Check baselines** - Are CI-generated baselines present?
3. **Local tests** - Playwright auto-starts `yarn develop` and tests against localhost:8000
4. **Netlify build** - Wait for preview environment to be ready
5. **Deploy tests** - Test against Netlify preview URL
6. **Baseline generation** - If missing, generate from Netlify and auto-commit
7. **PR comment** - Comprehensive results report for both test phases

### Environment Consistency Solution

- **Problem**: Local baselines (macOS/Windows) ≠ CI baselines (Ubuntu Linux)
- **Solution**: All baselines generated in CI environment (Ubuntu + Chromium)
- **First PR**: Automatically generates baselines from Netlify preview
- **Future PRs**: Compare against CI-generated baselines (no more mismatches!)

### If Tests Fail

When visual differences are detected:

1. **Review the differences**: Download the `visual-diff-screenshots` artifact from the GitHub Actions run
2. **Intentional changes**: If the changes are expected, update the baselines:
   - **Option A (Recommended)**: Go to Actions → Visual Regression Tests → Run workflow → Check "Generate new baselines"
   - **Option B (Local)**: Run `yarn test:visual:update` and commit the changes
3. **Unintentional changes**: Fix the code causing the visual regression

### Test Results

The PR comment will show status for both testing phases:

```markdown
## 📸 Visual Regression Test Results

**Test Results:**
✅ Local development tests: PASSED
❌ Deployed environment tests: FAILED

**Target URL:** https://preview-123.netlify.app
```

## File Structure

```
tests/
├── visual-snapshots.spec.js           # Main test file
└── visual-snapshots.spec.js-snapshots/  # CI-generated baseline images
    ├── homepage-banner-chromium-linux.png    ✅ Keep in git
    ├── homepage-footer-chromium-linux.png    ✅ Keep in git
    ├── header-desktop-chromium-linux.png     ✅ Keep in git
    └── ...

.github/
├── workflows/
│   └── visual-tests.yml              # 🎯 Unified visual testing workflow
├── scripts/
│   └── get-netlify-site-name.js      # Helper for Netlify site detection
└── README.md                         # Workflow documentation
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
