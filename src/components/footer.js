import React from "react"

import FooterMenuItem from "./footer-menu-item"

const Footer = () =>
	<footer className="text-white w-full text-center bg-gray-900 clear-both" data-testid="site-footer">
		<nav data-testid="footer-nav">
			<ul className="inline-block list-none m-0 p-0 text-xs">
				<FooterMenuItem href="http://www.amarcmexico.org/">AMARC M&eacute;xico</FooterMenuItem>
				<FooterMenuItem href="https://www.facebook.com/radiokashana/">Facebook Radiokashana</FooterMenuItem>
				<FooterMenuItem href="https://www.facebook.com/lavozdelpacificoradio/">Facebook La Voz del Pac&iacute;fico</FooterMenuItem>
			</ul>
		</nav>
		<h3 className="m-0" data-testid="footer-frequency">Transmitiendo en la 93.3 FM desde el punto m&aacute;s alto de Santa Rosal&iacute;a, Baja California Sur</h3>
		<h3 className="m-0" data-testid="footer-contact">Cel. 615 155 8484 rafael@radiokashana.org</h3>
	</footer>


export default Footer
