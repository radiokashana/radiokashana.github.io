/**
 * Format a date object to Spanish format: DD de MMMM de YYYY
 * @param {Date|null} date - JavaScript Date object
 * @returns {string} Formatted date or fallback text for missing/invalid dates
 */
export function formatDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Sin fecha de publicación'
  }

  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]

  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
}