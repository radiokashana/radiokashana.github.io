import React from "react"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

const IndexLayout = ({ children, customSEO }) => (
	<div data-testid="app-layout" className="site">
		{!customSEO && <SEO />}
		<a className="skip-link" href="#contenido">Saltar al contenido</a>
		<Header />
		<main className="site__main" id="contenido" data-testid="main-content">
			{children}
		</main>
		<Footer />
	</div>
)

export default IndexLayout
