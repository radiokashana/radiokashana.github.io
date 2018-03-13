import React from "react"

import Link from "gatsby-link"

export default ({href, title, date, img}) => (
	<Link className="w-100 w-50-ns link fl" to={href}>
		<article className="relative h-one-third-ar-4-3">
			<h2>{title}</h2>
			<p>{date}</p>
			<img
				className="absolute absolute--fill w-100 h-100 z--1"
				src={img.src}
				alt={img.alt}
			/>
		</article>
	</Link>
)
