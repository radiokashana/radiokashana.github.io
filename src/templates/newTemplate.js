import React from "react"

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
