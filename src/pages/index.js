import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import MainNews from "../components/main-news"
import MainNew from "../components/main-new"
import StationAside from "../components/station-aside"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"
import Pagination from "../components/pagination"
import { formatDateShort } from "../utils/dateUtils"

const IndexPage = ({ data }) => {
	const { edges } = data.allMdx
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = edges.filter(edge => !!edge.node.frontmatter.date)

	// Configuration for pagination
	const mainNewsCount = 4
	const postsPerPage = 12

	// Calculate pagination info
	const remainingPosts = news.length - mainNewsCount
	const totalPages = Math.ceil(remainingPosts / postsPerPage) + 1 // +1 for the first page

	const mainNews = news.slice(0, mainNewsCount).map((edge, i) => (
		<MainNew
			key={edge.node.id}
			featured={i === 0}
			href={edge.node.fields.slug}
			title={edge.node.frontmatter.title}
			date={formatDateShort(edge.node.frontmatter.date)}
			dateTime={edge.node.frontmatter.date}
			img={{ src: edge.node.frontmatter.image, alt: "" }}
		/>
	))

	// For page 1, show the first 12 articles after main news
	const oldNews = news.slice(mainNewsCount, mainNewsCount + postsPerPage).map(edge => (
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
		<IndexLayout>
			<div className="wrap board" data-testid="homepage-content">
				<div className="board__lead">
					<MainNews>{mainNews}</MainNews>
				</div>
				<div className="board__aside">
					<StationAside liveHtml={facebookLiveEmbedHtml} />
				</div>
				<div className="board__feed">
					<NewThumbList>{oldNews}</NewThumbList>
					{totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
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
