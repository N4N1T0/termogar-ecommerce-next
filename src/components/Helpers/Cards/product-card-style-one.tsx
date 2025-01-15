'use client'

// * NEXTJS IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderProductCard } from '@/assets'
import ProductQuickViewDynamic from '@/components/Helpers/quick-view'
import AddToCart from '@/components/Helpers/quantity'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'

// * UTILS IMPORTS
import {
  CartItemType,
  ProductCardStyleOneProps,
  ProductCardType
} from '@/types'
import { eurilize, isWithinSalePeriod } from '@/lib/utils'

export default function ProductCardStyleOne<T>({
  datas,
  priority,
  discounts
}: ProductCardStyleOneProps<T>) {
  const { featuredMedia, title, stockQuantity, sale, slug, price } =
    datas as ProductCardType

  const isOnSale = sale && isWithinSalePeriod(sale)
  const remainingStock =
    stockQuantity && stockQuantity < 4 ? stockQuantity : null

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

  const refactoredDatas: CartItemType = {
    ...updatedDatas,
    quantity: 1,
    selectedOption:
      (updatedDatas.options?.values && updatedDatas.options.values[0].value) ||
      ''
  }
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
          className='h-full w-full object-fill'
          width={500}
          height={500}
        />

        {/* Stock Alert */}
        {remainingStock && !sale && (
          <div className='absolute left-0 top-3 w-full px-[30px]'>
            <div className='justify-start0 flex'>
              <p className='text-qblack font-400 text-xs leading-6'>
                Quedan Pocos
              </p>
              <span className='text-qblack font-600 ml-2 text-sm leading-6'>
                {remainingStock}
              </span>
            </div>
            <div className='progress relative h-[5px] w-full overflow-hidden rounded-[22px] bg-gray-200'>
              <div
                style={{ width: `${remainingStock * 25}%` }}
                className='absolute left-0 top-0 h-full bg-secondary'
              ></div>
            </div>
          </div>
        )}

        {/* SALE BADGE */}
        {sale && isOnSale && (
          <div className='absolute right-[14px] top-[17px]'>
            <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
              Oferta
            </span>
          </div>
        )}
      </div>

      <div className='product-card-details relative px-5 pb-3 md:px-7 md:pb-5'>
        {/* Add to Cart Button */}
        <div className='absolute left-0 top-40 hidden h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[55px] md:block'>
          <AddToCart product={refactoredDatas} />
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
              {eurilize(sale?.price || price || 0)}{' '}
              <span className='ml-1 hidden md:inline'>Precio Normal</span>
            </span>
          ) : null}
          {/* Discounted Price */}
          <span className='offer-price font-600 block text-[22px] text-secondary md:ml-2 md:inline'>
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

      {/* QUICK ACCESS BTN MOBILE */}
      <div
        className='flex w-full items-center justify-start gap-3 pb-3 pl-5 md:hidden'
        aria-label='Quick Access'
      >
        <WishlistBtn product={updatedDatas} />
        <CompaireBtn product={updatedDatas} />
      </div>

      {/* QUICK ACCESS BTN DESKTOP */}
      <div
        className='quick-access-btns absolute -right-10 top-20 hidden flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4 md:flex'
        aria-label='Quick Access'
      >
        <ProductQuickViewDynamic data={updatedDatas} />
        <WishlistBtn product={updatedDatas} />
        <CompaireBtn product={updatedDatas} />
      </div>
    </div>
  )
}
