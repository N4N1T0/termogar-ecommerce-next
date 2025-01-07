'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'
import React from 'react'

// * ASSETS IMPORTS
import { PlaceholderProductCard } from '@/assets'
import { cn } from '@/lib/utils'
import { ProductCardType } from '@/types'

const ImagesState = ({ data }: { data: ProductCardType }) => {
  const [selectedImage, setSelectedImage] = React.useState(0)

  const { featuredMedia, title, otherImages } = data

  return (
    <div className='flex h-full max-h-[80vh] gap-4 overflow-hidden'>
      {otherImages && otherImages.length > 1 ? (
        <>
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
                  alt={`Product-${index + 1}-${image?.url}`}
                  className='h-full w-full object-cover'
                  width={100}
                  height={100}
                  quality={70}
                />
              </button>
            ))}
          </div>
          <div className='aspect-[3/4] h-full flex-1 overflow-hidden p-4'>
            <Image
              src={otherImages[selectedImage]?.url || PlaceholderProductCard}
              alt={title || 'Product'}
              title={title || 'Product'}
              className='h-full w-full object-cover'
              width={500}
              height={600}
              quality={100}
            />
          </div>
        </>
      ) : (
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
      )}
    </div>
  )
}

export default ImagesState
