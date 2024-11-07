// Project Components Imports
import Header from '@/components/Partials/Header'
import Footer from '@/components/Partials/Footer'
// import Drawer from '@/components/Mobile/Drawer'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <Drawer /> */}
      <Header />
      {children}
      <Footer />
    </>
  )
}
