/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");

// Frontmatter images live in static/img and are referenced as "/img/foo.jpg".
// We measure them at build time so the SEO component can emit
// og:image:width / og:image:height, which lets Facebook render the preview
// image on the very first share instead of after an async re-crawl.
const imageDimensionsCache = new Map();

const getImageDimensions = (imagePath, reporter) => {
  if (!imagePath || typeof imagePath !== "string") return null;
  if (imageDimensionsCache.has(imagePath)) return imageDimensionsCache.get(imagePath);

  let dimensions = null;
  try {
    const decoded = decodeURI(imagePath.trim().replace(/^\/+/, ""));
    const file = path.resolve(__dirname, "static", decoded);
    if (fs.existsSync(file)) {
      // sharp ships with gatsby-plugin-sharp, so it is always installed here.
      const sharp = require("sharp");
      dimensions = sharp(file).metadata();
    } else if (reporter) {
      reporter.warn(`Frontmatter image not found in static/: ${imagePath}`);
    }
  } catch (err) {
    if (reporter) reporter.warn(`Could not read image ${imagePath}: ${err.message}`);
  }

  const result = Promise.resolve(dimensions)
    .then((meta) => {
      if (!meta || !meta.width || !meta.height) return null;
      // EXIF orientation 5-8 means the stored pixels are rotated 90°
      const rotated = meta.orientation && meta.orientation >= 5;
      return rotated
        ? { width: meta.height, height: meta.width }
        : { width: meta.width, height: meta.height };
    })
    .catch(() => null);

  imageDimensionsCache.set(imagePath, result);
  return result;
};

// Frontmatter images are plain strings ("/img/foo.jpg") written by the CMS.
// Map one to the path of the File node sourced from static/img (see the
// "media" source in gatsby-config.js), so templates can query responsive
// versions through childImageSharp without changing the content model.
const toMediaRelativePath = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return null;
  let value = imagePath.trim();
  try {
    value = decodeURI(value);
  } catch (e) {
    // Malformed escape sequence: keep the raw value
  }
  value = value.replace(/^https?:\/\/[^/]+/i, "").replace(/^\/+/, "");
  if (!value.startsWith("img/")) return null;
  return value.slice("img/".length);
};

// Schema customization for Gatsby v5
exports.createSchemaCustomization = ({ actions, schema, reporter }) => {
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
        imageWidth: {
          type: "Int",
          resolve: async (source) => {
            const dims = await getImageDimensions(source.image, reporter);
            return dims ? dims.width : null;
          },
        },
        imageHeight: {
          type: "Int",
          resolve: async (source) => {
            const dims = await getImageDimensions(source.image, reporter);
            return dims ? dims.height : null;
          },
        },
        imagePosition: {
          type: "String",
          resolve: (source) => source.imagePosition || "center",
        },
        // Derived field (not stored in Markdown): the File node behind `image`
        cover: {
          type: "File",
          resolve: async (source, args, context) => {
            const relativePath = toMediaRelativePath(source.image);
            if (!relativePath) return null;
            return context.nodeModel.findOne({
              type: "File",
              query: {
                filter: {
                  sourceInstanceName: { eq: "media" },
                  relativePath: { eq: relativePath },
                },
              },
            });
          },
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
      // Page 1 shows 16 articles (4 main + 12 regular), so skip 16 for page 2
      // Then skip 12 more for each subsequent page
      const skip = (mainNewsCount + postsPerPage) + (i * postsPerPage); // Skip page 1 content + previous pages
      
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