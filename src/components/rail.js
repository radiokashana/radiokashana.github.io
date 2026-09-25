import React from "react"

// Right-hand column of the front page and the archive: the Facebook Live
// embed and the station's frequency, in place of the old floating widget
// and the repeated logo banners.
const Rail = ({ liveEmbedHtml }) => (
	<aside className="rail">
		<section className="live" id="en-vivo" data-testid="live-embed">
			<h2 className="section-label" data-testid="live-embed-header">
				<span className="live__dot" aria-hidden="true" /> En vivo
			</h2>
			<p className="live__intro">La transmisión de RadioKashana desde Santa Rosalía.</p>
			{liveEmbedHtml && (
				<div
					className="live__frame"
					data-testid="live-embed-content"
					dangerouslySetInnerHTML={{ __html: liveEmbedHtml }}
				/>
			)}
		</section>
		<section className="tune-in">
			<p className="tune-in__label">Sintoniza</p>
			<p className="tune-in__freq">93.3 <span>FM</span></p>
			<p className="tune-in__place">Santa Rosalía, Baja California Sur</p>
			<p className="tune-in__phone">
				Cel. <a href="tel:+526151558484">615 155 8484</a>
			</p>
		</section>
	</aside>
)

export default Rail
