// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import SingleProductTabs from '@/components/SingleProductPage/single-products-tab'
import BreadcrumbCom from '@/components/BreadcrumbCom'
import ProductView from '@/components/SingleProductPage/ProductView'
// import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import {
  GET_WHOLE_PRODUCT_BY_SLUG,
  GET_STATIC_PRODUCTS_SLUG
} from '@/sanity/lib/queries'
import { yoptop } from '@/lib/fetchers'
import { auth } from '@/lib/auth'

// * METADATA
export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug } = await params
  const searchedProduct = await sanityClientRead.fetch(
    GET_WHOLE_PRODUCT_BY_SLUG,
    {
      slug
    }
  )

  return {
    title: searchedProduct?.title,
    description: searchedProduct?.excerpt,
    category:
      searchedProduct?.categories !== null
        ? searchedProduct?.categories[0].name
        : 'Termogar',
    keywords: [
      ...(searchedProduct?.categories || [{ name: 'termogar' }]).map(
        (item) => item.name || 'termogar'
      ),
      ...(searchedProduct?.tags || [{ name: 'termogar' }]).map(
        (item) => item.name || 'termogar'
      )
    ],
    openGraph: {
      type: 'website',
      description: searchedProduct?.excerpt || 'Producto de Termogar',
      images: [
        searchedProduct?.featuredMedia?.url ||
          'https://termogra.es/favicon-32x32.png',
        ...(
          searchedProduct?.otherImages || [
            { url: 'https://termogra.es/favicon-32x32.png' }
          ]
        ).map((item) => item?.url || 'https://termogra.es/favicon-32x32.png')
      ],
      siteName: 'Termogar',
      title: searchedProduct?.title || 'Producto de Termogar'
    },
    twitter: {
      card: 'summary',
      description: searchedProduct?.excerpt || 'Producto de Termogar',
      images: [
        searchedProduct?.featuredMedia?.url ||
          'https://termogra.es/favicon-32x32.png',
        ...(
          searchedProduct?.otherImages || [
            { url: 'https://termogra.es/favicon-32x32.png' }
          ]
        ).map((item) => item?.url || 'https://termogra.es/favicon-32x32.png')
      ]
    }
  }
}

// * ISR
export const revalidate = 600
export async function generateStaticParams() {
  const products = await sanityClientRead.fetch(GET_STATIC_PRODUCTS_SLUG)
  return products.map((post) => ({
    slug: String(post.slug)
  }))
}

const SingleProductPage = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params
  const session = await auth()
  const searchedProduct = await sanityClientRead.fetch(
    GET_WHOLE_PRODUCT_BY_SLUG,
    {
      slug
    }
  )

  const reviews = await yoptop
    .fetchReviews(searchedProduct?.id.split('-').slice(-1)[0] || '')
    .then((res) => (res.status !== null ? res : null))

  if (!searchedProduct) return notFound()

  return (
    <main id='w-full'>
      <div className='container-x mx-auto my-10 w-full bg-white py-5'>
        <BreadcrumbCom
          paths={[
            { name: 'P. Principal', path: '/' },
            {
              name: searchedProduct.title || 'Sin Nombre',
              path: `/producto/${searchedProduct.slug}`
            }
          ]}
          className='mb-0'
        />
      </div>
      <div className='container-x mx-auto w-full bg-white py-10'>
        <ProductView
          product={{ ...searchedProduct, reviews: reviews?.reviews }}
        />
      </div>

      <SingleProductTabs
        product={{ ...searchedProduct, reviews: reviews?.reviews }}
        user={session?.user}
      />

      {/* <div className='container-x mx-auto w-full bg-white'>
          <div className='w-full py-[60px]'>
            <h2 className='font-600 mb-[30px] text-xl leading-none text-gray-900 sm:text-3xl'>
              Productos Relacionados
            </h2>
            <div
              data-aos='fade-up'
              className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'
            >
              {data.products.slice(0, 4).map((product) => (
                <div key={product.id} className='item'>
                  <ProductCardStyleOne datas={product} />
                </div>
              ))}
            </div>
          </div>
      </div> */}
    </main>
  )
}

export default SingleProductPage
