// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * PROJECT COMPONENTS IMPORTS
import PaginationBlog from '@/components/Blogs/Pagination'
import BlogCard from '@/components/Helpers/Cards/blog-card'
import PageTitle from '@/components/Helpers/PageTitle'

// * QUERIES IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import {
  GET_CARD_BLOG_POST,
  GET_CARD_BLOG_POST_PAGINATION,
  GET_TOTAL_BLOG_POST
} from '@/sanity/lib/queries'

// * ISR
export const revalidate = 84600

// * METADATA
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Encuentra el artículo que mejor se adapte a tus necesidades.'
}

const BlogPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { lastId, currentPage } = await searchParams
  const blogPosts = lastId
    ? await sanityClientRead.fetch(GET_CARD_BLOG_POST_PAGINATION, {
        type: ['Blog'],
        lastId
      })
    : await sanityClientRead.fetch(GET_CARD_BLOG_POST, {
        type: ['Blog']
      })

  const totalPages = await sanityClientRead
    .withConfig({ useCdn: false })
    .fetch(GET_TOTAL_BLOG_POST, { type: ['Blog'] })

  return (
    <main>
      <div className='blogs-wrapper w-full-width'>
        <div className='title-bar'>
          <PageTitle
            title='Nuestros Artículos'
            breadcrumb={[
              { name: 'P. Principal', path: '/' },
              { name: 'Artículos', path: '/blog' }
            ]}
          />
        </div>
      </div>
      <div className='w-full py-[60px]'>
        <div className='container-x mx-auto'>
          <div className='w-full'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-[30px] xl:grid-cols-3'>
              {blogPosts.map((post, index) => (
                <div data-aos='fade-up' className='item w-full' key={post.id}>
                  <BlogCard type='blog' data={post} priority={index < 6} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PaginationBlog
        lastId={blogPosts[blogPosts.length - 1].id}
        totalPages={Math.ceil(totalPages / 12)}
        currentPage={currentPage ? Number(currentPage) : 1}
        type='blog'
      />
    </main>
  )
}

export default BlogPage
