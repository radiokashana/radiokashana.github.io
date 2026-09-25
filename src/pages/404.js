import React from "react"
import { Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NotFoundPage = ({ location }) => (
	<IndexLayout customSEO>
		<SEO title="Página no encontrada - RadioKashana" pathname={location.pathname} />
		<article className="story">
			<header className="story__head">
				<span className="meta">Error 404</span>
				<h1>Página no encontrada</h1>
			</header>
			<div className="story__body">
				<p>La noticia que buscas no existe o cambió de dirección.</p>
				<p>
					<Link to="/">Volver a la portada</Link>
				</p>
			</div>
		</article>
	</IndexLayout>
)

export default NotFoundPage
