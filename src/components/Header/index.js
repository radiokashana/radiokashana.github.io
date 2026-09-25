import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const LIVE_URL = "https://www.facebook.com/radiokashana/live/"

// Masthead: the station's name, what it is, and a way to listen live.
// The Facebook Live player (set in the CMS) only loads when asked for, so no
// page pays for Facebook's iframe up front. Without JavaScript the link
// simply opens the live page on Facebook.
const Header = () => {
	const { allDataJson } = useStaticQuery(graphql`
		query LiveEmbed {
			allDataJson {
				nodes {
					facebookLiveEmbedHtml
				}
			}
		}
	`)
	const liveHtml = allDataJson.nodes.map((n) => n.facebookLiveEmbedHtml).find(Boolean)
	const [live, setLive] = useState(false)

	return (
		<header role="banner" className="masthead wrap" data-testid="site-header">
			<div className="masthead__row">
				<Link to="/" className="masthead__name" data-testid="header-logo">
					RadioKashana
				</Link>
				<a
					href={LIVE_URL}
					className="masthead__live"
					aria-expanded={liveHtml ? live : undefined}
					data-testid="live-embed-toggle"
					onClick={(e) => {
						if (!liveHtml) return
						e.preventDefault()
						setLive(!live)
					}}
				>
					{live ? "Cerrar" : "En vivo"}
				</a>
			</div>
			<p className="masthead__tag meta">
				<span>Tu radio de verdad ·</span> <span>93.3 FM ·</span>{" "}
				<span>Santa Rosalía, B.C.S.</span>
			</p>
			{live && (
				<div
					className="live"
					data-testid="live-embed"
					dangerouslySetInnerHTML={{ __html: liveHtml }}
				/>
			)}
		</header>
	)
}

export default Header
