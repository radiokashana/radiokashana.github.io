import React from "react"

const Embed = ({ html }) =>
	<section className="center dib w-75 w-40-ns cl" dangerouslySetInnerHTML={{ __html: html }} />

export default Embed
