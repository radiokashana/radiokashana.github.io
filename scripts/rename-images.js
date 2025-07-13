#!/usr/bin/env node

/**
 * This script renames image files with special characters or spaces to URL-safe filenames
 * and updates all references to these files in markdown content.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const rename = promisify(fs.rename);

// Paths
const IMG_DIR = path.join(__dirname, '../static/img');
const CONTENT_DIR = path.join(__dirname, '../content');
const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const TEMPLATES_DIR = path.join(__dirname, '../src/templates');

// Map to store old -> new filename mappings
const fileMap = new Map();

/**
 * Convert a filename to a URL-safe version
 */
function toUrlSafeFilename(filename) {
  // Get file extension
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  
  // Convert to URL-safe format
  const urlSafeName = basename
    .toLowerCase()
    .normalize('NFD')                   // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
    .replace(/[^\w\s-]/g, '')           // Remove special chars
    .replace(/\s+/g, '-')               // Replace spaces with dashes
    .replace(/--+/g, '-')               // Replace multiple dashes with single dash
    .replace(/^-+|-+$/g, '');           // Trim dashes from start and end
  
  return urlSafeName + ext;
}

/**
 * Check if a filename needs renaming
 */
function needsRenaming(filename) {
  const urlSafe = toUrlSafeFilename(filename);
  return filename !== urlSafe;
}

/**
 * Rename all image files in the specified directory
 */
async function renameImageFiles() {
  try {
    const files = await readdir(IMG_DIR);
    
    console.log(`Found ${files.length} files in image directory`);
    console.log('Checking which files need renaming...');
    
    const filesToRename = files.filter(file => needsRenaming(file));
    
    console.log(`${filesToRename.length} files need renaming`);
    
    for (const oldFilename of filesToRename) {
      const newFilename = toUrlSafeFilename(oldFilename);
      const oldPath = path.join(IMG_DIR, oldFilename);
      const newPath = path.join(IMG_DIR, newFilename);
      
      try {
        await rename(oldPath, newPath);
        fileMap.set(oldFilename, newFilename);
        console.log(`Renamed: ${oldFilename} -> ${newFilename}`);
      } catch (err) {
        console.error(`Error renaming ${oldFilename}:`, err);
      }
    }
    
    return fileMap;
  } catch (err) {
    console.error('Error reading image directory:', err);
    throw err;
  }
}

/**
 * Update references to renamed files in markdown content
 */
async function updateMarkdownReferences() {
  try {
    // If no files were renamed, there's nothing to update
    if (fileMap.size === 0) {
      console.log('No files renamed, skipping content updates');
      return;
    }
    
    // Find all markdown files
    const markdownFiles = await glob(`${CONTENT_DIR}/**/*.md`);
    console.log(`Found ${markdownFiles.length} markdown files to check`);
    
    let updatedFiles = 0;
    
    for (const mdFile of markdownFiles) {
      try {
        let content = await readFile(mdFile, 'utf8');
        let originalContent = content;
        let updated = false;
        
        // Replace all occurrences of renamed files
        for (const [oldFile, newFile] of fileMap.entries()) {
          const oldPattern = new RegExp(oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          if (content.match(oldPattern)) {
            content = content.replace(oldPattern, newFile);
            updated = true;
          }
        }
        
        if (updated) {
          await writeFile(mdFile, content, 'utf8');
          updatedFiles++;
          console.log(`Updated references in: ${path.basename(mdFile)}`);
        }
      } catch (err) {
        console.error(`Error processing file ${mdFile}:`, err);
      }
    }
    
    console.log(`Updated ${updatedFiles} markdown files with new references`);
  } catch (err) {
    console.error('Error updating markdown references:', err);
    throw err;
  }
}

/**
 * Update references to renamed files in React components
 */
async function updateComponentReferences() {
  try {
    // If no files were renamed, there's nothing to update
    if (fileMap.size === 0) {
      console.log('No files renamed, skipping component updates');
      return;
    }
    
    // Find all JS/JSX files
    const componentFiles = await glob(`${COMPONENTS_DIR}/**/*.{js,jsx}`);
    const templateFiles = await glob(`${TEMPLATES_DIR}/**/*.{js,jsx}`);
    const jsFiles = [...componentFiles, ...templateFiles];
    
    console.log(`Found ${jsFiles.length} JS/JSX files to check`);
    
    let updatedFiles = 0;
    
    for (const jsFile of jsFiles) {
      try {
        let content = await readFile(jsFile, 'utf8');
        let originalContent = content;
        let updated = false;
        
        // Replace all occurrences of renamed files
        for (const [oldFile, newFile] of fileMap.entries()) {
          const oldPattern = new RegExp(oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          if (content.match(oldPattern)) {
            content = content.replace(oldPattern, newFile);
            updated = true;
          }
        }
        
        if (updated) {
          await writeFile(jsFile, content, 'utf8');
          updatedFiles++;
          console.log(`Updated references in: ${path.basename(jsFile)}`);
        }
      } catch (err) {
        console.error(`Error processing file ${jsFile}:`, err);
      }
    }
    
    console.log(`Updated ${updatedFiles} component files with new references`);
  } catch (err) {
    console.error('Error updating component references:', err);
    throw err;
  }
}

/**
 * Generate a report of changes
 */
function generateReport() {
  console.log('\n--- RENAME IMAGE REPORT ---');
  console.log(`Total files renamed: ${fileMap.size}`);
  
  if (fileMap.size > 0) {
    console.log('\nRename mapping:');
    for (const [oldFile, newFile] of fileMap.entries()) {
      console.log(`  ${oldFile} -> ${newFile}`);
    }
  }
  
  console.log('\nCompleted successfully!');
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('Starting image filename cleanup...');
    
    await renameImageFiles();
    await updateMarkdownReferences();
    await updateComponentReferences();
    generateReport();
    
    console.log('\nImage filenames have been cleaned up and references updated.');
    console.log('Please rebuild the site to apply changes.');
  } catch (err) {
    console.error('Script failed:', err);
    process.exit(1);
  }
}

// Execute the main function
main();