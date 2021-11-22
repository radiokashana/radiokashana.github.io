import React from "react"

import { graphql } from "gatsby"

import { MDXRenderer } from "gatsby-plugin-mdx"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NewTemplate = ({data, location}) =>
	<IndexLayout customSEO>
		<SEO
			title={data.mdx.frontmatter.title.text}
			pathname={location.pathname}
			desc={data.mdx.excerpt}
			node={data.mdx}
			banner={data.mdx.frontmatter.image}
			article
		/>
		<article>
			<h2>{data.mdx.frontmatter.title}</h2>
			<p>{data.mdx.frontmatter.date}</p>
			<section>
				<aside className="fr w-50 ml4 mb3">
					<img src={data.mdx.frontmatter.image} alt=""/>
				</aside>
				<main className="w-100 tj">
					<MDXRenderer>{data.mdx.body}</MDXRenderer>
				</main>
			</section>
		</article>
	</IndexLayout>

export const pageQuery = graphql`
	query NewById($id: String!) {
		mdx(id: { eq: $id }) {
			id
			excerpt(pruneLength: 200)
			body
			frontmatter {
				title
				date(formatString: "DD [de] MMMM [de] YYYY", locale: "es")
				image
			}
		}
	}
`

export default NewTemplate

/* previous impl
export default ({data}) => {
	const { markdownRemark } = data;
	const { html, fields, frontmatter } = markdownRemark;
	return (
		<article>
			<h2>{frontmatter.title}</h2>
			<p>{frontmatter.date}</p>
			<section>
				<aside className="fr w-50 ml4 mb3">
					<img src={frontmatter.image}/>
				</aside>
				<main className="w-100 tj" dangerouslySetInnerHTML={{ __html: html }}/>
			</section>
		</article>
	)
}

export const pageQuery = graphql`
	query NewById($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				title
				date(formatString: "DD [de] MMMM [de] YYYY", locale: "es")
				image
			}
		}
	}
`
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}

*/
