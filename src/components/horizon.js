import React from "react"

// Line drawing of Santa Rosalía seen from the water: the mesa with the
// station's antenna ("desde el punto más alto"), the old copper smelter
// chimney, the prefabricated iron church of Santa Bárbara, wooden houses with
// verandas, the breakwater and its little lighthouse, a panga, and the sun
// coming up over the Gulf of California. The water itself is drawn by
// <Sea />, which runs the full width of the page underneath.

const INK = "#2B2019"
const SOFT = "#6B5646"
const RED = "#D80125"

const Horizon = ({ className = "", preserveAspectRatio = "xMaxYMax meet" }) => (
	<svg
		className={`horizon ${className}`}
		viewBox="0 -8 640 141"
		role="img"
		aria-label="Dibujo de Santa Rosalía: la antena de la radio en la mesa, la chimenea de la fundición, la iglesia de hierro, casas de madera y el mar"
		preserveAspectRatio={preserveAspectRatio}
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		{/* Sun over the Gulf */}
		<circle cx="560" cy="60" r="21" fill="#F1D9A4" stroke="#C98B2B" strokeWidth="1.5" />
		<path d="M560 28v-8M583 37l6-6M537 37l-6-6M592 60h8M528 60h-8" stroke="#C98B2B" strokeWidth="1.5" />
		{/* Gulls */}
		<path d="M506 44q4-5 8 0q4-5 8 0M488 60q3-4 6 0q3-4 6 0" stroke={SOFT} strokeWidth="1.3" />

		{/* Far mountain */}
		<path
			d="M196 132L258 86Q270 77 281 81L300 66Q311 59 321 68L352 91Q372 99 390 110L444 132Z"
			fill="#EADCC2"
			stroke={SOFT}
			strokeWidth="1.1"
			strokeOpacity=".7"
		/>
		<path d="M300 66l-8 20M321 68l4 16M281 81l-6 14" stroke={SOFT} strokeWidth=".9" strokeOpacity=".6" />

		{/* Mesa with the station antenna */}
		<path
			d="M-2 132V74Q6 69 22 69H96Q113 71 125 86L158 117Q170 127 190 132Z"
			fill="#E3BF86"
			stroke={INK}
			strokeWidth="1.5"
		/>
		<path d="M12 84h44M70 84h18M24 98h70M104 98h8M14 112h30M58 112h66M30 124h110" stroke="#B98A4A" strokeWidth="1" strokeDasharray="6 5" />
		<path d="M40 69L48 18L56 69M42.4 55h11.2M44.3 42h7.4M45.9 30h4.2M42.4 55L51.7 42L45.9 30M53.6 55L44.3 42L50.1 30" stroke={INK} strokeWidth="1.3" />
		<circle cx="48" cy="16" r="2.4" fill={RED} />
		<path
			d="M53.7 10.3A8 8 0 0 1 53.7 21.7M57.9 6.1A14 14 0 0 1 57.9 25.9M62.1 1.9A20 20 0 0 1 62.1 30.1M42.3 10.3A8 8 0 0 0 42.3 21.7M38.1 6.1A14 14 0 0 0 38.1 25.9"
			stroke={RED}
			strokeWidth="1.8"
		/>

		{/* Smelter chimney and the old foundry shed */}
		<path d="M135 106L138 40H145L148 106Z" fill="#C4744B" stroke={INK} strokeWidth="1.4" />
		<path d="M137.4 47h8.3M137.1 53h8.9" stroke={INK} strokeWidth="1" />
		<path d="M150 132V117L161 110V117L172 110V117L183 110V117L194 110V132" fill="#D8A07E" stroke={INK} strokeWidth="1.4" />

		{/* Iglesia de Santa Bárbara: iron nave and belfry */}
		<path d="M252 132V104H304V132" fill="#FBF6EC" stroke={INK} strokeWidth="1.5" />
		<path d="M248 105L278 88L308 105Z" fill="#AFC3C6" stroke={INK} strokeWidth="1.5" />
		<path d="M238 132V96H255V132" fill="#FBF6EC" stroke={INK} strokeWidth="1.5" />
		<path d="M235.5 96.5L246.5 70L257.5 96.5Z" fill="#AFC3C6" stroke={INK} strokeWidth="1.5" />
		<path d="M246.5 70V59M242.5 63.5h8" stroke={INK} strokeWidth="1.4" />
		<circle cx="246.5" cy="106" r="3.2" stroke={INK} strokeWidth="1.2" />
		<path d="M242.5 132V122A4 4 0 0 1 250.5 122V132" stroke={INK} strokeWidth="1.2" />
		<path d="M263 125V116A3 3 0 0 1 269 116V125ZM275 125V116A3 3 0 0 1 281 116V125ZM287 125V116A3 3 0 0 1 293 116V125Z" fill="#8FB9C6" stroke={INK} strokeWidth="1.1" />

		{/* Palm */}
		<path d="M319 132Q316 114 321 94" stroke="#7A5A3A" strokeWidth="1.8" />
		<path d="M321 94Q309 87 300 93M321 94Q313 81 304 79M321 94Q331 83 341 86M321 94Q333 92 339 100M321 94Q323 83 319 75" stroke="#5F7D52" strokeWidth="1.6" />

		{/* Wooden houses with verandas */}
		<path d="M336 132V110H374V132" fill="#E6B85C" stroke={INK} strokeWidth="1.4" />
		<path d="M332 110.5L355 97L378 110.5Z" fill="#B4532A" stroke={INK} strokeWidth="1.4" />
		<path d="M336 122h38M340 122v10M349 122v10M361 122v10M370 122v10" stroke={INK} strokeWidth="1" />
		<path d="M342 113h6v6h-6zM362 113h6v6h-6z" fill="#FBF6EC" stroke={INK} strokeWidth="1" />

		<path d="M382 132V100H426V132" fill="#8FB9C6" stroke={INK} strokeWidth="1.4" />
		<path d="M378 100.5L404 86L430 100.5Z" fill="#6B5646" stroke={INK} strokeWidth="1.4" />
		<path d="M382 115h44M387 115v-4M393 115v-4M399 115v-4M405 115v-4M411 115v-4M417 115v-4M421 115v-4" stroke={INK} strokeWidth=".9" />
		<path d="M388 103h7v7h-7zM413 103h7v7h-7zM400 120h8v12h-8z" fill="#FBF6EC" stroke={INK} strokeWidth="1" />

		<path d="M434 132V112H470V132" fill="#D48A67" stroke={INK} strokeWidth="1.4" />
		<path d="M430 112.5L452 100L474 112.5Z" fill="#E3BF86" stroke={INK} strokeWidth="1.4" />
		<path d="M440 116h6v6h-6zM456 116h6v9h-6z" fill="#FBF6EC" stroke={INK} strokeWidth="1" />

		{/* Shore, breakwater and lighthouse */}
		<path d="M-2 132H478" stroke={INK} strokeWidth="1.6" />
		<path d="M478 132Q484 130 492 131H604" stroke={SOFT} strokeWidth="3.2" />
		<path d="M609 131V111H615V131" fill="#FBF6EC" stroke={INK} strokeWidth="1.3" />
		<path d="M608 111h8l-1.5-4h-5z" fill={RED} stroke={INK} strokeWidth="1" />
		<path d="M618 106l6-3M618 110h7M606 106l-6-3" stroke={RED} strokeWidth="1.2" />

		{/* Panga at the water line */}
		<path d="M516 126H548L542 132.5H521Z" fill="#FBF6EC" stroke={INK} strokeWidth="1.3" />
		<path d="M519.5 129.2H545" stroke={RED} strokeWidth="1.3" />
		<path d="M536 126V119" stroke={INK} strokeWidth="1.2" />
	</svg>
)

export default Horizon
