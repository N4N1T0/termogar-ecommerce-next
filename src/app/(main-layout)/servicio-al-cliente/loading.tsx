import { renderPulseDivs } from '@/lib/ui-utils'

const CostumerServiceLoading = () => {
  return (
    <main className='flex w-full animate-pulse flex-col items-center justify-center bg-white'>
      <div className='my-10 flex w-full flex-col items-center justify-center gap-5 px-10'>
        {renderPulseDivs(1, 'w-1/5', 'h-5', 'title')}
        {renderPulseDivs(1, 'w-3/5', 'h-10', 'subtitle')}
      </div>
      {Array(2)
        .fill('Legal Pages')
        .map((item, index) => (
          <div key={`${item}-${index}`} className='my-2 w-full space-y-5 px-10'>
            {renderPulseDivs(5, 'w-full', 'h-10', 'legal-page')}
            {renderPulseDivs(2, 'w-full', 'h-20', 'legal-page-large')}
          </div>
        ))}
    </main>
  )
}

export default CostumerServiceLoading
