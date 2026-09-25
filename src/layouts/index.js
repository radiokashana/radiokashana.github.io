import React from "react"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

// Pages own their width: photos run edge to edge, text sits in `.wrap`.
const IndexLayout = ({ children, customSEO }) => (
	<div data-testid="app-layout" className="app">
		{!customSEO && <SEO />}
		<Header />
		<main data-testid="main-content">{children}</main>
		<Footer />
	</div>
)

export default IndexLayout
