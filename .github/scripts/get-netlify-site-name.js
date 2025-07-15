#!/usr/bin/env node

/**
 * Helper script to extract Netlify site name from various sources
 * Usage: node .github/scripts/get-netlify-site-name.js
 */

const fs = require('fs');
const path = require('path');

function getSiteNameFromNetlifyToml() {
  const netlifyTomlPath = path.join(process.cwd(), 'netlify.toml');
  if (fs.existsSync(netlifyTomlPath)) {
    const content = fs.readFileSync(netlifyTomlPath, 'utf8');
    // Look for site_id or other identifiers
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('site_id') || line.includes('site-id')) {
        const match = line.match(/["']([^"']+)["']/);
        if (match) return match[1];
      }
    }
  }
  return null;
}

function getSiteNameFromPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    // Check if there's a netlify field or similar
    if (content.netlify && content.netlify.site) {
      return content.netlify.site;
    }
    // Fallback to repository name transformation
    if (content.name) {
      return content.name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
    }
  }
  return null;
}

function main() {
  // Try different methods to get site name
  let siteName = getSiteNameFromNetlifyToml() || getSiteNameFromPackageJson();
  
  if (!siteName) {
    // Last resort: use repo name from git or working directory
    const repoName = process.env.GITHUB_REPOSITORY 
      ? process.env.GITHUB_REPOSITORY.split('/')[1]
      : path.basename(process.cwd());
    siteName = repoName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
  }
  
  console.log(siteName);
}

if (require.main === module) {
  main();
}

module.exports = { getSiteNameFromNetlifyToml, getSiteNameFromPackageJson };