import React from "react"
import Helmet from "react-helmet"

import Header from "../components/Header"
import Footer from "../components/footer"

import "./index.scss"

export default ({location, children}) =>
	<div>
		<Helmet
			title="Radio Kashana - Tu radio de verdad"
			meta={[
				{name: "description", content: "Tu radio de verdad"},
				{name: "keywords", content: "radio, kashana, santa rosal&iacute;a"},
			]}
		/>
		<Header/>
		<main className="center-ns mw-100 ml2 mr2 w-two-thirds-ns georgia">
			{children()}
		</main>
		<Footer/>
	</div>
