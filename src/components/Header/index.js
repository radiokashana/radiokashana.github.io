import React from "react"
import { Link } from "gatsby"

import Emblem from "../emblem"
import Horizon from "../horizon"
import Sea from "../sea"
import { STATION } from "../../utils/station"

// Masthead: the station's squid emblem and wordmark on the left, a line
// drawing of the town on the right, and a short row of links underneath.
const Header = () => (
	<header role="banner" className="masthead" data-testid="site-header">
		<div className="masthead__strip">
			<div className="wrap masthead__strip-inner">
				<span>Radio comunitaria de Santa Rosalía, Baja California Sur</span>
				<a href={STATION.phoneHref}>Cabina: {STATION.phone}</a>
			</div>
		</div>

		<div className="wrap masthead__main">
			<Link to="/" className="brand" data-testid="header-logo" aria-label="RadioKashana, tu radio de verdad. Ir al inicio">
				<Emblem className="brand__emblem" />
				<span className="brand__text" aria-hidden="true">
					<span className="brand__name">
						<span className="brand__radio">Radio</span>Kashana
					</span>
					<span className="brand__motto">
						Tu radio de verdad <span className="brand__freq">93.3 FM</span>
					</span>
				</span>
			</Link>
			<Horizon className="masthead__art" preserveAspectRatio="xMinYMax slice" />
		</div>
		<Sea className="masthead__sea" />

		<nav className="masthead__nav" aria-label="Principal">
			<div className="wrap masthead__nav-inner">
				<Link to="/" className="masthead__link">Noticias</Link>
				<a href="/#en-vivo" className="masthead__link masthead__link--live">
					<span className="live-dot" aria-hidden="true" /> En vivo
				</a>
				<a href="/#contacto" className="masthead__link">Contacto</a>
				<p className="masthead__place">Desde el punto más alto de Santa Rosalía</p>
			</div>
		</nav>
	</header>
)

export default Header
