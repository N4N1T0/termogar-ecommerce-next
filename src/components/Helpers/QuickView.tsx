'use client'

// * NEXTJS IMPORTS
import Image from 'next/image'
import dynamic from 'next/dynamic'

// * ASSETS IMPORTS
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog'
import { Expand } from 'lucide-react'
import AddToCart from '@/components/Helpers/quantity'
import { PlaceholderProductCard } from '@/assets'

// * UTILS IMPORTS
import { ProductQuickViewProps } from '@/types'
import { eurilize } from '@/lib/utils'

const ProductQuickView = ({ data }: ProductQuickViewProps) => {
  const {
    featuredMedia,
    title,
    stockQuantity,
    sale,
    slug,
    price,
    categories,
    excerpt
  } = data

  // const [selectedImage, setSelectedImage] = React.useState(0)

  return (
    <Dialog modal>
      <DialogTrigger className='flex h-10 w-10 cursor-pointer items-center justify-center bg-accent p-1 transition-colors duration-100 ease-in hover:text-gray-100'>
        <Expand />
      </DialogTrigger>
      <DialogContent className='overflow-hidden border-0 bg-gray-50 p-0 sm:max-w-[900px]'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Quick View</DialogTitle>
        </DialogHeader>
        <div className='grid h-full gap-4 p-0 md:grid-cols-2'>
          <div className='flex h-full max-h-[80vh] gap-4 overflow-hidden'>
            {/* TODO: ADD OTHER IMAGES */}
            {/* <div className='flex flex-col gap-4 overflow-y-auto pr-4'>
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-16 overflow-hidden rounded-lg border',
                    selectedImage === index && 'ring-primary ring-2'
                  )}
                >
                  <Image
                    src={src}
                    alt={`Product ${index + 1}`}
                    className='object-cover'
                    fill
                  />
                </button>
              ))}
            </div> */}
            <div className='relative aspect-[3/4] h-full flex-1 overflow-hidden'>
              <Image
                src={featuredMedia.url || PlaceholderProductCard}
                alt={title || 'Product'}
                title={title || 'Product'}
                className='object-cover'
                fill
              />
            </div>
          </div>
          <div className='flex h-full max-h-[80vh] flex-col overflow-hidden'>
            <div className='flex-1 space-y-4 overflow-y-auto p-4 md:p-6'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-bold'>{title}</h2>
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
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold'>$39.00</span>
                  <span className='text-muted-foreground text-sm line-through'>
                    $70.00
                  </span>
                </div>
              </div>
              <p className='text-muted-foreground text-sm'>{excerpt}</p>
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
