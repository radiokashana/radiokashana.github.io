import React from "react"
import { Link } from "gatsby"

const links = [
	{ href: "http://www.amarcmexico.org/", label: "AMARC México" },
	{ href: "https://www.facebook.com/radiokashana/", label: "Facebook Radiokashana" },
	{ href: "https://www.facebook.com/lavozdelpacificoradio/", label: "Facebook La Voz del Pacífico" },
]

const Footer = () => (
	<footer className="site-footer" id="contacto" data-testid="site-footer">
		<div className="wrap">
			<div className="site-footer__grid">
				<div className="site-footer__about">
					<Link to="/" className="site-footer__wordmark">RadioKashana</Link>
					<p className="site-footer__frequency" data-testid="footer-frequency">
						Transmitiendo en la <strong>93.3 FM</strong> desde el punto más alto de Santa Rosalía, Baja California Sur
					</p>
				</div>
				<div>
					<h2 className="label">Contacto</h2>
					<p className="site-footer__contact" data-testid="footer-contact">
						Cel. <a href="tel:+526151558484">615 155 8484</a>
						<br />
						<a href="mailto:rafael@radiokashana.org">rafael@radiokashana.org</a>
					</p>
				</div>
				<nav data-testid="footer-nav" aria-label="Enlaces">
					<h2 className="label">Enlaces</h2>
					<ul className="site-footer__links">
						{links.map(link => (
							<li key={link.href}>
								<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<p className="site-footer__legal">
				© {new Date().getFullYear()} RadioKashana · Radio comunitaria de Santa Rosalía
			</p>
		</div>
	</footer>
)

export default Footer
