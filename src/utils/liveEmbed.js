// The Facebook Live embed is edited in the CMS (_data/settings.json) as a raw
// <iframe> snippet sized for a narrow sidebar (width=267, show_text=1). To make
// it read as a player we pull out its src and re-render it as a 16:9 video.
// Anything that is not a Facebook video plugin iframe is rendered untouched.

const FB_PLUGIN = /^https:\/\/(www\.)?facebook\.com\/plugins\/video\.php/i
export const DEFAULT_LIVE_URL = "https://www.facebook.com/radiokashana/live/"

const decodeEntities = str => str.replace(/&amp;/g, "&")

export const parseLiveEmbed = html => {
	if (!html || typeof html !== "string") {
		return { src: null, liveUrl: DEFAULT_LIVE_URL, raw: null }
	}

	const match = html.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)
	const src = match ? decodeEntities(match[1]) : null

	if (!src || !FB_PLUGIN.test(src)) {
		return { src: null, liveUrl: DEFAULT_LIVE_URL, raw: html }
	}

	let liveUrl = DEFAULT_LIVE_URL
	const hrefParam = src.match(/[?&]href=([^&]+)/)
	if (hrefParam) {
		try {
			liveUrl = decodeURIComponent(hrefParam[1])
		} catch (e) {
			// malformed escape: keep the default live URL
		}
	}

	const playerSrc = src
		.replace(/([?&])show_text=[^&]*/, "$1show_text=0")
		.replace(/([?&])width=\d+/, "$1width=560")

	return { src: playerSrc, liveUrl, raw: null }
}
