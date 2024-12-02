// * ASSETS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_IDS } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'

const RelatedProducts = async ({ productsId }: { productsId: string[] }) => {
  const searchedProducts = await sanityClientRead.fetch(
    GET_CARD_STYLE_ONE_PRODUCTS_BY_IDS,
    {
      ids: productsId
    }
  )
  return (
    <section
      id='related-products'
      className='container-x mx-auto mb-10 w-full bg-white py-5'
    >
      <h3 className='font-600 text-xl leading-none text-gray-900 sm:text-3xl'>
        Productos Relacionados
      </h3>
      <div className='products-section w-full'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
          {searchedProducts
            .slice(0, 12)
            .map(
              (
                product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
              ) => (
                <div key={product.id} className='item'>
                  <ProductCardStyleOne<
                    GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                  >
                    datas={product}
                    priority={false}
                  />
                </div>
              )
            )}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts
