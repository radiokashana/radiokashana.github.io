import React from "react"
import { Link } from "gatsby"

const links = [
	{ href: "http://www.amarcmexico.org/", label: "AMARC México" },
	{ href: "https://www.facebook.com/radiokashana/", label: "Facebook Radiokashana" },
	{ href: "https://www.facebook.com/lavozdelpacificoradio/", label: "Facebook La Voz del Pacífico" },
]

const Footer = () => (
	<footer className="site-footer" data-testid="site-footer">
		<div className="wrap">
			<div className="site-footer__top">
				<p className="site-footer__dial" aria-hidden="true">
					93.3<span>FM</span>
				</p>
				<div className="site-footer__about">
					<h3 data-testid="footer-frequency">
						Transmitiendo en la 93.3 FM desde el punto más alto de Santa Rosalía, Baja California Sur
					</h3>
					<h3 className="site-footer__contact" data-testid="footer-contact">
						Cel. <a href="tel:+526151558484">615 155 8484</a>
						<span aria-hidden="true"> · </span>
						<a href="mailto:rafael@radiokashana.org">rafael@radiokashana.org</a>
					</h3>
				</div>
			</div>
			<div className="site-footer__bottom">
				<Link to="/" className="site-footer__name">
					RadioKashana
				</Link>
				<nav data-testid="footer-nav" aria-label="Enlaces">
					<ul>
						{links.map((link) => (
							<li key={link.href}>
								<a href={link.href} rel="noopener noreferrer">
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	</footer>
)

export default Footer
