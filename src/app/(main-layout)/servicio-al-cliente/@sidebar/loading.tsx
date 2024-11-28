import React from 'react'

const CostumerServiceSidebarLoading = () => {
  return (
    <div className='sticky top-0 m-4 h-screen w-72 animate-pulse divide-y overflow-y-auto bg-white px-4 pt-10 text-black'>
      <nav aria-label='Customer Service Navigation'>
        <div className='mb-4 h-12 rounded bg-gray-200' />
        <div className='mb-4 h-10 w-full rounded bg-gray-200' />
        <div className='mb-4 h-10 w-full rounded bg-gray-200' />
        {Array(8)
          .fill('CS Links')
          .map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='mb-4 h-5 w-full rounded bg-gray-200'
            />
          ))}
      </nav>
    </div>
  )
}

export default CostumerServiceSidebarLoading
