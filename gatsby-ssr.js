/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")

// Archivo (variable width) carries the station voice: condensed headlines,
// expanded wordmark and frequency. JetBrains Mono is for broadcast labels
// such as dates, the clock and "EN VIVO".
const FONTS_URL =
	"https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@500;700&display=swap"

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
		<link key="gf-preconnect-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
		<link key="gf-fonts" rel="stylesheet" href={FONTS_URL} />,
		<meta key="theme-color" name="theme-color" content="#0e0c0f" />,
	])
}
