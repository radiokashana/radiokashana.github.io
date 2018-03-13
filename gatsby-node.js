/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators

	const newTemplate = path.resolve("src/templates/newTemplate.js")

	return graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
			) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			console.log(result.errors)
			return Promise.reject(result.errors)
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			const id = node.id
			createPage({
				path: node.fields.slug,
				component: newTemplate,
				context: {
					id,
				}
			})
		})
	})
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators

	if (node.internal.type === "MarkdownRemark") {
		const value = `noticias${createFilePath({ node, getNode})}`

		createNodeField({
			name: "slug",
			node,
			value
		})
	}
}
