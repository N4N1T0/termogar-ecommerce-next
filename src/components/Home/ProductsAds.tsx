import { cn } from '@/lib/utils'
import { ProductsAdsProps } from '@/types'
import Link from 'next/link'

export default function ProductsAds({
  className,
  ads = ['', ''],
  sectionHeight
}: ProductsAdsProps) {
  // TODO: Make it for 3 or 4 ads
  // TODO: Refactor to have less DOM Elements

  return (
    <div className={cn('w-full', className)}>
      <div className='container-x mx-auto'>
        <div
          className={`${sectionHeight} ${
            ads.length > 1 && ads.length <= 2
              ? 'sm:flex sm:space-x-5 xl:space-x-[30px]'
              : ''
          } w-full items-center overflow-hidden`}
        >
          <div
            data-aos='fade-right'
            className={`mb-5 h-full sm:mb-0 ${
              ads.length > 1 && ads.length <= 2 ? 'w-full sm:w-1/2' : 'w-full'
            } `}
          >
            <Link href='/single-product'>
              <img src={ads[0]} alt='' className='h-auto w-full sm:h-full' />
            </Link>
          </div>
          {ads.length > 1 && ads.length <= 2 && (
            <div data-aos='fade-left' className='h-full flex-1'>
              <Link href='/single-product'>
                <img src={ads[1]} alt='' className='h-full w-full' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
