import { getAllPosts } from '../lib/api'
import MainNews from '../components/MainNews'
import MainNew from '../components/MainNew'
import Ads from '../components/Ads'
import Embed from '../components/Embed'
import NewThumbList from '../components/NewThumbList'
import NewThumb from '../components/NewThumb'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getSettings } from '../lib/settings'

export default async function Home() {
  const posts = await getAllPosts()
  const settings = await getSettings()
  const { facebookLiveEmbedHtml } = settings
  
  const mainNews = posts
    .slice(0, 4)
    .map(post => (
      <MainNew
        key={post.slug}
        href={`/${post.slug}`}
        title={post.title}
        date={post.date}
        img={{ src: post.image, alt: "" }} 
      />
    ))

  const oldNews = posts
    .slice(4)
    .map(post => (
      <NewThumb
        key={post.slug}
        href={`/${post.slug}`}
        title={post.title}
        img={{ src: post.image, alt: "" }}
        excerpt={post.excerpt}
      />
    ))

  return (
    <>
      <Header />
      <main className="center-ns mw-100 ml2 mr2 w-two-thirds-ns georgia">
        {/* Floating Facebook Live embed */}
        <Embed html={facebookLiveEmbedHtml} />
        
        <section>
          <MainNews>
            {mainNews}
          </MainNews>
          <Ads/>
          <Ads/>
          <Ads/>
          <NewThumbList>
            {oldNews}
          </NewThumbList>
        </section>
      </main>
      <Footer />
    </>
  )
}