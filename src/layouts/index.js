import React from "react"
import Helmet from "react-helmet"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

const IndexLayout = ({children, customSEO}) =>
	<div data-testid="app-layout" className="min-h-screen bg-gray-50">
		{!customSEO && <SEO />}
		<Header />
		<main className="container-modern py-8" data-testid="main-content">
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
