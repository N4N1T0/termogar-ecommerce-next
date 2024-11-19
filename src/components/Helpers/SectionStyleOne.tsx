// * ASSETS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'
import DataIteration from '@/components/Helpers/DataIteration'
import ViewMoreTitle from '@/components/Helpers/view-more-title'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { SectionStyleOneProps } from '@/types'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import { cn } from '@/lib/utils'

const SectionStyleOne = async ({
  className,
  sectionTitle,
  seeMoreUrl
}: SectionStyleOneProps) => {
  const searchedProducts = await sanityClientRead.fetch(
    GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY,
    { type: sectionTitle === null ? ['Calentadores'] : [sectionTitle] }
  )
  return (
    <section
      id='section-1'
      data-aos='fade-up'
      className={cn('section-style-one', className)}
    >
      <ViewMoreTitle
        categoryTitle={sectionTitle || 'Calentadores'}
        seeMoreUrl={`/categorias/${seeMoreUrl || 'calentadores'}`}
      >
        <div className='products-section w-full'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
            <DataIteration<
              GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
            >
              datas={searchedProducts}
              startLength={0}
              endLength={4}
            >
              {({ datas }) => (
                <div key={datas.id} className='item'>
                  <ProductCardStyleOne<
                    GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                  >
                    datas={datas}
                    priority={false}
                  />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </section>
  )
}

export default SectionStyleOne
