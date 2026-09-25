import React from "react"
import { Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NotFoundPage = ({ location }) => (
	<IndexLayout customSEO>
		<SEO title="Página no encontrada - RadioKashana" pathname={location && location.pathname} />
		<section className="not-found">
			<p className="kicker">Error 404</p>
			<h1 className="not-found__title">Esta página no está en nuestra edición</h1>
			<p className="not-found__text">
				Es posible que la noticia haya cambiado de dirección o que el enlace esté incompleto.
			</p>
			<p className="not-found__links">
				<Link to="/">Ir a la portada</Link>
				<Link to="/page/2/">Ver noticias anteriores</Link>
			</p>
		</section>
	</IndexLayout>
)

export default NotFoundPage
