import React from "react"
import { Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import { FrequencyDial, STATION } from "../components/station"

const NotFoundPage = ({ location }) => (
	<IndexLayout customSEO>
		<SEO title={`Página no encontrada - ${STATION.name}`} pathname={location ? location.pathname : undefined} />
		<section className="page-band page-band--static">
			<div className="shell page-band__inner not-found">
				<p className="eyebrow eyebrow--light">Error 404 · Sin señal</p>
				<h1 className="page-band__title">Esta página no está al aire</h1>
				<p className="page-band__meta">
					Movimos el dial y no encontramos nada en esta frecuencia. La noticia que buscas pudo cambiar de dirección.
				</p>
				<FrequencyDial className="not-found__dial" />
				<div className="hero__actions">
					<Link className="btn btn--light" to="/">
						Volver a la portada
					</Link>
					<Link className="btn btn--outline" to="/#noticias">
						Ver las noticias
					</Link>
				</div>
			</div>
		</section>
	</IndexLayout>
)

export default NotFoundPage
