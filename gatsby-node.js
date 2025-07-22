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
        imagePosition: {
          type: "String",
          resolve: (source) => source.imagePosition || "center",
        },
      },
    }),
  ]);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const newTemplate = path.resolve("./src/templates/newTemplate.js");
  const indexTemplate = path.resolve("./src/templates/indexTemplate.js");

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
              date
              dateRaw: date
              image
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

    // Create individual news pages
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

    // Create paginated index pages
    const posts = result.data.allMdx.edges;
    const postsPerPage = 12; // 12 news per page after the main news
    const mainNewsCount = 4; // Main news section has 4 articles
    
    // Calculate total pages
    // Page 1: 4 main news + 12 regular = 16 total
    // Pages 2+: 12 regular each
    const remainingPosts = posts.length - mainNewsCount;
    const additionalPages = Math.ceil(remainingPosts / postsPerPage);
    const totalPages = additionalPages + 1; // +1 for the first page

    // Create page 1 (handled by src/pages/index.js, but we need context)
    // We don't need to create page 1 since it's handled by the existing index.js
    
    // Create pages 2, 3, 4, etc.
    Array.from({ length: additionalPages }).forEach((_, i) => {
      const pageNumber = i + 2; // Start from page 2
      const skip = mainNewsCount + (i * postsPerPage); // Skip main news + previous pages
      
      createPage({
        path: `/page/${pageNumber}`,
        component: indexTemplate,
        context: {
          currentPage: pageNumber,
          totalPages: totalPages,
          skip: skip,
          limit: postsPerPage,
          isFirstPage: false,
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