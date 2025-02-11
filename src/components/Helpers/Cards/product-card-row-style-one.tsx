// * NEXT.JS IMPORTS
import React from 'react'
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
import { cn, eurilize, getMinPrice, isWithinSalePeriod } from '@/lib/utils'
import NoStockNotifyMe from '@/components/Shared/no-stock-notify-me'
import { ShoppingBag } from 'lucide-react'

const ProductCardRowStyleOne = ({
  className,
  datas
}: ProductCardRowStyleTwoProps<ProductCardType>) => {
  const { featuredMedia, title, slug, sale, price, stockQuantity, options } =
    datas

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
  const refactoredDatas: CartItemType = React.useMemo(
    () => ({
      ...datas,
      quantity: 1,
      selectedOption: options?.values?.[0]?.value || ''
    }),
    [datas, options?.values]
  )

  return (
    <div
      data-aos='fade-left'
      className={cn(
        'product-row-card-style-one group relative h-[200px] w-full overflow-hidden bg-white',
        className
      )}
    >
      {/* STOCK ALERT */}
      {remainingStock &&
        stockQuantity &&
        stockQuantity > 0 &&
        !sale &&
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
        stockQuantity &&
        stockQuantity > 0 &&
        !hasVariant && (
          <div className='absolute left-[14px] top-[17px]'>
            <span className='font-700 rounded-full bg-accent px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
              Oferta {salePercentage && `-${salePercentage.toFixed(0)}%`}
            </span>
          </div>
        )}

      {/* OUT OF STOCK BADGE */}
      {stockQuantity && stockQuantity === 0 && !hasVariant && (
        <div className='absolute left-[14px] top-[17px]'>
          <span className='font-700 rounded-full bg-gray-500 px-3 py-[6px] text-xs uppercase leading-none tracking-wider text-white'>
            Agotado
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
              <p className='title font-600 text-qblack mb-2 line-clamp-3 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                {title}
              </p>
            </Link>
            {!hasVariant ? (
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
                  <small className='ml-1 font-normal underline'>
                    IVA incl.
                  </small>
                </span>
              </div>
            ) : (
              <div className='price'>
                <span>Precios Desde:</span>
                <span className='offer-price font-600 block text-[22px] text-secondary md:ml-2 md:inline'>
                  {eurilize(getMinPrice(options) || 0)}
                </span>
              </div>
            )}

            {!hasVariant ? (
              stockQuantity !== null && stockQuantity > 0 ? (
                <AddToCart product={refactoredDatas} stock={stockQuantity} />
              ) : (
                <NoStockNotifyMe product={refactoredDatas} />
              )
            ) : (
              <Link
                href={`/producto/${slug}`}
                className='mt-2 flex w-full items-center justify-center gap-2 rounded-none bg-accent py-2 text-sm text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'
              >
                <ShoppingBag size={18} />
                Ver Variantes
              </Link>
            )}
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
