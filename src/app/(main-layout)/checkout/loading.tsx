// * ASSETS IMPORTS
import { renderPulseDivs } from '@/lib/ui-utils'

const CheckoutPageLoading = () => {
  return (
    <main className='container-x mx-auto flex w-full animate-pulse flex-col items-center justify-center bg-white'>
      <div className='my-10 flex w-full flex-col items-center justify-center gap-5 px-10'>
        <div className='w-full'>
          <div className='h-5 w-1/5 animate-pulse bg-gray-200' />
        </div>
        <div className='h-10 w-3/5 animate-pulse bg-gray-200' />
        <div className='flex w-full gap-10'>
          {renderPulseDivs(2, 'flex-1', 'h-16', 'checkout-loading')}
        </div>
        <div className='flex w-full gap-10'>
          <div className='flex flex-1 flex-col gap-5'>
            <div className='h-10 w-1/4 animate-pulse bg-gray-200' />
            {renderPulseDivs(2, 'flex-1', 'h-8', 'checkout-loading-2')}
            <div className='h-5 w-full animate-pulse bg-gray-200' />
            {renderPulseDivs(4, 'flex-1', 'h-8', 'checkout-loading-3')}
            <div className='h-5 w-full animate-pulse bg-gray-200' />
          </div>
          <div className='flex flex-1 flex-col gap-5'>
            <div className='h-10 w-1/4 animate-pulse bg-gray-200' />
            {renderPulseDivs(3, 'w-full', 'h-8', 'checkout-loading-4')}
            <div className='h-14 w-full animate-pulse bg-gray-200' />
            {renderPulseDivs(3, 'w-full', 'h-8', 'checkout-loading-5')}
            <div className='h-10 w-full animate-pulse bg-gray-200' />
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPageLoading
