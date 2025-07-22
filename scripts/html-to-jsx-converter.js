#!/usr/bin/env node

/**
 * HTML to JSX Converter for Markdown Files
 * 
 * This script processes .md files in the content/noticias directory,
 * finds HTML elements with style attributes and other HTML attributes,
 * and converts them to their JSX equivalents.
 * 
 * Main conversions:
 * - style="..." -> style={{...}}
 * - class="..." -> className="..."
 * - for="..." -> htmlFor="..."
 * - Other camelCase attribute conversions
 */

const fs = require('fs');
const path = require('path');

// HTML to JSX attribute mappings
const attributeMap = {
  'class': 'className',
  'for': 'htmlFor',
  'tabindex': 'tabIndex',
  'readonly': 'readOnly',
  'maxlength': 'maxLength',
  'cellpadding': 'cellPadding',
  'cellspacing': 'cellSpacing',
  'rowspan': 'rowSpan',
  'colspan': 'colSpan',
  'usemap': 'useMap',
  'frameborder': 'frameBorder',
  'allowfullscreen': 'allowFullScreen',
  'allowtransparency': 'allowTransparency',
  'autoplay': 'autoPlay',
  'contenteditable': 'contentEditable',
  'contextmenu': 'contextMenu',
  'crossorigin': 'crossOrigin',
  'enctype': 'encType',
  'formaction': 'formAction',
  'formenctype': 'formEncType',
  'formmethod': 'formMethod',
  'formnovalidate': 'formNoValidate',
  'formtarget': 'formTarget',
  'hreflang': 'hrefLang',
  'inputmode': 'inputMode',
  'ismap': 'isMap',
  'itemid': 'itemID',
  'itemprop': 'itemProp',
  'itemref': 'itemRef',
  'itemscope': 'itemScope',
  'itemtype': 'itemType',
  'keyparams': 'keyParams',
  'keytype': 'keyType',
  'marginheight': 'marginHeight',
  'marginwidth': 'marginWidth',
  'minlength': 'minLength',
  'novalidate': 'noValidate',
  'radiogroup': 'radioGroup',
  'spellcheck': 'spellCheck',
  'srcdoc': 'srcDoc',
  'srclang': 'srcLang',
  'srcset': 'srcSet',
  'useform': 'useForm',
  'wmode': 'wmode'
};

/**
 * Convert CSS style string to JSX style object
 * @param {string} styleStr - CSS style string
 * @returns {string} - JSX style object string
 */
function convertStyleToJSX(styleStr) {
  // Remove quotes and split by semicolon
  const styles = styleStr.replace(/['"]/g, '').split(';').filter(s => s.trim());
  
  const styleObj = {};
  
  styles.forEach(style => {
    const [property, value] = style.split(':').map(s => s.trim());
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      styleObj[camelProperty] = value;
    }
  });
  
  // Convert to JSX object notation
  const styleEntries = Object.entries(styleObj).map(([key, value]) => {
    // Handle numeric values
    if (/^\d+$/.test(value)) {
      return `${key}: ${value}`;
    }
    // Handle string values
    return `${key}: "${value}"`;
  });
  
  return `{{${styleEntries.join(', ')}}}`;
}

/**
 * Convert HTML attributes to JSX attributes
 * @param {string} htmlTag - HTML tag string
 * @returns {string} - JSX tag string
 */
function convertHtmlToJSX(htmlTag) {
  let jsxTag = htmlTag;
  
  // Convert style attribute
  jsxTag = jsxTag.replace(/style="([^"]*)"/g, (match, styleValue) => {
    return `style=${convertStyleToJSX(styleValue)}`;
  });
  
  jsxTag = jsxTag.replace(/style='([^']*)'/g, (match, styleValue) => {
    return `style=${convertStyleToJSX(styleValue)}`;
  });
  
  // Convert other attributes
  Object.entries(attributeMap).forEach(([htmlAttr, jsxAttr]) => {
    const regex = new RegExp(`\\b${htmlAttr}=`, 'gi');
    jsxTag = jsxTag.replace(regex, `${jsxAttr}=`);
  });
  
  return jsxTag;
}

/**
 * Process a markdown file and convert HTML elements to JSX
 * @param {string} filePath - Path to the markdown file
 */
function processMarkdownFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Find all HTML tags (opening tags only, as closing tags don't need conversion)
  const htmlTagRegex = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  
  content = content.replace(htmlTagRegex, (match) => {
    // Skip if it's already JSX-style (contains { or })
    if (match.includes('{') || match.includes('}')) {
      return match;
    }
    
    // Check if it contains style or other attributes that need conversion
    const needsConversion = /\b(style|class|for|frameborder|allowfullscreen|allowtransparency)=/i.test(match);
    
    if (needsConversion) {
      modified = true;
      const converted = convertHtmlToJSX(match);
      console.log(`  Converting: ${match}`);
      console.log(`  To:        ${converted}`);
      return converted;
    }
    
    return match;
  });
  
  if (modified) {
    // Create backup
    const backupPath = filePath + '.backup';
    fs.copyFileSync(filePath, backupPath);
    console.log(`  Created backup: ${backupPath}`);
    
    // Write modified content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated: ${filePath}`);
  } else {
    console.log(`  No changes needed`);
  }
}

/**
 * Get all .md files in a directory
 * @param {string} dir - Directory path
 * @returns {string[]} - Array of file paths
 */
function getMarkdownFiles(dir) {
  const files = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

/**
 * Main function
 */
function main() {
  const contentDir = path.join(__dirname, '../content/noticias');
  
  console.log('HTML to JSX Converter for Markdown Files');
  console.log('========================================');
  console.log(`Scanning directory: ${contentDir}`);
  
  const files = getMarkdownFiles(contentDir);
  
  if (files.length === 0) {
    console.log('No markdown files found.');
    return;
  }
  
  console.log(`Found ${files.length} markdown files.`);
  console.log('');
  
  files.forEach(processMarkdownFile);
  
  console.log('');
  console.log('Conversion complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review the changes in your files');
  console.log('2. Test that the JSX renders correctly');
  console.log('3. Remove .backup files if everything looks good');
  console.log('4. Consider switching to the MD/MDX hybrid approach as planned');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  convertStyleToJSX,
  convertHtmlToJSX,
  processMarkdownFile
};