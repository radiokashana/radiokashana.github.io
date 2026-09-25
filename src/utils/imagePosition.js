/**
 * Converts the CMS `imagePosition` field ("top", "bottom-left", ...) into a
 * CSS object-position value, so cropped photos keep their subject in frame.
 * Invalid or missing values fall back to the centre.
 *
 * @param {string} [position]
 * @returns {string} e.g. "center top"
 */
const positionMap = {
	center: "center center",
	top: "center top",
	bottom: "center bottom",
	left: "left center",
	right: "right center",
	"top-left": "left top",
	"top-right": "right top",
	"bottom-left": "left bottom",
	"bottom-right": "right bottom",
}

export const getObjectPosition = (position = "center") => {
	if (!position || typeof position !== "string" || position.trim() === "") {
		if (process.env.NODE_ENV === "development" && position !== undefined) {
			console.warn("Invalid imagePosition value:", position, "- defaulting to center")
		}
		return "center center"
	}

	const result = positionMap[position.toLowerCase().trim()]
	if (!result && process.env.NODE_ENV === "development") {
		console.warn("Unknown imagePosition value:", position, "- defaulting to center")
	}
	return result || "center center"
}
