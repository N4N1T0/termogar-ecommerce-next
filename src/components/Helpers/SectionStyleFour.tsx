import { cn } from '@/lib/utils'
import ProductCardRowStyleTwo from './Cards/ProductCardRowStyleTwo'
import DataIteration from './DataIteration'
import ViewMoreTitle from './view-more-title'

// Types Imports
import { SectionStyleFourProps } from '@/types'

export default function SectionStyleFour({
  className,
  sectionTitle,
  seeMoreUrl,
  products = []
}: SectionStyleFourProps) {
  return (
    <div className={cn('section-style-one', className)}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className='products-section w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-5 xl:gap-[30px]'>
            <div className='item-col'>
              <DataIteration datas={products} startLength={0} endLength={4}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
            <div className='item-col'>
              <DataIteration datas={products} startLength={4} endLength={8}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
            <div className='item-col'>
              <DataIteration datas={products} startLength={8} endLength={12}>
                {({ datas }) => (
                  <ProductCardRowStyleTwo key={datas.id} datas={datas} />
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
