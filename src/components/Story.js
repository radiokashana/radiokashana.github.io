import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { formatDateShort } from "../utils/dateUtils"
import { getObjectPosition, withSizes } from "../utils/imageUtils"

// Everything a story card needs. Two responsive renditions of every photo:
// `hero` for full-bleed and large mosaic slots, `card` for the smaller ones.
// Both are FULL_WIDTH so the browser picks a width from `sizes` (set per slot
// in <Story>); the dominant colour paints the slot while the photo loads.
export const query = graphql`
	fragment StoryFields on Mdx {
		id
		excerpt(pruneLength: 180)
		fields {
			slug
		}
		frontmatter {
			title
			date
			image
			imagePosition
			cover {
				childImageSharp {
					hero: gatsbyImageData(
						layout: FULL_WIDTH
						breakpoints: [640, 1024, 1440, 1920]
						quality: 72
						placeholder: DOMINANT_COLOR
					)
					card: gatsbyImageData(
						layout: FULL_WIDTH
						breakpoints: [400, 640, 960]
						quality: 70
						placeholder: DOMINANT_COLOR
					)
				}
			}
		}
	}
`

/** Flattens an Mdx node (queried with ...StoryFields) into card props. */
export const toStory = (node) => {
	const sharp = node.frontmatter.cover && node.frontmatter.cover.childImageSharp
	return {
		id: node.id,
		href: node.fields.slug,
		title: node.frontmatter.title,
		date: node.frontmatter.date,
		excerpt: node.excerpt,
		src: node.frontmatter.image,
		position: getObjectPosition(node.frontmatter.imagePosition),
		hero: (sharp && sharp.hero) || null,
		card: (sharp && sharp.card) || null,
	}
}

/**
 * The photo of a story. Falls back to the original file (still lazy loaded)
 * for the rare image sharp cannot process, e.g. a GIF.
 */
export const StoryImage = ({ story, rendition = "card", sizes, eager = false }) => {
	const data = rendition === "hero" ? story.hero || story.card : story.card || story.hero
	const loading = eager ? "eager" : "lazy"

	if (data) {
		return (
			<GatsbyImage
				image={withSizes(data, sizes)}
				alt=""
				loading={loading}
				objectPosition={story.position}
			/>
		)
	}

	return (
		<img
			src={story.src}
			alt=""
			loading={loading}
			decoding="async"
			style={{ objectFit: "cover", objectPosition: story.position }}
		/>
	)
}

/**
 * One story, in one of four treatments:
 * - lead:    full-bleed photo, huge headline over it (homepage opener)
 * - overlay: photo fills the tile, headline on a gradient at the bottom
 * - feature: big photo with the headline and dek tightly paired beside it
 * - paired:  photo on top, headline directly under it
 */
const Story = ({
	story,
	variant = "paired",
	sizes = "100vw",
	rendition,
	eager = false,
	kicker,
	dek = false,
	flipped = false,
	headingLevel = 2,
}) => {
	const Heading = `h${headingLevel}`
	const useHero = rendition ? rendition === "hero" : variant === "lead" || variant === "feature"
	const overlaid = variant === "lead" || variant === "overlay"
	// Headlines run from four words to three lines of officialese; long ones
	// step down a size so they never swallow the photo.
	const long = story.title.length > 72

	return (
		<article
			className={`story story--${variant}${flipped ? " is-flipped" : ""}${long ? " is-long" : ""}`}
			data-testid={`story-${variant}`}
		>
			<Link to={story.href} className="story__link">
				<div className="story__media">
					<StoryImage story={story} rendition={useHero ? "hero" : "card"} sizes={sizes} eager={eager} />
				</div>
				{overlaid && <div className="story__shade" aria-hidden="true" />}
				<div className="story__text">
					<p className="story__meta">
						{kicker && <span className="kicker">{kicker}</span>}
						<time dateTime={story.date}>{formatDateShort(story.date)}</time>
					</p>
					<Heading className="story__title">{story.title}</Heading>
					{dek && story.excerpt && <p className="story__dek">{story.excerpt}</p>}
					{variant === "feature" && <span className="story__more">Leer la nota</span>}
				</div>
			</Link>
		</article>
	)
}

export default Story
