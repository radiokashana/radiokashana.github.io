import { getAllPosts, getPostBySlug } from '../../lib/api'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { formatDate } from '../../lib/formatDate'

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  
  return {
    title: `${post.title} - RadioKashana`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - RadioKashana`,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <>
        <Header />
        <main className="center-ns mw-100 ml2 mr2 w-two-thirds-ns georgia">
          <h2>Post not found</h2>
          <p>The requested post could not be found.</p>
        </main>
        <Footer />
      </>
    )
  }

  const formattedDate = formatDate(post.date)

  return (
    <>
      <Header />
      <main className="center-ns mw-100 ml2 mr2 w-two-thirds-ns georgia">
        <article>
          <h2>{post.title}</h2>
          <p className="text-gray-600">{formattedDate}</p>
          <section>
            <aside className="fr w-50 ml4 mb3">
              <img src={post.image} alt="" />
            </aside>
            <main className="w-100 tj">
              {post.content}
            </main>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}