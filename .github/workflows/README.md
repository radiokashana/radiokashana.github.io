# GitHub Actions Workflows

## Visual Regression Testing

### The Problem We Solved

**Classic Catch-22**: Visual test baselines generated locally (macOS/Windows) don't match CI environment (Ubuntu Linux) due to:
- Font rendering differences
- Browser version differences  
- OS-specific anti-aliasing
- Display density variations

**Missing Reusable Patterns**: GitHub Actions lacks a proper library system, forcing us to rebuild common patterns repeatedly.

### Our Solution: `visual-tests.yml`

A **unified, comprehensive workflow** that handles:

#### ✅ **Environment Consistency**
- Baselines generated in CI environment (Ubuntu + Chromium)
- No more local vs CI mismatches
- First PR automatically generates baselines

#### ✅ **Dual Testing Strategy**
```
🏠 Local Tests    → Fast feedback, catch build issues
     ↓
🌐 Deploy Tests   → Real environment, catch runtime issues
```

#### ✅ **Smart Automation**
- Auto-detects missing baselines
- Auto-commits generated baselines to PR branch
- Skips content-only PRs (`decap-cms/*` branches)
- Comprehensive PR status comments

#### ✅ **Manual Controls**
- **Workflow Dispatch**: Manual trigger with options
- **Baseline Regeneration**: Checkbox to regenerate baselines
- **Custom URLs**: Test against any environment

### Workflow Steps

1. **🔍 Check Baselines** - Detect if baselines exist
2. **🏠 Local Tests** - Playwright auto-starts `yarn develop` if needed
3. **⏳ Wait for Netlify** - Wait for preview deployment
4. **🌐 Deploy Tests** - Test against Netlify preview
5. **📸 Generate Baselines** - If missing, create from Netlify
6. **💾 Commit & Push** - Auto-commit baselines to PR
7. **💬 PR Comment** - Detailed status report

### Key Features

**🎯 Solves Catch-22**
```bash
# No more environment mismatches!
First PR → Generates CI baselines automatically
Future PRs → Compare against CI baselines
```

**🚀 Dual Environment Testing**
```bash
Local:    Playwright auto-starts → http://localhost:8000
Deploy:   Netlify               → https://preview.netlify.app
Both must pass! ✅
```

**🔧 Server Management**
```bash
# Playwright handles server lifecycle automatically
reuseExistingServer: true → No port conflicts
Auto-start/stop → Clean process management
```

**📊 Comprehensive Reporting**
```markdown
## 📸 Visual Regression Test Results

**Test Results:**
✅ Local development tests: PASSED
❌ Deployed environment tests: FAILED

**Target URL:** https://preview.netlify.app
```

### Usage

**For PRs**: Automatic on code changes (not content)
**Manual**: Actions → Visual Regression Tests → Run workflow
**Baseline Updates**: Re-run with "Generate new baselines" ✅

### Files Structure

```
.github/
├── workflows/
│   └── visual-tests.yml           # 🎯 Main unified workflow
├── scripts/
│   └── get-netlify-site-name.js   # 🔧 Helper utilities
└── README.md                      # 📚 This documentation

tests/
├── visual-snapshots.spec.js        # 🧪 Test definitions
└── visual-snapshots.spec.js-snapshots/  # 📸 CI-generated baselines
    ├── homepage-banner-chromium-linux.png    ✅ Keep in git
    ├── header-desktop-chromium-linux.png     ✅ Keep in git
    └── ...
```

### What We Wish GitHub Had

```yaml
# Imaginary future GitHub Actions feature 🤞
uses: actions/library/visual-testing@v1
with:
  framework: playwright
  environments: [local, preview]
  baseline-source: ci
  content-branches-ignore: decap-cms/**
```

Until then, this workflow provides a robust, reusable pattern for visual regression testing! 🚀