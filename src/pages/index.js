import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import OnAirHero from "../components/OnAirHero"
import StationCard from "../components/StationCard"
import { LeadStories, NewsFeed, toStory } from "../components/news"
import Pagination from "../components/pagination"

// Keep in sync with gatsby-node.js, which builds /page/2 onwards.
const mainNewsCount = 4
const postsPerPage = 12

const IndexPage = ({ data }) => {
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml
	const news = data.allMdx.edges.filter(edge => !!edge.node.frontmatter.date).map(toStory)

	const remainingPosts = news.length - mainNewsCount
	const totalPages = Math.ceil(remainingPosts / postsPerPage) + 1

	const mainNews = news.slice(0, mainNewsCount)
	const moreNews = news.slice(mainNewsCount, mainNewsCount + postsPerPage)

	return (
		<IndexLayout inlinePlayer>
			<OnAirHero embedHtml={facebookLiveEmbedHtml} />

			<div className="news-page" data-testid="homepage-content">
				<LeadStories stories={mainNews} />

				<div className="shell news-columns">
					<div className="news-columns__main">
						<NewsFeed stories={moreNews} eyebrow="En la redacción" title="Más noticias" />
						{totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
					</div>
					<div className="news-columns__aside">
						<StationCard />
					</div>
				</div>
			</div>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		allMdx(sort: { frontmatter: { date: DESC } }) {
			edges {
				node {
					id
					excerpt(pruneLength: 200)
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
