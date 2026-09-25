import React from "react"
import { Link } from "gatsby"

const pagePath = (page) => (page === 1 ? "/" : `/page/${page}`)

// Page 1 is the homepage; older news lives at /page/2, /page/3, ...
const Pagination = ({ currentPage, totalPages }) => {
	if (totalPages <= 1) return null

	return (
		<nav className="pager" aria-label="Páginas" data-testid="pagination">
			<span>
				{currentPage > 1 && (
					<Link to={pagePath(currentPage - 1)} rel="prev">
						← Más recientes
					</Link>
				)}
			</span>
			<span className="meta">
				Página {currentPage} de {totalPages}
			</span>
			<span>
				{currentPage < totalPages && (
					<Link to={pagePath(currentPage + 1)} rel="next">
						Anteriores →
					</Link>
				)}
			</span>
		</nav>
	)
}

export default Pagination
