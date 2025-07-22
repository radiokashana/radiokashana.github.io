#!/usr/bin/env node

/**
 * Test script for HTML to JSX converter
 */

const { convertStyleToJSX, convertHtmlToJSX } = require('./html-to-jsx-converter');

function runTests() {
  console.log('Testing HTML to JSX Converter');
  console.log('=============================');
  
  // Test 1: Style conversion
  console.log('\n1. Testing style conversion:');
  const styleTest = 'border:none;overflow:hidden';
  const jsxStyle = convertStyleToJSX(styleTest);
  console.log(`Input:  style="${styleTest}"`);
  console.log(`Output: style=${jsxStyle}`);
  
  // Test 2: Full iframe conversion
  console.log('\n2. Testing iframe conversion:');
  const htmlIframe = '<iframe src="https://example.com" width="500" height="889" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
  const jsxIframe = convertHtmlToJSX(htmlIframe);
  console.log('Input:');
  console.log(htmlIframe);
  console.log('\nOutput:');
  console.log(jsxIframe);
  
  // Test 3: Multiple attributes
  console.log('\n3. Testing multiple attribute conversions:');
  const htmlDiv = '<div class="container" style="margin:10px;padding:20px" tabindex="0"></div>';
  const jsxDiv = convertHtmlToJSX(htmlDiv);
  console.log(`Input:  ${htmlDiv}`);
  console.log(`Output: ${jsxDiv}`);
  
  console.log('\n=============================');
  console.log('Test completed!');
}

if (require.main === module) {
  runTests();
}