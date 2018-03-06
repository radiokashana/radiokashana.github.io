import React from "react"
import Link from "gatsby-link"

import Menu from "../Menu"

export default () =>
	<header role="banner" className="relative">
		<div className="absolute top-0 left-2 bg-white-80">
			<div className="fr">
				<h1>RADIO KASHANA</h1>
				<p>Tu radio de verdad</p>
			</div>
			<img id="logo" src="logo-plain.svg" alt="logo" />
		</div>
		<img src="kashana.png" />
		<Menu/>
	</header>
