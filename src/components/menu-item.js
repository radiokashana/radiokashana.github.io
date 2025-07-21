import React from "react"
import { Link } from "gatsby"

const MenuItem = ({href, children}) =>
	<li className="float-left px-1 py-2 text-white font-bold bl--mid-gray br--near-black">
		<Link className="block text-white font-bold hover:underline text-lg" to={{href}}>
			{children}
		</Link>
	</li>

export default MenuItem
