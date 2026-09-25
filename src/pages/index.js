import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import Story, { toStory } from "../components/Story"
import Mosaic from "../components/Mosaic"
import Embed from "../components/embed"
import Pagination from "../components/pagination"

// Page 1 shows the 4 main stories plus 12 more; gatsby-node.js paginates the
// rest with the same numbers.
const MAIN_NEWS_COUNT = 4
const POSTS_PER_PAGE = 12

const IndexPage = ({ data }) => {
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml
	const news = data.allMdx.nodes.filter((node) => !!node.frontmatter.date).map(toStory)

	// Only the first page's stories are queried (their image data is heavy);
	// the page count comes from the total, exactly as in gatsby-node.js.
	const remainingPosts = data.all.totalCount - MAIN_NEWS_COUNT
	const totalPages = Math.ceil(remainingPosts / POSTS_PER_PAGE) + 1

	const [lead, ...second] = news.slice(0, MAIN_NEWS_COUNT)
	const more = news.slice(MAIN_NEWS_COUNT, MAIN_NEWS_COUNT + POSTS_PER_PAGE)

	return (
		<IndexLayout>
			<div data-testid="homepage-content">
				<section className="front on-dark" data-testid="main-news" aria-label="Lo último">
					{lead && (
						<Story story={lead} variant="lead" kicker="Lo último" dek eager sizes="100vw" headingLevel={1} />
					)}
					<div className="wrap">
						<div className="front__rest">
							{second.map((story, i) =>
								i === 0 ? (
									<Story
										key={story.id}
										story={story}
										variant="overlay"
										rendition="hero"
										sizes="(min-width: 1320px) 640px, (min-width: 1024px) 50vw, 100vw"
									/>
								) : (
									<Story
										key={story.id}
										story={story}
										variant="paired"
										sizes="(min-width: 1320px) 310px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
									/>
								)
							)}
						</div>
					</div>
				</section>

				<Embed html={facebookLiveEmbedHtml} />

				<section className="wrap section" id="news" data-testid="news-list" aria-labelledby="mas-noticias">
					<header className="section-head">
						<h2 id="mas-noticias">Más noticias</h2>
					</header>
					<Mosaic stories={more} />
					{totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
				</section>
			</div>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		allMdx(sort: { frontmatter: { date: DESC } }, limit: 16) {
			nodes {
				...StoryFields
			}
		}
		all: allMdx {
			totalCount
		}
		allDataJson {
			edges {
				node {
					facebookLiveEmbedHtml
				}
			}
		}
	}
`

export default IndexPage
