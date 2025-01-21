'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

// * ASSETS IMPORTS
import AddToCart from '@/components/Helpers/quantity'
import { AtencionAlCliente, PlaceholderSquare } from '@/assets'
import { ReportProductModal } from '@/components/SingleProductPage/report-modal'
import {
  Clipboard,
  Twitter,
  Facebook,
  Phone,
  Star,
  PlayCircle
} from 'lucide-react'
import { WishlistBtn } from '@/components/Wishlist/wishlist-helpers'
import { CompaireBtn } from '@/components/Compaire/compaire-helpers'
import OptionSelect from '@/components/SingleProductPage/option-select'
import YoutubeDialog from '@/components/AllProductPage/youtube-dialog'
import NoStockNotifyMe from '@/components/Shared/no-stock-notify-me'

// * UTILS IMPORTS
import {
  cn,
  eurilize,
  shareLink,
  calculateAverageRating,
  getVideoIdFromUrl,
  isWithinSalePeriod,
  getMinPrice
} from '@/lib/utils'
import { CartItemType, YoptopReviews } from '@/types'
import { GET_WHOLE_PRODUCT_BY_SLUGResult } from '@/types/sanity'

const ProductView = ({
  className = '',
  product,
  reviews
}: {
  className?: string
  product: GET_WHOLE_PRODUCT_BY_SLUGResult
  reviews: YoptopReviews | undefined
}) => {
  const [imgUrl, setImgUrl] = React.useState({
    url: product?.featuredMedia?.url,
    blur: product?.featuredMedia?.blur,
    type: 'image'
  })
  const [type, setType] = React.useState<string | null>(null)
  const path = usePathname()

  if (!product) {
    return (
      <div className='py-10 text-center'>
        <h1 className='text-2xl font-bold'>
          No se puedo encontrar el producto
        </h1>
        <p className='mt-2'>
          El producto que está buscando no existe o ha sido eliminado.
        </p>
      </div>
    )
  }

  // * VARIABLES
  const {
    title,
    otherImages,
    categories,
    sale,
    price,
    excerpt,
    options,
    tags,
    youtube,
    stockQuantity,
    sku
  } = product

  const hasVariant =
    Array.isArray(options?.values) &&
    options.values.some((option) => option?.product)
  const youtubeThumbnail = getVideoIdFromUrl(youtube || '')
  const score = calculateAverageRating(reviews)
  const isOnSale = sale && isWithinSalePeriod(sale)
  const salePercentage =
    sale && sale.price && isOnSale && price
      ? 100 - (sale.price * 100) / price
      : null

  const refactoredRelatesProduct: CartItemType = {
    ...product,
    selectedOption: type || options?.values?.[0]?.value || '',
    quantity: 1
  }

  return (
    <section
      id='product-view'
      className={cn('product-view w-full justify-between lg:flex', className)}
    >
      {/* MAIN IMAGE */}
      <div data-aos='fade-right' className='lg:mr-12 lg:w-1/2 xl:mr-16'>
        <div className='w-full'>
          <div className='relative mb-3 flex h-[600px] w-full items-center justify-center overflow-hidden border border-gray-300 p-3'>
            <Image
              src={imgUrl.url || PlaceholderSquare}
              alt={title || 'Sin Nombre'}
              title={title || 'Sin Nombre'}
              priority
              width={600}
              height={600}
              placeholder='blur'
              blurDataURL={imgUrl.blur || PlaceholderSquare.blurDataURL}
              quality={100}
              className='object-contain'
            />
            {sale &&
              isOnSale &&
              stockQuantity !== null &&
              stockQuantity > 0 && (
                <div className='absolute left-7 top-7 flex w-fit items-center justify-center rounded-full bg-accent px-2 py-1 text-xl font-medium text-gray-50'>
                  Oferta {salePercentage && `-${salePercentage.toFixed(0)}%`}
                </div>
              )}
          </div>
          <div className='flex flex-wrap gap-2 overflow-x-auto'>
            {otherImages &&
              otherImages.length > 1 &&
              otherImages?.map((img, index) => (
                <div
                  onClick={() =>
                    setImgUrl({
                      url: img?.url || '',
                      blur: img?.blur || '',
                      type: 'image'
                    })
                  }
                  key={`img?.url-${index}`}
                  className={`w-h-28 h-28 cursor-pointer border p-4 ${
                    imgUrl.url !== img?.url
                      ? 'border-gray-500 opacity-50'
                      : 'pointer-events-none border-accent'
                  }`}
                >
                  <Image
                    src={img?.url || PlaceholderSquare}
                    alt={`${title}-${index}` || 'Sin Nombre'}
                    className='h-full w-full object-contain'
                    width={100}
                    height={100}
                    placeholder='blur'
                    blurDataURL={PlaceholderSquare.blurDataURL}
                    quality={100}
                  />
                </div>
              ))}
            {youtube && (
              <YoutubeDialog url={youtube}>
                <div className='w-h-28 relative h-28 cursor-pointer border p-4 opacity-50'>
                  <Image
                    src={youtubeThumbnail[0] || PlaceholderSquare}
                    alt={youtube}
                    className='h-full w-full object-contain'
                    width={100}
                    height={100}
                  />
                  <PlayCircle className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-gray-50' />
                </div>
              </YoutubeDialog>
            )}
          </div>
        </div>
      </div>

      <div className='flex-1 px-7 md:px-0'>
        <div className='product-details mt-10 w-full lg:mt-0'>
          {/* CATEGORIES */}
          <div
            data-aos='fade-up'
            className='mb-2 w-full text-xs font-normal uppercase tracking-wider text-gray-500'
          >
            <ul className='flex w-full gap-2'>
              {categories?.map(({ name, slug }) => (
                <li
                  key={slug}
                  className='hover-200 underline hover:text-accent'
                >
                  <Link href={`/categorias/${slug}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TITLE */}
          <p
            data-aos='fade-up'
            className='mb-3 text-2xl font-medium text-gray-900'
          >
            {title}
          </p>

          {/* REVIEWS STAR */}
          {reviews !== undefined && reviews?.length > 0 ? (
            <Link
              href='#tabs'
              data-aos='fade-up'
              className='mb-4 flex items-center space-x-[10px]'
            >
              <div className='flex text-yellow-300'>
                {Array(score)
                  .fill('reviews')
                  .map((star, index) => (
                    <Star
                      key={`${star}-${index}`}
                      className={
                        index < score ? 'fill-yellow-300' : 'fill-white'
                      }
                      stroke='currentColor'
                    />
                  ))}
              </div>
              <span className='text-sm font-normal text-gray-900'>
                {reviews?.length} Reseñas
              </span>
            </Link>
          ) : (
            <small className='mb-6'>
              Sin Reseñas, Puedes colaborar con la tuya
            </small>
          )}

          {/* PRICE */}
          {!hasVariant &&
            (stockQuantity !== null && stockQuantity > 0 ? (
              <div
                data-aos='fade-up'
                className='mb-5 flex items-center space-x-2'
              >
                {sale && isOnSale ? (
                  <>
                    <span className='font-500 mt-2 text-sm text-gray-500 line-through'>
                      {eurilize(price || 0)}
                    </span>
                    <span className='font-500 text-2xl text-red-500'>
                      {eurilize(sale?.price || 0)}
                    </span>
                  </>
                ) : (
                  <span className='font-500 text-2xl text-red-500'>
                    {eurilize(price || 0)}
                  </span>
                )}
              </div>
            ) : (
              <div className='my-3 text-xl'>Agotado</div>
            ))}

          {/* HASVARIANT PRICE SECTION */}
          {hasVariant && (
            <div className='price'>
              <span>Precios Desde:</span>
              <span className='offer-price font-600 block text-[22px] text-secondary md:ml-2 md:inline'>
                {eurilize(getMinPrice(options) || 0)}
              </span>
            </div>
          )}

          {/* EXCERPT */}
          <p
            data-aos='fade-up'
            className='text-normal mb-5 leading-7 text-gray-700'
          >
            {excerpt}
          </p>

          {/* OPTIONS */}
          {options && stockQuantity !== null && stockQuantity > 0 && (
            <OptionSelect options={options} setType={setType} />
          )}

          {/* ADD TO CART */}
          {!hasVariant && (
            <div
              data-aos='fade-up'
              className='quantity-card-wrapper my-5 flex h-12 w-full items-center space-x-2'
            >
              {stockQuantity !== null && stockQuantity > 0 ? (
                <>
                  <AddToCart
                    product={refactoredRelatesProduct}
                    stock={stockQuantity}
                    showQuantity={true}
                  />
                  <WishlistBtn product={product} />
                  <CompaireBtn product={product} />
                </>
              ) : (
                <NoStockNotifyMe product={refactoredRelatesProduct} />
              )}
            </div>
          )}

          {/* INFO */}
          <div data-aos='fade-up' className='mb-5'>
            {tags && (
              <div className='text-sm leading-7 text-gray-500'>
                <span className='text-gray-900'>Etiquetas :</span>
                <ul className='flex w-full flex-wrap gap-2'>
                  {tags?.map(({ id, name, slug }) => (
                    <li
                      key={id}
                      className='hover-200 underline hover:text-accent'
                    >
                      <Link href={`/etiquetas/${slug}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sku && (
              <p className='text-sm leading-7 text-gray-500'>
                <span className='text-gray-900'>SKU :</span> {sku}
              </p>
            )}
          </div>

          {/* REPORT */}
          <div
            data-aos='fade-up'
            className='mb-5 flex items-center space-x-2 text-red-500'
          >
            <ReportProductModal productName={title!} />
          </div>

          {/* SHARE */}
          <div
            data-aos='fade-up'
            className='social-share flex w-full items-center'
          >
            <span className='mr-4 inline-block text-sm text-gray-900'>
              Compártelo
            </span>

            <div className='flex items-center space-x-5'>
              <button
                className='hover-200 aspect-square size-5 hover:text-accent'
                onClick={() =>
                  shareLink(
                    'facebook',
                    `${process.env.NEXT_PUBLIC_URL}${path}`,
                    title || 'Termogar',
                    'product'
                  )
                }
              >
                <Facebook
                  color='currentColor'
                  strokeWidth={1.4}
                  className='h-full w-full'
                />
              </button>
              <button
                className='hover-200 aspect-square size-5 hover:text-accent'
                onClick={() =>
                  shareLink(
                    'whatsapp',
                    `${process.env.NEXT_PUBLIC_URL}${path}`,
                    title || 'Termogar',
                    'product'
                  )
                }
              >
                <Phone
                  color='currentColor'
                  strokeWidth={1.4}
                  className='h-full w-full'
                />
              </button>
              <button
                className='hover-200 aspect-square size-5 hover:text-accent'
                onClick={() =>
                  shareLink(
                    'twitter',
                    `${process.env.NEXT_PUBLIC_URL}${path}`,
                    title || 'Termogar',
                    'product'
                  )
                }
              >
                <Twitter
                  color='currentColor'
                  strokeWidth={1.4}
                  className='h-full w-full'
                />
              </button>
              <button
                className='hover-200 aspect-square size-5 hover:text-accent'
                onClick={() =>
                  shareLink(
                    'copy',
                    `${process.env.NEXT_PUBLIC_URL}${path}`,
                    title || 'Termogar',
                    'product'
                  )
                }
              >
                <Clipboard
                  color='currentColor'
                  strokeWidth={1.4}
                  className='h-full w-full'
                />
              </button>
            </div>
          </div>

          {/* COSTUMER SERVICES */}
          <div className='mt-5'>
            <Link
              href='/servicio-al-cliente'
              target='_blank'
              className='block h-auto w-fit transition-opacity duration-200 hover:opacity-75'
            >
              <Image
                src={AtencionAlCliente}
                priority
                alt='Servicio de atencion al Cliente'
                title='Chequee Nuestra Plataforma de Servicio de atencion al Cliente'
                className='h-auto max-w-[300px]'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductView
