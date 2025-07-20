import Link from 'next/link'

export default function NewThumb({ href, title, img, excerpt }) {
  return (
    <article className="flex mb-6 pb-6 border-b border-gray-200">
      <div className="w-1/4 mr-4">
        <Link href={href}>
          <img 
            src={img.src} 
            alt={img.alt}
            className="w-full h-24 object-cover"
          />
        </Link>
      </div>
      <div className="w-3/4">
        <Link href={href} className="no-underline hover:underline">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
        </Link>
        <p className="text-sm text-gray-700">{excerpt}...</p>
      </div>
    </article>
  )
}