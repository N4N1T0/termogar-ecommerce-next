// * ASSETS IMPORTS
import BrandAccordion from '@/components/AllProductPage/brand-accordion'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
import ResetFilters from '@/components/AllProductPage/reset-filters'
import SearchFilter from '@/components/AllProductPage/search-filter'

// * UTILS IMPORTS
import { getPriceRange, groupCategoriesWithExtras } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_AND_BRAND_FOR_FILTERING } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

const log = new Logger()
export const dynamic = 'force-dynamic'

const ProductSidebar = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { brand } = await params

  const searchedData = await sanityClientRead.fetch(
    GET_PRODUCTS_AND_BRAND_FOR_FILTERING,
    { slug: brand }
  )

  if (!searchedData) {
    log.error('Brand not found', { searchedData })
  }

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = groupCategoriesWithExtras(searchedData)

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
        Filtrar por...
      </h2>
      <nav aria-label='Brands filters' className='divide-y-[1px]'>
        <SearchFilter />
        <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
        <BrandAccordion categories={categoriesFilter} label='Categorias' />
        <ResetFilters url={`/marcas/${brand}`} />
      </nav>
    </aside>
  )
}

export default ProductSidebar
