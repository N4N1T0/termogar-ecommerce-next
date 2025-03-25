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
import { GET_BLOG_ARTICLE_BY_SLUG } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'
import { jldBlogArticle } from '@/components/seo'
import { portableTextComponents } from '@/components/Helpers/PortableText'
import { notFound } from 'next/navigation'
import { Logger } from 'next-axiom'

const log = new Logger()
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
    { slug: slug },
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  if (!searchedPostArticule) {
    log.error('Blog posts not found', { searchedPostArticule })
    return notFound()
  }

  return (
    <main className='w-full'>
      <PageTitle
        title={searchedPostArticule.title || 'Sin Titulo'}
        className='mb-14 h-fit'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Blog', path: '/blog' },
          {
            name: searchedPostArticule.title || 'Sin Titulo',
            path: `/blog/${searchedPostArticule.slug}`
          }
        ]}
      />
      <div className='container-x mx-auto mb-7 w-full lg:flex lg:space-x-8'>
        <div className='flex-1 bg-white'>
          <div className='h-[257] w-full md:h-[457px]'>
            <Image
              src={
                searchedPostArticule.featuredMedia.url || PlaceholderBlogPost
              }
              alt={searchedPostArticule.title || 'Sin Titulo'}
              title={searchedPostArticule.title || 'Sin Titulo'}
              placeholder='blur'
              width={740}
              height={600}
              priority
              blurDataURL={
                searchedPostArticule.featuredMedia.blur ||
                PlaceholderBlogPost.blurDataURL
              }
              className='h-full w-full object-fill'
              id='primaryimage'
            />
          </div>
          <div className='px-6 pt-6'>
            <div className='mb-3 flex items-center space-x-9'>
              <div className='flex items-center space-x-1.5'>
                <UserCircle className='h-5 w-5 text-tertiary' />
                <span className='text-base capitalize text-gray-700'>
                  {searchedPostArticule.author?.name}
                </span>
              </div>
              <div className='flex items-center space-x-1.5'>
                <Calendar className='h-5 w-5 text-tertiary' />
                <span className='text-base text-gray-700'>
                  {searchedPostArticule.date
                    ? new Date(searchedPostArticule.date).toLocaleDateString(
                        'es-es'
                      )
                    : new Date().toLocaleDateString('es-es')}
                </span>
              </div>
            </div>
            {searchedPostArticule.content ? (
              <section
                id='content'
                className='prose w-full max-w-none text-pretty px-3'
              >
                <PortableText
                  value={searchedPostArticule.content}
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
      {jldBlogArticle(searchedPostArticule)}
    </main>
  )
}

export default BogArticlePage
