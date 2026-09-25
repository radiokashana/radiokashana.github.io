import React from "react"

// The Facebook Live player as a full-width red band instead of a floating
// box: it no longer covers the photos, and the masthead's "En vivo" button
// jumps straight to it (#en-vivo). The iframe markup comes from the CMS
// (_data/settings.json) and is sized by CSS.
const Embed = ({ html }) => (
	<section className="live" id="en-vivo" data-testid="live-embed" aria-labelledby="en-vivo-title">
		<div className="wrap live__inner">
			<div className="live__copy" data-testid="live-embed-header">
				<p className="live__eyebrow">
					<span className="live-dot" aria-hidden="true" />
					En vivo
				</p>
				<h2 className="live__title" id="en-vivo-title">
					Escucha <span>RadioKashana</span>
				</h2>
				<p className="live__text">
					Transmitiendo en la 93.3 FM desde el punto más alto de Santa Rosalía, Baja California Sur. Sigue la
					señal en vivo por Facebook.
				</p>
				<a className="live__button" href="https://www.facebook.com/radiokashana/live/" rel="noopener noreferrer">
					Abrir en Facebook
				</a>
			</div>
			<div className="live__player" data-testid="live-embed-content">
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</div>
	</section>
)

export default Embed
