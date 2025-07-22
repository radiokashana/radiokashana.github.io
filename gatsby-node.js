/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Schema customization for Gatsby v5
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Define the Date type with formatString and locale directives
  createTypes([
    schema.buildObjectType({
      name: "Mdx",
      fields: {
        frontmatter: "MdxFrontmatter!",
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "MdxFrontmatter",
      fields: {
        title: "String!",
        date: {
          type: "Date",
          extensions: {
            dateformat: {},
          },
        },
        image: "String",
      },
    }),
  ]);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const newTemplate = path.resolve("./src/templates/newTemplate.js");

  return graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            internal {
              contentFilePath
            }
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
  `).then((result) => {
    if (result.errors) {
      console.log(result.errors);
      return Promise.reject(result.errors);
    }

    result.data.allMdx.edges.forEach(({ node }) => {
      const id = node.id;
      createPage({
        path: node.fields.slug,
        component: `${newTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};