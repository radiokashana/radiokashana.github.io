import React from "react"
import { Link } from "gatsby"

const NewThumb = ({ href, title, img, excerpt, date, dateTime }) => (
	<li className="feed-item">
		<Link to={href} className="feed-item__link">
			<div className="feed-item__text">
				{date && (
					<time className="feed-item__date" dateTime={dateTime}>
						{date}
					</time>
				)}
				<h3 className="feed-item__title">{title}</h3>
				{excerpt && <p className="feed-item__excerpt">{excerpt}</p>}
			</div>
			<div className="feed-item__media">
				<img src={img.src} alt={img.alt} loading="lazy" />
			</div>
		</Link>
	</li>
)

export default NewThumb
