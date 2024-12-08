// * NEXTJS IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderProductCard } from '@/assets'

// * UTILS IMPORTS
import { ProductCardStyleOneProps, ProductCardType } from '@/types'
import { eurilize, isWithinSalePeriod } from '@/lib/utils'

// * COMPONENTS IMPORTS
import ProductQuickViewDynamic from '@/components/Helpers/quick-view'
import AddToCart from '@/components/Helpers/quantity'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'

export default function ProductCardStyleOne<T>({
  datas,
  priority
}: ProductCardStyleOneProps<T>) {
  const { featuredMedia, title, stockQuantity, sale, slug, price } =
    datas as ProductCardType
  const refactorStock =
    stockQuantity && stockQuantity < 5 ? stockQuantity : null

  const isOnSale = isWithinSalePeriod(sale)
  console.log('🚀 ~ isOnSale:', isOnSale)

  return (
    <div
      className='product-card-one group relative h-full w-full overflow-hidden bg-white'
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
    >
      <div className='h-[300px] w-full p-5'>
        <Image
          src={featuredMedia?.url || PlaceholderProductCard}
          alt={title || ''}
          priority={priority}
          placeholder='blur'
          blurDataURL={
            featuredMedia?.blur || PlaceholderProductCard.blurDataURL
          }
          className='h-full w-full object-cover'
          width={500}
          height={500}
        />

        {/* FEW */}
        {refactorStock && (
          <>
            <div className='absolute left-0 top-3 w-full px-[30px]'>
              <div className='progress-title flex justify-between'>
                <p className='text-qblack font-400 text-xs leading-6'>
                  Quedan Pocos
                </p>
                <span className='text-qblack font-600 text-sm leading-6'>
                  {refactorStock}
                </span>
              </div>
              <div className='progress bg-primarygray relative h-[5px] w-full overflow-hidden rounded-[22px]'>
                <div
                  style={{
                    width: `${refactorStock * 20}%`
                  }}
                  className='absolute left-0 top-0 h-full bg-secondary'
                ></div>
              </div>
            </div>
          </>
        )}

        {/* SALE */}
        {sale && isOnSale && (
          <div className='absolute right-[14px] top-[17px]'>
            <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
              Oferta
            </span>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className='product-card-details relative px-[30px] pb-[20px]'>
        {/* add to card button */}
        <div className='absolute left-0 top-36 h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[55px]'>
          <AddToCart product={datas as ProductCardType} />
        </div>
        <Link href={`/producto/${slug}`} prefetch={true}>
          <p className='title font-600 mb-1 line-clamp-2 text-[15px] leading-[24px] text-gray-900 transition-colors duration-150 ease-in-out hover:text-secondary'>
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
            <span className='offer-price font-600 text-[24px] text-secondary'>
              {eurilize(sale?.price || 0)}
            </span>
          )}
          <span className='iva-price font-600 ml-2 text-[18px] text-gray-800'>
            {eurilize(
              sale && isOnSale
                ? (sale?.price || 0) + (sale?.price || 0) * 0.21
                : (price || 0) + (price || 0) * 0.21
            )}
            <small className='ml-1 font-normal underline'>IVA incl.</small>
          </span>
        </div>
      </div>

      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
        <ProductQuickViewDynamic data={datas as ProductCardType} />
        <WishlistBtn product={datas as ProductCardType} />
        <CompaireBtn product={datas as ProductCardType} />
      </div>
    </div>
  )
}
