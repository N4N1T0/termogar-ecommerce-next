import { renderPulseDivs } from '@/lib/ui-utils'

const CategoriesLoading = () => {
  return (
    <main className='container-x mx-auto my-3 w-full bg-white'>
      <div className='mt-10 h-4 w-1/5 animate-pulse bg-gray-100' />
      <div className='mt-5 h-16 animate-pulse bg-gray-100' />
      <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {renderPulseDivs(8, 'w-full', 'h-64', 'offers-loading')}
      </div>
      <div className='mt-5 h-24 animate-pulse bg-gray-100' />
    </main>
  )
}

export default CategoriesLoading
