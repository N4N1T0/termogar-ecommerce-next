// * ASSETS IMPORTS
import Footer from '@/components/Partials/Footer'
import Header from '@/components/Partials/Header'
import { Toaster } from 'sonner'
import GoogleOneTap from '@/components/Auth/google-one-tap'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SessionProvider } from 'next-auth/react'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <NuqsAdapter>{children}</NuqsAdapter>
      <Footer />
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              'bg-white border border-gray-200 text-gray-900 flex items-center justify-between text-xs py-3 px-5 gap-5',
            actionButton:
              'bg-accent text-gray-100 hover:text-gray-900 hover-200 px-3 py-1.5 w-1/4',
            error: 'text-red-900 border border-red-900 px-3 py-1.5',
            warning: 'text-yellow-900 border border-yellow-900 px-3 py-1.5',
            success: 'text-green-900 border border-green-900 px-3 py-1.5',
            info: 'text-blue-900 border border-blue-900 px-3 py-1.5'
          }
        }}
      />
      {process.env.NODE_ENV !== 'development' && (
        <SessionProvider>
          <GoogleOneTap />
        </SessionProvider>
      )}
    </>
  )
}
