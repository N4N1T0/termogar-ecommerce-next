import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { seoMetatags } from '@/components/seo'
import { Toaster } from 'sonner'

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
        <Toaster richColors />
      </body>
    </html>
  )
}
