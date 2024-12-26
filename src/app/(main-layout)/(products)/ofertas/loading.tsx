import React from 'react'

const categoriesLoading = () => {
  return (
    <main className='container-x mx-auto my-3 w-full bg-white'>
      <div className='mt-10 h-4 w-1/5 animate-pulse bg-gray-100' />
      <div className='mt-5 h-16 animate-pulse bg-gray-100' />
      <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array(8)
          .fill('CategoriesPage')
          .map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='h-64 w-full animate-pulse bg-gray-100'
            />
          ))}
      </div>
      <div className='mt-5 h-24 animate-pulse bg-gray-100' />
    </main>
  )
}

export default categoriesLoading
