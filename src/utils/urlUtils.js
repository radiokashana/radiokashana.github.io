/**
 * Builds an absolute, percent-encoded URL from the site URL and a path.
 *
 * Social crawlers (Facebook, X, WhatsApp) are strict about the URLs in
 * Open Graph tags: a doubled slash or an unencoded accented character in
 * `og:url` or `og:image` makes the crawler treat it as a different resource,
 * which is how an article ends up shared with the wrong title or no image.
 *
 * - Trims trailing slashes from the site URL and leading slashes from the path
 * - Percent-encodes non-ASCII characters (é, ñ, curly quotes, spaces)
 * - Leaves already-encoded paths alone instead of double-encoding them
 *
 * @param {string} siteUrl - e.g. "https://www.radiokashana.org/"
 * @param {string} [path] - e.g. "/noticias/día-de-la-marina/" or "/img/foto 1.jpg"
 * @returns {string} e.g. "https://www.radiokashana.org/noticias/d%C3%ADa-de-la-marina/"
 */
export const absoluteUrl = (siteUrl, path) => {
	const base = (siteUrl || "").replace(/\/+$/, "")
	if (!path) return `${base}/`

	const trimmed = String(path).replace(/^\/+/, "")
	let decoded = trimmed
	try {
		decoded = decodeURI(trimmed)
	} catch (e) {
		// Malformed escape sequence: keep the raw value
	}
	return `${base}/${encodeURI(decoded)}`
}
