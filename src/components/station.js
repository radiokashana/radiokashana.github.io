import React, { useEffect, useState } from "react"

// Everything that makes the station recognisable lives here, so the header,
// hero, sidebar and footer all say the same thing.
export const STATION = {
	name: "RadioKashana",
	slogan: "Tu radio de verdad",
	frequency: "93.3",
	band: "FM",
	place: "Santa Rosalía, B.C.S.",
	coverage:
		"Transmitiendo en la 93.3 FM desde el punto más alto de Santa Rosalía, Baja California Sur",
	phone: "615 155 8484",
	phoneHref: "tel:+526151558484",
	email: "rafael@radiokashana.org",
	timeZone: "America/Mazatlan",
}

export const STATION_LINKS = [
	{ label: "Facebook RadioKashana", short: "Facebook", href: "https://www.facebook.com/radiokashana/" },
	{ label: "Facebook La Voz del Pacífico", short: "La Voz del Pacífico", href: "https://www.facebook.com/lavozdelpacificoradio/" },
	{ label: "AMARC México", short: "AMARC México", href: "http://www.amarcmexico.org/" },
]

// The squid emblem from the station logo. The PNG is black on transparent;
// CSS turns it white on dark and red backgrounds.
export const Emblem = ({ className = "" }) => (
	<img className={`emblem ${className}`} src="/img/logo-rk-symmetric.png" alt="" width="260" height="239" />
)

export const LiveDot = ({ className = "" }) => <span className={`live-dot ${className}`} aria-hidden="true" />

export const Equalizer = ({ className = "" }) => (
	<span className={`eq ${className}`} aria-hidden="true">
		<span />
		<span />
		<span />
		<span />
		<span />
	</span>
)

// Local time at the transmitter. Rendered after hydration only, so the static
// HTML never disagrees with the visitor's clock.
export const StationClock = ({ className = "" }) => {
	const [time, setTime] = useState(null)

	useEffect(() => {
		const format = () =>
			new Date().toLocaleTimeString("es-MX", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
				timeZone: STATION.timeZone,
			})
		setTime(format())
		const id = setInterval(() => setTime(format()), 30 * 1000)
		return () => clearInterval(id)
	}, [])

	return (
		<span className={`station-clock ${className}`} title="Hora en Santa Rosalía">
			{time || "--:--"}
		</span>
	)
}

// A strip of FM dial, 88–108 MHz, with the needle parked on 93.3.
export const FrequencyDial = ({ className = "" }) => {
	const min = 88
	const max = 108
	const left = 8
	const width = 384
	const x = f => left + ((f - min) / (max - min)) * width
	const ticks = []
	for (let f = min; f <= max + 0.001; f += 0.5) {
		const major = Math.abs(f % 2) < 0.001
		ticks.push(
			<line
				key={f}
				x1={x(f)}
				x2={x(f)}
				y1={major ? 14 : 20}
				y2={30}
				strokeWidth={major ? 1.5 : 1}
			/>
		)
	}
	const labels = []
	for (let f = min; f <= max; f += 4) {
		labels.push(
			<text key={f} x={x(f)} y={46} textAnchor="middle">
				{f}
			</text>
		)
	}
	const needle = x(parseFloat(STATION.frequency))

	return (
		<svg className={`dial ${className}`} viewBox="0 0 400 52" role="img" aria-label={`Dial FM sintonizado en ${STATION.frequency}`}>
			<g className="dial__ticks" stroke="currentColor">{ticks}</g>
			<g className="dial__labels" fill="currentColor">{labels}</g>
			<rect className="dial__needle" x={needle - 1.5} y={2} width={3} height={36} rx={1.5} />
			<circle className="dial__needle" cx={needle} cy={4} r={4} />
		</svg>
	)
}
