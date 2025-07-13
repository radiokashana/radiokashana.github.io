import Link from 'next/link'
import Menu from './Menu'

export default function Header() {
  return (
    <header role="banner" className="ma0 pa0">
      <Link href="/">
        <img className="w-100 ma0 pa0" src="/img/banner_web.png" alt="" />
      </Link>
      <Menu />
    </header>
  )
}