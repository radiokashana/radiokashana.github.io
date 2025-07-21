import React from "react"

import { Link } from "gatsby"

const NewThumb = ({href, title, img, excerpt}) =>
	<li className="lg:w-1/3 md:w-1/2 p-3">
		<Link to={href} className="block h-full">
			<article className="news-thumb-card">
				<div className="overflow-hidden">
					<img src={img.src} alt={img.alt} />
				</div>
				<div className="content">
					<header>
						<h2>{title}</h2>
					</header>
					<section className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
				</div>
			</article>
		</Link>
	</li>

export default NewThumb
