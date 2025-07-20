# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RadioKashana is a Spanish-language news/radio website currently undergoing migration from Gatsby v5 to Next.js v14. The project is on the `feat/next-migration` branch.

## Commands

### Next.js (Current Migration)
- Develop: `yarn dev`
- Build: `yarn build`
- Start: `yarn start`
- Lint: `yarn lint`

### Gatsby (Legacy)
- Develop: `gatsby develop`
- Build: `gatsby build`
- Serve: `gatsby serve`
- Clean: `gatsby clean`

### Testing
- Run tests: `yarn test`
- Visual tests: `yarn test:visual`
- Visual tests UI: `yarn test:visual:ui`
- Update snapshots: `yarn test:visual:update`

### Formatting
- Format: `prettier --trailing-comma es5 --no-semi --single-quote --write "src/**/*.{js,jsx}"`

### Important: Use yarn instead of npm

## Code Style Guidelines

- Use double quotes for strings with allowance for template literals
- No semicolons at end of statements
- Use trailing commas in multiline objects/arrays
- Use functional components with React
- Use destructuring for props
- Use proper import ordering: React, Next/Gatsby, external libs, internal components
- Error handling: Use try/catch blocks for async operations
- Naming: Components are PascalCase, files are kebab-case, variables are camelCase

## Architecture & Structure

### Next.js Structure (Current)
```
/app                    # Next.js app directory
  /[slug]              # Dynamic routing for articles
  page.jsx             # Homepage
  layout.jsx           # Root layout
  globals.css          # Global styles
/components            # Shared React components
/lib                   # Utilities (api.js, settings.js)
/content/noticias      # Markdown content files
```

### Key Implementation Details

1. **Data Fetching**: Use `/lib/api.js` for content operations (replaced GraphQL)
2. **MDX Rendering**: Using `next-mdx-remote` for article content
3. **Styling**: Tailwind CSS with extended config to match legacy Tachyons classes
4. **CMS**: Decap CMS (successor to Netlify CMS) for content management
5. **Images**: Currently unoptimized for compatibility with existing content

## Migration Context

The codebase contains both Gatsby and Next.js configurations during the migration phase. When making changes:
- Prefer Next.js patterns for new features
- Check MIGRATION-GUIDE.md for specific migration details
- Maintain URL structure for SEO continuity
- Test both visual regression (Playwright) and functionality