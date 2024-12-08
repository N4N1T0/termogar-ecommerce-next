// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * ASSETS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'
import PageTitle from '@/components/Helpers/PageTitle'
import { sanityClientRead } from '@/sanity/lib/client'
import {
  GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITH_CATEGORY,
  GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORY
} from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult } from '@/types/sanity'
import EmptySearch from '@/components/Shared/empty-search'

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { search, category } = await searchParams

  return {
    title: `Resultados para "${search}"`,
    description: `Busqueda de Resultados para "${search}" de productos en la categoría de ${category}`
  }
}

const SearchPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { search, category } = await searchParams
  let searchedProducts: GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult | null =
    null

  if (!category || Array.isArray(category)) {
    searchedProducts = await sanityClientRead.fetch(
      GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORY,
      {
        search
      }
    )
  } else {
    searchedProducts = await sanityClientRead.fetch(
      GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITH_CATEGORY,
      {
        category: [category],
        search
      }
    )
  }

  if (searchedProducts?.length === 0) {
    return (
      <section id='search-empty' className='cart-page-wrapper mt-10 w-full'>
        <div className='container-x mx-auto'>
          <PageTitle
            title={`Resultados de la busqueda para "${search}"`}
            subTitle={`En la categoría de "${category}"`}
            breadcrumb={[
              { name: 'P. Principal', path: '/' },
              { name: 'Busqueda', path: '/busqueda' }
            ]}
          />
          <div className='my-10 grid h-full w-full place-content-center'>
            <EmptySearch />
          </div>
        </div>
      </section>
    )
  }

  return (
    <main>
      <PageTitle
        title={`Resultados de la busqueda para "${search}"`}
        subTitle={`En la categoría de "${category}"`}
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Busqueda', path: '/busqueda' }
        ]}
      />
      <section
        id='products'
        className='container-x mx-auto grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      >
        {searchedProducts?.map((product, index) => (
          <div data-aos='fade-up' key={product?.id} className='item'>
            <ProductCardStyleOne<
              GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult[number]
            >
              datas={product}
              priority={index < 6}
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default SearchPage
