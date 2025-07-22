import React from "react"

const MainNews = ({ children }) =>
	<section className="flex flex-col md:flex-row flex-wrap mb-8" id="main-news" data-testid="main-news">
		{ children }
	</section>

export default MainNews
