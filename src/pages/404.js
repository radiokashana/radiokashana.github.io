import React from "react"
import { Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NotFoundPage = () => (
	<IndexLayout customSEO>
		<SEO title="Página no encontrada - RadioKashana" pathname="/404/" />
		<section className="not-found on-dark">
			<div className="wrap">
				<p className="not-found__code" aria-hidden="true">
					404
				</p>
				<h1 className="not-found__title">No encontramos esta página</h1>
				<p className="not-found__text">
					Puede que la noticia haya cambiado de dirección o que el enlace esté incompleto.
				</p>
				<Link to="/" className="live__button">
					Volver a la portada
				</Link>
			</div>
		</section>
	</IndexLayout>
)

export default NotFoundPage
