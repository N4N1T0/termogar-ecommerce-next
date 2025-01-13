'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import ProductsTable from '@/components/CartPage/products-table'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import RelatedProducts from '@/components/Shared/client-related-products'

// * UTILS IMPORTS
import { useCart } from '@/stores'
import EmptyCartError from '@/components/CartPage/empty'
import { getMostUsedCategory } from '@/lib/utils'

const CartClientPage = () => {
  const { products, rehydrated } = useCart()
  const mostUsedCategory = getMostUsedCategory(products)

  if (!rehydrated) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper mt-10 w-full'>
        <div className='grid h-full w-full place-content-center'>
          <LoaderStyleOne />
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper my-10 w-full'>
        <EmptyCartError />
      </section>
    )
  }

  return (
    <div className='container-x mx-auto mt-[23px] w-full'>
      <ProductsTable className='mb-[30px]' products={products} />
      <div className='w-full justify-end sm:flex'>
        <div className='flex items-center space-x-2.5'>
          <Link href='/'>
            <div className='hover-200 flex h-[50px] w-[220px] items-center justify-center bg-secondary text-white hover:text-gray-900'>
              <span className='text-sm font-semibold'>Continuar Comprando</span>
            </div>
          </Link>
          <Link href='/checkout'>
            <div className='hover-200 flex h-[50px] w-[140px] items-center justify-center bg-accent text-white hover:text-gray-900'>
              <span className='text-sm font-semibold'>Proceder al Pago</span>
            </div>
          </Link>
        </div>
      </div>
      <RelatedProducts mostUsedCategory={mostUsedCategory} />
    </div>
  )
}

export default CartClientPage
