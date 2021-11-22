import React from "react"

const FooterMenuItem = ({href, children}) =>
	<li className="fl-ns ph1 pv2">
		<a className="white b link underline-hover" href={href}>
			{children}
		</a>
	</li>

export default FooterMenuItem

/* previous implementation
import Link from "gatsby-link"

export default ({href, children}) =>
	<li className="fl-ns ph1 pv2">
		<Link className="white b link underline-hover" to={{href}}>
			{children}
		</Link>
	</li>
*/
