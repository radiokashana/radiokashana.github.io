/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions
	const newTemplate = path.resolve("./src/templates/newTemplate.js")

/*
	const result = await graphql(`
		query {
			allMdx(
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
	`)

	if (result.errors) {
		console.error(result.errors)
		reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
	}

	result.data.allMdx.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: newTemplate,
			context: { id: node.id, }
		})
	})
	*/

	return graphql(`
		{
			allMdx(
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

		result.data.allMdx.edges.forEach(({ node }) => {
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

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions

	if (node.internal.type === "Mdx") {
		const value = createFilePath({ node, getNode})

		createNodeField({
			name: "slug",
			node,
			value
		})
	}
}

/*
exports.createSchemaCustomization = ({actions }) => {
	const { createTypes } = actions

	createTypes(`
		type Mdx implements Node {
			frontmatter: MdxFrontmatter!
		}
		type MdxFrontmatter {
			date: Date
			image: File @fileByRelativePath
		}
	`)
}
*/
