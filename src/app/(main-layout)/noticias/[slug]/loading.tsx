import { renderPulseDivs } from '@/lib/ui-utils'

const NewsArticleLoading = () => {
  return (
    <main className='flex w-full animate-pulse flex-col items-center justify-center'>
      <div className='my-14 flex w-full items-center justify-center'>
        {renderPulseDivs(1, 'w-2/4', 'h-10', 'headline')}
      </div>
      <div className='container-x mx-auto w-full'>
        <div className='mb-7 lg:flex lg:space-x-8'>
          <div className='flex-1 space-y-5'>
            {renderPulseDivs(3, 'w-full', 'h-[457px]', 'image-large')}
            {renderPulseDivs(2, 'w-full', 'h-[225px]', 'image-small')}
          </div>
          <div className='w-64 space-y-5'>
            {renderPulseDivs(3, 'w-full', 'h-64', 'side-image')}
          </div>
        </div>
      </div>
    </main>
  )
}

export default NewsArticleLoading
