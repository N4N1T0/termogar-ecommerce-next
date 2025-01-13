import { renderPulseDivs } from '@/lib/ui-utils'

const NewsLoading = () => {
  return (
    <div className='container-x mx-auto flex animate-pulse flex-col items-center justify-center px-4 py-8'>
      <div className='flex w-full items-start justify-start'>
        {renderPulseDivs(1, 'w-1/5', 'h-8', 'title')}
      </div>
      <div>{renderPulseDivs(1, 'w-1/5', 'h-8', 'subtitle')}</div>
      <div className='mt-3 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {renderPulseDivs(6, 'w-full', 'h-56', 'card')}
      </div>
    </div>
  )
}

export default NewsLoading
