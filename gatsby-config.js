module.exports = {
	siteMetadata: {
		title: "RadioKashana - Tu Radio de Verdad",
	},
	plugins: [
		"gatsby-plugin-layout",
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-sass",
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
