import Link from 'next/link'

export default function FooterMenuItem({ href, children }) {
  const isExternal = href.startsWith('http')
  
  if (isExternal) {
    return (
      <li className="dib">
        <a 
          href={href} 
          className="dib no-underline white pa2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      </li>
    )
  }
  
  return (
    <li className="dib">
      <Link 
        href={href} 
        className="dib no-underline white pa2 hover:underline"
      >
        {children}
      </Link>
    </li>
  )
}