// * ASSETS IMPORTS
import BrandAccordion from '@/components/AllProductPage/brand-accordion'
import BrandFilter from '@/components/AllProductPage/brand-filter'
import PriceRangeSlider from '@/components/AllProductPage/price-range-slider'
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
import {
  getPriceRange,
  groupCategoriesWithExtras,
  matchBrands
} from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_PRODUCTS_WITH_OFFER_FOR_FILTERING } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

const ProductSidebar = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const searchParamsKey = await searchParams

  const searchedData = await sanityClientRead.fetch(
    GET_PRODUCTS_WITH_OFFER_FOR_FILTERING
  )

  const { maxPrice, minPrice } = getPriceRange(searchedData?.products)
  const categoriesFilter = groupCategoriesWithExtras(searchedData)
  const brandsFilter = matchBrands(searchedData)

  return (
    <>
      {/* DESKTOP */}
      <aside className='sticky top-0 m-4 hidden h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10 md:block'>
        <h2 className='mb-2 text-xl font-semibold uppercase text-accent'>
          Filtrar por...
        </h2>
        <nav
          aria-label='Categories filters'
          className='divide-y-[1px]'
          key={JSON.stringify(searchParamsKey)}
        >
          <SearchFilter />
          <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
          <BrandAccordion
            categories={categoriesFilter}
            label='Sub Categorias'
          />
          <BrandFilter brands={brandsFilter} />
          <ResetFilters url={`/ofertas`} />
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
            <SheetTitle className='sr-only'>Filtros de Ofertas</SheetTitle>
            <SheetDescription className='sr-only'>
              Filtros para los productos dentro de la categoria de Ofertas
            </SheetDescription>
          </SheetHeader>
          <nav
            aria-label='Categories filters'
            className='divide-y-[1px]'
            key={JSON.stringify(searchParamsKey)}
          >
            <SearchFilter />
            <PriceRangeSlider min={minPrice} max={maxPrice} step={10} />
            <BrandAccordion
              categories={categoriesFilter}
              label='Sub Categorias'
            />
            <BrandFilter brands={brandsFilter} />
            <ResetFilters url={`/ofertas`} />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProductSidebar
