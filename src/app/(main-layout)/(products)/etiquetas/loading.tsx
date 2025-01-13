import { renderPulseDivs } from '@/lib/ui-utils'

const CategoryLoading = () => {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center px-4 py-8'>
      <div className='my-3 h-8 w-1/5 animate-pulse bg-gray-200' />
      <div className='mt-3 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`category-${index}`}
            className='overflow-hidden bg-white shadow-lg'
          >
            <div className='relative h-56'>
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20'></div>
            </div>
            <div className='space-y-2 p-4'>
              {renderPulseDivs(3, 'w-full rounded', 'h-4', 'category-loading')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryLoading
