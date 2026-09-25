/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

// Archivo (variable width + weight) carries the whole type system: condensed
// heavy cuts for headlines, the normal width for reading text. One family,
// one latin file for the upright styles.
const FONT_CSS =
	"https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,75..100,400..900;1,100,400&display=swap"

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
		<link key="gs-preconnect" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
		<link key="gf-archivo" rel="stylesheet" href={FONT_CSS} />,
		<meta key="theme-color" name="theme-color" content="#0d0d10" />,
	])
}
