import React from "react"
import { graphql } from "gatsby"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"
import StationCard from "../components/StationCard"
import { NewsFeed, toStory } from "../components/news"
import Pagination from "../components/pagination"
import { LiveDot, STATION } from "../components/station"

const IndexTemplate = ({ data, pageContext, location }) => {
	const { currentPage, totalPages } = pageContext
	const news = data.allMdx.edges.filter(edge => !!edge.node.frontmatter.date).map(toStory)

	return (
		<IndexLayout customSEO>
			{/* Each listing page gets its own canonical URL and og:url instead of the homepage's */}
			<SEO pathname={location.pathname} />

			<section className="page-band" aria-labelledby="archive-title">
				<div className="shell page-band__inner">
					<p className="eyebrow eyebrow--light">
						<LiveDot /> {STATION.name} · {STATION.frequency} {STATION.band}
					</p>
					<h1 id="archive-title" className="page-band__title">
						Lo que dice la estación
					</h1>
					<p className="page-band__meta">
						Archivo de noticias · Página {currentPage} de {totalPages}
					</p>
				</div>
			</section>

			<div className="news-page" data-testid="homepage-content">
				<div className="shell news-columns">
					<div className="news-columns__main">
						<NewsFeed stories={news} eyebrow={`Página ${currentPage}`} title="Noticias anteriores" />
						<Pagination currentPage={currentPage} totalPages={totalPages} />
					</div>
					<div className="news-columns__aside">
						<StationCard />
					</div>
				</div>
			</div>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query IndexTemplateQuery($skip: Int!, $limit: Int!) {
		allMdx(sort: { frontmatter: { date: DESC } }, skip: $skip, limit: $limit) {
			edges {
				node {
					id
					excerpt(pruneLength: 200)
					fields {
						slug
					}
					frontmatter {
						title
						date
						image
						imagePosition
					}
				}
			}
		}
	}
`

export default IndexTemplate
