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
            <div className='h-[457px] w-full bg-gray-200' />
            <div className='h-[225px] w-full bg-gray-200' />
            <div className='h-[225px] w-full bg-gray-200' />
          </div>
          <div className='w-64 space-y-5'>
            <div className='h-64 w-full rounded bg-gray-200' />
            <div className='h-64 w-full rounded bg-gray-200' />
            <div className='h-64 w-full rounded bg-gray-200' />
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogArticleLoading
