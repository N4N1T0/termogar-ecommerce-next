import { renderPulseDivs } from '@/lib/ui-utils'
import React from 'react'

const BlogArticleLoading = () => {
  return (
    <main className='flex w-full animate-pulse flex-col items-center justify-center'>
      <div className='my-14 flex w-full items-center justify-center'>
        <div className='h-10 w-2/4 rounded bg-gray-200' />
      </div>
      <div className='container-x mx-auto w-full'>
        <div className='mb-7 lg:flex lg:space-x-8'>
          <div className='flex-1 space-y-5'>
            {renderPulseDivs(3, '457px', 'full', 'blog-loading')}
            {renderPulseDivs(3, '225px', 'full', 'blog-loading-2')}
          </div>
          <div className='w-64 space-y-5'>
            {renderPulseDivs(3, '64', 'full', 'blog-loading-3')}
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogArticleLoading
