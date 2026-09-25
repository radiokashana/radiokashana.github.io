import React from "react"
import { Link } from "gatsby"

import { formatDateShort } from "../utils/dateUtils"
import { Emblem } from "./station"

// Turns an allMdx edge into the plain object every news component takes.
export const toStory = ({ node }) => ({
	id: node.id,
	href: node.fields.slug,
	title: node.frontmatter.title,
	date: node.frontmatter.date,
	image: node.frontmatter.image,
	imagePosition: node.frontmatter.imagePosition,
	excerpt: node.excerpt,
})

const objectPosition = position => (position ? position.replace("-", " ") : "center")

// Story image with the squid emblem underneath, so a missing file still looks
// intentional instead of leaving a broken-image icon on a blank box.
export const StoryImage = ({ story, className = "", eager = false }) => (
	<div className={`story-img ${className}`}>
		<Emblem className="story-img__fallback" />
		{story.image && (
			<img
				src={story.image}
				alt=""
				loading={eager ? "eager" : "lazy"}
				style={{ objectPosition: objectPosition(story.imagePosition) }}
			/>
		)}
	</div>
)

export const StoryDate = ({ date, className = "" }) =>
	date ? (
		<time className={`story-date ${className}`} dateTime={date}>
			{formatDateShort(date)}
		</time>
	) : null

export const SectionHead = ({ id, eyebrow, title, children }) => (
	<div className="section-head">
		{eyebrow && <p className="eyebrow">{eyebrow}</p>}
		<h2 id={id} className="section-head__title">
			{title}
		</h2>
		{children && <div className="section-head__aside">{children}</div>}
	</div>
)

// "Lo que dice la estación": one lead story and three that follow it.
export const LeadStories = ({ stories }) => {
	if (!stories.length) return null
	const [lead, ...rest] = stories

	return (
		<section className="shell lead-block" id="noticias" aria-labelledby="noticias-title" data-testid="main-news">
			<SectionHead id="noticias-title" eyebrow="Noticias · RadioKashana 93.3 FM" title="Lo que dice la estación" />

			<article className="lead">
				<Link to={lead.href} className="lead__link">
					<StoryImage story={lead} className="lead__img" eager />
					<div className="lead__body">
						<p className="lead__kicker">
							<span className="lead__flag">Nota principal</span>
							<StoryDate date={lead.date} />
						</p>
						<h3 className="lead__title">{lead.title}</h3>
						{lead.excerpt && <p className="lead__excerpt">{lead.excerpt}</p>}
						<span className="read-more">
							Leer la nota <span aria-hidden="true">→</span>
						</span>
					</div>
				</Link>
			</article>

			{rest.length > 0 && (
				<ul className="follow-ups">
					{rest.map(story => (
						<li key={story.id}>
							<Link to={story.href} className="follow-up">
								<StoryImage story={story} className="follow-up__img" />
								<StoryDate date={story.date} />
								<h3 className="follow-up__title">{story.title}</h3>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}

// The running feed: date on the left like a rundown, headline, thumbnail.
export const NewsFeed = ({ stories, title = "Más noticias", eyebrow }) => (
	<section className="feed" aria-labelledby="feed-title" data-testid="news-list">
		<SectionHead id="feed-title" eyebrow={eyebrow} title={title} />
		<ol className="feed__list" data-testid="news-articles">
			{stories.map(story => (
				<li key={story.id} className="feed-item">
					<Link to={story.href} className="feed-item__link">
						<StoryDate date={story.date} className="feed-item__date" />
						<div className="feed-item__text">
							<h3 className="feed-item__title">{story.title}</h3>
							{story.excerpt && <p className="feed-item__excerpt">{story.excerpt}</p>}
						</div>
						<StoryImage story={story} className="feed-item__img" />
					</Link>
				</li>
			))}
		</ol>
	</section>
)
