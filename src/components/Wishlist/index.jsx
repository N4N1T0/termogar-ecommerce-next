import BreadcrumbCom from '../BreadcrumbCom'
import EmptyWishlistError from '../EmptyWishlistError'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'
import ProductsTable from './ProductsTable'

export default function Wishlist({ wishlist = true }) {
  return (
    <Layout childrenClasses={wishlist ? 'pt-0 pb-0' : ''}>
      {wishlist === false ? (
        <div className='wishlist-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            <BreadcrumbCom
              paths={[
                { name: 'home', path: '/' },
                { name: 'wishlist', path: '/wishlist' }
              ]}
            />
            <EmptyWishlistError />
          </div>
        </div>
      ) : (
        <div className='wishlist-page-wrapper w-full bg-white pb-[60px]'>
          <div className='w-full'>
            <PageTitle
              title='Wishlist'
              breadcrumb={[
                { name: 'home', path: '/' },
                { name: 'wishlist', path: '/wishlist' }
              ]}
            />
          </div>
          <div className='mt-[23px] w-full'>
            <div className='container-x mx-auto'>
              <ProductsTable className='mb-[30px]' />
              <div className='mt-[30px] flex w-full justify-start sm:justify-end'>
                <div className='items-center sm:flex sm:space-x-[30px]'>
                  <button type='button'>
                    <div className='mb-5 w-full text-sm font-semibold text-red-500 sm:mb-0'>
                      Clean Wishlist
                    </div>
                  </button>
                  <div className='h-[50px] w-[180px]'>
                    <button type='button' className='yellow-btn'>
                      <div className='w-full text-sm font-semibold'>
                        Add to Cart All
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
