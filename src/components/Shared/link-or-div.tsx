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
        className='group mb-10 block h-40 w-full overflow-hidden'
      >
        <Image
          src={banner?.url || Banner5}
          alt='Banner para la lista de productos'
          width={1902}
          height={164}
          blurDataURL={banner?.blur || Banner5.blurDataURL}
          placeholder='blur'
          className='h-full w-full object-cover transition-transform duration-200 ease-in group-hover:scale-105'
        />
      </Link>
    )
  } else {
    return (
      <div className='mb-10 h-40 w-full overflow-hidden'>
        <Image
          src={banner?.url || Banner5}
          alt='Banner para la lista de productos'
          width={1902}
          height={164}
          className='h-full w-full object-fill'
        />
      </div>
    )
  }
}

export default LinkOrDiv
