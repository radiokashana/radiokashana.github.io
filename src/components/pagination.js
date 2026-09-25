import React from "react"
import { Link } from "gatsby"

const pagePath = (page, pathPrefix) => (page === 1 ? "/" : `${pathPrefix}/page/${page}`)

const Pagination = ({ currentPage, totalPages, pathPrefix = "" }) => {
	if (totalPages <= 1) return null

	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages

	return (
		<nav className="pagination" data-testid="pagination" aria-label="Páginas">
			{isFirst ? (
				<span className="pagination__step is-disabled">← Anterior</span>
			) : (
				<Link to={pagePath(currentPage - 1, pathPrefix)} className="pagination__step" rel="prev">
					← Anterior
				</Link>
			)}

			<ol className="pagination__pages">
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1
					// First, last and two pages either side of the current one
					const showPage =
						page === 1 ||
						page === totalPages ||
						Math.abs(page - currentPage) <= 2

					if (!showPage) {
						if (page === currentPage - 3 || page === currentPage + 3) {
							return <li key={page} className="pagination__gap" aria-hidden="true">…</li>
						}
						return null
					}

					return (
						<li key={page}>
							{page === currentPage ? (
								<span className="pagination__page is-current" aria-current="page">{page}</span>
							) : (
								<Link to={pagePath(page, pathPrefix)} className="pagination__page">{page}</Link>
							)}
						</li>
					)
				})}
			</ol>

			{isLast ? (
				<span className="pagination__step is-disabled">Siguiente →</span>
			) : (
				<Link to={pagePath(currentPage + 1, pathPrefix)} className="pagination__step" rel="next">
					Siguiente →
				</Link>
			)}
		</nav>
	)
}

export default Pagination
