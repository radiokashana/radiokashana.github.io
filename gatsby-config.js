module.exports = {
	pathPrefix: "/",
	siteMetadata: {
		siteUrl: "https://www.radiokashana.org/",
		pathPrefix: "",
		title: "RadioKashana - Tu Radio de Verdad",
		titleAlt: "RadioKashana.org",
		description: "RadioKashana es tu Radio de Verdad.",
		banner: "/img/banner_web.png",
		bannerWidth: 1200,
		bannerHeight: 282,
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
		"gatsby-plugin-decap-cms",
		"gatsby-plugin-postcss",
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
			// The CMS media folder. Sourcing it lets gatsby-plugin-image build
			// responsive, lazy-loaded versions of every article photo; the files
			// are still copied to /img/ as before for Open Graph and the CMS.
			resolve: "gatsby-source-filesystem",
			options: {
				name: "media",
				path: "./static/img/",
			},
			__key: "media",
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
};
