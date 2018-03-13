import React from "react"
import Link from "gatsby-link"

import MainNews from "../components/main-news"
import MainNew from "../components/main-new"
import Ads from "../components/ads"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"

export default ({ data: { allMarkdownRemark: { edges } } }) => {
	const news = edges
		.filter(edge => !!edge.node.frontmatter.date)

	const mainNews = news
		.slice(0, 4)
		.map(edge =>
			<MainNew
				key={edge.node.id}
				href={edge.node.fields.slug}
				title={edge.node.frontmatter.title}
				date={edge.node.frontmatter.date}
				img={{ src: edge.node.frontmatter.image, alt: "" }} />
		)

	const oldNews = news
		.slice(4)
		.map(edge =>
			<NewThumb
				href={edge.node.fields.slug}
				title={edge.node.frontmatter.title}
				img={{ src: edge.node.frontmatter.image, alt: "" }}
				excerpt={edge.node.excerpt} />
		)

	return (
		<section>
			<MainNews>
				{ mainNews }
			</MainNews>
			<Ads/>
			<NewThumbList>
				{ oldNews }
			</NewThumbList>
		</section>
	)
}

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "DD [de] MMMM [de] YYYY", locale: "es")
						image
					}
				}
			}
		}
	}
`
