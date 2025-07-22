import React from "react"

const NewThumbList =({ children }) =>
	<section id="news" className="mt-12" data-testid="news-list">
		<h2 className="text-2xl font-bold text-gray-900 mb-8 px-3">Latest News</h2>
		<ul className="w-full list-none p-0 flex flex-col md:flex-row flex-wrap" data-testid="news-articles">
			{ children }
		</ul>
	</section>

export default NewThumbList
