# HTML to JSX Converter Script

This directory contains a script to convert HTML elements in markdown files to their JSX equivalents, specifically to fix issues with MDX parsing of HTML attributes.

## Problem

The current setup uses `gatsby-plugin-mdx` to process `.md` files, but MDX expects JSX syntax. HTML elements with attributes like `style`, `class`, `frameborder`, etc. cause parsing errors because they use HTML attribute syntax instead of JSX syntax.

## Solution

The `html-to-jsx-converter.js` script automatically converts:

- `style="border:none;overflow:hidden"` → `style={{border: "none", overflow: "hidden"}}`
- `class="container"` → `className="container"`
- `frameborder="0"` → `frameBorder="0"`
- `allowfullscreen="true"` → `allowFullScreen="true"`
- And many other HTML to JSX attribute conversions

## Usage

### Run the converter:
```bash
# Using yarn
yarn convert:html-to-jsx

# Using node directly
node scripts/html-to-jsx-converter.js
```

### Test the converter:
```bash
node scripts/test-converter.js
```

## What it does

1. Scans all `.md` files in `content/noticias/`
2. Finds HTML elements with attributes that need JSX conversion
3. Creates backup files (`.backup` extension) before making changes
4. Converts HTML attributes to JSX format
5. Reports all changes made

## Safety Features

- **Backup creation**: Original files are backed up before modification
- **Smart detection**: Only converts HTML attributes, skips already JSX-formatted code
- **Detailed logging**: Shows exactly what changes were made
- **Non-destructive**: You can review changes before committing

## After Running

1. Review the changes in your files
2. Test that the JSX renders correctly in your Gatsby site
3. Remove `.backup` files if everything looks good
4. Consider implementing the full MD/MDX hybrid approach as outlined in `MDX_TO_MD_MIGRATION_PLAN.md`

## Files

- `html-to-jsx-converter.js` - Main conversion script
- `test-converter.js` - Test script to verify converter functionality
- `README.md` - This documentation

## Note

This is a temporary fix for the immediate MDX parsing issues. For a long-term solution, consider implementing the migration plan in `MDX_TO_MD_MIGRATION_PLAN.md` which separates pure markdown (`.md`) from MDX (`.mdx`) files.