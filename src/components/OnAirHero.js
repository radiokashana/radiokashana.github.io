import React from "react"

import { LivePlayer } from "./live"
import { FrequencyDial, LiveDot, STATION, STATION_LINKS } from "./station"

// Homepage opener: before any headline, the visitor learns this is 93.3 FM
// and that it is on the air right now, with the player right there.
const OnAirHero = ({ embedHtml }) => (
	<section className="hero" aria-labelledby="hero-title">
		<div className="shell hero__grid">
			<div className="hero__station">
				<p className="eyebrow eyebrow--light">
					<LiveDot /> Al aire ahora · {STATION.place}
				</p>
				<h1 id="hero-title" className="hero__freq">
					<span className="sr-only">{STATION.name}, </span>
					{STATION.frequency}
					<small>{STATION.band}</small>
				</h1>
				<p className="hero__name">
					{STATION.name} <span>— {STATION.slogan}</span>
				</p>
				<p className="hero__desc">{STATION.coverage}. Síguenos en vivo desde cualquier lugar.</p>
				<FrequencyDial className="hero__dial" />
				<div className="hero__actions">
					<a className="btn btn--light" href="#noticias">
						Las noticias de hoy <span aria-hidden="true">↓</span>
					</a>
					<a className="btn btn--outline" href={STATION_LINKS[0].href} target="_blank" rel="noopener noreferrer">
						Síguenos en Facebook
					</a>
				</div>
			</div>
			<div className="hero__player" id="en-vivo">
				<LivePlayer html={embedHtml} variant="hero" />
			</div>
		</div>
	</section>
)

export default OnAirHero
