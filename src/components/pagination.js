import React from "react"
import { Link } from "gatsby"

const pagePath = (page, pathPrefix) => (page === 1 ? "/" : `${pathPrefix}/page/${page}`)

const Pagination = ({ currentPage, totalPages, pathPrefix = "" }) => {
	if (totalPages <= 1) return null

	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages

	return (
		<nav className="pager" data-testid="pagination" aria-label="Páginas de noticias">
			{!isFirst && (
				<Link to={pagePath(currentPage - 1, pathPrefix)} className="pager__step" rel="prev">
					← Anterior
				</Link>
			)}

			<div className="pager__pages">
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1
					const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2

					if (!showPage) {
						if (page === currentPage - 3 || page === currentPage + 3) {
							return (
								<span key={page} className="pager__gap" aria-hidden="true">
									…
								</span>
							)
						}
						return null
					}

					return (
						<Link
							key={page}
							to={pagePath(page, pathPrefix)}
							className={page === currentPage ? "is-current" : undefined}
							aria-current={page === currentPage ? "page" : undefined}
						>
							{page}
						</Link>
					)
				})}
			</div>

			{!isLast && (
				<Link to={pagePath(currentPage + 1, pathPrefix)} className="pager__step" rel="next">
					Siguiente →
				</Link>
			)}
		</nav>
	)
}

export default Pagination
