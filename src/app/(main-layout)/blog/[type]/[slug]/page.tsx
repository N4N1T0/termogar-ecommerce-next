// * NEXT.JS IMPORTS
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import {
  GET_CARD_BLOG_POST_BY_CATEGORIES,
  GET_CARD_BLOG_POST_BY_TAGS
} from '@/sanity/lib/queries'
import PageTitle from '@/components/Helpers/PageTitle'
import BlogCard from '@/components/Helpers/Cards/blog-card'
import { sanityClientRead } from '@/sanity/lib/client'
import { Logger } from 'next-axiom'

const log = new Logger()
// * METADATA
export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { type, slug } = await params

  return {
    title: Array.isArray(slug) || slug === undefined ? 'blog' : slug,
    description: Array.isArray(type) || type === undefined ? 'blog' : type
  }
}

const CategoriesOrTagPage = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { type, slug } = await params

  if (type !== 'categorias' && type !== 'etiquetas') {
    return notFound()
  }

  const blogPosts =
    type === 'categorias'
      ? await sanityClientRead.fetch(
          GET_CARD_BLOG_POST_BY_CATEGORIES,
          {
            slug: [slug]
          },
          {
            cache: 'force-cache',
            next: {
              revalidate: 600
            }
          }
        )
      : await sanityClientRead.fetch(
          GET_CARD_BLOG_POST_BY_TAGS,
          {
            slug: [slug]
          },
          {
            cache: 'force-cache',
            next: {
              revalidate: 600
            }
          }
        )

  if (!blogPosts) {
    log.error('Blog posts not found', { blogPosts })
  }

  return (
    <main>
      <div className='blogs-wrapper w-full-width'>
        <div className='title-bar'>
          <PageTitle
            title={`${type === 'categorias' ? 'Categoría' : 'Etiqueta'} - ${slug}`}
            breadcrumb={[
              { name: 'P. Principal', path: '/' },
              { name: 'Blog', path: '/blog' },
              {
                name: Array.isArray(slug) || slug === undefined ? 'blog' : slug,
                path: `/blog/${type || 'blog'}/${slug || 'slug'}`
              }
            ]}
          />
        </div>
      </div>
      <div className='w-full py-[60px]'>
        <div className='container-x mx-auto'>
          <div className='w-full'>
            <div className='grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-0 lg:gap-[30px] xl:grid-cols-3'>
              {blogPosts.map((post, index) => (
                <div data-aos='fade-up' className='item w-full' key={post.id}>
                  <BlogCard type='blog' data={post} priority={index < 6} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CategoriesOrTagPage
