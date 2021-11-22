import React from "react"
import Helmet from "react-helmet"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

const IndexLayout = ({children, customSEO}) =>
	<div>
		{!customSEO && <SEO />}
		<Header />
		<main className="center-ns mw-100 ml2 mr2 w-two-thirds-ns georgia">
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
