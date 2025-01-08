// * ASSETS IMPORTS
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
