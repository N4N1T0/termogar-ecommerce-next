// * PROJECT COMPONENTS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/ProductCardStyleOne'
import DataIteration from '@/components/Helpers/DataIteration'
import PageTitle from '@/components/Helpers/PageTitle'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH } from '@/sanity/lib/queries'

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

  console.log(searchedProducts)
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
        {/* <DataIteration
          datas={products.products.slice(0, 16)}
          startLength={0}
          endLength={16}
        >
          {({ datas }) => (
            <div data-aos='fade-up' key={datas.id} className='item'>
              <ProductCardStyleOne datas={datas} />
            </div>
          )}
        </DataIteration> */}
      </div>
    </main>
  )
}

export default SearchPage
