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
	],
}
