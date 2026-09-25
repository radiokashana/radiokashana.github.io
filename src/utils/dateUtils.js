// Dates are always shown in Santa Rosalía's time zone, so the text rendered at
// build time (on a UTC server) matches what the browser renders on hydration.
const TIME_ZONE = "America/Mazatlan"

const toDate = (date) => (typeof date === "string" ? new Date(date) : date)

/**
 * Long Spanish date for the article page.
 * @param {string|Date} date
 * @returns {string} e.g. "sábado, 28 de marzo de 2026"
 */
export const formatDateSpanish = (date) => {
	if (!date) return ""
	return toDate(date).toLocaleDateString("es-MX", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: TIME_ZONE,
	})
}

/**
 * Short Spanish date for headline lists.
 * @param {string|Date} date
 * @returns {string} e.g. "28 mar 2026"
 */
export const formatDateShort = (date) => {
	if (!date) return ""
	return toDate(date).toLocaleDateString("es-MX", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: TIME_ZONE,
	})
}
