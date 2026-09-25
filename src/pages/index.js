import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import Rail from "../components/rail"
import Pagination from "../components/pagination"
import { LeadStory, SecondaryStory, StoryList, StoryRow, toStory } from "../components/stories"

// Front page: one lead story, three secondary stories, then a dense list of
// the next twelve beside the live-broadcast column.
const mainNewsCount = 4
const postsPerPage = 12

const IndexPage = ({ data }) => {
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = data.allMdx.edges
		.filter(edge => !!edge.node.frontmatter.date)
		.map(toStory)

	const remainingPosts = news.length - mainNewsCount
	const totalPages = Math.ceil(remainingPosts / postsPerPage) + 1 // +1 for the first page

	const [lead, ...secondary] = news.slice(0, mainNewsCount)
	const more = news.slice(mainNewsCount, mainNewsCount + postsPerPage)

	return (
		<IndexLayout>
			<section data-testid="homepage-content">
				{lead && (
					<section className="front" data-testid="main-news">
						<h2 className="sr-only">Portada</h2>
						<LeadStory story={lead} />
						<div className="front__secondary">
							{secondary.map((story, i) => (
								<SecondaryStory key={story.id} story={story} withPhoto={i === 0} />
							))}
						</div>
					</section>
				)}

				<div className="columns">
					<div className="columns__main">
						<StoryList title="Más noticias">
							{more.map(story => <StoryRow key={story.id} story={story} />)}
						</StoryList>
						<Pagination currentPage={1} totalPages={totalPages} />
					</div>
					<Rail liveEmbedHtml={facebookLiveEmbedHtml} />
				</div>
			</section>
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
