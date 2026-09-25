import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import { toStory } from "../components/Story"
import Mosaic from "../components/Mosaic"
import Embed from "../components/embed"
import Pagination from "../components/pagination"

const IndexTemplate = ({ data, pageContext, location }) => {
	const { currentPage, totalPages } = pageContext
	const facebookLiveEmbedHtml = data.allDataJson.edges[0].node.facebookLiveEmbedHtml
	const news = data.allMdx.nodes.filter((node) => !!node.frontmatter.date).map(toStory)

	return (
		<IndexLayout customSEO>
			{/* Each listing page gets its own canonical URL and og:url instead of the homepage's */}
			<SEO pathname={location.pathname} />

			<div data-testid="homepage-content">
				<header className="page-head on-dark">
					<div className="wrap">
						<p className="kicker">Archivo</p>
						<h1 className="page-head__title">Noticias</h1>
						<p className="page-head__count">
							Página {currentPage} de {totalPages}
						</p>
					</div>
				</header>

				<section className="wrap section" id="news" data-testid="news-list" aria-label="Noticias">
					<Mosaic stories={news} />
					<Pagination currentPage={currentPage} totalPages={totalPages} />
				</section>

				<Embed html={facebookLiveEmbedHtml} />
			</div>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexTemplateQuery($skip: Int!, $limit: Int!) {
		allMdx(sort: { frontmatter: { date: DESC } }, skip: $skip, limit: $limit) {
			nodes {
				...StoryFields
			}
		}
		allDataJson {
			edges {
				node {
					facebookLiveEmbedHtml
				}
			}
		}
	}
`

export default IndexTemplate
