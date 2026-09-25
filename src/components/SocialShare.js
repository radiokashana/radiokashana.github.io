import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { absoluteUrl } from "../utils/urlUtils"

// Share links for an article, set as a single line of text. Every network is a
// plain link so sharing works even before React hydrates or if JavaScript is
// disabled; the copy-link button is the only one that needs the browser.
const networks = [
	{
		name: "Facebook",
		href: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
	},
	{
		name: "WhatsApp",
		href: ({ url, title }) => `https://wa.me/?text=${title}%20${url}`,
	},
	{
		name: "X",
		href: ({ url, title }) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
	},
	{
		name: "Telegram",
		href: ({ url, title }) => `https://t.me/share/url?url=${url}&text=${title}`,
	},
]

const SocialShare = ({ pathname, title }) => {
	const { site } = useStaticQuery(graphql`
		query SocialShareSiteUrl {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`)
	const [copied, setCopied] = useState(false)
	// Same canonical URL as og:url, so Facebook's cache entry for the shared
	// link matches the page's own metadata.
	const url = absoluteUrl(site.siteMetadata.siteUrl, pathname)
	const encoded = { url: encodeURIComponent(url), title: encodeURIComponent(title) }

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			// Clipboard API unavailable (insecure context or old browser)
			window.prompt("Copia el enlace:", url)
		}
	}

	return (
		<div className="social-share" data-testid="social-share">
			<h2 className="meta">Compartir</h2>
			<ul className="inline-list">
				{networks.map((network) => (
					<li key={network.name}>
						<a
							href={network.href(encoded)}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Compartir en ${network.name}`}
						>
							{network.name}
						</a>
					</li>
				))}
				<li>
					<button type="button" onClick={copyLink} aria-live="polite">
						{copied ? "Enlace copiado" : "Copiar enlace"}
					</button>
				</li>
			</ul>
		</div>
	)
}

export default SocialShare
