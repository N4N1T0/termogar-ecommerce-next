import { useState } from 'react'
import DiscountBanner from '@/components/Home/DiscountBanner'
import Drawer from '@/components/Mobile/Drawer'
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'

export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false)
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className='w-full overflow-x-hidden'>
        <Header drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full ${childrenClasses || 'pb-[60px] pt-[30px]'}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  )
}
