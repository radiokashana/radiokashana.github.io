/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")

// Typefaces for the "Periódico" design:
// - Newsreader: a serif drawn for news reading on screen; its optical sizes
//   cover both the display headlines and the long-form body text.
// - Libre Franklin: a Franklin Gothic revival for the small sans-serif
//   labels (kickers, datelines, navigation), as in a printed daily.
const FONTS_URL =
	"https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..600&family=Libre+Franklin:wght@400;500;600;700&display=swap"

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link key="fonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
		<link key="fonts-preconnect-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
		<link key="fonts-stylesheet" rel="stylesheet" href={FONTS_URL} />,
	])
}
