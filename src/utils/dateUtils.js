// Dates are formatted by hand instead of with toLocaleDateString: Node and
// the browser ship different ICU data, so the same date rendered differently
// on the server and on the client and broke React hydration.

const MONTHS = [
	"enero",
	"febrero",
	"marzo",
	"abril",
	"mayo",
	"junio",
	"julio",
	"agosto",
	"septiembre",
	"octubre",
	"noviembre",
	"diciembre",
]

const HOUR = 60 * 60 * 1000

// Day of the month (1-31) of the nth Sunday of a month (n = -1 for the last).
const nthSunday = (year, month, n) => {
	if (n > 0) {
		const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay()
		return 1 + ((7 - firstDay) % 7) + (n - 1) * 7
	}
	const lastDate = new Date(Date.UTC(year, month + 1, 0))
	return lastDate.getUTCDate() - lastDate.getUTCDay()
}

// UTC offset in hours of Santa Rosalía (America/Mazatlan). Mexico observed
// daylight saving time from the first Sunday of April to the last Sunday of
// October, both at 2:00 local time, until it was abolished after 2022.
const santaRosaliaOffset = (time) => {
	const year = new Date(time).getUTCFullYear()
	if (year > 2022) return -7
	const dstStart = Date.UTC(year, 3, nthSunday(year, 3, 1), 2 + 7)
	const dstEnd = Date.UTC(year, 9, nthSunday(year, 9, -1), 2 + 6)
	return time >= dstStart && time < dstEnd ? -6 : -7
}

/**
 * Formats a date string or Date object in Spanish, in Santa Rosalía time.
 * The output is identical on the server and in the browser.
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date, e.g. "23 de octubre de 2021 a las 9:17 a. m."
 */
export const formatDateSpanish = (date) => {
	if (!date) return ""

	const time = new Date(date).getTime()
	if (Number.isNaN(time)) return ""

	// Shift into local time, then read the fields back with the UTC getters.
	const local = new Date(time + santaRosaliaOffset(time) * HOUR)
	const hours = local.getUTCHours()
	const minutes = String(local.getUTCMinutes()).padStart(2, "0")
	const hour12 = hours % 12 || 12
	const period = hours < 12 ? "a. m." : "p. m."

	return `${local.getUTCDate()} de ${MONTHS[local.getUTCMonth()]} de ${local.getUTCFullYear()} a las ${hour12}:${minutes} ${period}`
}
