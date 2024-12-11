import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { seoMetatags } from '@/components/seo'
import { Toaster } from 'sonner'
import { AxiomWebVitals } from 'next-axiom'

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
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'bg-white border border-gray-200 text-gray-900 flex items-center justify-between text-xs py-3 px-5 gap-5',
              actionButton:
                'bg-accent text-gray-100 hover:text-gray-900 hover-200 px-3 py-1.5 rounded-xs w-1/4',
              error:
                'bg-red-200 text-gray-100 hover:text-gray-900 hover-200 px-3 py-1.5 rounded-xs',
              warning:
                'bg-yellow-200 text-gray-100 hover:text-gray-900 hover-200 px-3 py-1.5 rounded-xs',
              success:
                'bg-green-200 text-gray-100 hover:text-gray-900 hover-200 px-3 py-1.5 rounded-xs'
            }
          }}
        />
        <AxiomWebVitals />
      </body>
    </html>
  )
}
