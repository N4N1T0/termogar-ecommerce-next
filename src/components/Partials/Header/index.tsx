// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import { bigLogo } from '@/assets'
import { CartLink } from '@/components/Cart/cart-helpers'
import Middlebar from '@/components/Partials/Header/Middlebar'
import Navbar from '@/components/Partials/Header/Navbar'
import TopBar from '@/components/Partials/Header/TopBar'
import Drawer from '@/components/Mobile/drawer'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'
import { auth } from '@/lib/auth'
import MobileUser from './mobile-user'

const log = new Logger()

const HeaderOne = async ({ className }: { className?: string }) => {
  const session = await auth()
  const navbarMenu = await sanityClientRead.fetch(
    GET_MENU_CATEGORIES,
    {},
    { cache: 'force-cache', next: { revalidate: 600 } }
  )

  if (!navbarMenu) {
    log.error('No categories found')
  }
  return (
    <header className={cn('header-section-wrapper relative', className)}>
      <TopBar />
      <Middlebar
        categories={navbarMenu}
        session={session}
        className='quomodo-shop-middle-bar hidden lg:block'
      />
      <div className='quomodo-shop-drawer block h-[60px] w-full bg-white lg:hidden'>
        <div className='flex h-full w-full items-center justify-between px-5'>
          {/* MOBILE DRAWER */}
          <Drawer categories={navbarMenu} />
          <div>
            <Link href='/'>
              <Image
                width={100}
                height={50}
                src={bigLogo}
                alt='Termogar Logo'
                title='Termogar Logo'
                className='h-auto w-auto'
              />
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <MobileUser session={session} />
            <CartLink />
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
