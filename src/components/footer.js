import React from "react"
import { Link } from "gatsby"

import Emblem from "./emblem"
import { STATION } from "../utils/station"

const Footer = () => (
	<footer className="site-footer" data-testid="site-footer">
		<svg className="site-footer__edge" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
			<path d="M0 24V12Q50 0 100 12T200 12T300 12T400 12T500 12T600 12T700 12T800 12T900 12T1000 12T1100 12T1200 12V24Z" />
		</svg>
		<div className="wrap site-footer__grid">
			<div className="site-footer__brand">
				<Link to="/" className="site-footer__name">
					<Emblem className="site-footer__emblem" />
					RadioKashana
				</Link>
				<p className="site-footer__motto">Tu radio de verdad. Una radio comunitaria hecha entre vecinos, frente al Golfo de California.</p>
			</div>

			<div className="site-footer__block">
				<h3 className="site-footer__heading">Dónde escucharnos</h3>
				<p className="site-footer__frequency" data-testid="footer-frequency">
					Transmitiendo en la <strong>93.3 FM</strong> desde el punto más alto de Santa Rosalía, Baja California Sur
				</p>
			</div>

			<div className="site-footer__block">
				<h3 className="site-footer__heading">Contacto</h3>
				<p className="site-footer__contact" data-testid="footer-contact">
					<a href={STATION.phoneHref}>Cel. {STATION.phone}</a>
					<a href={`mailto:${STATION.email}`}>{STATION.email}</a>
				</p>
			</div>

			<nav className="site-footer__block" data-testid="footer-nav" aria-label="Enlaces">
				<h3 className="site-footer__heading">Nuestra red</h3>
				<ul className="site-footer__links">
					<li><a href="http://www.amarcmexico.org/">AMARC México</a></li>
					<li><a href="https://www.facebook.com/radiokashana/">Facebook Radiokashana</a></li>
					<li><a href="https://www.facebook.com/lavozdelpacificoradio/">Facebook La Voz del Pacífico</a></li>
				</ul>
			</nav>
		</div>
		<p className="wrap site-footer__base">
			<span>Santa Rosalía, B.C.S. · 27°20′ N, 112°16′ O</span>
			<span>© {new Date().getFullYear()} RadioKashana</span>
		</p>
	</footer>
)

export default Footer
