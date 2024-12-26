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
import { GET_CATEGORY_AND_PRODUCTS } from '@/sanity/lib/queries'
import {
  desurlizeForBreadcrumbs,
  filteredProductsByOrder,
  filterProductsByFilter
} from '@/lib/utils'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import { PortableText } from 'next-sanity'
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
  const { category } = await params

  return {
    title:
      !category || Array.isArray(category)
        ? 'Categorias'
        : desurlizeForBreadcrumbs(category),
    description: `Productos de termogar para la categoría de ${!category || Array.isArray(category) ? 'Categorias' : desurlizeForBreadcrumbs(category)}`
  }
}

const CategoriesPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { category } = await params
  const { orderBy, min, max, subcat, brand } = await searchParams
  const searchedCategory = await sanityClientRead.fetch(
    GET_CATEGORY_AND_PRODUCTS,
    {
      slug: category
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  if (!searchedCategory) {
    log.error('Category not found', { searchedCategory })
    return notFound()
  }

  // * BY ORDER
  const orderProducts = filteredProductsByOrder(
    searchedCategory.products,
    orderBy
  )

  // * BY FILTER
  const products = filterProductsByFilter(
    orderProducts,
    min,
    max,
    subcat,
    brand
  )

  const middlePart =
    products.length > 8 ? Math.floor(products.length / 2) : null

  return (
    <main className='container-x mx-auto w-full'>
      <BreadcrumbCom
        paths={[
          { name: 'P. Principal', path: '/' },
          { name: 'Categorias', path: '/categorias' },
          {
            name: searchedCategory.name || 'Sin Categoría',
            path: `/categorias/${category}`
          }
        ]}
        className='mt-10'
      />
      <div className='w-full'>
        <div className='mb-10 flex w-full flex-col space-y-5 bg-white px-7 md:h-16 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <p className='font-400 text-base'>
            <span className='text-lg text-accent'> {products.length}</span>{' '}
            Productos Encontrados
          </p>
          <OrderSelect url={`/categorias/${category}`} orderBy={orderBy} />
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
            <LinkOrDiv banner={searchedCategory.banner} />
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
        {searchedCategory.description !== null && (
          <section
            id='category-description'
            className='container-x prose mx-auto mb-10 w-full text-pretty bg-white p-5'
          >
            <PortableText value={searchedCategory.description} />
          </section>
        )}
      </div>
      {jldProductList(products)}
    </main>
  )
}

export default CategoriesPage
