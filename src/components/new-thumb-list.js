import React from "react"

const NewThumbList =({ children }) =>
	<section id="news" data-testid="news-list">
		<ul className="w-full list-none p-0 flex flex-col md:flex-row flex-wrap" data-testid="news-articles">
			{ children }
		</ul>
	</section>

export default NewThumbList
