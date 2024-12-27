// * ASSETS IMPORTS
import BrandAccordion from '@/components/AllProductPage/brand-accordion'
import BrandFilter from '@/components/AllProductPage/brand-filter'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
import ResetFilters from '@/components/AllProductPage/reset-filters'
import SearchFilter from '@/components/AllProductPage/search-filter'

// * UTILS IMPORTS
import {
  getPriceRange,
  groupCategoriesWithExtras,
  matchBrands
} from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_WITH_OFFER_FOR_FILTERING } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

const ProductSidebar = async () => {
  const searchedData = await sanityClientRead.fetch(
    GET_PRODUCTS_WITH_OFFER_FOR_FILTERING
  )

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = groupCategoriesWithExtras(searchedData)
  const brandsFilter = matchBrands(searchedData)

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
        Filtrar por...
      </h2>
      <nav aria-label='Categories filters'>
        <SearchFilter />
        <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
        <BrandAccordion categories={categoriesFilter} label='Sub Categorias' />
        <BrandFilter brands={brandsFilter} />
        <ResetFilters url={`/ofertas`} />
      </nav>
    </aside>
  )
}

export default ProductSidebar
