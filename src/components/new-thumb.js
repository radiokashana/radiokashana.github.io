import React from "react"

import Link from "gatsby-link"

export default ({href, title, img, excerpt}) =>
	<li className="w-third-l w-50-m pa1">
		<article>
			<Link className="link black" to={href}>
				<header>
					<img src={img.src} alt={img.alt} />
					<h2>{title}</h2>
				</header>
				<section dangerouslySetInnerHTML={{ __html: excerpt }} />
			</Link>
		</article>
	</li>
