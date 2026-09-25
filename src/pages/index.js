import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import NewsList from "../components/news-list"
import Pagination from "../components/pagination"

// Must match gatsby-node.js: page 1 shows 4 lead stories + 12 more,
// /page/2 onwards show 12 each.
const LEAD_COUNT = 4
const PER_PAGE = 12

const IndexPage = ({ data }) => {
	const { nodes, totalCount } = data.allMdx
	const news = nodes.filter((node) => !!node.frontmatter.date)
	const totalPages = Math.ceil((totalCount - LEAD_COUNT) / PER_PAGE) + 1

	return (
		<IndexLayout>
			<section data-testid="homepage-content">
				<NewsList items={news.slice(0, LEAD_COUNT)} lead testId="main-news" />
				<h2 className="section-label meta">Más noticias</h2>
				<NewsList items={news.slice(LEAD_COUNT)} testId="news-articles" />
				<Pagination currentPage={1} totalPages={totalPages} />
			</section>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		allMdx(sort: { frontmatter: { date: DESC } }, limit: 16) {
			totalCount
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

export default IndexPage
