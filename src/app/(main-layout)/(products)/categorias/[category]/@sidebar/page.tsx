// * ASSETS IMPORTS
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
import { RadiogroupFilter } from '@/components/AllProductPage/radiogroup-filter'

// * UTILS IMPORTS
import { getPriceRange, matchCategories } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_AND_CATEGORIES_FOR_FILTERING } from '@/sanity/lib/queries'

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

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = matchCategories(searchedData)

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
        Filtrar por...
      </h2>
      <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
      <RadiogroupFilter categories={categoriesFilter} label='Sub Categorias' />
    </aside>
  )
}

export default ProductSidebar
