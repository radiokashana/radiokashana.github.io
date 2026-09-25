import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, totalPages, pathPrefix = "" }) => {
	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages
	const pathFor = (page) => (page === 1 ? "/" : `${pathPrefix}/page/${page}`)

	if (totalPages <= 1) return null

	return (
		<nav className="pager" data-testid="pagination" aria-label="Páginas de noticias">
			{isFirst ? (
				<span className="pager__step pager__step--off" aria-hidden="true">← Anterior</span>
			) : (
				<Link to={pathFor(currentPage - 1)} className="pager__step" rel="prev">
					← Anterior
				</Link>
			)}

			<ol className="pager__pages">
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1
					const distance = Math.abs(page - currentPage)
					const isEdge = page === 1 || page === totalPages

					// Show the first and last pages and two either side of the current one
					if (!isEdge && distance > 2) {
						return page === currentPage - 3 || page === currentPage + 3 ? (
							<li key={page} className="pager__gap" aria-hidden="true">…</li>
						) : null
					}

					// On phones only the nearest neighbours stay visible
					const far = !isEdge && distance > 1 ? " pager__item--far" : ""
					return (
						<li key={page} className={`pager__item${far}`}>
							{page === currentPage ? (
								<span className="pager__num pager__num--current" aria-current="page">{page}</span>
							) : (
								<Link to={pathFor(page)} className="pager__num" aria-label={`Página ${page}`}>
									{page}
								</Link>
							)}
						</li>
					)
				})}
			</ol>

			{isLast ? (
				<span className="pager__step pager__step--off" aria-hidden="true">Siguiente →</span>
			) : (
				<Link to={pathFor(currentPage + 1)} className="pager__step pager__step--next" rel="next">
					Siguiente →
				</Link>
			)}
		</nav>
	)
}

export default Pagination
