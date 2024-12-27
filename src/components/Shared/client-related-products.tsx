'use client'

// * NEXT.JS IMPORTS
import React from 'react'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'

const RelatedProducts = ({
  mostUsedCategory,
  amount = 8
}: {
  mostUsedCategory: string | null
  amount?: number
}) => {
  const [searchedProducts, setSearchedProducts] =
    React.useState<GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClientRead.fetch(
          GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY,
          { type: [mostUsedCategory] }
        )
        setSearchedProducts(data)
      } catch (err) {
        setError('Failed to fetch related products.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [mostUsedCategory])

  if (!mostUsedCategory) return null

  if (loading) {
    return (
      <div className='mt-10 w-full bg-white'>
        <div className='mt-5 h-16 animate-pulse bg-gray-100' />
        <div className='mb-10 grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array(amount)
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

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section id='related-products' className='mb-10 w-full bg-white p-5'>
      <h3 className='font-600 my-3 text-xl leading-none text-gray-900 sm:text-3xl'>
        También te podrían gustar
      </h3>
      <div className='products-section w-full'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
          {searchedProducts?.slice(0, amount).map((product) => (
            <div key={product.id} className='item'>
              <ProductCardStyleOne<
                GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
              >
                datas={product}
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts
