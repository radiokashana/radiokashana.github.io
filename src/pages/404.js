import React from "react"
import { Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NotFoundPage = ({ location }) => (
	<IndexLayout customSEO>
		<SEO title="Página no encontrada - RadioKashana" pathname={location && location.pathname} />
		<section className="lost">
			<p className="lost__code">404</p>
			<h1 className="lost__title">Esta página se la llevó la marea</h1>
			<p className="lost__text">
				No encontramos lo que buscabas. Puede que la dirección esté mal escrita o que la noticia se haya movido.
			</p>
			<Link to="/" className="button">
				Volver a las noticias
			</Link>
		</section>
	</IndexLayout>
)

export default NotFoundPage
