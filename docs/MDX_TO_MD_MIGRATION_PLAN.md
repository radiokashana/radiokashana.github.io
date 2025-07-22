# Plan: Switch from MDX to MD for News Articles

## Current Situation Analysis
- Currently using `gatsby-plugin-mdx` with extensions `[".md", ".mdx"]`
- All news files are `.md` (no `.mdx` files found in content/noticias/)
- Using MDX is causing React parsing issues with embedded iframes and inline styles
- Need to support both formats: `.md` files as regular Markdown, `.mdx` files as MDX

## Implementation Steps

### 1. Install and Configure Markdown Support
- Add `gatsby-transformer-remark` plugin for `.md` files
- Configure separate processing for `.md` and `.mdx` files
- Update `gatsby-plugin-mdx` to only process `.mdx` files

### 2. Update GraphQL Queries and Components
- Modify `gatsby-node.js` to handle both `allMdx` and `allMarkdownRemark`
- Update `newTemplate.js` to handle both MDX and Markdown content
- Update `src/pages/index.js` GraphQL query to fetch from both sources
- Ensure proper content rendering for each type

### 3. Content Migration Handling
- Ensure existing `.md` files work with new Markdown processor
- Test that frontmatter parsing remains consistent
- Verify date formatting and image handling work properly

### 4. Schema and Type Definitions
- Update schema customization in `gatsby-node.js` for both content types
- Ensure consistent frontmatter structure across both formats
- Maintain backward compatibility

### 5. Testing and Validation
- Test both `.md` and `.mdx` file processing
- Verify iframe embedding works in `.md` files without React parsing
- Ensure all existing news articles render correctly
- Test new content creation workflow

## Files to Modify
- `gatsby-config.js` - Add gatsby-transformer-remark, update gatsby-plugin-mdx
- `gatsby-node.js` - Handle both content types in page creation and schema
- `src/templates/newTemplate.js` - Support both MDX and Markdown rendering
- `src/pages/index.js` - Update GraphQL query for both sources
- `package.json` - Add gatsby-transformer-remark dependency

## Benefits
- Fixes React parsing issues with embedded iframes and inline styles in news
- Maintains MDX support for complex interactive content when needed
- Cleaner content authoring experience for simple news articles
- Better performance for markdown-only content

## Implementation Notes
- Keep existing `.md` files as-is - they'll be processed by gatsby-transformer-remark
- Any future `.mdx` files will be processed by gatsby-plugin-mdx for React components
- Ensure consistent frontmatter structure across both formats
- Test thoroughly with existing content before deploying