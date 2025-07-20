# RadioKashana Website Development Guide

This document contains guides for development and migration of the RadioKashana website.

## Next.js Migration Guide

This section outlines the process of migrating the RadioKashana website from Gatsby to Next.js.

### Major Changes

1. **Framework Change**: Migrated from Gatsby v5 to Next.js v14
2. **Routing**: Changed from Gatsby's routing to Next.js App Router
3. **Data Handling**: Replaced GraphQL with direct file system operations
4. **MDX Processing**: Updated MDX handling approach
5. **Styling**: Maintained Tailwind CSS but updated configuration

### Project Structure

#### Old Structure (Gatsby)
```
/src
  /components
  /layouts
  /pages
  /templates
/content
  /noticias
/_data
```

#### New Structure (Next.js)
```
/app
  /[slug]
    page.jsx
  layout.jsx
  page.jsx
  globals.css
/components
/lib
/content
  /noticias
/_data
```

### Key File Changes

1. **Page Components**: 
   - Gatsby: `/src/pages/index.js`
   - Next.js: `/app/page.jsx`

2. **Templates**:
   - Gatsby: `/src/templates/newTemplate.js`
   - Next.js: `/app/[slug]/page.jsx`

3. **Layouts**:
   - Gatsby: `/src/layouts/index.js`
   - Next.js: `/app/layout.jsx`

4. **Data Fetching**:
   - Gatsby: GraphQL queries
   - Next.js: `/lib/api.js` and `/lib/settings.js`

### Development Commands

```bash
# Development
yarn dev

# Build
yarn build

# Start production server
yarn start
```

### Implementation Notes

1. **MDX Rendering**:
   - Using `next-mdx-remote` for rendering MDX content
   - Server components for data fetching and rendering

2. **Image Handling**:
   - Basic image handling with `next/image` component
   - Unoptimized images for compatibility with existing content

3. **Styling**:
   - Maintained Tailwind CSS with extended configuration
   - Added utility classes to match Tachyons utility classes used in Gatsby version

### Future Improvements

1. Implement proper image optimization with Next.js Image component
2. Add category-based routing (/noticias/, /locales/, etc.)
3. Implement proper SEO component
4. Add RSS feed functionality
5. Implement search functionality

## Gatsby 5 Migration Guide

This section outlines the steps to update the RadioKashana website from Gatsby 4 to Gatsby 5.

### Current Setup
- Gatsby v4.2.0
- React v17.0.1
- Netlify CMS v2.15.59

### Target Setup
- Gatsby v5.14.3
- React v18.2.0
- Decap CMS v3.6.2 (replacement for Netlify CMS)

### Migration Steps

#### 1. Update Node.js Version
Ensure you're using Node.js 18.x or higher:
```bash
# Verify Node.js version
node -v

# If needed, install and use Node.js 18.x or higher via nvm
nvm install 18
nvm use 18
```

#### 2. Update Dependencies
Create or update package.json with the following dependencies:

```json
{
  "dependencies": {
    "@mdx-js/mdx": "^2.3.0",
    "@mdx-js/react": "^2.3.0",
    "decap-cms-app": "^3.6.2",
    "gatsby": "^5.14.3",
    "gatsby-plugin-decap-cms": "^4.0.4",
    "gatsby-plugin-image": "^5.14.0",
    "gatsby-plugin-manifest": "^5.14.0",
    "gatsby-plugin-mdx": "^5.14.1",
    "gatsby-plugin-offline": "^6.14.0",
    "gatsby-plugin-postcss": "^6.14.0",
    "gatsby-plugin-react-helmet": "^6.14.0", 
    "gatsby-plugin-sass": "^6.14.0",
    "gatsby-plugin-sharp": "^5.14.0",
    "gatsby-plugin-sitemap": "^6.14.0",
    "gatsby-source-filesystem": "^5.14.0",
    "gatsby-transformer-json": "^5.14.0",
    "gatsby-transformer-sharp": "^5.14.0",
    "postcss": "^8.4.31",
    "postcss-import": "^15.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "sass": "^1.69.7",
    "tachyons": "^4.12.0",
    "tachyons-colors": "^5.3.3"
  }
}
```

Run a clean install:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Update gatsby-config.js
Replace `gatsby-plugin-netlify-cms` with `gatsby-plugin-decap-cms` in your gatsby-config.js:

```javascript
// FROM
"gatsby-plugin-netlify-cms",

// TO
"gatsby-plugin-decap-cms",
```

#### 4. React 18 Updates
Gatsby 5 uses React 18 which has some changes:

1. Update the root rendering in src/index.js or similar:
```javascript
// FROM
import ReactDOM from 'react-dom'
ReactDOM.render(<App />, document.getElementById('root'))

// TO
import ReactDOM from 'react-dom/client'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

2. Check for use of deprecated lifecycle methods and update them.

#### 5. Webpack 5 Updates
If you have custom webpack configuration, review and update for Webpack 5 compatibility.

#### 6. Testing
After installation:
1. Run `gatsby develop` to verify development server starts
2. Test the CMS functionality
3. Test all pages and components
4. Run `gatsby build` to verify production build works

### Potential Issues and Solutions

1. **Peer Dependency Conflicts**: If you encounter peer dependency conflicts, try:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **React 18 Strict Mode**: React 18's Strict Mode might reveal issues in your components. Look for components being mounted/unmounted twice.

3. **CMS Configuration**: You might need to update your admin/config.yml file if you encounter CMS issues.

4. **GraphQL Changes**: Test all GraphQL queries for compatibility with Gatsby 5.

5. **MDX Breaking Changes**: If using MDX content, test rendering of all MDX components.

### Additional Resources
- [Gatsby v5 Migration Guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)
- [React 18 Migration Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [Decap CMS Documentation](https://decapcms.org/docs/intro/)

## URL-Safe Image Filenames

To ensure compatibility with social media sharing platforms like Facebook, all image filenames must be URL-safe (no spaces, accents, or special characters).

### Image Filename Rules:
- Use only lowercase letters, numbers, hyphens, and underscores
- No spaces (use hyphens instead)
- No accents or special characters
- Valid examples: `my-image.jpg`, `event_photo.png`, `company-logo-2023.svg`

### Automated Renaming Script

The repository includes a script that automatically:
1. Renames all non-compliant image files in the `/static/img/` directory
2. Updates all references in markdown content and React components
3. Generates a report of changes made

To run the script:

```bash
# Navigate to the project root
cd path/to/radiokashana.github.io

# Install dependencies if not already installed
npm install

# Run the renaming script
node scripts/rename-images.js
```

After running the script:
1. Review the report of changes
2. Rebuild the site: `gatsby build`
3. Test Facebook sharing functionality

### Manual Image Handling

When adding new images:

1. Ensure filenames are URL-safe before adding them to the repository
2. Use lowercase letters, numbers, hyphens, and underscores only
3. Avoid spaces and special characters

### Common Issues

If social media sharing doesn't display images correctly:

1. Check the image URL in the page source - it should contain no spaces or special characters
2. Verify the images exist at the specified path
3. Use Facebook's Sharing Debugger to check for issues: https://developers.facebook.com/tools/debug/
4. Clear Facebook's cache using the Sharing Debugger if needed