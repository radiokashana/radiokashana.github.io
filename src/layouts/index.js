import React from "react"
import Helmet from "react-helmet"

import Header from "../components/Header"
import Header2 from "../components/header2"
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
		{
			location.pathname === "/index2" ? <Header2/> : <Header/>
		}
		<main className="center w-80-l">
			{children()}
		</main>
		<Footer/>
	</div>
