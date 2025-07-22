import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, totalPages, pathPrefix = "" }) => {
	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages
	const prevPage = currentPage - 1 === 1 ? "" : `${pathPrefix}/page/${currentPage - 1}`
	const nextPage = `${pathPrefix}/page/${currentPage + 1}`

	if (totalPages <= 1) return null

	return (
		<nav className="flex justify-center items-center space-x-4 mt-12 mb-8" data-testid="pagination">
			{/* Previous page link */}
			{!isFirst && (
				<Link
					to={currentPage - 1 === 1 ? "/" : prevPage}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
				>
					← Anterior
				</Link>
			)}

			{/* Page numbers */}
			<div className="flex space-x-2">
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1
					const pagePath = page === 1 ? "/" : `${pathPrefix}/page/${page}`
					const isCurrentPage = page === currentPage

					// Show page numbers with some logic to avoid too many
					const showPage = 
						page === 1 || 
						page === totalPages || 
						Math.abs(page - currentPage) <= 2

					if (!showPage) {
						// Show ellipsis for gaps
						if (page === currentPage - 3 || page === currentPage + 3) {
							return <span key={page} className="px-2">...</span>
						}
						return null
					}

					return (
						<Link
							key={page}
							to={pagePath}
							className={`px-3 py-2 rounded transition-colors ${
								isCurrentPage
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{page}
						</Link>
					)
				})}
			</div>

			{/* Next page link */}
			{!isLast && (
				<Link
					to={nextPage}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
				>
					Siguiente →
				</Link>
			)}
		</nav>
	)
}

export default Pagination