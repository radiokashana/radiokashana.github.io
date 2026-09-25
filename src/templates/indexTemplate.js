import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import NewsList from "../components/news-list"
import Pagination from "../components/pagination"

const IndexTemplate = ({ data, pageContext, location }) => {
	const { currentPage, totalPages } = pageContext
	const news = data.allMdx.nodes.filter((node) => !!node.frontmatter.date)

	return (
		<IndexLayout customSEO>
			{/* Each listing page gets its own canonical URL and og:url instead of the homepage's */}
			<SEO pathname={location.pathname} />
			<section data-testid="homepage-content">
				<h1 className="section-label meta">
					Noticias · página {currentPage}
				</h1>
				<NewsList items={news} testId="news-articles" />
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</section>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexTemplateQuery($skip: Int!, $limit: Int!) {
		allMdx(sort: { frontmatter: { date: DESC } }, skip: $skip, limit: $limit) {
			nodes {
				id
				excerpt(pruneLength: 180)
				fields {
					slug
				}
				frontmatter {
					title
					date
				}
			}
		}
	}
`

export default IndexTemplate
