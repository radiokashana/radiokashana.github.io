import React from "react"

// Lead stories: the first one runs large, the rest sit in a row beneath it.
const MainNews = ({ children }) => (
	<section className="lead" id="main-news" data-testid="main-news" aria-labelledby="lead-title">
		<h2 className="section-title" id="lead-title">
			<span>Lo más reciente</span>
		</h2>
		<div className="lead__grid">{children}</div>
	</section>
)

export default MainNews
