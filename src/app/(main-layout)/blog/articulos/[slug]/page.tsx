// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import Image from 'next/image'

// * ASSETS IMPORTS
import { PlaceholderBlogPost } from '@/assets'
import BlogSideBar from '@/components/Blogs/side-bar'
import PageTitle from '@/components/Helpers/PageTitle'
import { UserCircle, Calendar } from 'lucide-react'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import {
  GET_BLOG_ARTICLE_BY_SLUG,
  GET_STATIC_BLOG_OR_NEWS_SLUG
} from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'
import { jldBlogArticle } from '@/components/seo'
import { portableTextComponents } from '@/components/Helpers/PortableText'

// * ISR
export const revalidate = 43200

export async function generateStaticParams() {
  const blogPost = await sanityClientRead.fetch(GET_STATIC_BLOG_OR_NEWS_SLUG, {
    type: ['Blog']
  })
  return blogPost.map((post) => ({
    slug: String(post.slug)
  }))
}

// * METADATA
export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug } = await params

  const searchedPostArticule = await sanityClientRead.fetch(
    GET_BLOG_ARTICLE_BY_SLUG,
    { slug: slug }
  )

  return {
    title: searchedPostArticule?.title || 'Sin Titulo',
    description: searchedPostArticule?.excerpt || 'Sin Descripcion',
    openGraph: {
      images: searchedPostArticule?.featuredMedia.url || '/favicon.ico'
    }
  }
}

const BogArticlePage = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params

  const searchedPostArticule = await sanityClientRead.fetch(
    GET_BLOG_ARTICLE_BY_SLUG,
    { slug: slug }
  )

  if (!searchedPostArticule) {
    return null
  }

  const {
    title,
    slug: blogSlug,
    featuredMedia,
    author,
    date,
    content
  } = searchedPostArticule

  return (
    <main className='w-full'>
      <div className='mb-[60px]'>
        <PageTitle
          title={title || 'Sin Titulo'}
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: title || 'Sin Titulo', path: `/blogs/${blogSlug}` }
          ]}
        />
      </div>
      <div className='container-x mx-auto w-full'>
        <div className='mb-7 lg:flex lg:space-x-8'>
          <div className='flex-1'>
            <div className='h-[457px] w-full'>
              <Image
                src={featuredMedia.url || PlaceholderBlogPost}
                alt={title || 'Sin Titulo'}
                title={title || 'Sin Titulo'}
                placeholder='blur'
                width={740}
                height={600}
                priority
                blurDataURL={
                  featuredMedia.blur || PlaceholderBlogPost.blurDataURL
                }
                className='h-full w-full object-cover'
              />
            </div>
            <div className='blog pl-6 pt-6'>
              <div className='short-data mb-3 flex items-center space-x-9'>
                <div className='flex items-center space-x-1.5'>
                  <UserCircle className='h-5 w-5 text-tertiary' />
                  <span className='text-base capitalize text-gray-700'>
                    {author?.name}
                  </span>
                </div>
                <div className='flex items-center space-x-1.5'>
                  <Calendar className='h-5 w-5 text-tertiary' />
                  <span className='text-base text-gray-700'>
                    {date
                      ? new Date(date).toLocaleDateString('es-es')
                      : new Date().toLocaleDateString('es-es')}
                  </span>
                </div>
              </div>
              {content ? (
                <section
                  id='content'
                  className='prose w-full max-w-none text-pretty'
                >
                  <PortableText
                    value={content}
                    components={portableTextComponents}
                  />
                </section>
              ) : (
                <p className='text-xl text-gray-700'>Sin Contenido</p>
              )}
            </div>
          </div>
          <BlogSideBar
            categories={searchedPostArticule.categories}
            tags={searchedPostArticule.tags}
            type='blog'
          />
        </div>
      </div>
      {jldBlogArticle(searchedPostArticule)}
    </main>
  )
}

export default BogArticlePage
