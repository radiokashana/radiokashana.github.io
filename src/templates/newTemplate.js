import React from "react"
import { graphql, Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import SocialShare from "../components/SocialShare"
import { formatDateSpanish } from "../utils/dateUtils"
import { getObjectPosition } from "../utils/imagePosition"
import { headlineClass } from "../utils/text"

// Article page, set like a printed column: headline and dateline first, the
// photo below them, then the text at a comfortable measure.
const NewTemplate = ({ data, location, children }) => {
	const { frontmatter, excerpt } = data.mdx

	return (
		<IndexLayout customSEO>
			<SEO
				title={`${frontmatter.title} - RadioKashana`}
				pathname={location.pathname}
				desc={excerpt}
				node={data.mdx}
				banner={frontmatter.image}
				bannerWidth={frontmatter.imageWidth}
				bannerHeight={frontmatter.imageHeight}
				article
			/>
			<article className="article">
				<header className="article__header">
					<p className="kicker">Noticias</p>
					<h1 className={headlineClass("article__title", frontmatter.title)}>{frontmatter.title}</h1>
					<p className="article__byline">
						<span className="article__source">RadioKashana · 93.3 FM</span>
						<time dateTime={frontmatter.date}>{formatDateSpanish(frontmatter.date)}</time>
					</p>
				</header>

				{frontmatter.image && (
					<figure className="article__figure">
						<img
							src={frontmatter.image}
							alt={frontmatter.title}
							style={{ objectPosition: getObjectPosition(frontmatter.imagePosition) }}
						/>
					</figure>
				)}

				<div className="article__body">
					{children}
				</div>

				<footer className="article__footer">
					<SocialShare pathname={location.pathname} title={frontmatter.title} />
					<p className="article__back">
						<Link to="/">← Volver a la portada</Link>
					</p>
				</footer>
			</article>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query NewById($id: String!) {
		mdx(id: { eq: $id }) {
			id
			excerpt(pruneLength: 200)
			frontmatter {
				title
				date
				image
				imageWidth
				imageHeight
				imagePosition
			}
		}
	}
`

export default NewTemplate
