/**
 * True when a headline was typed in capitals ("EDITH AGUILAR INFORMA ...").
 * Such headlines are shown in small capitals so they sit with the rest of
 * the page instead of shouting, without changing the text itself.
 *
 * @param {string} text
 * @returns {boolean}
 */
export const isAllCaps = (text) => {
	const letters = String(text || "").replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "")
	if (letters.length < 8) return false
	const upper = letters.replace(/[^A-ZÀ-ÖØ-Þ]/g, "").length
	return upper / letters.length > 0.8
}

/** Class name for a headline element, adding `is-caps` when needed. */
export const headlineClass = (base, text) => (isAllCaps(text) ? `${base} is-caps` : base)
