import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

const NewTemplate = ({data, location}) => {
	const { frontmatter, body, excerpt } = data.mdx
	
	return (
		<IndexLayout customSEO>
			<SEO
				title={`${frontmatter.title} - RadioKashana`}
				pathname={location.pathname}
				desc={excerpt}
				node={data.mdx}
				banner={frontmatter.image}
				article
			/>
			<article className="cf">
				<h2>{frontmatter.title}</h2>
				<p>{frontmatter.date}</p>
				<section className="cf">
					<aside className="fr w-50 ml4 mb3">
						<img src={frontmatter.image} alt=""/>
					</aside>
					<main className="w-100 tj">
						<MDXProvider>
							{body}
						</MDXProvider>
					</main>
				</section>
				<div className="cf"></div>
			</article>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query NewById($id: String!) {
		mdx(id: { eq: $id }) {
			id
			excerpt(pruneLength: 200)
			body
			frontmatter {
				title
				date(formatString: "DD [de] MMMM [de] YYYY [a las] HH:mm [horas]", locale: "es")
				image
			}
		}
	}
`

export default NewTemplate