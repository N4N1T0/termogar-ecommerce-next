'use client'

// * NEXTJS IMPORTS
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'

// * ASSETS IMPORTS
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog'
import { Expand } from 'lucide-react'
import AddToCart from '@/components/Helpers/quantity'
import { PlaceholderProductCard } from '@/assets'

// * UTILS IMPORTS
import { ProductQuickViewProps } from '@/types'
import { cn, eurilize } from '@/lib/utils'
import { PortableText } from 'next-sanity'

const ProductQuickView = ({ data }: ProductQuickViewProps) => {
  const {
    featuredMedia,
    title,
    sale,
    price,
    categories,
    otherImages,
    content,
    excerpt
  } = data

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <Dialog modal>
      <DialogTrigger className='flex h-10 w-10 cursor-pointer items-center justify-center bg-accent p-1 text-gray-100 transition-colors duration-100 ease-in hover:text-gray-900'>
        <Expand />
      </DialogTrigger>
      <DialogContent className='overflow-hidden border-0 bg-gray-50 p-0 sm:max-w-[900px]'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Quick View</DialogTitle>
          <DialogDescription className='sr-only'>Quick View</DialogDescription>
        </DialogHeader>
        <div className='grid h-full gap-4 p-0 md:grid-cols-2'>
          <div className='flex h-full max-h-[80vh] gap-4 overflow-hidden'>
            {otherImages && otherImages.length > 1 && (
              <div className='flex flex-col gap-4 overflow-y-auto px-2 py-4'>
                {otherImages.map((image, index) => (
                  <button
                    key={image?.url}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'h-20 w-16 overflow-hidden border',
                      selectedImage === index ? 'ring-2 ring-accent' : ''
                    )}
                  >
                    <Image
                      src={image?.url || PlaceholderProductCard}
                      alt={`Product ${index + 1}`}
                      className='h-full w-full object-cover'
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </div>
            )}
            <div className='aspect-[3/4] h-full flex-1 overflow-hidden p-4'>
              <Image
                src={featuredMedia?.url || PlaceholderProductCard}
                alt={title || 'Product'}
                title={title || 'Product'}
                className='h-full w-full object-cover'
                width={300}
                height={400}
              />
            </div>
          </div>
          <div className='flex h-full max-h-[80vh] flex-col overflow-hidden'>
            <div className='flex-1 space-y-4 overflow-y-auto p-4 md:p-6'>
              <div className='space-y-2'>
                {categories?.length !== undefined && categories?.length > 0 && (
                  <ul className='flex gap-2'>
                    {categories.map(({ id, name, slug }) => (
                      <li
                        key={id}
                        className='text-muted-foreground hover-200 text-sm underline hover:text-accent'
                      >
                        <Link href={`/categorias/${slug}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className='flex items-center gap-4'>
                  {/* TODO: ADD RATING */}
                  {/* <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < 3
                            ? 'fill-primary'
                            : 'fill-muted stroke-muted-foreground'
                        )}
                      />
                    ))}
                  </div> */}
                  <span className='text-muted-foreground text-sm'>
                    Sin Reseñas
                  </span>
                </div>
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
              {/* TODO: ADD OPTIONS */}
            </div>
            <div className='bg-background sticky bottom-0 flex gap-3 border-t p-3 md:p-5'>
              <AddToCart product={data} showQuantity />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProductQuickViewDynamic = dynamic(
  () => Promise.resolve(ProductQuickView),
  {
    ssr: false
  }
)

export default ProductQuickViewDynamic
