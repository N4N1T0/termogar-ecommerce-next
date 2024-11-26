// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import Logo3 from '@/assets/images/logo-3.svg'
import { ShoppingBag } from 'lucide-react'
import Middlebar from './Middlebar'
import Navbar from './Navbar'
import TopBar from './TopBar'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'

const HeaderOne = async ({ className }: { className?: string }) => {
  const navbarMenu = await sanityClientRead.fetch(GET_MENU_CATEGORIES)

  return (
    <header className={cn('header-section-wrapper relative', className)}>
      <TopBar />
      <Middlebar
        categories={navbarMenu}
        className='quomodo-shop-middle-bar hidden lg:block'
      />
      <div className='quomodo-shop-drawer block h-[60px] w-full bg-white lg:hidden'>
        <div className='flex h-full w-full items-center justify-between px-5'>
          {/* TODO MOBILE DRAWER */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 6h16M4 12h16M4 18h7'
            />
          </svg>
          <div>
            <Link href='/'>
              <Image
                width={152}
                height={36}
                src={Logo3}
                alt='Termogar Logo'
                title='Termogar Logo'
                priority
                className='h-auto w-auto'
              />
            </Link>
          </div>
          <div className='cart relative cursor-pointer'>
            <Link href='/carrito-de-la-compra'>
              <ShoppingBag />
            </Link>
            <span className='text-qblack absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px]'>
              15
            </span>
          </div>
        </div>
      </div>
      <Navbar
        className='quomodo-shop-nav-bar hidden lg:block'
        navbarMenu={navbarMenu}
      />
    </header>
  )
}

export default HeaderOne
