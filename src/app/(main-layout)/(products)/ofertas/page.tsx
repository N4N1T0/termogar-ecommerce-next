// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import BreadcrumbCom from '@/components/BreadcrumbCom'
import LinkOrDiv from '@/components/Shared/link-or-div'
import OrderSelect from '@/components/AllProductPage/order-select'
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_BY_OFFER } from '@/sanity/lib/queries'
import { filteredProductsByOrder, filterProductsByFilter } from '@/lib/utils'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import { Logger } from 'next-axiom'
import { jldProductList } from '@/components/seo'
import OffersBanners from '@/components/FlashSale/offers-banner'

const log = new Logger()
export const dynamic = 'force-dynamic'

// * METADATA
export const metadata: Metadata = {
  title: 'Ofertas',
  description: 'Encuentra las mejores ofertas en termogar'
}

const CategoriesPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { orderBy, min, max, subcat } = await searchParams
  const searchedOffers = await sanityClientRead.fetch(
    GET_PRODUCTS_BY_OFFER,
    {},
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  if (!searchedOffers) {
    log.error('Product with offers not found', { searchedOffers })
    return notFound()
  }

  // * BY ORDER
  const orderProducts = filteredProductsByOrder(
    searchedOffers.products,
    orderBy
  )

  // * BY FILTER
  const products = filterProductsByFilter(orderProducts, min, max, subcat)

  const middlePart =
    products.length > 8 ? Math.floor(products.length / 2) : null

  return (
    <main className='container-x mx-auto w-full'>
      <BreadcrumbCom
        paths={[
          { name: 'P. Principal', path: '/' },
          {
            name: 'Ofertas',
            path: '/ofertas'
          }
        ]}
        className='mt-10'
      />
      <div className='w-full'>
        <OffersBanners data={searchedOffers.offer} />
        <div className='mb-10 flex w-full flex-col space-y-5 bg-white px-7 md:h-16 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <p className='font-400 text-base'>
            <span className='text-lg text-accent'> {products.length}</span>{' '}
            Productos Encontrados
          </p>
          <OrderSelect url='/ofertas' orderBy={orderBy} />
        </div>
        {middlePart ? (
          <>
            <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {products
                .slice(0, middlePart)
                .map(
                  (
                    product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                  ) => (
                    <div data-aos='fade-up' key={product.id}>
                      <ProductCardStyleOne datas={product} priority={true} />
                    </div>
                  )
                )}
            </div>
            <LinkOrDiv banner={searchedOffers.banner} />
            <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {products
                .slice(middlePart, products.length)
                .map(
                  (
                    product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                  ) => (
                    <div data-aos='fade-up' key={product.id}>
                      <ProductCardStyleOne datas={product} priority={false} />
                    </div>
                  )
                )}
            </div>
          </>
        ) : (
          <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map(
              (
                product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
              ) => (
                <div data-aos='fade-up' key={product.id}>
                  <ProductCardStyleOne datas={product} priority={false} />
                </div>
              )
            )}
          </div>
        )}
      </div>
      {jldProductList(products)}
    </main>
  )
}

export default CategoriesPage