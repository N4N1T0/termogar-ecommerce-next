// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import BreadcrumbCom from '@/components/BreadcrumbCom'
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'
import OrderSelect from '@/components/AllProductPage/order-select'
import LinkOrDiv from '@/components/Shared/link-or-div'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_BRANDS_AND_PRODUCTS } from '@/sanity/lib/queries'
import {
  desurlizeForBreadcrumbs,
  filteredProductsByOrder,
  filterProductsByFilter
} from '@/lib/utils'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import { Logger } from 'next-axiom'
import { jldProductList } from '@/components/seo'

const log = new Logger()
export const dynamic = 'force-dynamic'

// * METADATA
export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { brand } = await params

  return {
    title:
      !brand || Array.isArray(brand)
        ? 'Marcas'
        : desurlizeForBreadcrumbs(brand),
    description: `Productos de termogar para la Marca de ${!brand || Array.isArray(brand) ? 'Marcas' : desurlizeForBreadcrumbs(brand)}`
  }
}

const BrandsPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { brand } = await params
  const { orderBy, min, max, subcat, search } = await searchParams

  const searchedBrand = await sanityClientRead.fetch(
    GET_BRANDS_AND_PRODUCTS,
    {
      slug: brand
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  if (!searchedBrand) {
    log.error('Brand not found', { searchedBrand })
    return notFound()
  }

  // * BY ORDER
  const orderProducts = filteredProductsByOrder(searchedBrand.products, orderBy)

  // * BY FILTER
  const products = filterProductsByFilter(
    orderProducts,
    min,
    max,
    subcat,
    undefined,
    search
  )

  const middlePart =
    products.length > 8 ? Math.floor(products.length / 2) : null

  return (
    <main className='container-x mx-auto w-full'>
      <BreadcrumbCom
        paths={[
          { name: 'P. Principal', path: '/' },
          { name: 'Marcas', path: '/marcas' },
          {
            name:
              !brand || Array.isArray(brand)
                ? 'Marcas'
                : desurlizeForBreadcrumbs(brand),
            path: `/marcas/${brand}`
          }
        ]}
        className='mt-5 md:mt-10'
      />
      <div className='w-full'>
        <div className='mmb-5 flex w-full items-center justify-between bg-white px-1 md:mb-10 md:h-16 md:px-5'>
          <p className='font-400 text-base'>
            <span className='text-lg text-accent'> {products.length}</span>{' '}
            Productos Encontrados
          </p>
          <OrderSelect url={`/marcas/${brand}`} />
        </div>
        {middlePart ? (
          <>
            <div className='mb-10 grid grid-cols-2 gap-5 p-0 md:p-5 lg:grid-cols-3 xl:grid-cols-4'>
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
            <LinkOrDiv banner={searchedBrand.banner} />
            <div className='mb-10 grid grid-cols-2 gap-5 p-0 md:p-5 lg:grid-cols-3 xl:grid-cols-4'>
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
          <div className='mb-10 grid grid-cols-2 gap-5 p-0 md:p-5 lg:grid-cols-3 xl:grid-cols-4'>
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

export default BrandsPage
