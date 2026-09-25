import React from "react"

const NewThumbList = ({ title = "Más noticias", children }) => (
	<section id="news" className="feed" data-testid="news-list" aria-labelledby="feed-title">
		<h2 className="section-title" id="feed-title">
			<span>{title}</span>
		</h2>
		<ul className="feed__list" data-testid="news-articles">
			{children}
		</ul>
	</section>
)

export default NewThumbList
