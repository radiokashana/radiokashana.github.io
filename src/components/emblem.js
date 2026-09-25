import React from "react"

// The station's squid emblem, drawn from /img/logo-plain.svg as a mask so it
// takes the surrounding colour (ink on the masthead, paper in the footer).
// Set inline so the CSS build never tries to resolve the static path.
const EMBLEM_URL = "url(/img/logo-plain.svg)"

const Emblem = ({ className = "" }) => (
	<span
		className={`emblem ${className}`}
		aria-hidden="true"
		style={{ WebkitMaskImage: EMBLEM_URL, maskImage: EMBLEM_URL }}
	/>
)

export default Emblem
