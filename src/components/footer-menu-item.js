import React from "react"

import Link from "gatsby-link"

export default ({href, children}) =>
	<li className="fl-ns ph1 pv2">
		<Link className="white b link underline-hover" to={{href}}>
			{children}
		</Link>
	</li>
