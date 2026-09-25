import React from "react"
import { Link } from "gatsby"

import { formatDateShort } from "../utils/dateUtils"

// A list of headlines, most recent first: date, title and a short excerpt.
// `lead` sets the first stories of the homepage a size larger.
const NewsList = ({ items, lead = false, testId }) => {
	const Heading = lead ? "h2" : "h3"

	return (
		<ol className={lead ? "news news--lead" : "news"} data-testid={testId}>
			{items.map(({ id, excerpt, fields, frontmatter }) => (
				<li key={id} className="news__item">
					<time className="meta" dateTime={frontmatter.date}>
						{formatDateShort(frontmatter.date)}
					</time>
					<div>
						<Heading className="news__title">
							<Link to={fields.slug}>{frontmatter.title}</Link>
						</Heading>
						{excerpt && <p className="news__excerpt">{excerpt}</p>}
					</div>
				</li>
			))}
		</ol>
	)
}

export default NewsList
