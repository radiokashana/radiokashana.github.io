import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

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

const NewTemplate = ({data, location, children}) => {
	const { frontmatter, excerpt } = data.mdx

	return (
		<IndexLayout customSEO>
			<SEO
				title={`${frontmatter.title} - RadioKashana`}
				pathname={location.pathname}
				desc={excerpt}
				node={data.mdx}
				banner={frontmatter.image}
				article
			/>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					{/* Article Header */}
					<div className="relative">
						<img
							src={frontmatter.image}
							alt={frontmatter.title}
							className="w-full h-72 md:h-80 lg:h-96 object-cover"
							style={{ objectPosition: getObjectPosition(frontmatter?.imagePosition) }}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<time className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
								{frontmatter.date}
							</time>
							<h1 className="text-2xl md:text-4xl font-bold leading-tight">
								{frontmatter.title}
							</h1>
						</div>
					</div>

					{/* Article Content */}
					<div className="p-6 md:p-8">
						<div className="prose prose-gray max-w-none">
							{children}
						</div>
					</div>
				</article>
			</div>
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
				date(formatString: "DD [de] MMMM [de] YYYY [a las] HH:mm [horas]", locale: "es")
				image
				imagePosition
			}
		}
	}
`

export default NewTemplate
