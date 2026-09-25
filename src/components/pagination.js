import React from "react"
import { Link } from "gatsby"

const pagePath = (page, pathPrefix) => (page === 1 ? "/" : `${pathPrefix}/page/${page}`)

const Pagination = ({ currentPage, totalPages, pathPrefix = "" }) => {
	if (totalPages <= 1) return null

	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages

	return (
		<nav className="pager" aria-label="Páginas de noticias" data-testid="pagination">
			{!isFirst ? (
				<Link to={pagePath(currentPage - 1, pathPrefix)} className="pager__step" rel="prev">
					<span aria-hidden="true">←</span> Anterior
				</Link>
			) : (
				<span className="pager__step is-disabled" aria-hidden="true">
					<span>←</span> Anterior
				</span>
			)}

			<ol className="pager__pages">
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1
					const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2

					if (!showPage) {
						if (page === currentPage - 3 || page === currentPage + 3) {
							return (
								<li key={page} className="pager__gap" aria-hidden="true">
									…
								</li>
							)
						}
						return null
					}

					const isCurrent = page === currentPage
					return (
						<li key={page}>
							<Link
								to={pagePath(page, pathPrefix)}
								className={`pager__page ${isCurrent ? "is-current" : ""}`}
								aria-current={isCurrent ? "page" : undefined}
								aria-label={`Página ${page}`}
							>
								{page}
							</Link>
						</li>
					)
				})}
			</ol>

			{!isLast ? (
				<Link to={pagePath(currentPage + 1, pathPrefix)} className="pager__step" rel="next">
					Siguiente <span aria-hidden="true">→</span>
				</Link>
			) : (
				<span className="pager__step is-disabled" aria-hidden="true">
					Siguiente <span>→</span>
				</span>
			)}
		</nav>
	)
}

export default Pagination
