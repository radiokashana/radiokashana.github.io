import React from "react"

// A strip of the Gulf of California: three rows of hand-drawn waves that run
// the full width of the page under the masthead drawing.
const Sea = ({ className = "" }) => (
	<svg className={`sea ${className}`} width="100%" height="30" aria-hidden="true" focusable="false">
		<defs>
			<pattern id="sea-row-a" width="72" height="10" patternUnits="userSpaceOnUse">
				<path d="M2 6q4-3.5 8 0t8 0t8 0t8 0t8 0" />
			</pattern>
			<pattern id="sea-row-b" x="30" width="56" height="10" patternUnits="userSpaceOnUse">
				<path d="M2 6q4-3.5 8 0t8 0t8 0" />
			</pattern>
			<pattern id="sea-row-c" x="12" width="96" height="10" patternUnits="userSpaceOnUse">
				<path d="M2 6q4-3.5 8 0t8 0t8 0t8 0t8 0t8 0" />
			</pattern>
		</defs>
		<rect width="100%" height="10" y="1" fill="url(#sea-row-a)" />
		<rect width="100%" height="10" y="10" fill="url(#sea-row-b)" opacity=".7" />
		<rect width="100%" height="10" y="19" fill="url(#sea-row-c)" opacity=".45" />
	</svg>
)

export default Sea
