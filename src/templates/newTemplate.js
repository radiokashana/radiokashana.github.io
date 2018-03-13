import React from "react"

export default ({data}) => {
	const { markdownRemark } = data;
	const { html, fields, frontmatter } = markdownRemark;
	return (
		<article>
			<h2>{frontmatter.title}</h2>
			<p>{frontmatter.date}</p>
			<section>
				<aside className="fl w-50 w-25-ns mr4">
					<img src={frontmatter.image}/>
				</aside>
				<main className="w-100" dangerouslySetInnerHTML={{ __html: html }}/>
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
