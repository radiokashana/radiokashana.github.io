import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import SocialShare from "../components/SocialShare"
import { formatDateSpanish } from "../utils/dateUtils"

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
					<time className="meta" dateTime={frontmatter.date}>
						{formatDateSpanish(frontmatter.date)}
					</time>
					<h1>{frontmatter.title}</h1>
				</header>
				{frontmatter.image && (
					<img
						className="story__image"
						src={frontmatter.image}
						alt=""
						width={frontmatter.imageWidth || undefined}
						height={frontmatter.imageHeight || undefined}
						fetchpriority="high"
						style={{ objectPosition: getObjectPosition(frontmatter.imagePosition) }}
					/>
				)}
				<div className="story__body">{children}</div>
				<SocialShare pathname={location.pathname} title={frontmatter.title} />
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
