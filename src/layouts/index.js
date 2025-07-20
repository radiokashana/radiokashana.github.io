import React from "react"
import Helmet from "react-helmet"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

const IndexLayout = ({children, customSEO}) =>
	<div data-testid="app-layout">
		{!customSEO && <SEO />}
		<Header />
		<main className="md:mx-auto max-w-full ml-2 mr-2 md:w-2/3 font-serif" data-testid="main-content">
			{children}
		</main>
		<Footer />
	</div>

export default IndexLayout


/*
		{{
		<Helmet
			title="Radio Kashana - Tu radio de verdad"
			meta={[
				{name: "description", content: "Tu radio de verdad"},
				{name: "keywords", content: "radio, kashana, santa rosal&iacute;a"},
			]}
		/>
		}}
*/
