import React from "react"

import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import MainNews from "../components/main-news"
import MainNew from "../components/main-new"
import Ads from "../components/ads"
import Embed from "../components/embed"
import NewThumbList from "../components/new-thumb-list"
import NewThumb from "../components/new-thumb"

const IndexPage = ({ data, location }) => {
	const { edges } = data.allMdx
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml

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
				key={edge.node.id}
				href={edge.node.fields.slug}
				title={edge.node.frontmatter.title}
				img={{ src: edge.node.frontmatter.image, alt: "" }}
				excerpt={edge.node.excerpt} />
		)

	return (
		<IndexLayout>
			<section>
				<MainNews>
					{ mainNews }
				</MainNews>
				<Ads/>
				<Embed html={ facebookLiveEmbedHtml }/>
				<Ads/>
				<NewThumbList>
					{ oldNews }
				</NewThumbList>
			</section>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexQ {
		allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
