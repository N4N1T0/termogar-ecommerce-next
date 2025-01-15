'use client'

// * NEXTJS IMPORTS
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

// * ASSETS IMPORTS
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog'
import { Expand, Star } from 'lucide-react'
import AddToCart from '@/components/Helpers/quantity'
import ImagesState from '@/components/Helpers/images-state'

// * UTILS IMPORTS
import { CartItemType, ProductQuickViewProps, YoptopReviews } from '@/types'
import { calculateAverageRating, eurilize } from '@/lib/utils'
import { PortableText } from 'next-sanity'
import { yoptop } from '@/lib/fetchers'
import OptionSelect from '../SingleProductPage/option-select'

const ProductQuickView = ({ data }: ProductQuickViewProps) => {
  const { sale, price, categories, content, excerpt, tags, options } = data

  const [reviews, setReviews] = React.useState<
    YoptopReviews | null | undefined
  >(null)
  const [type, setType] = React.useState<string | null>(null)

  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await yoptop
        .fetchReviews(data?.id.split('-').slice(-1)[0] || '')
        .then((res) => (res.status !== null ? res : null))

      setReviews(fetchedReviews?.reviews)
      setScore(calculateAverageRating(fetchedReviews?.reviews))
    }

    fetchReviews()
  }, [data?.id])

  const refactoredDatas: CartItemType = {
    ...data,
    quantity: 1,
    selectedOption: type || (options?.values && options?.values[0].value) || ''
  }

  return (
    <Dialog modal>
      <DialogTrigger className='flex h-10 w-10 cursor-pointer items-center justify-center bg-accent p-1 text-gray-100 transition-colors duration-100 ease-in hover:text-gray-900'>
        <Expand />
      </DialogTrigger>
      <DialogContent className='overflow-hidden border-0 bg-gray-50 p-0 sm:max-w-[900px]'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Vista Rápida</DialogTitle>
          <DialogDescription className='sr-only'>
            Vista Rápida
          </DialogDescription>
        </DialogHeader>
        <div className='grid h-full gap-4 p-0 md:grid-cols-2'>
          <ImagesState data={data} />
          <div className='flex h-full max-h-[80vh] flex-col overflow-hidden'>
            <div className='flex-1 space-y-4 overflow-y-auto p-4 md:p-6'>
              <div className='space-y-2'>
                {categories?.length !== undefined && categories?.length > 0 && (
                  <ul className='flex gap-2'>
                    {categories.map(({ id, name, slug }) => (
                      <li
                        key={id}
                        className='text-muted-foreground hover-200 text-xs underline hover:text-accent'
                      >
                        <Link href={`/categorias/${slug}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                <hr />
                {tags?.length !== undefined && tags?.length > 0 && (
                  <ul className='flex gap-2'>
                    {tags.map(({ id, name, slug }) => (
                      <li
                        key={id}
                        className='text-muted-foreground hover-200 text-xs underline hover:text-accent'
                      >
                        <Link href={`/categorias/${slug}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                {reviews !== undefined &&
                reviews?.length &&
                reviews?.length > 0 ? (
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
                      {reviews?.length} Reviews
                    </span>
                  </div>
                ) : (
                  <small className='mb-6'>
                    Sin Reseñas, Puedes colaborar con la tuya
                  </small>
                )}
                <div className='flex items-baseline gap-2 border-b pb-3'>
                  {sale ? (
                    <>
                      <span className='text-2xl font-bold text-accent'>
                        {eurilize(sale?.price || 0)}
                      </span>
                      <span className='text-muted-foreground text-sm line-through'>
                        {eurilize(price || 0)}
                      </span>
                    </>
                  ) : (
                    <span className='text-2xl font-bold text-accent'>
                      {eurilize(price || 0)}
                    </span>
                  )}
                </div>
              </div>
              {content ? (
                <section
                  id='content'
                  className='prose w-full max-w-none text-pretty'
                >
                  <PortableText value={content} />
                </section>
              ) : (
                <p className='text-xl text-gray-700'>{excerpt}</p>
              )}
              {/* OPTIONS */}
              {options && <OptionSelect options={options} setType={setType} />}
            </div>
            <div className='bg-background sticky bottom-0 flex gap-3 border-t p-3 md:p-5'>
              <AddToCart product={refactoredDatas} showQuantity />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProductQuickViewDynamic = dynamic(() => Promise.resolve(ProductQuickView))

export default ProductQuickViewDynamic
