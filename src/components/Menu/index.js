import React from "react"

import MenuItem from "../menu-item"

const Menu = () =>
	<nav className="dib w-100 center bg-top-gray-bottom-near-black">
		<ul className="center list dib ma0 pa0">
			<MenuItem href="/">Inicio</MenuItem>
			<MenuItem href="/noticias/">Noticias</MenuItem>
			<MenuItem href="/locales/">Locales</MenuItem>
			<MenuItem href="/bcs/">Baja California Sur</MenuItem>
			<MenuItem href="/mexico/">M&eacute;xico</MenuItem>
			<MenuItem href="/globales/">Globales</MenuItem>
			<MenuItem href="/punto-de-vista/">Punto de vista</MenuItem>
		</ul>
	</nav>

export default Menu
