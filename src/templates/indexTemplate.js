import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import StationAside from "../components/station-aside"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"
import Pagination from "../components/pagination"
import { formatDateShort } from "../utils/dateUtils"

const IndexTemplate = ({ data, pageContext, location }) => {
	const { currentPage, totalPages } = pageContext
	const { edges } = data.allMdx
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = edges.filter(edge => !!edge.node.frontmatter.date)

	const newsCards = news.map(edge => (
		<NewThumb
			key={edge.node.id}
			href={edge.node.fields.slug}
			title={edge.node.frontmatter.title}
			date={formatDateShort(edge.node.frontmatter.date)}
			dateTime={edge.node.frontmatter.date}
			img={{ src: edge.node.frontmatter.image, alt: "" }}
			excerpt={edge.node.excerpt}
		/>
	))

	return (
		<IndexLayout customSEO>
			{/* Each listing page gets its own canonical URL and og:url instead of the homepage's */}
			<SEO pathname={location.pathname} />

			<div className="wrap board board--archive" data-testid="homepage-content">
				<div className="board__lead">
					<p className="archive-head">
						Página {currentPage} de {totalPages}
					</p>
				</div>
				<div className="board__aside">
					<StationAside liveHtml={facebookLiveEmbedHtml} />
				</div>
				<div className="board__feed">
					<NewThumbList title="Noticias anteriores">{newsCards}</NewThumbList>
					<Pagination currentPage={currentPage} totalPages={totalPages} />
				</div>
			</div>
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
