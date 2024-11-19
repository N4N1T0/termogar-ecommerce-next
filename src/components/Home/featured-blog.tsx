// * ASSETS IMPORTS
import DataIteration from '@/components/Helpers/DataIteration'
import BlogCard from '@/components/Helpers/Cards/blog-card'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_BLOG_POST } from '@/sanity/lib/queries'
import { GET_CARD_BLOG_POSTResult } from '@/types/sanity'

const FeaturedBlog = async () => {
  const blogPosts = await sanityClientRead.fetch(GET_CARD_BLOG_POST, {
    type: ['Blog']
  })
  return (
    <div className='container-x mx-auto mb-[60px]'>
      <h3 className='font-600 mb-5 text-xl leading-none text-gray-900 sm:text-3xl'>
        Articulos destacados
      </h3>
      <div className='mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:gap-[30px] xl:grid-cols-3'>
        <DataIteration datas={blogPosts} startLength={0} endLength={6}>
          {({
            datas
          }: {
            datas: GET_CARD_BLOG_POSTResult[number]
            index: number
          }) => (
            <div data-aos='fade-up' className='item w-full'>
              <BlogCard data={datas} priority={false} type='blog' />
            </div>
          )}
        </DataIteration>
      </div>
    </div>
  )
}

export default FeaturedBlog
