'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import BreadcrumbCom from '@/components/BreadcrumbCom'
import PageTitle from '@/components/Helpers/PageTitle'
import ProductsTable from '@/components/CartPage/products-table'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'

// * UTILS IMPORTS
import { useCart } from '@/stores'
import EmptyCartError from '@/components/CartPage/empty'

const CartPage = () => {
  const { products, rehydrated } = useCart()

  if (!rehydrated) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper mt-10 w-full'>
        <div className='container-x mx-auto'>
          <BreadcrumbCom
            paths={[
              { name: 'P. Principal', path: '/' },
              { name: 'Carrito del la compra', path: '/carrito-de-la-compra' }
            ]}
          />
          <div className='grid h-full w-full place-content-center'>
            <LoaderStyleOne />
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper my-10 w-full'>
        <div className='container-x mx-auto'>
          <BreadcrumbCom
            paths={[
              { name: 'P. Principal', path: '/' },
              { name: 'Carrito del la compra', path: '/carrito-de-la-compra' }
            ]}
          />
          <EmptyCartError />
        </div>
      </section>
    )
  }

  return (
    <main className='cart-page-wrapper w-full bg-white pb-[60px]'>
      <div className='w-full'>
        <PageTitle
          title='Tu carrito de la compra'
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Carrito del la compra', path: '/carrito-de-la-compra' }
          ]}
        />
      </div>
      <div className='mt-[23px] w-full'>
        <div className='container-x mx-auto'>
          <ProductsTable className='mb-[30px]' products={products} />
          <div className='w-full justify-end sm:flex'>
            <div className='flex items-center space-x-2.5'>
              <Link href='/productos'>
                <div className='hover-200 flex h-[50px] w-[220px] items-center justify-center bg-gray-300 hover:bg-gray-100'>
                  <span className='text-sm font-semibold'>
                    Continuar Comprando
                  </span>
                </div>
              </Link>
              <Link href='/checkout'>
                <div className='hover-200 flex h-[50px] w-[140px] items-center justify-center bg-gray-300 hover:bg-gray-100'>
                  <span className='text-sm font-semibold'>
                    Proceder al Pago
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPage
