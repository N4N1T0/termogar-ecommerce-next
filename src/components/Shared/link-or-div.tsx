// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { Banner5 } from '@/assets'

const LinkOrDiv = ({
  banner
}: {
  banner: {
    url: string | null
    blur: string | null
    link: string | null
  } | null
}) => {
  const isLinkOrDiv = banner?.link === null ? 'div' : 'link'

  if (isLinkOrDiv === 'link') {
    return (
      <Link
        href={banner?.link || '/'}
        className='group mx-auto mb-10 block h-32 w-full max-w-screen-lg overflow-hidden md:h-64'
      >
        <Image
          src={banner?.url || Banner5}
          alt='Banner para la lista de productos'
          width={1920}
          height={630}
          blurDataURL={banner?.blur || Banner5.blurDataURL}
          placeholder='blur'
          className='h-full w-full object-cover transition-transform duration-200 ease-in group-hover:scale-105'
        />
      </Link>
    )
  } else {
    return (
      <div className='mx-auto mb-10 h-32 w-full max-w-screen-lg overflow-hidden md:h-64'>
        <Image
          src={banner?.url || Banner5}
          alt='Banner para la lista de productos'
          width={1920}
          height={630}
          className='h-full w-full object-fill'
        />
      </div>
    )
  }
}

export default LinkOrDiv
