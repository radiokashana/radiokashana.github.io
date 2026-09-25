import React from "react"

import SEO from "../components/SEO"
import Header from "../components/Header"
import Footer from "../components/footer"

const IndexLayout = ({ children, customSEO }) => (
	<div data-testid="app-layout">
		{!customSEO && <SEO />}
		<Header />
		<main className="wrap" data-testid="main-content">
			{children}
		</main>
		<Footer />
	</div>
)

export default IndexLayout
