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
			<article className="after:clear-both after:content-[''] after:table">
				<h2>{frontmatter.title}</h2>
				<p>{frontmatter.date}</p>
				<section className="after:clear-both after:content-[''] after:table">
					<aside className="float-right w-1/2 ml-4 mb-3">
						<img src={frontmatter.image} alt=""/>
					</aside>
					<main className="w-full text-justify">
						<MDXProvider>
							{body}
						</MDXProvider>
					</main>
				</section>
				<div className="after:clear-both after:content-[''] after:table"></div>
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
