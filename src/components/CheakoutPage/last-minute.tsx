'use client'

// * NEXT.JS IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import ProductCardStyleOne from '@/components/Helpers/Cards/product-card-style-one'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'
import { GET_LAST_MINUTE_PRODUCTS_FROM_ID } from '@/sanity/lib/queries'
import { useCart } from '@/stores'
import { cn } from '@/lib/utils'

const LastMinute = ({ disabled = false }: { disabled: boolean }) => {
  const { products, rehydrated } = useCart()
  const [lastMinuteProducts, setLastMinuteProducts] = React.useState<
    GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult | null | undefined
  >(null)
  const [discount, setDiscount] = React.useState<number | null | undefined>(0)
  const [remainingTime, setRemainingTime] = React.useState<string>('')

  React.useEffect(() => {
    if (rehydrated && products.length > 0) {
      const id = products.find((product) => product.hasLastMinute)?.id

      if (!id) return

      const findLastMinuteProduct = async () => {
        const searchedLastMinuteProduct = await sanityClientRead.fetch(
          GET_LAST_MINUTE_PRODUCTS_FROM_ID,
          {
            id
          }
        )

        if (searchedLastMinuteProduct) {
          setLastMinuteProducts(searchedLastMinuteProduct.products)
          setDiscount(searchedLastMinuteProduct.discount)

          if (searchedLastMinuteProduct.time) {
            const endTime =
              new Date().getTime() + searchedLastMinuteProduct.time * 60 * 1000
            const interval = setInterval(() => {
              const now = new Date().getTime()
              const distance = endTime - now

              if (distance <= 0) {
                clearInterval(interval)
                setRemainingTime('Tiempo Finalizado')
              } else {
                const minutes = Math.floor(distance / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)
                setRemainingTime(
                  `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                )
              }
            }, 1000)

            return () => clearInterval(interval)
          }
        }
      }

      findLastMinuteProduct()
    }
  }, [products, rehydrated])

  if (!lastMinuteProducts || lastMinuteProducts.length === 0) return null

  return (
    <section
      id='last-minute-products'
      className={cn(
        'container-x mx-auto mb-10 mt-5 w-full bg-white py-5',
        remainingTime === 'Tiempo Finalizado' || disabled
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : ''
      )}
    >
      <div className='flex w-full items-center justify-between pb-5'>
        <h3 className='font-600 text-xl leading-none text-gray-900 sm:text-3xl'>
          Ultimas Unidades - Descuentos de{' '}
          <span className='text-accent'>{discount}%</span>
        </h3>
        <h3 className='font-600 text-xl leading-none text-gray-900 sm:text-3xl'>
          <span className='text-accent'>{remainingTime} Min</span> tiempo
          restante
        </h3>
      </div>
      <div className='products-section w-full'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
          {lastMinuteProducts?.map(
            (
              product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
            ) => (
              <div key={product.id} className='item'>
                <ProductCardStyleOne<
                  GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]
                >
                  datas={product}
                  priority={false}
                  discounts={discount}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default LastMinute
