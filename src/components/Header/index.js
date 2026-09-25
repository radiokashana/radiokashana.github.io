import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import { formatEditionDate } from "../../utils/dateUtils"

// Text masthead in the manner of a printed daily: edition date and place on
// a thin top line, the name set large in the headline serif, the frequency as
// the one red accent, and a double rule above a short section nav.
const Header = () => {
	// The edition date is the reader's "today", so it is filled in on the
	// client; rendering it at build time would freeze the build date.
	const [today, setToday] = useState("")
	useEffect(() => {
		setToday(formatEditionDate(new Date()))
	}, [])

	return (
		<header role="banner" className="masthead" data-testid="site-header">
			<div className="wrap">
				<div className="masthead__top">
					<span className="masthead__date" aria-live="off">{today}</span>
					<span className="masthead__place">Santa Rosalía, Baja California Sur</span>
				</div>
				<div className="masthead__title">
					<Link to="/" className="masthead__wordmark" data-testid="header-logo">
						RadioKashana
					</Link>
					<p className="masthead__tagline">
						Tu radio de verdad <span aria-hidden="true">·</span>{" "}
						<span className="masthead__freq">93.3 FM</span>
					</p>
				</div>
				<nav className="masthead__nav" aria-label="Principal">
					<ul>
						<li><Link to="/" activeClassName="is-active">Portada</Link></li>
						<li><Link to="/page/2/">Archivo</Link></li>
						<li><a href="/#en-vivo" className="masthead__live">En vivo</a></li>
						<li><a href="#contacto">Contacto</a></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
