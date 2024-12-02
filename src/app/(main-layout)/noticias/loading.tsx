import React from 'react'

const NewsLoading = () => {
  return (
    <div className='container-x mx-auto flex animate-pulse flex-col items-center justify-center px-4 py-8'>
      <div className='flex w-full items-start justify-start'>
        <div className='my-3 h-8 w-1/5 bg-gray-200' />
      </div>
      <div className='my-3 h-8 w-1/5 bg-gray-200' />
      <div className='mt-3 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {Array(6)
          .fill('Categories Page')
          .map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='overflow-hidden bg-white shadow-lg'
            >
              <div className='relative h-56'>
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20'></div>
              </div>
              <div className='space-y-2 p-4'>
                <div className='h-4 w-1/2 rounded bg-gray-200' />
                <div className='h-4 w-full rounded bg-gray-200' />
                <div className='h-4 w-full rounded bg-gray-200' />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default NewsLoading
