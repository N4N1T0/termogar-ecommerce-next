import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </SessionProvider>
  )
}

export default ProductsLayout
