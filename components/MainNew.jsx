import Link from 'next/link'
import { formatDate } from '../lib/formatDate'

export default function MainNew({ href, title, date, img }) {
  const formattedDate = formatDate(date)

  return (
    <article className="w-full md:w-3/10 mb-4">
      <Link href={href} className="hover:opacity-80 block">
        <div className="relative h-40 mb-2">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <div className="text-sm text-gray-600">{formattedDate}</div>
      </Link>
    </article>
  )
}