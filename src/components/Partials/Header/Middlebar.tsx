// * NEXTJS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import CartPopup from '@/components/Cart/cart-popup'
import SearchBox from '@/components/Helpers/search-box'
import { WishlistLink } from '@/components/Wishlist/wishlist-helpers'
import { CompaireLink } from '@/components/Compaire/compaire-helpers'
import { CartLink } from '@/components/Cart/cart-helpers'
import { bigLogo, smallLogo } from '@/assets'
import UserPopup from '@/components/Partials/Header/user-popup'

// * UTILS IMPORTS
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'
import { auth } from '@/lib/auth'

const Middlebar = async ({
  className,
  categories
}: {
  className?: string
  categories: GET_MENU_CATEGORIESResult
}) => {
  const session = await auth()

  return (
    <div className={`h-[86px] w-full bg-white ${className}`}>
      <div className='container-x mx-auto h-full'>
        <div className='relative h-full'>
          <div className='flex h-full items-center justify-between'>
            <div>
              <Link href='/' className='hidden sm:block'>
                <Image
                  width={102}
                  height={26}
                  src={bigLogo}
                  alt='Termogar logo'
                  className='h-auto w-auto'
                  priority
                />
              </Link>
              <Link href='/' className='block sm:hidden'>
                <Image
                  width={102}
                  height={26}
                  src={smallLogo}
                  alt='Termogar logo'
                  className='h-auto w-auto'
                />
              </Link>
            </div>
            <div className='h-[44px] w-[517px]'>
              <SearchBox categories={categories} className='search-com' />
            </div>
            <div className='flex items-center space-x-6'>
              <CompaireLink />
              <WishlistLink />
              <div className='cart-wrapper group relative py-4'>
                <CartLink />
                <CartPopup className='absolute -right-[45px] top-11 z-50 hidden group-hover:block' />
              </div>
              <UserPopup session={session} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Middlebar
