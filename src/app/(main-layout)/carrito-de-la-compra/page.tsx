// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'
import CartClientPage from '@/components/CartPage/client-page'

export const metadata: Metadata = {
  title: 'Carrito de la compra',
  description: 'Carrito de la compra de productos un paso mas a la compra.'
}

const CartPage = () => {
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
      <CartClientPage />
    </main>
  )
}

export default CartPage
