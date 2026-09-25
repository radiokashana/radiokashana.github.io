import React from "react"
import { Link } from "gatsby"

import { formatDateOnly } from "../utils/dateUtils"
import { getObjectPosition } from "../utils/imagePosition"
import { headlineClass } from "../utils/text"

// Story blocks for the front page and the archive, from most to least
// prominent. Each one is built from type first: the headline is the link,
// the photo supports it and never carries text on top of it.

// Maps a GraphQL `allMdx` edge to the props the blocks below expect.
export const toStory = ({ node }) => ({
	id: node.id,
	href: node.fields.slug,
	title: node.frontmatter.title,
	date: node.frontmatter.date,
	image: node.frontmatter.image,
	imagePosition: node.frontmatter.imagePosition,
	excerpt: node.excerpt,
})

const Photo = ({ story, className, eager }) =>
	story.image ? (
		<Link to={story.href} className={className} tabIndex={-1} aria-hidden="true">
			<img
				src={story.image}
				alt=""
				loading={eager ? "eager" : "lazy"}
				style={{ objectPosition: getObjectPosition(story.imagePosition) }}
			/>
		</Link>
	) : null

const Dateline = ({ date }) =>
	date ? <time className="dateline" dateTime={date}>{formatDateOnly(date)}</time> : null

// One lead story: large headline and summary beside a 4:3 photo. On phones
// the photo sits between the headline and the summary.
export const LeadStory = ({ story }) => (
	<article className="lead">
		<div className="lead__head">
			<p className="kicker">Principal</p>
			<h2 className={headlineClass("lead__title", story.title)}>
				<Link to={story.href}>{story.title}</Link>
			</h2>
		</div>
		<Photo story={story} className="lead__photo" eager />
		<div className="lead__body">
			<p className="lead__dek">{story.excerpt}</p>
			<Dateline date={story.date} />
		</div>
	</article>
)

// Secondary stories in the front-page column: headline, short summary,
// date. Only the first one carries a photo.
export const SecondaryStory = ({ story, withPhoto }) => (
	<article className="secondary">
		{withPhoto && <Photo story={story} className="secondary__photo" eager />}
		<h3 className={headlineClass("secondary__title", story.title)}>
			<Link to={story.href}>{story.title}</Link>
		</h3>
		<p className="secondary__dek">{story.excerpt}</p>
		<Dateline date={story.date} />
	</article>
)

// Dense list entry: headline and summary with a small photo to the right.
export const StoryRow = ({ story }) => (
	<li className="row">
		<article className="row__inner">
			<div className="row__text">
				<h3 className={headlineClass("row__title", story.title)}>
					<Link to={story.href}>{story.title}</Link>
				</h3>
				<p className="row__dek">{story.excerpt}</p>
				<Dateline date={story.date} />
			</div>
			<Photo story={story} className="row__photo" />
		</article>
	</li>
)

export const StoryList = ({ title, children }) => (
	<section className="news" data-testid="news-list">
		<h2 className="section-label">{title}</h2>
		<ul className="news__list" data-testid="news-articles">
			{children}
		</ul>
	</section>
)
