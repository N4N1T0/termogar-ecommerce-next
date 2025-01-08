// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// * ASSETS IMPORTS
import SingleProductTabs from '@/components/SingleProductPage/single-products-tab'
import BreadcrumbCom from '@/components/BreadcrumbCom'
import ProductView from '@/components/SingleProductPage/ProductView'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_WHOLE_PRODUCT_BY_SLUG } from '@/sanity/lib/queries'
import { yoptop } from '@/lib/fetchers'
import { auth } from '@/lib/auth'
import { Logger } from 'next-axiom'
import { jldProduct } from '@/components/seo'
import { getMainCategoryBreadcrumb } from '@/lib/utils'

const log = new Logger()

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

const RelatedProducts = dynamic(
  () => import('@/components/SingleProductPage/related-products'),
  {
    loading: () => (
      <div className='mt-10 w-full bg-white'>
        <div className='mt-5 h-16 animate-pulse bg-gray-100' />
        <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array(8)
            .fill('CategoriesPage')
            .map((item, index) => (
              <div
                key={`${item}-${index}`}
                className='h-64 w-full animate-pulse bg-gray-100'
              />
            ))}
        </div>
      </div>
    )
  }
)

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
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 600
      }
    }
  )

  const reviews = await yoptop
    .fetchReviews(searchedProduct?.id.split('-').slice(-1)[0] || '')
    .then((res) => (res.status !== null ? res : null))

  const refactoredRelatesProductsIds = searchedProduct?.relatedProducts
    ? searchedProduct?.relatedProducts.map((product) => product.id)
    : []

  if (!searchedProduct) {
    log.error('Product not found', { slug })
    return notFound()
  }

  return (
    <main id='w-full'>
      <div className='container-x mx-auto my-5 w-full bg-white py-5 md:my-10'>
        <BreadcrumbCom
          paths={getMainCategoryBreadcrumb(searchedProduct)}
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
      <RelatedProducts productsId={refactoredRelatesProductsIds} />
      {jldProduct(searchedProduct)}
    </main>
  )
}

export default SingleProductPage
