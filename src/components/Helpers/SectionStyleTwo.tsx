// * ASSETS IMPORTS
import ProductCardRowStyleOne from './Cards/product-card-row-style-one'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { ProductCardType, SectionStyleTwoProps } from '@/types'
import ViewMoreTitle from './view-more-title'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'

const SectionStyleTwo = async ({
  className,
  sectionTitle,
  seeMoreUrl
}: SectionStyleTwoProps) => {
  const searchedProducts = await sanityClientRead.fetch(
    GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY,
    { type: sectionTitle === null ? ['Calentadores'] : [sectionTitle] }
  )
  return (
    <section id='section-5' className={cn('section-style-one', className)}>
      <ViewMoreTitle
        categoryTitle={sectionTitle || 'Calentadores'}
        seeMoreUrl={`/categorias/${seeMoreUrl || 'calentadores'}`}
      >
        <div className='products-section w-full'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-[30px]'>
            {searchedProducts
              .slice(0, 12)
              .map(
                (
                  product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                ) => (
                  <div key={product.id} className='item w-full'>
                    <ProductCardRowStyleOne
                      datas={product as ProductCardType}
                      priority={false}
                    />
                  </div>
                )
              )}
          </div>
        </div>
      </ViewMoreTitle>
    </section>
  )
}

export default SectionStyleTwo
