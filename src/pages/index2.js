import React from "react"
import Link from "gatsby-link"

import MainNews from "../components/main-news"
import Ads from "../components/ads"
import NewThumbList from "../components/new-thumb-list"

export default () =>
	<section>
		<MainNews/>
		<Ads/>
		<NewThumbList/>
	</section>
