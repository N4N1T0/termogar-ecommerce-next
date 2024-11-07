// Components Imports
import ProductCardRowStyleOne from '@/components/Helpers/Cards/ProductCardRowStyleOne'
import DataIteration from '@/components/Helpers/DataIteration'

// Utils Imports
import { cn } from '@/lib/utils'

// Types Imports
import { SectionStyleTwoProps } from '@/types'

export default function SectionStyleTwo({
  className,
  products
}: SectionStyleTwoProps) {
  return (
    <div
      className={cn(
        'section-content grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:gap-[30px]',
        className
      )}
    >
      <DataIteration datas={products} startLength={0} endLength={4}>
        {({ datas }) => (
          <div key={datas.id} className='item w-full'>
            <ProductCardRowStyleOne datas={datas} />
          </div>
        )}
      </DataIteration>
    </div>
  )
}
