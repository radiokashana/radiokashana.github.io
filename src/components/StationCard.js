import React from "react"

import { ListenButton } from "./live"
import { Emblem, Equalizer, LiveDot, STATION, STATION_LINKS } from "./station"

// Sidebar card that rides alongside the feed, so the station is still in view
// half-way down the page.
const StationCard = () => (
	<aside className="station-card" aria-label="La estación">
		<div className="station-card__head">
			<span className="on-air-tag on-air-tag--light">
				<LiveDot /> Al aire
			</span>
			<Equalizer />
		</div>
		<p className="station-card__freq">
			{STATION.frequency}
			<small>{STATION.band}</small>
		</p>
		<p className="station-card__name">
			{STATION.name} · {STATION.place}
		</p>
		<ListenButton className="listen-btn--light station-card__listen" />
		<Emblem className="emblem--light station-card__emblem" />

		<dl className="station-card__info">
			<div>
				<dt>Cabina</dt>
				<dd>
					<a href={STATION.phoneHref}>{STATION.phone}</a>
				</dd>
			</div>
			<div>
				<dt>Correo</dt>
				<dd>
					<a href={`mailto:${STATION.email}`}>{STATION.email}</a>
				</dd>
			</div>
		</dl>
		<ul className="station-card__links">
			{STATION_LINKS.map(link => (
				<li key={link.href}>
					<a href={link.href} target="_blank" rel="noopener noreferrer">
						{link.label} <span aria-hidden="true">↗</span>
					</a>
				</li>
			))}
		</ul>
	</aside>
)

export default StationCard
