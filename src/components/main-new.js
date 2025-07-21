import React from "react"

import { Link } from "gatsby"

const MainNew = ({href, title, date, img}) => (
	<Link className="w-full md:w-1/2 p-3" to={href}>
		<article className="relative h-one-third-ar-4-3 overflow-hidden rounded-xl">
			<img
				className="absolute inset-0 w-full h-full object-cover"
				src={img.src}
				alt={img.alt}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
			<div className="absolute bottom-0 left-0 right-0 p-6">
				<h2 className="text-white font-bold text-xl md:text-2xl mb-2 leading-tight">{title}</h2>
				<p className="text-white/90 text-sm font-medium">{date}</p>
			</div>
		</article>
	</Link>
)

export default MainNew
