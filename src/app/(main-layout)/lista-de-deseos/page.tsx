'use client'

// * ASSETS IMPORTS
import BreadcrumbCom from '@/components/BreadcrumbCom'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import PageTitle from '@/components/Helpers/PageTitle'
import EmptyWishlistError from '@/components/Wishlist/empty'
import WishlistProductTable from '@/components/Wishlist/product-table'
import WishlistFooterBtn from '@/components/Wishlist/wishlist-footer-btn'

// * UTILS IMPORTS
import { useWishlist } from '@/stores'

const WishlistPage = () => {
  const { products, rehydrated } = useWishlist()

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
      <section
        id='Empty-Wishlist'
        className='wishlist-page-wrapper mt-10 w-full'
      >
        <div className='container-x mx-auto'>
          <BreadcrumbCom
            paths={[
              { name: 'home', path: '/' },
              { name: 'wishlist', path: '/wishlist' }
            ]}
          />
          <EmptyWishlistError />
        </div>
      </section>
    )
  }

  return (
    <main className='wishlist-page-wrapper w-full bg-white pb-[60px]'>
      <div className='w-full'>
        <PageTitle
          title='Lista de Deseos'
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Lista de Deseos', path: '/lista-de-deseos' }
          ]}
        />
      </div>
      <div className='mt-[23px] w-full'>
        <div className='container-x mx-auto'>
          <WishlistProductTable className='mb-[30px]' products={products} />
          <WishlistFooterBtn />
        </div>
      </div>
    </main>
  )
}

export default WishlistPage
