import React from 'react'

const LegalPages = () => {
  return (
    <main className='flex w-full animate-pulse flex-col items-center justify-center bg-white'>
      <div className='my-10 flex w-full flex-col items-center justify-center gap-5 px-10'>
        <div className='w-full'>
          <div className='h-5 w-1/5 animate-pulse bg-gray-200' />
        </div>
        <div className='h-10 w-3/5 animate-pulse bg-gray-200' />
      </div>
      {Array(2)
        .fill('Legal Pages')
        .map((item, index) => (
          <div key={`${item}-${index}`} className='my-2 w-full space-y-5 px-10'>
            <div className='h-10 w-full bg-gray-200' />
            <div className='h-10 w-full bg-gray-200' />
            <div className='h-20 w-full bg-gray-200' />
            <div className='h-10 w-full bg-gray-200' />
            <div className='h-20 w-full bg-gray-200' />
          </div>
        ))}
    </main>
  )
}

export default LegalPages
