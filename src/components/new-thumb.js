import React from "react"

import Link from "gatsby-link"

export default () =>
	<li className="fl di w-third pa1">
		<article>
			<Link className="link black" to="/news-1">
				<header>
					<img src="4.png" alt="news-1" />
					<h2>Titulo noticia</h2>
				</header>
				<section>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dui turpis, varius facilisis augue.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dui turpis, varius facilisis augue.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dui turpis, varius facilisis augue.
					</p>
				</section>
			</Link>
		</article>
	</li>
