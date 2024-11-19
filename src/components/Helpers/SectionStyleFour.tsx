import { cn } from '@/lib/utils'
import ProductCardRowStyleTwo from '@/components/Helpers/Cards/product-card-row-style-one'
import ViewMoreTitle from '@/components/Helpers/view-more-title'

// Types Imports
import { ProductCardType, SectionStyleFourProps } from '@/types'

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
              {products.slice(0, 4).map((product: ProductCardType) => (
                <ProductCardRowStyleTwo
                  key={product.id}
                  datas={product}
                  priority={false}
                />
              ))}
            </div>
            <div className='item-col'>
              {products.slice(4, 8).map((product: ProductCardType) => (
                <ProductCardRowStyleTwo
                  key={product.id}
                  datas={product}
                  priority={false}
                />
              ))}
            </div>
            <div className='item-col'>
              {products.slice(8, 12).map((product: ProductCardType) => (
                <ProductCardRowStyleTwo
                  key={product.id}
                  datas={product}
                  priority={false}
                />
              ))}
            </div>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  )
}
