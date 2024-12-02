// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'
import WishlistClientPage from '@/components/Wishlist/client-page'

export const metadata: Metadata = {
  title: 'Lista de deseo',
  description: 'Lista de deseo para los productos de termogar.'
}

const WishlistPage = () => {
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
        <WishlistClientPage />
      </div>
    </main>
  )
}

export default WishlistPage
