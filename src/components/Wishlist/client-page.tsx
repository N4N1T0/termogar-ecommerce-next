'use client'

// * ASSETS IMPORTS
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import EmptyWishlistError from '@/components/Wishlist/empty'
import WishlistProductTable from '@/components/Wishlist/product-table'
import WishlistFooterBtn from '@/components/Wishlist/wishlist-footer-btn'
import RelatedProducts from '@/components/Shared/client-related-products'

// * UTILS IMPORTS
import { useWishlist } from '@/stores'
import { getMostUsedCategory } from '@/lib/utils'

const WishlistClientPage = () => {
  const { products, rehydrated } = useWishlist()
  const mostUsedCategory = getMostUsedCategory(products)

  if (!rehydrated) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper mt-10 w-full'>
        <div className='container-x mx-auto'>
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
        className='wishlist-page-wrapper my-10 w-full'
      >
        <div className='container-x mx-auto'>
          <EmptyWishlistError />
        </div>
      </section>
    )
  }

  return (
    <div className='mt-[23px] w-full'>
      <div className='container-x mx-auto'>
        <WishlistProductTable className='mb-[30px]' products={products} />
        <WishlistFooterBtn />
        <RelatedProducts mostUsedCategory={mostUsedCategory} />
      </div>
    </div>
  )
}

export default WishlistClientPage
