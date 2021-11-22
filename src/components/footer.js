import React from "react"

import FooterMenuItem from "./footer-menu-item"

const Footer = () =>
	<footer className="white w-100 tc bg-near-black cl">
		<nav>
			<ul className="dib list ma0 pa0 f6">
				<FooterMenuItem href="http://www.amarcmexico.org/">AMARC M&eacute;xico</FooterMenuItem>
				<FooterMenuItem href="https://www.facebook.com/radiokashana/">Facebook Radiokashana</FooterMenuItem>
				<FooterMenuItem href="https://www.facebook.com/lavozdelpacificoradio/">Facebook La Voz del Pac&iacute;fico</FooterMenuItem>
			</ul>
		</nav>
		<h3 className="ma0">Transmitiendo en la 93.3 FM desde el punto m&aacute;s alto de Santa Rosal&iacute;a, Baja California Sur</h3>
		<h3 className="ma0">Cel. 615 155 8484 rafael@radiokashana.org</h3>
	</footer>


export default Footer
