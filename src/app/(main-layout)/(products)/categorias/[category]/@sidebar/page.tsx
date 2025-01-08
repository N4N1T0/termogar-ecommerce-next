// * ASSETS IMPORTS
import BrandFilter from '@/components/AllProductPage/brand-filter'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
import { RadiogroupFilter } from '@/components/AllProductPage/radiogroup-filter'
import ResetFilters from '@/components/AllProductPage/reset-filters'
import SearchFilter from '@/components/AllProductPage/search-filter'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

// * UTILS IMPORTS
import { getPriceRange, matchBrands } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_AND_CATEGORIES_FOR_FILTERING } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'
import data from '@/data/filters.json'

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

  const filterData = data[category as keyof typeof data]

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const brandsFilter = matchBrands(searchedData)

  return (
    <>
      {/* DESKTOP */}
      <aside className='sticky top-0 m-4 hidden h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10 md:block'>
        <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
          Filtrar por...
        </h2>
        <nav aria-label='Categories filters' className='divide-y-[1px]'>
          <SearchFilter />
          <BrandFilter brands={brandsFilter} />
          <RadiogroupFilter
            categories={searchedData.children}
            label={searchedData.main ? 'Categorias' : 'Sub Categorias'}
            links={searchedData.main}
          />
          {searchedData.main && (
            <RadiogroupFilter categories={filterData} label='Sub Categorias' />
          )}
          <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
          <ResetFilters url={`/categorias/${category}`} />
        </nav>
      </aside>

      {/* MOBILE */}
      <Sheet>
        <SheetTrigger asChild>
          <div className='mt-3 flex w-full justify-end px-3 md:hidden'>
            <button className='border border-accent px-4 py-2 text-accent'>
              Filtrar por...
            </button>
          </div>
        </SheetTrigger>
        <SheetContent className='overflow-y-auto bg-white' side='right'>
          <SheetHeader>
            <SheetTitle className='sr-only'>Filtros de {category}</SheetTitle>
            <SheetDescription className='sr-only'>
              Filtros para los productos dentro de la categoria de {category}
            </SheetDescription>
          </SheetHeader>
          <nav aria-label='Categories filters' className='divide-y-[1px]'>
            <SearchFilter />
            <BrandFilter brands={brandsFilter} />
            <RadiogroupFilter
              categories={searchedData.children}
              label={searchedData.main ? 'Categorias' : 'Sub Categorias'}
              links={searchedData.main}
            />
            {searchedData.main && (
              <RadiogroupFilter
                categories={filterData}
                label='Sub Categorias'
              />
            )}
            <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
            <ResetFilters url={`/categorias/${category}`} />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProductSidebar
