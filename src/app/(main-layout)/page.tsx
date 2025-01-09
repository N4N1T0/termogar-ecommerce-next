// * ASSETS IMPORTS
import SectionStyleOne from '@/components/Helpers/SectionStyleOne'
import SectionStyleThree from '@/components/Helpers/SectionStyleThree'
import SectionStyleTwo from '@/components/Helpers/SectionStyleTwo'
import Banner from '@/components/Home/Banner'
import BrandSection from '@/components/Home/brand-section'
import CampaignCountDown from '@/components/Home/campaign-count-down'
import FeaturedBlog from '@/components/Home/featured-blog'
import NewsletterBanner from '@/components/Home/newsletter-banner'
import ProductsAds from '@/components/Home/products-ads'
import YouTubeVideoSection from '@/components/Home/youtube-section'
import { jldHomePage } from '@/components/seo'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MAIN_PAGE } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

const log = new Logger()

export default async function Home() {
  const searchedMainPage = await sanityClientRead.fetch(GET_MAIN_PAGE)

  if (!searchedMainPage) return log.error('No se encontraron datos')

  return (
    <main>
      <Banner
        className='banner-wrapper mb-[60px] pt-10'
        banners={searchedMainPage?.mainBanner}
      />
      <SectionStyleOne
        sectionTitle={searchedMainPage?.mainCategory?.name}
        seeMoreUrl={searchedMainPage?.mainCategory?.slug}
        className='category-products mb-[60px]'
      />
      <BrandSection
        sectionTitle='Comprar por Marcas'
        className='brand-section-wrapper mb-[60px]'
      />
      <CampaignCountDown
        className='mb-[60px]'
        // data={searchedMainPage?.offer}
      />

      <SectionStyleTwo
        sectionTitle={searchedMainPage?.secondaryCategory?.name}
        seeMoreUrl={searchedMainPage?.secondaryCategory?.slug}
        className='category-products mb-[60px]'
      />
      <ProductsAds
        // ads={searchedMainPage?.ads}
        className='products-ads-section mb-[60px]'
      />
      <FeaturedBlog />
      <SectionStyleThree
        sectionTitle={searchedMainPage?.tertiaryCategory?.name}
        seeMoreUrl={searchedMainPage?.tertiaryCategory?.slug}
        className='new-products mb-[60px]'
      />
      <YouTubeVideoSection videos={searchedMainPage?.youtubeVideos} />
      <NewsletterBanner />
      {jldHomePage()}
    </main>
  )
}
