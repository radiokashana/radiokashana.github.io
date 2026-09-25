import React from "react"
import { graphql, Link } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import SocialShare from "../components/SocialShare"
import { ListenButton } from "../components/live"
import { SectionHead, StoryDate, StoryImage, toStory } from "../components/news"
import { Emblem, Equalizer, LiveDot, STATION } from "../components/station"
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
	const moreNews = data.more.edges.map(toStory)

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
				<header className="shell story__head">
					<nav className="crumbs" aria-label="Ruta">
						<Link to="/">Portada</Link>
						<span aria-hidden="true">/</span>
						<Link to="/#noticias">Noticias</Link>
					</nav>
					<h1 className="story__title">{frontmatter.title}</h1>
					<p className="story__meta">
						<span className="story__byline">
							<Emblem className="story__byline-emblem" />
							{STATION.name} · {STATION.frequency} {STATION.band}
						</span>
						<time dateTime={frontmatter.date}>{formatDateSpanish(frontmatter.date)}</time>
					</p>
				</header>

				{frontmatter.image && (
					<figure className="shell story__hero">
						<img
							src={frontmatter.image}
							alt={frontmatter.title}
							style={{ objectPosition: getObjectPosition(frontmatter?.imagePosition) }}
						/>
					</figure>
				)}

				<div className="shell story__grid">
					<div className="story__body">
						<div className="article-content">{children}</div>
						<SocialShare pathname={location.pathname} title={frontmatter.title} />
					</div>
					<aside className="story__aside" aria-label="Transmisión en vivo">
						<div className="mini-live">
							<p className="mini-live__head">
								<span className="on-air-tag">
									<LiveDot /> Al aire
								</span>
								<Equalizer />
							</p>
							<p className="mini-live__freq">
								{STATION.frequency}
								<small>{STATION.band}</small>
							</p>
							<p className="mini-live__text">Escucha {STATION.name} mientras lees. La transmisión sigue aunque cambies de nota.</p>
							<ListenButton />
						</div>
					</aside>
				</div>
			</article>

			{moreNews.length > 0 && (
				<section className="shell more-news" aria-labelledby="more-title">
					<SectionHead id="more-title" eyebrow="Sigue informado" title="Más de la estación" />
					<ul className="follow-ups">
						{moreNews.map(story => (
							<li key={story.id}>
								<Link to={story.href} className="follow-up">
									<StoryImage story={story} className="follow-up__img" />
									<StoryDate date={story.date} />
									<h3 className="follow-up__title">{story.title}</h3>
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}
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
		more: allMdx(
			sort: { frontmatter: { date: DESC } }
			filter: { id: { ne: $id }, frontmatter: { date: { ne: null } } }
			limit: 3
		) {
			edges {
				node {
					id
					excerpt(pruneLength: 120)
					fields {
						slug
					}
					frontmatter {
						title
						date
						image
						imagePosition
					}
				}
			}
		}
	}
`

export default NewTemplate
