import React from "react"

// The Facebook Live player, set in the page as the station's "on air" card
// instead of floating over the news. The iframe HTML comes from the CMS
// (_data/settings.json); we only add a title and lazy loading to it.
const withIframeExtras = (html = "") =>
	html.replace(
		/<iframe(?![^>]*\btitle=)/i,
		'<iframe title="Transmisión en vivo de RadioKashana en Facebook" loading="lazy"'
	)

const Embed = ({ html }) => (
	<section className="onair" id="en-vivo" data-testid="live-embed" aria-labelledby="onair-title">
		<header className="onair__head" data-testid="live-embed-header">
			<p className="onair__label">
				<span className="live-dot" aria-hidden="true" /> Al aire
			</p>
			<h2 className="onair__title" id="onair-title">
				93.3 <span>FM</span>
			</h2>
			<p className="onair__sub">Escúchanos en la radio o mira la transmisión en vivo.</p>
		</header>
		<div className="onair__player" id="liveContent" data-testid="live-embed-content">
			<div dangerouslySetInnerHTML={{ __html: withIframeExtras(html) }} />
		</div>
		<a className="onair__fallback" href="https://www.facebook.com/radiokashana/live/">
			¿No carga? Ábrelo en Facebook
		</a>
	</section>
)

export default Embed
