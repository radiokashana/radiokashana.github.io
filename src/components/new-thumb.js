import React from "react"

import { Link } from "gatsby"

const NewThumb = ({href, title, img, excerpt}) =>
	<li className="lg:w-1/3 md:w-1/2 p-1 float-left">
		<article>
			<Link className="text-black" to={href}>
				<header>
					<img src={img.src} alt={img.alt} />
					<h2>{title}</h2>
				</header>
				<section dangerouslySetInnerHTML={{ __html: excerpt }} />
			</Link>
		</article>
	</li>

export default NewThumb
