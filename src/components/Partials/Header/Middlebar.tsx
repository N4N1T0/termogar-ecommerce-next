// * PROJECT COMPONENTS IMPORTS
import Cart from '@/components/Cart'
import SearchBox from '@/components/Helpers/SearchBox'

// * NEXTJS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import Logo3 from '@/assets/images/logo-3.svg'
import { GitCompareArrows, Heart, ShoppingBag, User } from 'lucide-react'

// * TYPES IMPORTS
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'

export default function Middlebar({
  className,
  categories
}: {
  className?: string
  categories: GET_MENU_CATEGORIESResult
}) {
  return (
    <div className={`h-[86px] w-full bg-white ${className}`}>
      <div className='container-x mx-auto h-full'>
        <div className='relative h-full'>
          <div className='flex h-full items-center justify-between'>
            <div>
              <Link href='/'>
                <img width='152' height='36' src={Logo3} alt='logo' />
              </Link>
            </div>
            <div className='h-[44px] w-[517px]'>
              <SearchBox categories={categories} className='search-com' />
            </div>
            <div className='flex items-center space-x-6'>
              <div className='compaire relative'>
                <Link href='/comparar-productos'>
                  <GitCompareArrows />
                </Link>
                <span className='absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px]'>
                  2
                </span>
              </div>
              <div className='favorite relative'>
                <Link href='/wishlist'>
                  <Heart />
                </Link>
                <span className='absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px]'>
                  1
                </span>
              </div>
              <div className='cart-wrapper group relative py-4'>
                <div className='cart relative cursor-pointer'>
                  <Link href='/carrito-de-la-compra'>
                    <ShoppingBag />
                  </Link>
                  <span className='absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px]'>
                    15
                  </span>
                </div>
                <Cart className='absolute -right-[45px] top-11 z-50 hidden group-hover:block' />
              </div>
              <div>
                <Link href='/profile'>
                  <User />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
