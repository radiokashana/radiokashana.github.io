import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import Ads from "../components/ads"
import Embed from "../components/embed"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"
import Pagination from "../components/pagination"

const IndexTemplate = ({ data, pageContext }) => {
	const { currentPage, totalPages } = pageContext
	const { edges } = data.allMdx
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = edges
		.filter(edge => !!edge.node.frontmatter.date)
		.sort((a, b) => new Date(b.node.frontmatter.dateRaw) - new Date(a.node.frontmatter.dateRaw))

	const newsCards = news.map(edge =>
		<NewThumb
			key={edge.node.id}
			href={edge.node.fields.slug}
			title={edge.node.frontmatter.title}
			img={{ src: edge.node.frontmatter.image, alt: "" }}
			excerpt={edge.node.excerpt} />
	)

	return (
		<IndexLayout>
			{/* Floating Facebook Live embed */}
			<Embed html={facebookLiveEmbedHtml} />
			
			<section data-testid="homepage-content">
				{/* Ads are the first thing shown on pages 2+ */}
				<Ads/>
				<Ads/>
				<Ads/>
				
				<NewThumbList>
					{newsCards}
				</NewThumbList>

				<Pagination 
					currentPage={currentPage} 
					totalPages={totalPages} 
				/>
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
						date(formatString: "DD [de] MMMM [de] YYYY", locale: "es")
						dateRaw: date
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