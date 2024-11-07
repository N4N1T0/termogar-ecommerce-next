// Project Components Imports
import ProductCardStyleOne from '@/components/Helpers/Cards/ProductCardStyleOne'
import DataIteration from '@/components/Helpers/DataIteration'
import ViewMoreTitle from '@/components/Helpers/ViewMoreTitle'

// Types Imports
import { SectionStyleThreeProps } from '@/types'

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = []
}: SectionStyleThreeProps) {
  return (
    <div className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className='products-section w-full'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
            <DataIteration datas={products} startLength={0} endLength={12}>
              {({ datas }) => (
                <div data-aos='fade-up' key={datas.id} className='item'>
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
