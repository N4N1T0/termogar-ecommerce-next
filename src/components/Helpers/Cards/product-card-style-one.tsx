'use client'

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
  priority,
  discounts
}: ProductCardStyleOneProps<T>) {
  const refactoredDatas = datas as ProductCardType
  const { featuredMedia, title, stockQuantity, sale, slug, price } =
    refactoredDatas

  const isOnSale = sale && isWithinSalePeriod(sale)
  const remainingStock =
    stockQuantity && stockQuantity < 5 ? stockQuantity : null

  // Calculate Prices
  const getDiscountedPrice = (basePrice: number): number =>
    discounts ? basePrice * (1 - discounts / 100) : basePrice

  const finalPrice =
    sale && isOnSale
      ? getDiscountedPrice(sale.price || 0)
      : getDiscountedPrice(price || 0)
  const finalPriceWithIVA = finalPrice * 1.21

  const updatedDatas = {
    ...datas,
    ...(isOnSale && sale
      ? { sale: { ...sale, price: finalPrice } }
      : { price: finalPrice })
  } as unknown as ProductCardType

  return (
    <div
      className='product-card-one group relative h-full w-full overflow-hidden bg-white'
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Image */}
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
        {/* Stock Alert */}
        {remainingStock && (
          <div className='absolute left-0 top-3 w-full px-[30px]'>
            <div className='progress-title flex justify-between'>
              <p className='text-qblack font-400 text-xs leading-6'>
                Quedan Pocos
              </p>
              <span className='text-qblack font-600 text-sm leading-6'>
                {remainingStock}
              </span>
            </div>
            <div className='progress bg-primarygray relative h-[5px] w-full overflow-hidden rounded-[22px]'>
              <div
                style={{ width: `${remainingStock * 20}%` }}
                className='absolute left-0 top-0 h-full bg-secondary'
              ></div>
            </div>
          </div>
        )}
        {/* Sale Badge */}
        {sale && isOnSale && (
          <div className='absolute right-[14px] top-[17px]'>
            <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
              Oferta
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className='product-card-details relative px-[30px] pb-[20px]'>
        {/* Add to Cart Button */}
        <div className='absolute left-0 top-36 h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[55px]'>
          <AddToCart product={updatedDatas} />
        </div>
        <Link href={`/producto/${slug}`} prefetch={true}>
          <p className='title font-600 mb-1 line-clamp-2 text-[15px] leading-[24px] text-gray-900 transition-colors duration-150 ease-in-out hover:text-secondary'>
            {title}
          </p>
        </Link>
        {/* Price Section */}
        <div className='price'>
          {/* Original Price */}
          {(sale && isOnSale) || discounts ? (
            <span className='font-400 block text-[14px] text-gray-500 line-through'>
              {eurilize(sale?.price || price || 0)} Precio Normal
            </span>
          ) : null}
          {/* Discounted Price */}
          <span className='offer-price font-600 text-[22px] text-secondary'>
            {eurilize(finalPrice)}
          </span>
          {/* Price with IVA */}
          <span className='iva-price font-600 ml-2 text-[16px] text-gray-800'>
            {eurilize(finalPriceWithIVA)}
            <small className='ml-1 text-[11px] font-normal underline'>
              IVA.
            </small>
          </span>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className='quick-access-btns absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
        <ProductQuickViewDynamic data={updatedDatas} />
        <WishlistBtn product={updatedDatas} />
        <CompaireBtn product={updatedDatas} />
      </div>
    </div>
  )
}
