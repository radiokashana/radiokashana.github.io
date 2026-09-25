import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import Rail from "../components/rail"
import Pagination from "../components/pagination"
import { StoryList, StoryRow, toStory } from "../components/stories"

// Archive pages (/page/2, /page/3, ...): the same dense list as the front
// page, headed by the page number.
const IndexTemplate = ({ data, pageContext, location }) => {
	const { currentPage, totalPages } = pageContext
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = data.allMdx.edges
		.filter(edge => !!edge.node.frontmatter.date)
		.map(toStory)

	return (
		<IndexLayout customSEO>
			{/* Each listing page gets its own canonical URL and og:url instead of the homepage's */}
			<SEO pathname={location.pathname} />

			<section data-testid="homepage-content">
				<header className="archive-head">
					<p className="kicker">Archivo</p>
					<h1 className="archive-head__title">Noticias anteriores</h1>
				</header>

				<div className="columns">
					<div className="columns__main">
						<StoryList title={`Página ${currentPage} de ${totalPages}`}>
							{news.map(story => <StoryRow key={story.id} story={story} />)}
						</StoryList>
						<Pagination currentPage={currentPage} totalPages={totalPages} />
					</div>
					<Rail liveEmbedHtml={facebookLiveEmbedHtml} />
				</div>
			</section>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexTemplateQuery($skip: Int!, $limit: Int!) {
		allMdx(
			sort: { frontmatter: { date: DESC } }
			skip: $skip
			limit: $limit
		) {
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

export default IndexTemplate
