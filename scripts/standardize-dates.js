#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to convert various date formats to consistent UTC format without quotes
function standardizeDate(dateString) {
	// Remove quotes if present
	const cleanDate = dateString.replace(/^['"]|['"]$/g, "");

	// Parse the date (handles both timezone offset and UTC formats)
	const date = new Date(cleanDate);

	if (isNaN(date.getTime())) {
		console.warn(`Invalid date format: ${dateString}`);
		return dateString; // Return original if can't parse
	}

	// Convert to UTC ISO format without quotes
	return date.toISOString();
}

// Function to update frontmatter in a markdown file
function updateMarkdownFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, "utf8");

		// Match the frontmatter date line
		const dateRegex = /^date:\s*(['"]?)([^'"\n]+)\1$/m;
		const match = content.match(dateRegex);

		if (!match) {
			console.log(`No date found in: ${filePath}`);
			return false;
		}

		const originalDate = match[0];
		const dateValue = match[2];

		// Standardize the date
		const standardizedDate = standardizeDate(dateValue);

		// If no change needed, skip
		if (dateValue === standardizedDate) {
			return false;
		}

		// Replace the date line
		const newContent = content.replace(dateRegex, `date: ${standardizedDate}`);

		// Write back to file
		fs.writeFileSync(filePath, newContent, "utf8");

		console.log(`Updated ${filePath}:`);
		console.log(`  ${originalDate} -> date: ${standardizedDate}`);

		return true;
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error.message);
		return false;
	}
}

// Main execution
async function main() {
	console.log("Standardizing dates in content files...\n");

	// Find all markdown files in content/noticias
	const pattern = "content/noticias/**/*.md";
	const files = glob.sync(pattern);

	console.log(`Found ${files.length} markdown files to process\n`);

	let updatedCount = 0;

	for (const file of files) {
		if (updateMarkdownFile(file)) {
			updatedCount++;
		}
	}

	console.log(
		`\nCompleted! Updated ${updatedCount} out of ${files.length} files.`,
	);
}

// Run the script
main().catch(console.error);
