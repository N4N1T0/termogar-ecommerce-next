'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

// * ASSETS IMPORTS
import AddToCart from '@/components/Helpers/quantity'
import { AtencionAlCliente, PlaceholderSquare } from '@/assets'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ReportProductModal } from '@/components/SingleProductPage/report-modal'
import { Clipboard, Twitter, Facebook, Phone, Star } from 'lucide-react'

// * UTILS IMPORTS
import { GET_WHOLE_PRODUCT_BY_SLUGResult } from '@/types/sanity'
import { PortableText } from 'next-sanity'
import { cn, eurilize, shareLink, calculateAverageRating } from '@/lib/utils'
import { YoptopReviews } from '@/types'
import { WishlistBtn } from '../Wishlist/wishlist-helpers'
import { CompaireBtn } from '../Compaire/compaire-helpers'

const ProductView = ({
  className = '',
  product
}: {
  className?: string
  product: GET_WHOLE_PRODUCT_BY_SLUGResult & {
    reviews: YoptopReviews | undefined
  }
}) => {
  const [imgUrl, setImgUrl] = useState({
    url: product?.featuredMedia.url,
    blur: product?.featuredMedia.blur
  })
  const path = usePathname()

  const score = calculateAverageRating(product.reviews)

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

  const {
    title,
    otherImages,
    categories,
    sale,
    price,
    excerpt,
    options,
    id,
    tags,
    dimensions
  } = product
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
            {sale && (
              <div className='h-w-20 absolute left-7 top-7 flex w-20 items-center justify-center rounded-full bg-accent text-xl font-medium text-gray-50'>
                <span>Oferta</span>
              </div>
            )}
          </div>
          <div className='flex flex-wrap gap-2'>
            {otherImages &&
              otherImages.length > 1 &&
              otherImages?.map((img, index) => (
                <div
                  onClick={() =>
                    setImgUrl({ url: img?.url || '', blur: img?.blur || '' })
                  }
                  key={img?.url}
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
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='product-details mt-10 w-full lg:mt-0'>
          {/* CATEGORIES */}
          <div
            data-aos='fade-up'
            className='mb-2 w-full text-xs font-normal uppercase tracking-wider text-gray-500'
          >
            <ul className='flex w-full gap-2'>
              {categories?.map(({ name }) => (
                <li
                  key={name}
                  className='hover-200 underline hover:text-accent'
                >
                  <Link href={`/categoria/${name}`}>{name}</Link>
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
          {product.reviews !== undefined && product.reviews?.length > 0 ? (
            <div
              data-aos='fade-up'
              className='mb-6 flex items-center space-x-[10px]'
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
                {product.reviews?.length} Reviews
              </span>
            </div>
          ) : (
            <small className='mb-6'>
              Sin Reseñas, Puedes colaborar con la tuya
            </small>
          )}

          {/* PRICE */}
          <div data-aos='fade-up' className='mb-5 flex items-center space-x-2'>
            {sale ? (
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

          {/* EXCERPT */}
          <p
            data-aos='fade-up'
            className='text-normal mb-5 leading-7 text-gray-700'
          >
            {excerpt}
          </p>

          {/* OPTIONS */}
          {options && (
            <div data-aos='fade-up' className='product-size mb-5'>
              <span className='mb-3 inline-block text-sm font-normal uppercase text-gray-500'>
                {options.name}
              </span>
              <Select>
                <SelectTrigger className='w-full rounded-none'>
                  <SelectValue placeholder={options.name} />
                </SelectTrigger>
                <SelectContent>
                  {options.values?.map((item) => (
                    <SelectItem value={item} key={item} className='uppercase'>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* ADD TO CART */}
          <div
            data-aos='fade-up'
            className='quantity-card-wrapper mb-5 flex h-12 w-full items-center space-x-2'
          >
            <AddToCart showQuantity product={product} />
            <WishlistBtn product={product} />
            <CompaireBtn product={product} />
          </div>

          {/* INFO */}
          <div data-aos='fade-up' className='mb-5'>
            <div className='text-sm leading-7 text-gray-500'>
              <span className='text-gray-900'>Etiquetas :</span>
              <ul className='flex w-full gap-2'>
                {tags?.map(({ id, name, slug }) => (
                  <li
                    key={id}
                    className='hover-200 underline hover:text-accent'
                  >
                    <Link href={`/etiqueta/${slug}`}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className='text-sm leading-7 text-gray-500'>
              <span className='text-gray-900'>SKU :</span> {id}
            </p>
            {dimensions && (
              <div className='text-sm leading-7 text-gray-500'>
                <span className='text-gray-900'>Dimensiones :</span>{' '}
                {dimensions.alt ? (
                  <PortableText value={dimensions.alt} />
                ) : (
                  <span className='flex w-full gap-2'>
                    {dimensions?.height} X {dimensions?.width} X{' '}
                    {dimensions?.length}
                  </span>
                )}
              </div>
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
