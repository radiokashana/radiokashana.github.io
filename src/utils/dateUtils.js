/**
 * Formats a date string or Date object to Spanish format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date in Spanish "23 de octubre de 2021 a las 9:54 AM" format
 */
export const formatDateSpanish = (date) => {
	if (!date) return "";

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	// Create a new Date object if the input is a string
	const dateObj = typeof date === "string" ? new Date(date) : date;
	// Format the date using toLocaleDateString
	return dateObj.toLocaleDateString("es-ES", options);
};

// Santa Rosalía keeps Mountain time (same zone as Mazatlán). Pinning the zone
// makes the server-rendered date match what the browser hydrates, and shows
// readers the local date instead of the build machine's UTC one.
const LOCAL_TIME_ZONE = "America/Mazatlan"

const toDate = (date) => (typeof date === "string" ? new Date(date) : date)

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/**
 * Long Spanish date for article pages.
 * @param {string|Date} date
 * @returns {string} e.g. "Sábado 28 de marzo de 2026"
 */
export const formatDateLong = (date) => {
	if (!date) return ""
	const text = toDate(date).toLocaleDateString("es-MX", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: LOCAL_TIME_ZONE,
	})
	return capitalize(text.replace(",", ""))
}

/**
 * Compact Spanish date for lists and cards.
 * @param {string|Date} date
 * @returns {string} e.g. "28 de marzo de 2026"
 */
export const formatDateShort = (date) => {
	if (!date) return ""
	return toDate(date).toLocaleDateString("es-MX", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: LOCAL_TIME_ZONE,
	})
}
