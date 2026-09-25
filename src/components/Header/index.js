import React, { useEffect } from "react"
import { Link } from "gatsby"

import { ListenButton, LivePlayer, useLive, useLiveEmbedHtml } from "../live"
import { Emblem, Equalizer, LiveDot, StationClock, STATION, STATION_LINKS } from "../station"

// Persistent on-air bar: the station wordmark, the frequency and the live
// player stay pinned to the top of every page. The player itself opens in a
// drawer under the bar, so it keeps playing while the visitor scrolls.
const Header = () => {
	const { open, close, inlinePlayer } = useLive()
	const embedHtml = useLiveEmbedHtml()

	useEffect(() => {
		if (!open) return undefined
		const onKey = e => {
			if (e.key === "Escape") close()
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [open, close])

	return (
		<header role="banner" className="onair" data-testid="site-header">
			<div className="onair__bar">
				<div className="shell onair__inner">
					<Link to="/" className="brand" data-testid="header-logo" aria-label={`${STATION.name}, ${STATION.frequency} ${STATION.band} — portada`}>
						<Emblem className="brand__emblem emblem--light" />
						<span className="brand__word">
							Radio<b>Kashana</b>
						</span>
						<span className="brand__freq">
							{STATION.frequency}
							<small>{STATION.band}</small>
						</span>
					</Link>

					<div className="onair__status" aria-label="Estado de la transmisión">
						<span className="on-air-tag on-air-tag--bar">
							<LiveDot /> Al aire
						</span>
						<Equalizer className="onair__eq" />
						<span className="onair__place">{STATION.place}</span>
						<StationClock className="onair__clock" />
					</div>

					<ListenButton className="onair__listen" shortLabel="En vivo" />
				</div>
			</div>

			{open && !inlinePlayer && (
				<div className="onair__drawer" id="live-drawer">
					<div className="shell onair__drawer-inner">
						<div className="onair__drawer-copy">
							<p className="eyebrow eyebrow--light">Estás escuchando</p>
							<p className="onair__drawer-title">
								{STATION.name} <span>{STATION.frequency} {STATION.band}</span>
							</p>
							<p className="onair__drawer-note">
								La transmisión sigue mientras lees. Si no ves la señal, abre la transmisión directamente en Facebook.
							</p>
						</div>
						<LivePlayer html={embedHtml} variant="drawer" />
					</div>
				</div>
			)}
		</header>
	)
}

// Thin strip under the bar with the station's own links. Not sticky: only the
// on-air bar follows the reader down the page.
export const StationStrip = () => (
	<nav className="onair__strip" aria-label="La estación">
		<div className="shell onair__strip-inner">
			<ul>
				<li><Link to="/">Portada</Link></li>
				<li><Link to="/#noticias">Noticias</Link></li>
				{STATION_LINKS.slice(0, 2).map(link => (
					<li key={link.href}>
						<a href={link.href} target="_blank" rel="noopener noreferrer">{link.short}</a>
					</li>
				))}
			</ul>
			<a className="onair__phone" href={STATION.phoneHref}>
				Cabina <span>{STATION.phone}</span>
			</a>
		</div>
	</nav>
)

export default Header
