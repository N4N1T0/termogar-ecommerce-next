// * ASSETS IMPORTS
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'
import GoogleOneTap from '@/components/Auth/google-one-tap'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SessionProvider } from 'next-auth/react'
import WebsiteRevampDialog from '@/components/Features/welcome-modal'
import CookieConsent from '@/components/Features/cookies'

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
      <WebsiteRevampDialog />
      <Footer />
      {process.env.NODE_ENV !== 'development' && (
        <SessionProvider>
          <GoogleOneTap />
        </SessionProvider>
      )}
    </>
  )
}
