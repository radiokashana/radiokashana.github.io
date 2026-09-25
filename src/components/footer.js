import React from "react"

const links = [
	["http://www.amarcmexico.org/", "AMARC México"],
	["https://www.facebook.com/radiokashana/", "Facebook Radiokashana"],
	["https://www.facebook.com/lavozdelpacificoradio/", "Facebook La Voz del Pacífico"],
]

const Footer = () => (
	<footer className="site-footer" data-testid="site-footer">
		<p data-testid="footer-frequency">
			Transmitiendo en la 93.3 FM desde el punto más alto de Santa Rosalía, Baja California Sur.
		</p>
		<p data-testid="footer-contact">
			Cel. <a href="tel:+526151558484">615 155 8484</a> ·{" "}
			<a href="mailto:rafael@radiokashana.org">rafael@radiokashana.org</a>
		</p>
		<nav data-testid="footer-nav">
			<ul className="inline-list">
				{links.map(([href, label]) => (
					<li key={href}>
						<a href={href}>{label}</a>
					</li>
				))}
			</ul>
		</nav>
	</footer>
)

export default Footer
