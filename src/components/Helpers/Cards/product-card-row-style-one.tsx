// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import ProductQuickViewDynamic from '@/components/Helpers/quick-view'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import AddToCart from '@/components/Helpers/quantity'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'
import { PlaceholderSquare } from '@/assets'

// * UTILS IMPORTS
import {
  CartItemType,
  ProductCardRowStyleTwoProps,
  ProductCardType
} from '@/types'
import { cn, eurilize, isWithinSalePeriod } from '@/lib/utils'

const ProductCardRowStyleOne = ({
  className,
  datas
}: ProductCardRowStyleTwoProps<ProductCardType>) => {
  const { featuredMedia, title, slug, sale, price } = datas

  const isOnSale = isWithinSalePeriod(sale)

  const refactoredDatas: CartItemType = {
    ...datas,
    quantity: 1,
    selectedOption:
      (datas.options?.values && datas.options.values[0].value) || ''
  }

  return (
    <div
      data-aos='fade-left'
      className={cn(
        'product-row-card-style-one group relative h-[200px] w-full overflow-hidden bg-white',
        className
      )}
    >
      {/* SALE */}
      {sale && isOnSale && (
        <div className='absolute left-[14px] top-[17px]'>
          <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
            Oferta
          </span>
        </div>
      )}

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
            <Link href={`/producto/${slug}`} prefetch={true}>
              <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                {title}
              </p>
            </Link>
            <div className='price'>
              <span
                className={`${
                  sale && isOnSale
                    ? 'font-400 block text-[14px] text-gray-500 line-through'
                    : 'font-600 text-[22px] text-secondary'
                }`}
              >
                {eurilize(price || 0)} {sale && isOnSale && 'Precio Normal'}
              </span>
              {sale && isOnSale && (
                <span className='offer-price font-600 block text-[24px] text-secondary'>
                  {eurilize(sale?.price || 0)}
                </span>
              )}
              <span className='iva-price font-600 text-[18px] text-gray-800'>
                {eurilize(
                  sale && isOnSale
                    ? (sale?.price || 0) + (sale?.price || 0) * 0.21
                    : (price || 0) + (price || 0) * 0.21
                )}
                <small className='ml-1 font-normal underline'>IVA incl.</small>
              </span>
            </div>
            <AddToCart className='mt-2 w-fit' product={refactoredDatas} />
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -left-10 top-[60px] flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:left-4'>
        <ProductQuickViewDynamic data={datas as ProductCardType} />
        <WishlistBtn product={datas as ProductCardType} />
        <CompaireBtn product={datas as ProductCardType} />
      </div>
    </div>
  )
}

export default ProductCardRowStyleOne
