module.exports = {
	siteMetadata: {
		title: "RadioKashana - Tu Radio de Verdad",
	},
	plugins: [
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-react-next",
		{
			resolve: "gatsby-plugin-postcss-sass",
			options: {
				postCssPlugins: [
					require("postcss-import")()
				],
			},
		},
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages",
			},
		},
		"gatsby-transformer-json",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/_data/`,
			},
		},
	],
}
