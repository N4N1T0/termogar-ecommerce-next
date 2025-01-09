// * ASSETS IMPORTS
import { SessionProvider } from 'next-auth/react'

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SessionProvider>{children}</SessionProvider>
}
