import React from "react"

import { Link } from "gatsby"

const NewThumb = ({href, title, img, excerpt}) =>
	<li className="w-33-l w-50-m pa1 fl">
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

export default NewThumb
