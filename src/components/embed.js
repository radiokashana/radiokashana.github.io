import React from "react"

export default ({ html }) =>
	<section className="center dib w-75 w-40-ns cl" dangerouslySetInnerHTML={{ __html: html }} />
