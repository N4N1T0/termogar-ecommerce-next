// Data Imports
import datas from '@/data/products.json'

// Project Components Importa
import SectionStyleFour from '@/components/Helpers/SectionStyleFour'
import SectionStyleOne from '@/components/Helpers/SectionStyleOne'
import SectionStyleThree from '@/components/Helpers/SectionStyleThree'
import SectionStyleTwo from '@/components/Helpers/SectionStyleTwo'
import ViewMoreTitle from '@/components/Helpers/ViewMoreTitle'
import Banner from '@/components/Home/Banner'
import BrandSection from '@/components/Home/BrandSection'
import CampaignCountDown from '@/components/Home/CampaignCountDown'
import ProductsAds from '@/components/Home/ProductsAds'

// Types imports
import { ProductTypes } from '@/types'

const { products }: { products: ProductTypes[] } = datas
const brands: string[] = []
products.forEach((product) => {
  brands.push(product.brand)
})

// TODO: Add semantic tags to every section

export default async function Home() {
  return (
    <main>
      <Banner className='banner-wrapper mb-[60px] mt-10' />
      <SectionStyleOne
        products={products}
        brands={brands}
        categoryTitle='Mobile & Tablet'
        sectionTitle='Gamer World'
        seeMoreUrl='/all-products'
        className='category-products mb-[60px]'
      />
      <BrandSection
        sectionTitle='Comprar por Marcas'
        className='brand-section-wrapper mb-[60px]'
      />
      <CampaignCountDown className='mb-[60px]' lastDate='2025-10-04 4:00:00' />
      <ViewMoreTitle
        className='top-selling-product mb-[60px]'
        seeMoreUrl='/all-products'
        categoryTitle='Top Selling Products'
      >
        <SectionStyleTwo products={products.slice(3, products.length)} />
      </ViewMoreTitle>
      <ProductsAds
        ads={[
          `${process.env.NEXT_PUBLIC_URL}/assets/images/bannera-1.png`,
          `${process.env.NEXT_PUBLIC_URL}/assets/images/bannera-2.png`
        ]}
        sectionHeight='sm:h-[295px] h-full'
        className='products-ads-section mb-[60px]'
      />
      // TODO: Change the one Below for a Blog Featured Component
      <SectionStyleOne
        products={products}
        brands={brands}
        categoryTitle='Mobile & Tablet'
        sectionTitle='Gamer World'
        seeMoreUrl='/all-products'
        className='category-products mb-[60px]'
      />
      <ProductsAds
        ads={[`${process.env.NEXT_PUBLIC_URL}/assets/images/bannera-1.png`]}
        sectionHeight='sm:h-[295px] h-full'
        className='products-ads-section mb-[60px]'
      />
      <SectionStyleThree
        products={products}
        sectionTitle='New Arrivals'
        seeMoreUrl='/all-products'
        className='new-products mb-[60px]'
      />
      <SectionStyleFour
        products={products}
        sectionTitle='Popular Sales'
        seeMoreUrl='/all-products'
        className='category-products mb-[60px]'
      />
      // TODO: Add a Newsletter Component
    </main>
  )
}
