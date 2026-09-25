import React from "react"

import { ListenButton } from "./live"
import { Emblem, FrequencyDial, STATION, STATION_LINKS } from "./station"

const Footer = () => (
	<footer className="site-footer" data-testid="site-footer">
		<div className="shell site-footer__signoff">
			<div className="site-footer__brand">
				<Emblem className="emblem--light site-footer__emblem" />
				<div>
					<p className="site-footer__word">
						Radio<b>Kashana</b>
					</p>
					<p className="site-footer__slogan">{STATION.slogan}</p>
				</div>
			</div>
			<div className="site-footer__dial">
				<p className="site-footer__freq">
					{STATION.frequency}
					<small>{STATION.band}</small>
				</p>
				<FrequencyDial className="dial--footer" />
			</div>
		</div>

		<div className="shell site-footer__grid">
			<div>
				<h3>La estación</h3>
				<p data-testid="footer-frequency">{STATION.coverage}.</p>
				<ListenButton className="listen-btn--ghost" />
			</div>
			<div>
				<h3>Cabina</h3>
				<p data-testid="footer-contact">
					Cel. <a href={STATION.phoneHref}>{STATION.phone}</a>
					<br />
					<a href={`mailto:${STATION.email}`}>{STATION.email}</a>
				</p>
			</div>
			<nav data-testid="footer-nav" aria-label="Enlaces de la estación">
				<h3>Síguenos</h3>
				<ul>
					{STATION_LINKS.map(link => (
						<li key={link.href}>
							<a href={link.href} target="_blank" rel="noopener noreferrer">
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>

		<div className="shell site-footer__base">
			<span>
				© {STATION.name} · Radio comunitaria · {STATION.place}
			</span>
			<a className="site-footer__top" href="#top">
				Volver arriba <span aria-hidden="true">↑</span>
			</a>
		</div>
	</footer>
)

export default Footer
