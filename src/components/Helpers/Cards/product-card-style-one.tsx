'use client'

// * NEXTJS IMPORTS
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderProductCard } from '@/assets'
import ProductQuickViewDynamic from '@/components/Helpers/quick-view'
import AddToCart, {
  AddToCartMobile,
  AddToCartVariant
} from '@/components/Helpers/quantity'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'

// * UTILS IMPORTS
import {
  CartItemType,
  ProductCardStyleOneProps,
  ProductCardType
} from '@/types'
import { eurilize, getMinPrice, isWithinSalePeriod } from '@/lib/utils'
import NoStockNotifyMe from '@/components/Shared/no-stock-notify-me'
import { ShoppingBag } from 'lucide-react'

export default function ProductCardStyleOne<T>({
  datas,
  priority,
  discounts
}: ProductCardStyleOneProps<T>) {
  const { featuredMedia, title, stockQuantity, sale, slug, price, options } =
    datas as ProductCardType

  const isOnSale = React.useMemo(() => sale && isWithinSalePeriod(sale), [sale])
  const remainingStock = React.useMemo(
    () => (stockQuantity && stockQuantity < 4 ? stockQuantity : null),
    [stockQuantity]
  )
  const salePercentage = React.useMemo(
    () =>
      isOnSale && sale?.price && price
        ? 100 - (sale.price * 100) / price
        : null,
    [isOnSale, sale, price]
  )
  const hasVariant = React.useMemo(
    () =>
      Array.isArray(options?.values) &&
      options.values.some((option) => option?.product),
    [options]
  )

  const hasSimpleVariant = React.useMemo(
    () =>
      Array.isArray(options?.values) &&
      options.values.some((option) => option?.product === null),
    [options]
  )

  const getDiscountedPrice = React.useCallback(
    (basePrice: number): number =>
      discounts ? basePrice * (1 - discounts / 100) : basePrice,
    [discounts]
  )

  const finalPrice = React.useMemo(
    () => getDiscountedPrice(isOnSale && sale?.price ? sale.price : price || 0),
    [getDiscountedPrice, isOnSale, sale?.price, price]
  )
  const finalPriceWithIVA = React.useMemo(() => finalPrice * 1.21, [finalPrice])

  const updatedDatas: ProductCardType = React.useMemo(
    () => ({
      ...(datas as ProductCardType),
      ...(isOnSale && sale
        ? { sale: { ...sale, price: finalPrice } }
        : { price: finalPrice })
    }),
    [datas, isOnSale, sale, finalPrice]
  )

  const refactoredDatas: CartItemType = React.useMemo(
    () => ({
      ...updatedDatas,
      quantity: 1,
      selectedOption: options?.values?.[0]?.value || ''
    }),
    [updatedDatas, options]
  )

  return (
    <div
      className='product-card-one group relative h-full w-full overflow-hidden bg-white'
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Image */}
      <div className='h-[200px] w-full p-5 sm:h-[280px]'>
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

        {/* STOCK ALERT */}
        {remainingStock &&
          !sale &&
          stockQuantity !== null &&
          stockQuantity > 0 &&
          !hasVariant && (
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
        {sale &&
          isOnSale &&
          stockQuantity !== null &&
          stockQuantity > 0 &&
          !hasVariant && (
            <div className='absolute right-[14px] top-[17px]'>
              <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
                Oferta {salePercentage && `-${salePercentage.toFixed(0)}%`}
              </span>
            </div>
          )}
      </div>

      {/* OUT OF STOCK BADGE */}
      {stockQuantity !== null && stockQuantity === 0 && !hasVariant && (
        <div className='absolute right-[14px] top-[17px]'>
          <span className='font-700 rounded-full bg-gray-900 px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
            Agotado
          </span>
        </div>
      )}

      <div className='product-card-details relative px-5 pb-3 md:px-7 md:pb-5'>
        {/* ADD TO CART */}
        {!hasVariant && stockQuantity !== null && (
          <div className='absolute left-0 top-40 hidden h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[55px] md:block'>
            {stockQuantity > 0 ? (
              hasSimpleVariant ? (
                <AddToCartVariant
                  product={refactoredDatas}
                  stock={stockQuantity}
                />
              ) : (
                <AddToCart product={refactoredDatas} stock={stockQuantity} />
              )
            ) : (
              <NoStockNotifyMe product={refactoredDatas} />
            )}
          </div>
        )}

        {/* TITLE */}
        <Link href={`/producto/${slug}`} prefetch={true}>
          <p className='title font-600 mb-1 line-clamp-3 text-[15px] uppercase leading-[24px] text-gray-900 transition-colors duration-150 ease-in-out hover:text-secondary'>
            {title}
          </p>
        </Link>

        {/* PRICE SECTION */}
        {!hasVariant && (
          <div className='price'>
            {(sale && isOnSale) || discounts ? (
              <span className='font-400 block text-[14px] text-gray-500 line-through'>
                {discounts ? eurilize(finalPrice) : eurilize(price || 0)}
                <span className='ml-1 hidden md:inline'>Precio Normal</span>
              </span>
            ) : null}
            <span className='offer-price font-600 block text-[22px] text-secondary md:ml-2 md:inline'>
              {eurilize(finalPrice)}
            </span>
            <span className='iva-price font-600 text-[16px] text-gray-800 sm:ml-2'>
              {eurilize(finalPriceWithIVA)}
              <small className='ml-1 text-[11px] font-normal underline'>
                IVA.
              </small>
            </span>
          </div>
        )}

        {/* HASVARIANT PRICE SECTION */}
        {hasVariant && (
          <div className='price'>
            <span>Precios Desde:</span>
            <span className='offer-price font-600 block text-[22px] text-secondary md:ml-2 md:inline'>
              {eurilize(getMinPrice(options) || 0)}
            </span>
          </div>
        )}

        {/* VARIANT LINK */}
        {hasVariant && (
          <Link
            href={`/producto/${slug}`}
            className='mt-2 flex w-full items-center justify-center gap-2 rounded-none bg-accent py-2 text-sm text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'
          >
            <ShoppingBag size={18} />
            Ver Variantes
          </Link>
        )}
      </div>

      {/* QUICK ACCESS BTN MOBILE */}
      {stockQuantity !== null && stockQuantity > 0 && !hasVariant && (
        <div
          className='flex w-full items-center justify-start gap-3 pb-3 pl-5 md:hidden'
          aria-label='Quick Access'
        >
          <WishlistBtn product={updatedDatas} />
          <CompaireBtn product={updatedDatas} />
          <AddToCartMobile product={refactoredDatas} />
        </div>
      )}

      {/* QUICK ACCESS BTN DESKTOP */}
      {stockQuantity !== null && stockQuantity > 0 && !hasVariant && (
        <div
          className='quick-access-btns absolute -right-10 top-20 hidden flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4 md:flex'
          aria-label='Quick Access'
        >
          <ProductQuickViewDynamic data={updatedDatas} />
          <WishlistBtn product={updatedDatas} />
          <CompaireBtn product={updatedDatas} />
        </div>
      )}
    </div>
  )
}
