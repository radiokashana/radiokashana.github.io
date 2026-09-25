import React from "react"

import SEO from "../components/SEO"
import Header, { StationStrip } from "../components/Header"
import Footer from "../components/footer"
import { LiveProvider } from "../components/live"

// `inlinePlayer`: the page renders its own <LivePlayer id="en-vivo">, so the
// header's "Escuchar" button scrolls to it instead of opening the drawer.
const IndexLayout = ({ children, customSEO, inlinePlayer = false }) => (
	<LiveProvider inlinePlayer={inlinePlayer}>
		<div data-testid="app-layout" className="site" id="top">
			{!customSEO && <SEO />}
			<a className="skip-link" href="#contenido">
				Saltar al contenido
			</a>
			<Header />
			<StationStrip />
			<main id="contenido" className="site-main" data-testid="main-content">
				{children}
			</main>
			<Footer />
		</div>
	</LiveProvider>
)

export default IndexLayout
