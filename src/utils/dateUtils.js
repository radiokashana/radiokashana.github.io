/**
 * Formats a date string or Date object to Spanish format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date in Spanish "DD de MMMM de YYYY" format
 */
export const formatDateSpanish = (date) => {
	if (!date) return "";

	const dateObj = typeof date === "string" ? new Date(date) : date;

	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	})
		.format(dateObj)
		.replace(/ de /g, " de ")
		.replace(/^(\d{2}) (\w+) (\d{4})$/, "$1 de $2 de $3");
};
