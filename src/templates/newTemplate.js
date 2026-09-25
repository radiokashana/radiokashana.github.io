import React from "react"
import { graphql, Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import SocialShare from "../components/SocialShare"
import { formatDateLong } from "../utils/dateUtils"
import { STATION } from "../utils/station"

// Function to convert imagePosition to CSS object-position value
const getObjectPosition = (position = 'center') => {
	// Handle all edge cases: undefined, null, empty string, invalid values
	if (!position || typeof position !== 'string' || position.trim() === '') {
		// Log in development for debugging
		if (process.env.NODE_ENV === 'development' && position !== undefined) {
			console.warn('Invalid imagePosition value:', position, '- defaulting to center')
		}
		return 'center center'
	}

	const normalizedPosition = position.toLowerCase().trim()

	const positionMap = {
		'center': 'center center',
		'top': 'center top',
		'bottom': 'center bottom',
		'left': 'left center',
		'right': 'right center',
		'top-left': 'left top',
		'top-right': 'right top',
		'bottom-left': 'left bottom',
		'bottom-right': 'right bottom'
	}

	// Check if position exists in map
	const result = positionMap[normalizedPosition]
	if (!result && process.env.NODE_ENV === 'development') {
		console.warn('Unknown imagePosition value:', position, '- defaulting to center')
	}

	// Return mapped position or default to center
	return result || 'center center'
}

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
			<article className="story">
				<header className="story__head">
					<Link to="/" className="story__back">
						← Todas las noticias
					</Link>
					<p className="story__kicker">RadioKashana · 93.3 FM</p>
					<h1 className="story__title">{frontmatter.title}</h1>
					<p className="story__meta">
						<time dateTime={frontmatter.date}>{formatDateLong(frontmatter.date)}</time>
					</p>
				</header>

				{frontmatter.image && (
					<figure className="story__figure">
						<img
							src={frontmatter.image}
							alt={frontmatter.title}
							width={frontmatter.imageWidth || undefined}
							height={frontmatter.imageHeight || undefined}
							style={{ objectPosition: getObjectPosition(frontmatter?.imagePosition) }}
						/>
					</figure>
				)}

				<div className="story__body article-content">{children}</div>

				<div className="story__share">
					<SocialShare pathname={location.pathname} title={frontmatter.title} />
				</div>

				<aside className="signoff" aria-label="Escúchanos">
					<div className="signoff__card">
						<svg className="signoff__waves" viewBox="0 0 48 48" aria-hidden="true">
							<circle cx="12" cy="36" r="4" />
							<path d="M12 22a14 14 0 0114 14M12 12a24 24 0 0124 24M12 2a34 34 0 0134 34" />
						</svg>
						<div className="signoff__text">
							<p className="signoff__title">Escúchanos en el 93.3 FM</p>
							<p>
								Transmitimos desde el punto más alto de Santa Rosalía. ¿Tienes algo que contar? Llama a cabina al{" "}
								<a href={STATION.phoneHref}>{STATION.phone}</a>.
							</p>
							<a className="signoff__cta" href="/#en-vivo">
								<span className="live-dot" aria-hidden="true" /> Ver la transmisión en vivo
							</a>
						</div>
					</div>
				</aside>
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
