module.exports = {
	siteMetadata: {
		title: "RadioKashana - Tu Radio de Verdad",
	},
	plugins: [
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-react-next",
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-plugin-postcss-sass",
			options: {
				postCssPlugins: [
					require("postcss-import")()
				],
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages",
			},
		},
	],
}
