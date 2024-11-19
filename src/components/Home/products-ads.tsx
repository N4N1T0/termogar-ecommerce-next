import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderHorizontal } from '@/assets'
import { ProductsAdsProps } from '@/types'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'

// Temporary ads array
const tempAds = Array(4).fill({
  media: {
    src: PlaceholderHorizontal,
    blur: PlaceholderHorizontal.blurDataURL
  },
  link: ''
})

export default function ProductsAds({
  className,
  ads = tempAds
}: ProductsAdsProps) {
  return (
    <section id='ads' className={cn('w-full', className)}>
      <div className='container-x mx-auto grid grid-cols-1 gap-10 sm:grid-cols-2'>
        {ads.map(({ media, link }, index) => {
          // Check if the current item is the last item and if its index is not divisible by 2
          const isLastIndexNotDivisibleBy2 =
            index === ads.length - 1 && (index + 1) % 2 !== 0

          return (
            <div
              data-aos='fade-left'
              className={`h-full ${isLastIndexNotDivisibleBy2 ? 'col-span-2' : 'col-span-1'}`}
              key={`image-${link}-${index}`}
            >
              <Link href={link}>
                <Image
                  src={PlaceholderHorizontal}
                  alt={link}
                  blurDataURL={media.blur}
                  placeholder='blur'
                  width={740}
                  height={300}
                  className='h-full w-full'
                />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
