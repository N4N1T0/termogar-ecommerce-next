// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * ASSETS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'
import PageTitle from '@/components/Helpers/PageTitle'
import EmptySearch from '@/components/Shared/empty-search'

// * UTILS IMPORTS
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORYResult } from '@/types/sanity'
import { Logger } from 'next-axiom'
import { oramaClient } from '@/lib/clients'

const log = new Logger()

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { search, category } = await searchParams

  return {
    title: `Resultados para "${search}"`,
    description: `Busqueda de Resultados para "${search}" de productos en la categoría de ${category === '' ? 'Todos' : category}`
  }
}

const SearchPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { search, category } = await searchParams
  console.log('🚀 ~ search:', search)

  const oramaResponse = await oramaClient.search({
    term: search as string,
    mode: 'fulltext'
  })
  console.log('🚀 ~ oramaResponse:', oramaResponse)

  if (!oramaResponse) {
    log.error('Products not found', { oramaResponse })
  }

  if (oramaResponse?.hits.length === 0) {
    return (
      <section id='search-empty' className='cart-page-wrapper mt-10 w-full'>
        <div className='container-x mx-auto'>
          <PageTitle
            title={`Resultados de la busqueda para "${search}"`}
            subTitle={`En la categoría de "${category === '' ? 'Todos' : category}"`}
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
        subTitle={`En la categoría de "${category === '' ? 'Todos' : category}"`}
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Busqueda', path: '/busqueda' }
        ]}
        className='h-fit'
      />
      <section
        id='products'
        className='container-x mx-auto grid grid-cols-2 gap-5 p-5 lg:grid-cols-3 xl:grid-cols-4'
      >
        {oramaResponse?.hits?.map(({ document, id }, index) => (
          <div data-aos='fade-up' key={id} className='item'>
            <ProductCardStyleOne<
              GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORYResult[number]
            >
              datas={
                document as unknown as GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORYResult[number]
              }
              priority={index < 6}
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default SearchPage
