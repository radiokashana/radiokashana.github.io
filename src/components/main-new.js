import React from "react"

import { Link } from "gatsby"

const MainNew = ({href, title, date, img}) => (
	<Link className="w-full md:w-1/2 float-left" to={href}>
		<article className="relative h-one-third-ar-4-3">
			<h2 className="font-bold text-2xl">{title}</h2>
			<p>{date}</p>
			<img
				className="absolute inset-0 w-full h-full -z-10"
				src={img.src}
				alt={img.alt}
			/>
		</article>
	</Link>
)

export default MainNew
