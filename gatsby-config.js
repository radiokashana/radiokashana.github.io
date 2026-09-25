// Netlify builds skip the Gatsby cache. With a warm cache, webpack reuses the
// old Tailwind output when a change adds utility classes without touching a
// CSS file, and pages whose code didn't change keep the old CSS inlined, so
// deploys could ship without the new styles (#163). Dropping the adapter's
// cache hooks keeps .cache and public from being restored between builds.
const netlifyAdapterWithoutCache = () => {
	const { cache, ...adapter } = require("gatsby-adapter-netlify").default();
	return adapter;
};

module.exports = {
	adapter: process.env.NETLIFY ? netlifyAdapterWithoutCache() : undefined,
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
