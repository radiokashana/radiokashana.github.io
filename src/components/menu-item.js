import React from "react"
import { Link } from "gatsby"

const MenuItem = ({href, children}) =>
	<li className="fl ph1 pv2 white b bl--mid-gray br--near-black">
		<Link className="db white b link underline-hover f4" to={{href}}>
			{children}
		</Link>
	</li>

export default MenuItem
