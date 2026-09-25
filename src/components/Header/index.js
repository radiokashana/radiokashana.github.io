import React from "react"
import { Link } from "gatsby"

import emblem from "../../images/kashana-emblem.png"

// Slim dark masthead: the squid emblem and wordmark on the left, the dial
// position and a live button on the right. It stays pinned while the photos
// scroll underneath.
const Header = () => (
	<header role="banner" className="masthead" data-testid="site-header">
		<div className="wrap masthead__inner">
			<Link to="/" className="brand" aria-label="RadioKashana, ir a la portada">
				<img className="brand__emblem" src={emblem} alt="" width="44" height="44" data-testid="header-logo" />
				<span className="brand__text">
					<span className="brand__name">RadioKashana</span>
					<span className="brand__tag">Tu radio de verdad</span>
				</span>
			</Link>
			<div className="masthead__right">
				<p className="masthead__dial">
					<strong>93.3 FM</strong>
					<span>Santa Rosalía, B.C.S.</span>
				</p>
				<Link to="/#en-vivo" className="live-pill">
					<span className="live-dot" aria-hidden="true" />
					En vivo
				</Link>
			</div>
		</div>
	</header>
)

export default Header
