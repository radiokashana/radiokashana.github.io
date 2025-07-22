import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import MainNews from "../components/main-news"
import MainNew from "../components/main-new"
import Ads from "../components/ads"
import Embed from "../components/embed"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"
import Pagination from "../components/pagination"

const IndexPage = ({ data, location }) => {
	const { edges } = data.allMdx
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

	const news = edges
		.filter(edge => !!edge.node.frontmatter.date)
		.sort((a, b) => new Date(b.node.frontmatter.dateRaw) - new Date(a.node.frontmatter.dateRaw))

	// Configuration for pagination
	const mainNewsCount = 4
	const postsPerPage = 12
	
	// Calculate pagination info
	const remainingPosts = news.length - mainNewsCount
	const totalPages = Math.ceil(remainingPosts / postsPerPage) + 1 // +1 for the first page

	const mainNews = news
		.slice(0, mainNewsCount)
		.map(edge =>
			<MainNew
				key={edge.node.id}
				href={edge.node.fields.slug}
				title={edge.node.frontmatter.title}
				date={edge.node.frontmatter.date}
				img={{ src: edge.node.frontmatter.image, alt: "" }} />
		)

	// For page 1, show the first 12 articles after main news
	const oldNews = news
		.slice(mainNewsCount, mainNewsCount + postsPerPage)
		.map(edge =>
			<NewThumb
				key={edge.node.id}
				href={edge.node.fields.slug}
				title={edge.node.frontmatter.title}
				img={{ src: edge.node.frontmatter.image, alt: "" }}
				excerpt={edge.node.excerpt} />
		)

	return (
		<IndexLayout>
			{/* Floating Facebook Live embed - now positioned closer to top and bottom-right */}
			<Embed html={facebookLiveEmbedHtml} />
			
			<section data-testid="homepage-content">
				<MainNews>
					{mainNews}
				</MainNews>
				<Ads/>
				<Ads/>
				<Ads/>
				<NewThumbList>
					{oldNews}
				</NewThumbList>
				
				{totalPages > 1 && (
					<Pagination 
						currentPage={1} 
						totalPages={totalPages} 
					/>
				)}
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

export default IndexPage