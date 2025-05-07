import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './Facebook'
import Twitter from './Twitter'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({ title, desc, banner, pathname, article, node }) => {
	const { site } = useStaticQuery(query)

	const {
		buildTime,
		siteMetadata: {
			siteUrl,
			defaultTitle,
			defaultDescription,
			defaultBanner,
			headline,
			siteLanguage,
			ogLanguage,
			author,
			twitter,
			facebook,
		},
	} = site

	// Ensure banner has absolute URL with https:// protocol
	let bannerUrl = banner || defaultBanner
	if (bannerUrl && !bannerUrl.startsWith('http') && !bannerUrl.startsWith('//')) {
		// Make sure siteUrl includes the protocol
		const siteUrlWithProtocol = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
		bannerUrl = `${siteUrlWithProtocol}${bannerUrl.startsWith('/') ? '' : '/'}${bannerUrl}`
	}

	// Ensure URL has https:// protocol
	const fullUrl = pathname ? `${siteUrl}${pathname}` : siteUrl
	const urlWithProtocol = fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`

	const seo = {
		title: title || defaultTitle,
		description: desc || defaultDescription,
		image: bannerUrl,
		url: urlWithProtocol,
	}

	// schema.org in JSONLD format
	// https://developers.google.com/search/docs/guides/intro-structured-data
	// You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

	const schemaOrgWebPage = {
		'@context': 'http://schema.org',
		'@type': 'WebPage',
		url: seo.url,
		headline,
		inLanguage: siteLanguage,
		mainEntityOfPage: seo.url,
		description: defaultDescription,
		name: defaultTitle,
		author: {
			'@type': 'Person',
			name: author,
		},
		copyrightHolder: {
			'@type': 'Person',
			name: author,
		},
		copyrightYear: '2019',
		creator: {
			'@type': 'Person',
			name: author,
		},
		publisher: {
			'@type': 'Person',
			name: author,
		},
		datePublished: '2019-01-18T10:30:00+01:00',
		dateModified: buildTime,
		image: {
			'@type': 'ImageObject',
			url: seo.image,
		},
	}

	// Initial breadcrumb list

	const itemListElement = [
		{
			'@type': 'ListItem',
			item: {
				'@id': seo.url,
				name: 'Homepage',
			},
			position: 1,
		},
	]

	let schemaArticle = null

	if (article) {
		schemaArticle = {
			'@context': 'http://schema.org',
			'@type': 'Article',
			author: {
				'@type': 'Person',
				name: author,
			},
			copyrightHolder: {
				'@type': 'Person',
				name: author,
			},
			copyrightYear: '2019',
			creator: {
				'@type': 'Person',
				name: author,
			},
			publisher: {
				'@type': 'Organization',
				name: author,
				logo: {
					'@type': 'ImageObject',
					url: seo.image,
				},
			},
			datePublished: node.frontmatter.date,
			dateModified: node.frontmatter.date,
			description: seo.description,
			headline: seo.title,
			inLanguage: siteLanguage,
			url: seo.url,
			name: seo.title,
			image: {
				'@type': 'ImageObject',
				url: seo.image,
			},
			mainEntityOfPage: seo.url,
		}
		// Push current blogpost into breadcrumb list
		itemListElement.push({
			'@type': 'ListItem',
			item: {
				'@id': seo.url,
				name: seo.title,
			},
			position: 2,
		})
	}

	const breadcrumb = {
		'@context': 'http://schema.org',
		'@type': 'BreadcrumbList',
		description: 'Breadcrumbs list',
		name: 'Breadcrumbs',
		itemListElement,
	}

	return (
		<>
			<Helmet title={seo.title}>
				<html lang={siteLanguage} />
				<meta name="description" content={seo.description} />
				<meta name="image" content={seo.image} />
		    {/* <meta name="gatsby-starter" content="Gatsby Starter Prismic" /> */}
				{/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
				{!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
				{article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
				<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
				
				{/* Basic Open Graph tags - duplicated for Facebook debugger */}
				<meta property="og:site_name" content="RadioKashana" />
				<meta property="og:url" content={seo.url} />
				<meta property="og:type" content={article ? 'article' : 'website'} />
				<meta property="og:title" content={seo.title} />
				<meta property="og:description" content={seo.description} />
				<meta property="og:image" content={seo.image} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
			</Helmet>
			<Facebook
				desc={seo.description}
				image={seo.image}
				title={seo.title}
				type={article ? 'article' : 'website'}
				url={seo.url}
				locale={ogLanguage}
				name="RadioKashana"
			/>
			<Twitter 
				title={seo.title} 
				image={seo.image} 
				desc={seo.description} 
				username={twitter} 
				type="summary_large_image"
			/>
		</>
	)
}

export default SEO

SEO.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	banner: PropTypes.string,
	pathname: PropTypes.string,
	article: PropTypes.bool,
	node: PropTypes.object,
}

SEO.defaultProps = {
	title: null,
	desc: null,
	banner: null,
	pathname: null,
	article: false,
	node: null,
}

const query = graphql`
	query SEO {
		site {
			buildTime(formatString: "YYYY-MM-DD")
			siteMetadata {
				siteUrl
				defaultTitle: title
				defaultDescription: description
				defaultBanner: banner
				headline
				siteLanguage
				ogLanguage
				author
				twitter
				facebook
			}
		}
	}
`