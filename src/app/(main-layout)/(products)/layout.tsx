import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React from 'react'

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return <NuqsAdapter>{children}</NuqsAdapter>
}

export default ProductsLayout
