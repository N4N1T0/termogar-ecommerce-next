// * ASSETS IMPORTS
import BrandFilter from '@/components/AllProductPage/brand-filter'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
import { RadiogroupFilter } from '@/components/AllProductPage/radiogroup-filter'
import ResetFilters from '@/components/AllProductPage/reset-filters'
import SearchFilter from '@/components/AllProductPage/search-filter'

// * UTILS IMPORTS
import { getPriceRange, matchCategories, matchBrands } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_AND_CATEGORIES_FOR_FILTERING } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

export const dynamic = 'force-dynamic'
const log = new Logger()

const ProductSidebar = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { category } = await params

  const searchedData = await sanityClientRead.fetch(
    GET_PRODUCTS_AND_CATEGORIES_FOR_FILTERING,
    { slug: category }
  )

  if (!searchedData) return log.error('No se encontraron categorias')

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = matchCategories(searchedData)
  const brandsFilter = matchBrands(searchedData)

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
        Filtrar por...
      </h2>
      <nav aria-label='Categories filters' className='divide-y-[1px]'>
        <SearchFilter />
        <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
        <RadiogroupFilter
          categories={categoriesFilter}
          label='Sub Categorias'
        />
        <BrandFilter brands={brandsFilter} />
        <ResetFilters url={`/categorias/${category}`} />
      </nav>
    </aside>
  )
}

export default ProductSidebar
