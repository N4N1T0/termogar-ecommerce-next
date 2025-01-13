// * ASSETS IMPORTS
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'
import GoogleOneTap from '@/components/Auth/google-one-tap'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SessionProvider } from 'next-auth/react'
import CookieConsent from '@/components/Helpers/cookies'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <NuqsAdapter>{children}</NuqsAdapter>
      <CookieConsent />
      <Footer />
      {process.env.NODE_ENV !== 'development' && (
        <SessionProvider>
          <GoogleOneTap />
        </SessionProvider>
      )}
    </>
  )
}
