import React from "react"

const MainNews = ({ children }) =>
	<section className="flex flex-column flex-row-ns flex-wrap" id="main-news" data-testid="main-news">
		{ children }
	</section>

export default MainNews
