import React from "react"

const NewThumbList =({ children }) =>
	<section id="news">
		<ul className="w-100 list pa0 flex flex-column flex-row-ns flex-wrap">
			{ children }
		</ul>
	</section>

export default NewThumbList
