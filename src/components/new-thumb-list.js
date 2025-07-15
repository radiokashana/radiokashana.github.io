import React from "react"

const NewThumbList =({ children }) =>
	<section id="news" data-testid="news-list">
		<ul className="w-100 list pa0 flex flex-column flex-row-ns flex-wrap" data-testid="news-articles">
			{ children }
		</ul>
	</section>

export default NewThumbList
