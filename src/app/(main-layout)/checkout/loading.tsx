import React from 'react'

const CheckoutPageLoading = () => {
  return (
    <main className='flex w-full animate-pulse flex-col items-center justify-center bg-white'>
      <div className='my-10 flex w-full flex-col items-center justify-center gap-5 px-10'>
        <div className='w-full'>
          <div className='h-5 w-1/5 animate-pulse bg-gray-200' />
        </div>
        <div className='h-10 w-3/5 animate-pulse bg-gray-200' />
        <div className='flex w-full gap-10'>
          <div className='h-16 flex-1 animate-pulse bg-gray-200' />
          <div className='h-16 flex-1 animate-pulse bg-gray-200' />
        </div>
        <div className='flex w-full gap-10'>
          <div className='flex flex-1 flex-col gap-5'>
            <div className='h-10 w-1/4 animate-pulse bg-gray-200' />
            {Array(10)
              .fill('Checkout Form')
              .map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className='h-8 w-full animate-pulse bg-gray-200'
                />
              ))}
          </div>
          <div className='flex flex-1 flex-col gap-5'>
            <div className='h-10 w-1/4 animate-pulse bg-gray-200' />
            {Array(10)
              .fill('Checkout Form')
              .map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className='h-8 w-full animate-pulse bg-gray-200'
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPageLoading
