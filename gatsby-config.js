module.exports = {
	pathPrefix: '/',
	siteMetadata: {
		siteUrl: "https://www.radiokashana.org/",
		pathPrefix: '',
		title: "RadioKashana - Tu Radio de Verdad",
		titleAlt: "RadioKashana.org",
		description: "RadioKashana es tu Radio de Verdad.",
		banner: "/img/banner_web.png",
		// logo: "/logos/logo-1024.png",
		headline: "RadioKashana",
		siteLanguage: "es",
		ogLanguage: "es_MX",
		author: "Alfredo Murillo Salgado",
		twitter: "@radiokashanabcs",
		facebook: "https://www.facebook.com/radiokashana",
	},
	plugins: [
		//"gatsby-plugin-layout",
		"gatsby-plugin-netlify-cms",
		//"gatsby-plugin-postcss",
		{
			resolve: "gatsby-plugin-sass",
			options: {
				postCssPlugins: [
					require("postcss-import")(),
				],
			},
		},
		/*		{
			resolve: "gatsby-plugin-postcss-sass",
			options: {
				postCssPlugins: [
					require("postcss-import")()
				],
			},
		},*/
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-offline",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		{
			resolve: "gatsby-plugin-mdx",
			options: {
				extensions: [".md", ".mdx"],
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "news",
				path: "./content/",
			},
			__key: "news",
		},
		"gatsby-transformer-json",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: "./_data/",
			},
		},
	],
}
