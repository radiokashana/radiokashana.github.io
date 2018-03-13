import React from "react"

import NewThumb from "./new-thumb"

export default ({ children }) =>
	<section id="news">
		<ul className="w-100 list pa0 flex flex-column flex-row-ns flex-wrap">
			{ children }
		</ul>
	</section>
