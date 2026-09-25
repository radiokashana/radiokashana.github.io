/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

// Typefaces: Fraunces (soft, warm serif for the masthead and headlines) and
// Nunito Sans (friendly humanist sans for reading and UI). Loaded in <head> so
// the first paint already uses them.
const FONTS_URL =
	"https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..800,0..100;1,9..144,400..600,0..100&family=Nunito+Sans:ital,wght@0,400..800;1,400..600&display=swap"

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
		<link key="gf-preconnect-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
		<link key="gf-fonts" rel="stylesheet" href={FONTS_URL} />,
		<meta key="theme-color" name="theme-color" content="#F7F0E3" />,
	])
}
