// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import { Calendar } from 'lucide-react'
import BlogNewsletter from './newsletter'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { BlogSideBarProps } from '@/types'
import { GET_LATEST_BLOG_POSTS_BY_CATEGORIES } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

const log = new Logger()

const BlogSideBar = async ({ categories, tags, type }: BlogSideBarProps) => {
  const latestPosts = await sanityClientRead.fetch(
    GET_LATEST_BLOG_POSTS_BY_CATEGORIES,
    {
      type: [categories?.[0]?.name || 'Blog']
    }
  )

  if (!latestPosts) {
    log.error('Blog posts not found', { latestPosts })
  }

  return (
    <div className='w-full lg:w-[370px]'>
      <div
        data-aos='fade-up'
        className='latest-post-widget mb-8 w-full bg-white p-8'
      >
        <h2 className='mb-5 border-b border-gray-200 pb-2 text-[22px] font-bold text-gray-900'>
          Últimos Artículos
        </h2>
        <ul className='flex flex-col space-y-5'>
          {latestPosts.map(({ date, featuredMedia, id, title, slug }) => (
            <li className='group h-24' key={id}>
              <Link
                href={`${type === 'blog' ? '/blog/articulos/' : '/noticias/'}${slug}`}
                className='flex items-center gap-3'
              >
                <div className='h-full w-24 overflow-hidden rounded'>
                  <Image
                    src={featuredMedia.url || PlaceholderSquare}
                    alt={title || 'Sin Nombre'}
                    title={title || 'Sin Nombre'}
                    width={100}
                    height={100}
                    priority
                    placeholder='blur'
                    blurDataURL={
                      featuredMedia.blur || PlaceholderSquare.blurDataURL
                    }
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex h-full flex-1 flex-col justify-between'>
                  <p className='hover-200 line-clamp-2 text-[18px] leading-7 text-gray-900 group-hover:text-accent'>
                    {title}
                  </p>
                  <div className='flex items-center space-x-3'>
                    <Calendar className='h-5 w-5 text-tertiary' />
                    <span className='text-sm text-gray-700'>
                      {date
                        ? new Date(date).toLocaleDateString('es-es')
                        : new Date().toLocaleDateString('es-es')}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {type === 'blog' && (
        <>
          {categories && (
            <div data-aos='fade-up' className='mb-6 w-full bg-white p-8'>
              <h3 className='mb-4 border-b border-gray-200 pb-2 text-[22px] font-bold text-gray-900'>
                Categorías
              </h3>
              <ul className='flex flex-col space-y-5'>
                {categories.map(({ id, name, slug, count }) => (
                  <li
                    className='group flex items-center justify-between'
                    key={id}
                  >
                    <Link
                      href={`/blog/categorias/${slug}`}
                      className='hover-200 text-base text-gray-700 group-hover:text-accent'
                    >
                      {name}
                      <span className='hover-200 text-base text-gray-700 group-hover:text-accent'>
                        ({count})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tags && (
            <div data-aos='fade-up' className='mb-6 w-full bg-white p-8'>
              <h3 className='mb-4 border-b border-gray-200 text-[22px] font-bold text-gray-900'>
                Etiquetas Populares
              </h3>
              <div className='filter-items'>
                <div className='flex flex-wrap gap-2'>
                  {tags.map(({ id, name, slug, count }) => (
                    <Link
                      href={`/blog/etiquetas/${slug}`}
                      key={id}
                      className='hover-200 group mb-1 cursor-pointer bg-gray-100 px-3 py-1 text-base text-gray-600 hover:bg-accent hover:text-gray-100'
                    >
                      {name}{' '}
                      <span className='hover-200 text-base text-gray-700 group-hover:text-gray-100'>
                        ({count})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <BlogNewsletter />
    </div>
  )
}

export default BlogSideBar
