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
  const { orderBy, min, max, subcat, brand, search } = await searchParams
  const searchedCategory = await sanityClientRead.fetch(
    GET_CATEGORY_AND_PRODUCTS,
    {
      slug: category
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
    brand,
    search,
    searchedCategory.main
  )

  const middlePart =
    products.length > 8 ? Math.floor(products.length / 2) : null

  const breadcrumb = [
    { name: 'P. Principal', path: '/' },
    { name: 'Categorias', path: '/categorias' },
    {
      name: searchedCategory.name || 'Sin Categoría',
      path: `/categorias/${category}`
    }
  ]

  const getRandomProducts = (
    products: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult
  ) => {
    const randomProducts = [...products]
    randomProducts.sort(() => Math.random() - 0.5)
    return randomProducts.slice(0, 4)
  }

  return (
    <main className='container-x mx-auto w-full'>
      <BreadcrumbCom
        paths={
          searchedCategory.main
            ? breadcrumb
            : [
                ...breadcrumb.slice(0, -1),
                {
                  name: searchedCategory?.parent?.name,
                  path: `/categorias/${searchedCategory?.parent?.slug}`
                },
                breadcrumb[breadcrumb.length - 1]
              ]
        }
        className='mt-5 md:mt-10'
      />
      <div className='w-full'>
        <div className='mb-5 flex w-full items-center justify-between bg-white px-1 md:mb-10 md:h-16 md:px-5'>
          <p className='font-400 text-base'>
            <span className='text-lg text-accent'> {products.length}</span>{' '}
            Productos Encontrados
          </p>
          <OrderSelect url={`/categorias/${category}`} />
        </div>
        {products.length === 0 && (
          <div className='container-x mx-auto w-full text-center'>
            <h2 className='text-3xl font-semibold'>
              No hay{' '}
              <span className='text-accent'>{searchedCategory.name}</span> con
              esos parámetros de búsqueda, ¡realice otra búsqueda por favor!
            </h2>
            <hr className='mt-10' />
            <div className='mt-10'>
              <h3 className='mb-5 text-xl font-semibold text-secondary'>
                Te podrían interesar otros productos de la misma categoría
              </h3>
              <div className='grid grid-cols-2 gap-5 p-0 md:p-5 lg:grid-cols-3 xl:grid-cols-4'>
                {getRandomProducts(searchedCategory.products).map(
                  (
                    product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                  ) => (
                    <div data-aos='fade-up' key={product.id}>
                      <ProductCardStyleOne datas={product} priority={false} />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
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
            <LinkOrDiv banner={searchedCategory.banner} />
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
