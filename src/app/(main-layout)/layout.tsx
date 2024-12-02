// * ASSETS IMPORTS
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'
// import Drawer from '@/components/Mobile/Drawer'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <script
          src='https://unpkg.com/react-scan/dist/auto.global.js'
          async
        ></script>
      )}
      {/* <Drawer /> */}
      <Header />
      {children}
      <Footer />
    </>
  )
}
