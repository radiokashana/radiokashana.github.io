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

/**
 * Short date for news feeds, e.g. "14 sept 2025". Always in Santa Rosalía's
 * time zone so the server-rendered HTML matches what the browser hydrates.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateShort = (date) => {
	if (!date) return "";
	const dateObj = typeof date === "string" ? new Date(date) : date;
	return dateObj
		.toLocaleDateString("es-MX", {
			day: "numeric",
			month: "short",
			year: "numeric",
			timeZone: "America/Mazatlan",
		})
		.replace(/\./g, "");
};
