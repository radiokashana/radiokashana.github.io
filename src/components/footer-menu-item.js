import React from "react"

import Link from "gatsby-link"

export default ({href, children}) =>
	<li className="fl ph1 pv2 white b">
		<Link className="db white b link underline-hover" to={{href}}>
			{children}
		</Link>
	</li>
