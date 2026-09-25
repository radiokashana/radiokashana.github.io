import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './Facebook'
import Twitter from './Twitter'
import { absoluteUrl } from '../../utils/urlUtils'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({ title, desc, banner, bannerWidth, bannerHeight, pathname, article, node }) => {
	const { site } = useStaticQuery(query)

	const {
		buildTime,
		siteMetadata: {
			siteUrl,
			defaultTitle,
			defaultDescription,
			defaultBanner,
			defaultBannerWidth,
			defaultBannerHeight,
			headline,
			siteLanguage,
			ogLanguage,
			author,
			twitter,
			facebook,
		},
	} = site

	const usingDefaultBanner = !banner
	const seo = {
		title: title || defaultTitle,
		description: desc || defaultDescription,
		image: absoluteUrl(siteUrl, banner || defaultBanner),
		imageWidth: usingDefaultBanner ? defaultBannerWidth : bannerWidth,
		imageHeight: usingDefaultBanner ? defaultBannerHeight : bannerHeight,
		url: absoluteUrl(siteUrl, pathname),
	}
	const homeUrl = absoluteUrl(siteUrl)
	const logoUrl = absoluteUrl(siteUrl, defaultBanner)
	const publishedTime = article && node && node.frontmatter ? node.frontmatter.date : null

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
			url: logoUrl,
		},
	}

	// Initial breadcrumb list

	const itemListElement = [
		{
			'@type': 'ListItem',
			item: {
				'@id': homeUrl,
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
					url: logoUrl,
				},
			},
			datePublished: publishedTime,
			dateModified: publishedTime,
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
				<link rel="canonical" href={seo.url} />
				<meta name="description" content={seo.description} />
				<meta name="image" content={seo.image} />
				{/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
				{!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
				{article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
				<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
			</Helmet>
			<Facebook
				desc={seo.description}
				image={seo.image}
				imageWidth={seo.imageWidth}
				imageHeight={seo.imageHeight}
				title={seo.title}
				type={article ? 'article' : 'website'}
				url={seo.url}
				locale={ogLanguage}
				name={headline}
				publisher={facebook}
				publishedTime={publishedTime}
			/>
			<Twitter title={seo.title} image={seo.image} desc={seo.description} username={twitter} />
		</>
	)
}

export default SEO

SEO.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	banner: PropTypes.string,
	bannerWidth: PropTypes.number,
	bannerHeight: PropTypes.number,
	pathname: PropTypes.string,
	article: PropTypes.bool,
	node: PropTypes.object,
}

SEO.defaultProps = {
	title: null,
	desc: null,
	banner: null,
	bannerWidth: null,
	bannerHeight: null,
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
				defaultBannerWidth: bannerWidth
				defaultBannerHeight: bannerHeight
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
