import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import SocialShare from "../components/SocialShare"
import Story, { StoryImage, toStory } from "../components/Story"
import { formatDateLong } from "../utils/dateUtils"

const NewTemplate = ({ data, location, children }) => {
	const { frontmatter, excerpt } = data.mdx
	const story = toStory(data.mdx)
	const moreStories = data.more.nodes.map(toStory)

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
			<article className="article" data-testid="article">
				{/* Edge-to-edge photo with the headline set over it, as on the homepage lead */}
				<header className="article-hero on-dark">
					<div className="article-hero__media">
						<StoryImage story={story} rendition="hero" sizes="100vw" eager />
					</div>
					<div className="story__shade" aria-hidden="true" />
					<div className="article-hero__text">
						<p className="story__meta">
							<span className="kicker">Noticias</span>
							<time dateTime={frontmatter.date}>{formatDateLong(frontmatter.date)}</time>
						</p>
						<h1 className="article-hero__title">{frontmatter.title}</h1>
					</div>
				</header>

				<div className="article-body">
					<div className="prose">{children}</div>
					<SocialShare pathname={location.pathname} title={frontmatter.title} />
				</div>
			</article>

			{moreStories.length > 0 && (
				<section className="more on-dark" aria-labelledby="sigue-leyendo">
					<div className="wrap">
						<header className="section-head">
							<h2 id="sigue-leyendo">Sigue leyendo</h2>
						</header>
						<div className="more__grid">
							{moreStories.map((item) => (
								<Story
									key={item.id}
									story={item}
									variant="overlay"
									sizes="(min-width: 1320px) 410px, (min-width: 768px) 33vw, 100vw"
									headingLevel={3}
								/>
							))}
						</div>
					</div>
				</section>
			)}
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query NewById($id: String!) {
		mdx(id: { eq: $id }) {
			...StoryFields
			frontmatter {
				imageWidth
				imageHeight
			}
		}
		more: allMdx(filter: { id: { ne: $id } }, sort: { frontmatter: { date: DESC } }, limit: 3) {
			nodes {
				...StoryFields
			}
		}
	}
`

export default NewTemplate
