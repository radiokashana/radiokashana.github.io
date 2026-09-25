import React from "react"

import Embed from "./embed"
import { STATION } from "../utils/station"

// The "porch" next to the news: what's on air and how to reach the station.
const StationAside = ({ liveHtml }) => (
	<aside className="porch" aria-label="La radio">
		<Embed html={liveHtml} />

		<section className="notice" id="contacto" aria-labelledby="notice-title">
			<span className="notice__tape" aria-hidden="true" />
			<h2 className="notice__title" id="notice-title">¿Tienes algo que contar?</h2>
			<p className="notice__text">
				Esta radio la hacemos entre vecinos. Avísanos de lo que pasa en tu colonia, en el puerto o en el ejido.
			</p>
			<a className="notice__phone" href={STATION.phoneHref}>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
				</svg>
				<span>
					<small>Llama a cabina</small>
					{STATION.phone}
				</span>
			</a>
			<ul className="notice__list">
				<li>
					<a href={`mailto:${STATION.email}`}>{STATION.email}</a>
				</li>
				<li>
					<a href={STATION.facebook}>facebook.com/radiokashana</a>
				</li>
			</ul>
		</section>
	</aside>
)

export default StationAside
