// * PROJECT COMPONENTS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/ProductCardStyleOne'
import DataIteration from '@/components/Helpers/DataIteration'
import PageTitle from '@/components/Helpers/PageTitle'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult } from '@/types/sanity'

const SearchPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { search, category } = await searchParams
  const searchedProducts = await sanityClientRead.fetch(
    GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH,
    {
      category: [category],
      search
    }
  )

  return (
    <main>
      <div className='title-bar'>
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
          <DataIteration<GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult[number]>
            datas={searchedProducts}
            startLength={0}
            endLength={searchedProducts.length}
          >
            {({ datas, index }) => (
              <div data-aos='fade-up' key={datas?.id} className='item'>
                <ProductCardStyleOne<
                  GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCHResult[number]
                >
                  datas={datas}
                  priority={index < 6}
                />
              </div>
            )}
          </DataIteration>
        </section>
      </div>
    </main>
  )
}

export default SearchPage
