'use client'

// * ASSETS IMPORTS
import EmptyCompaireError from '@/components/Compaire/empty'
import CompaireProductTable from '@/components/Compaire/product-table'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import RelatedProducts from '@/components/Shared/client-related-products'

// * UTILS IMPORTS
import { useCompare } from '@/stores'
import { getMostUsedCategory } from '@/lib/utils'

const CompaireProductsClientPage = () => {
  const { products, rehydrated } = useCompare()
  const mostUsedCategory = getMostUsedCategory(products)

  if (!rehydrated) {
    return (
      <section
        id='compaire-loader'
        className='mt-10 grid h-full w-full place-content-center'
      >
        <LoaderStyleOne />
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section
        id='compaire-empty'
        className='mx-auto mt-10 w-full max-w-screen-xl px-2 md:px-6'
      >
        <EmptyCompaireError />
      </section>
    )
  }

  return (
    <>
      <CompaireProductTable products={products} />
      <RelatedProducts mostUsedCategory={mostUsedCategory} />
    </>
  )
}

export default CompaireProductsClientPage
