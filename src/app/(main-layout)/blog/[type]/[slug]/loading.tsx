import { renderPulseDivs } from '@/lib/ui-utils'

const TypeSlugBlogLoading = () => {
  return (
    <div className='container mx-auto flex animate-pulse flex-col items-center justify-center px-4 py-8'>
      <div className='flex w-full items-start justify-start'>
        <div className='my-3 h-8 w-1/5 bg-gray-200' />
      </div>
      <div className='my-3 h-8 w-1/5 bg-gray-200' />
      <div className='mt-3 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {renderPulseDivs(6, 'w-full', 'h-56', 'blog-loading')}
      </div>
    </div>
  )
}

export default TypeSlugBlogLoading
