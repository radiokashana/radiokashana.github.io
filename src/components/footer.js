import React from "react"

import FooterMenuItem from "./footer-menu-item"

export default () =>
	<footer className="w-100 tc bg-near-black">
		<nav>
			<ul className="dib list ma0 pa0 f6">
				<FooterMenuItem href="#">Zoom 95</FooterMenuItem>
				<FooterMenuItem href="#">Asociaci&oacute;n Mundial de Radios Comunitarias AMARC</FooterMenuItem>
				<FooterMenuItem href="#">AMARC Am&eacute;rica Latina y el Caribe</FooterMenuItem>
				<FooterMenuItem href="#">AMARC M&eacute;xico</FooterMenuItem>
				<FooterMenuItem href="#">&iquest;Qu&eacute; es una radio comunitaria?</FooterMenuItem>
			</ul>
		</nav>
		<h3 className="white">Santa Rosal&iacute;a, Baja California Sur. Cel. 615 155 8484 rafael@radiokashana.org</h3>
	</footer>
