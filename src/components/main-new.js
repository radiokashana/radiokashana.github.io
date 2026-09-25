import React from "react"
import { Link } from "gatsby"

const MainNew = ({ href, title, date, dateTime, img, featured = false }) => (
	<article className={`lead-story${featured ? " lead-story--featured" : ""}`}>
		<Link to={href} className="lead-story__link">
			<div className="lead-story__media">
				<img src={img.src} alt={img.alt} loading={featured ? "eager" : "lazy"} />
			</div>
			<div className="lead-story__body">
				<h3 className="lead-story__title">{title}</h3>
				<time className="lead-story__date" dateTime={dateTime}>{date}</time>
			</div>
		</Link>
	</article>
)

export default MainNew
