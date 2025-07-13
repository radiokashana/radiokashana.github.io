/**
 * Custom Gatsby Remark plugin to handle angle-bracketed URLs
 * This plugin transforms <https://example.com> into [https://example.com](https://example.com)
 * to make it compatible with MDX processing
 */

const visit = require('unist-util-visit');

module.exports = ({ markdownAST }) => {
  // Find all text nodes
  visit(markdownAST, 'text', (node) => {
    // Check if the text node contains angle-bracketed URLs
    if (node.value && node.value.match(/<https?:\/\/[^>]+>/)) {
      // Replace angle-bracketed URLs with markdown links
      node.value = node.value.replace(
        /<(https?:\/\/[^>]+)>/g, 
        (match, url) => `[${url}](${url})`
      );
    }
  });

  return markdownAST;
};