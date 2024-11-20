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
import { GET_CARD_BLOG_POST_BY_CATEGORIESResult } from '@/types/sanity'
import DataIteration from '@/components/Helpers/DataIteration'
import BlogCard from '@/components/Helpers/Cards/blog-card'
import { sanityClientRead } from '@/sanity/lib/client'

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
      ? await sanityClientRead.fetch(GET_CARD_BLOG_POST_BY_CATEGORIES, {
          slug: [slug]
        })
      : await sanityClientRead.fetch(GET_CARD_BLOG_POST_BY_TAGS, {
          slug: [slug]
        })

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
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-[30px] xl:grid-cols-3'>
              <DataIteration
                datas={blogPosts}
                startLength={0}
                endLength={blogPosts.length}
              >
                {({
                  datas,
                  index
                }: {
                  datas: GET_CARD_BLOG_POST_BY_CATEGORIESResult[number]
                  index: number
                }) => (
                  <div data-aos='fade-up' className='item w-full'>
                    <BlogCard type='blog' data={datas} priority={index < 6} />
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CategoriesOrTagPage
