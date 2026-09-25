/**
 * Converts the CMS `imagePosition` value to a CSS object-position.
 * Unknown or empty values fall back to the centre of the photo.
 * @param {string} [position]
 * @returns {string}
 */
export const getObjectPosition = (position = "center") => {
	if (!position || typeof position !== "string" || position.trim() === "") {
		return "center center"
	}

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

	const result = positionMap[position.toLowerCase().trim()]
	if (!result && process.env.NODE_ENV === "development") {
		console.warn("Unknown imagePosition value:", position, "- defaulting to center")
	}
	return result || "center center"
}

/**
 * Returns a copy of gatsby-plugin-image data with a different `sizes`
 * attribute. The same query result is shown at very different widths across
 * the mosaic (full bleed, 7/12, 1/3...), and `sizes` is what lets the browser
 * pick a small file for a small slot, which matters most on phones.
 * @param {object} image - gatsbyImageData result
 * @param {string} sizes - e.g. "(min-width: 1024px) 33vw, 100vw"
 * @returns {object}
 */
export const withSizes = (image, sizes) => {
	if (!image || !sizes || !image.images) return image
	const { fallback, sources = [] } = image.images
	return {
		...image,
		images: {
			...image.images,
			fallback: fallback ? { ...fallback, sizes } : fallback,
			sources: sources.map((source) => ({ ...source, sizes })),
		},
	}
}
