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

// Pinned to Baja California Sur's time zone so the server-rendered HTML and
// the hydrated page always agree on the day, wherever the build runs.
const STATION_TIME_ZONE = "America/Mazatlan";

const toDate = (date) => (typeof date === "string" ? new Date(date) : date);

/**
 * Short date for story cards, e.g. "13 mar 2018".
 * @param {string|Date} date - The date to format
 * @returns {string}
 */
export const formatDateShort = (date) => {
	if (!date) return "";
	return toDate(date).toLocaleDateString("es-MX", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: STATION_TIME_ZONE,
	});
};

/**
 * Long date for the article page, e.g. "13 de marzo de 2018".
 * @param {string|Date} date - The date to format
 * @returns {string}
 */
export const formatDateLong = (date) => {
	if (!date) return "";
	return toDate(date).toLocaleDateString("es-MX", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: STATION_TIME_ZONE,
	});
};
