// * ASSETS IMPORTS
import BrandAccordion from '@/components/AllProductPage/brand-accordion'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'

// * UTILS IMPORTS
import { getPriceRange, groupCategoriesWithExtras } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_WITH_OFFER_FOR_FILTERING } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

const ProductSidebar = async () => {
  const searchedData = await sanityClientRead.fetch(
    GET_PRODUCTS_WITH_OFFER_FOR_FILTERING
  )

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = groupCategoriesWithExtras(searchedData)

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
        Filtrar por...
      </h2>
      <nav aria-label='Categories filters'>
        <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
        <BrandAccordion categories={categoriesFilter} label='Sub Categorias' />
      </nav>
    </aside>
  )
}

export default ProductSidebar
