import React from "react"

import Story from "./Story"

// The mosaic repeats a six-story rhythm, mirrored every other time:
//
//   [ feature: big photo + headline beside it              ]
//   [ overlay, 7 cols            ][ overlay, 5 cols        ]
//   [ paired, 4 ][ paired, 4 ][ paired, 4                  ]
//
// Rhythm comes from photo size; the smallest slot is still a third of the
// page. `sizes` mirrors the CSS grid so phones never fetch desktop files.
const SLOTS = {
	feature: {
		variant: "feature",
		rendition: "hero",
		sizes: "(min-width: 1320px) 780px, (min-width: 768px) 60vw, 100vw",
	},
	wide: {
		variant: "overlay",
		rendition: "hero",
		sizes: "(min-width: 1320px) 740px, (min-width: 1024px) 57vw, (min-width: 768px) 50vw, 100vw",
	},
	narrow: {
		variant: "overlay",
		rendition: "card",
		sizes: "(min-width: 1320px) 520px, (min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw",
	},
	third: {
		variant: "paired",
		rendition: "card",
		sizes: "(min-width: 1320px) 410px, (min-width: 768px) 33vw, 100vw",
	},
}

const RHYTHM = [
	["feature", "wide", "narrow", "third", "third", "third"],
	["feature", "narrow", "wide", "third", "third", "third"],
]

const Mosaic = ({ stories }) => (
	<ul className="mosaic" data-testid="news-articles">
		{stories.map((story, i) => {
			const group = Math.floor(i / RHYTHM[0].length) % RHYTHM.length
			const name = RHYTHM[group][i % RHYTHM[0].length]
			const slot = SLOTS[name]

			return (
				<li key={story.id} className={`mosaic__item mosaic__item--${name}`}>
					<Story
						story={story}
						variant={slot.variant}
						rendition={slot.rendition}
						sizes={slot.sizes}
						dek={name === "feature"}
						flipped={name === "feature" && group === 1}
					/>
				</li>
			)
		})}
	</ul>
)

export default Mosaic
