import { cn } from '@/lib/utils'

// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'

// Assets Imports
import { Banner3 } from '@/assets'
import InfoRow from '@/components/Shared/info-row'

// TODO: Refactor to have less DOM Elements
// TODO: Prepare for Sanity and Array

const tempBanners = [
  {
    url: Banner3.src,
    blur: Banner3.blurDataURL!,
    link: ''
  },
  {
    url: Banner3.src,
    blur: Banner3.blurDataURL!,
    link: ''
  },
  {
    url: Banner3.src,
    blur: Banner3.blurDataURL!,
    link: ''
  }
]

export default function Banner({
  className = '',
  banners
}: {
  className?: string
  banners?:
    | { url: string | null; blur: string | null; link: string | null }[]
    | null
    | undefined
}) {
  if (!banners) {
    banners = tempBanners
  }

  return (
    <section
      id='hero-banner'
      className={cn('container-x mx-auto w-full', className)}
    >
      <div className='main-wrapper w-full'>
        <div className='banner-card mb-[30px] xl:flex xl:h-[600px] xl:space-x-[30px]'>
          <div data-aos='fade-right' className='h-full w-full xl:w-[740px]'>
            <LinkOrDiv banner={banners[0]} isBig={true} />
          </div>
          <div
            data-aos='fade-left'
            className='flex h-full flex-1 flex-row xl:flex-col xl:space-y-[30px]'
          >
            <div className='w-full xl:h-1/2'>
              <LinkOrDiv banner={banners[1]} />
            </div>
            <div className='w-full xl:h-1/2'>
              <LinkOrDiv banner={banners[2]} />
            </div>
          </div>
        </div>
        <InfoRow />
      </div>
    </section>
  )
}

const LinkOrDiv = ({
  banner,
  isBig = false
}: {
  banner:
    | { url: string | null; blur: string | null; link: string | null }
    | null
    | undefined
  isBig?: boolean
}) => {
  const isLinkOrDiv = banner?.link === null ? 'div' : 'link'

  if (isLinkOrDiv === 'link') {
    return (
      <Link href={banner?.link || '/'} className='h-full w-full'>
        <Image
          src={banner?.url || tempBanners[0].url}
          alt={banner?.url || tempBanners[0].url}
          width={isBig ? 740 : 450}
          height={isBig ? 600 : 285}
          blurDataURL={banner?.blur || tempBanners[0].blur}
          placeholder='blur'
          className='h-full w-full object-cover'
          priority
          quality={isBig ? 100 : 70}
        />
      </Link>
    )
  } else {
    return (
      <Image
        src={banner?.url || tempBanners[0].url}
        alt={banner?.url || tempBanners[0].url}
        width={isBig ? 740 : 450}
        height={isBig ? 600 : 285}
        blurDataURL={banner?.blur || tempBanners[0].blur}
        placeholder='blur'
        className='h-full w-full object-cover'
        priority
        quality={isBig ? 100 : 70}
      />
    )
  }
}
