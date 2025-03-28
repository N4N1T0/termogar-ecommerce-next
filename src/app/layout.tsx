import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { seoMetatags } from '@/components/seo'
import { Toaster } from 'sonner'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = seoMetatags()

const korbFonts = localFont({
  src: [
    {
      path: '../assets/fonts/Korb.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Korb Italic.otf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../assets/fonts/Korb Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Korb Bold Italic.otf',
      weight: '700',
      style: 'italic'
    }
  ]
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={`overflow-x-hidden bg-gray-50 antialiased ${korbFonts.className}`}
      >
        {children}
        <GoogleTagManager gtmId='GTM-WJMLMCR' />
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
      </body>
    </html>
  )
}
