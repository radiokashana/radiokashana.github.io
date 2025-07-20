import Link from 'next/link'

export default function MenuItem({ href, children }) {
  return (
    <li className="dib">
      <Link 
        href={href} 
        className="dib no-underline white pa2 hover:bg-black hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}