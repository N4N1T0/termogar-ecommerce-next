// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import { ProductCardRowStyleTwoProps, ProductCardType } from '@/types'
import ProductQuickViewDynamic from '@/components/Helpers/quick-view'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import AddToCart from '@/components/Helpers/quantity'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'

// * UTILS IMPORTS
import { cn, eurilize } from '@/lib/utils'
import { PlaceholderSquare } from '@/assets'

const ProductCardRowStyleOne = ({
  className,
  datas
}: ProductCardRowStyleTwoProps<ProductCardType>) => {
  const { featuredMedia, title, slug, sale, price } = datas
  return (
    <div
      data-aos='fade-left'
      className={cn(
        'product-row-card-style-one group relative h-[250px] w-full overflow-hidden bg-white',
        className
      )}
    >
      <div className='flex h-full w-full items-center space-x-5 p-2 sm:p-5 lg:p-[30px]'>
        <div className='h-full w-1/3 lg:w-1/2'>
          <Image
            src={featuredMedia?.url || PlaceholderSquare}
            alt={title || 'Sin Nombres'}
            title={title || 'Sin Nombres'}
            width={200}
            height={200}
            placeholder='blur'
            blurDataURL={featuredMedia?.blur || PlaceholderSquare.blurDataURL}
            className='h-full w-full object-contain'
          />
        </div>
        <div className='flex h-full flex-1 flex-col justify-center'>
          <div>
            <Link href={`/productos/${slug}`}>
              <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                {title}
              </p>
            </Link>
            <p className='price'>
              <span
                className={`main-price font-600 text-[22px] ${
                  sale ? 'text-gray-500 line-through' : 'text-secondary'
                }`}
              >
                {eurilize(price || 0)}
              </span>
              <span className='offer-price font-600 ml-2 text-[22px] text-secondary'>
                {sale ? eurilize(sale?.price || 0) : ''}
              </span>
            </p>
            <AddToCart className='w-fit' product={datas as ProductCardType} />
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -right-10 top-[30px] flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
        <ProductQuickViewDynamic data={datas as ProductCardType} />
        <WishlistBtn product={datas as ProductCardType} />
        <CompaireBtn product={datas as ProductCardType} />
      </div>
    </div>
  )
}

export default ProductCardRowStyleOne
