import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import IndexLayout from "../layouts/index"
import SEO from "../components/SEO"

// Custom components for MDX to ensure proper paragraph spacing
const mdxComponents = {
	p: (props) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
	h1: (props) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8" {...props} />,
	h2: (props) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6" {...props} />,
	h3: (props) => <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5" {...props} />,
	ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
	ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
	li: (props) => <li className="leading-relaxed" {...props} />,
	blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r" {...props} />,
	strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
	em: (props) => <em className="italic text-gray-700" {...props} />,
	a: (props) => <a className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200" {...props} />,
}

const NewTemplate = ({data, location, children}) => {
	const { frontmatter, excerpt } = data.mdx

	return (
		<IndexLayout customSEO>
			<SEO
				title={`${frontmatter.title} - RadioKashana`}
				pathname={location.pathname}
				desc={excerpt}
				node={data.mdx}
				banner={frontmatter.image}
				article
			/>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					{/* Article Header */}
					<div className="relative">
						<img 
							src={frontmatter.image} 
							alt={frontmatter.title}
							className="w-full h-64 md:h-80 object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<time className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
								{frontmatter.date}
							</time>
							<h1 className="text-2xl md:text-4xl font-bold leading-tight">
								{frontmatter.title}
							</h1>
						</div>
					</div>

					{/* Article Content */}
					<div className="p-6 md:p-8">
						<div className="prose prose-gray max-w-none">
							<MDXProvider components={mdxComponents}>
								{children}
							</MDXProvider>
						</div>
					</div>
				</article>
			</div>
		</IndexLayout>
	)
}

export const pageQuery = graphql`
	query NewById($id: String!) {
		mdx(id: { eq: $id }) {
			id
			excerpt(pruneLength: 200)
			frontmatter {
				title
				date(formatString: "DD [de] MMMM [de] YYYY [a las] HH:mm [horas]", locale: "es")
				image
			}
		}
	}
`

export default NewTemplate
