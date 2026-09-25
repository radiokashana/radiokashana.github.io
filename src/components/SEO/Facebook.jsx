import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

// Open Graph tags read by Facebook, WhatsApp, Messenger, LinkedIn and Telegram.
//
// og:image:width / og:image:height matter more than they look: without them
// Facebook's crawler has to download and measure the image asynchronously the
// first time a URL is shared, so the very first share renders with no image.
// With real dimensions the preview is complete on the first scrape.
// https://developers.facebook.com/docs/sharing/webmasters/images
const Facebook = ({
	url,
	name,
	type,
	title,
	desc,
	image,
	imageWidth,
	imageHeight,
	locale,
	publisher,
	publishedTime,
}) => (
	<Helmet>
		{name && <meta property="og:site_name" content={name} />}
		<meta property="og:locale" content={locale} />
		<meta property="og:url" content={url} />
		<meta property="og:type" content={type} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={desc} />
		<meta property="og:image" content={image} />
		<meta property="og:image:secure_url" content={image} />
		{imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
		{imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
		<meta property="og:image:alt" content={title} />
		{type === 'article' && publisher && <meta property="article:publisher" content={publisher} />}
		{type === 'article' && publishedTime && (
			<meta property="article:published_time" content={publishedTime} />
		)}
	</Helmet>
)

export default Facebook

Facebook.propTypes = {
	url: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired,
	type: PropTypes.string,
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	imageWidth: PropTypes.number,
	imageHeight: PropTypes.number,
	name: PropTypes.string,
	publisher: PropTypes.string,
	publishedTime: PropTypes.string,
}

Facebook.defaultProps = {
	type: 'website',
	name: null,
	imageWidth: null,
	imageHeight: null,
	publisher: null,
	publishedTime: null,
}
