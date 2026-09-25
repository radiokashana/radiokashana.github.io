import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { parseLiveEmbed } from "../utils/liveEmbed"
import { Emblem, Equalizer, LiveDot, STATION } from "./station"

// Shared state for the live player. Pages that already show the player inline
// (the homepage) set `inlinePlayer`, so every "Escuchar" button jumps to it
// instead of opening a second copy in the header drawer.
const LiveContext = createContext({
	open: false,
	inlinePlayer: false,
	toggle: () => {},
	close: () => {},
})

export const LiveProvider = ({ inlinePlayer = false, children }) => {
	const [open, setOpen] = useState(false)
	const toggle = useCallback(() => setOpen(o => !o), [])
	const close = useCallback(() => setOpen(false), [])
	const value = useMemo(() => ({ open, inlinePlayer, toggle, close }), [open, inlinePlayer, toggle, close])
	return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>
}

export const useLive = () => useContext(LiveContext)

export const useLiveEmbedHtml = () => {
	const data = useStaticQuery(graphql`
		query LiveEmbedSettings {
			allDataJson {
				edges {
					node {
						facebookLiveEmbedHtml
					}
				}
			}
		}
	`)
	const edge = data.allDataJson.edges.find(e => e.node.facebookLiveEmbedHtml)
	return edge ? edge.node.facebookLiveEmbedHtml : null
}

const PlayIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
	</svg>
)

const CloseIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z" />
	</svg>
)

// "Escuchar en vivo" everywhere on the site goes through this button.
export const ListenButton = ({ className = "", label = "Escuchar en vivo", shortLabel }) => {
	const { open, toggle, inlinePlayer } = useLive()
	const classes = `listen-btn ${open ? "is-open" : ""} ${className}`
	const text = (
		<>
			<span className="listen-btn__long">{open ? "Cerrar reproductor" : label}</span>
			{shortLabel && <span className="listen-btn__short">{open ? "Cerrar" : shortLabel}</span>}
		</>
	)

	if (inlinePlayer) {
		return (
			<a href="#en-vivo" className={classes}>
				<span className="listen-btn__icon"><PlayIcon /></span>
				{text}
			</a>
		)
	}

	return (
		<button type="button" className={classes} onClick={toggle} aria-expanded={open} aria-controls="live-drawer">
			<span className="listen-btn__icon">{open ? <CloseIcon /> : <PlayIcon />}</span>
			{text}
		</button>
	)
}

// The Facebook Live embed dressed as a broadcast monitor.
export const LivePlayer = ({ html, variant = "hero" }) => {
	const { src, liveUrl, raw } = parseLiveEmbed(html)

	return (
		<div className={`player player--${variant}`} data-testid="live-embed">
			<div className="player__top">
				<span className="on-air-tag">
					<LiveDot /> En vivo
				</span>
				<span className="player__source">
					{STATION.frequency} {STATION.band} · Facebook Live
				</span>
			</div>
			<div className="player__screen" data-testid="live-embed-content">
				<div className="player__standby" aria-hidden="true">
					<Emblem className="emblem--light" />
					<span className="player__standby-freq">
						{STATION.frequency} <small>{STATION.band}</small>
					</span>
					<span className="player__standby-note">Sintonizando la señal…</span>
				</div>
				{src && (
					<iframe
						src={src}
						title={`${STATION.name} en vivo`}
						scrolling="no"
						allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						allowFullScreen
					/>
				)}
				{raw && <div className="player__raw" dangerouslySetInnerHTML={{ __html: raw }} />}
			</div>
			<div className="player__bottom">
				<Equalizer />
				<span className="player__now">
					<strong>{STATION.name}</strong> · {STATION.slogan}
				</span>
				<a className="player__external" href={liveUrl} target="_blank" rel="noopener noreferrer">
					Abrir en Facebook <span aria-hidden="true">↗</span>
				</a>
			</div>
		</div>
	)
}
