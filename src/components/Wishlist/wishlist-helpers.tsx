'use client'

// * NEXTJS IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import { Button } from '@/components/ui/button'
import { Heart, X } from 'lucide-react'
import { toast } from 'sonner'

// * UTILS IMPORTS
import { useWishlist } from '@/stores'
import { ProductCardType } from '@/types'
import Link from 'next/link'

const WishlistBtn = ({ product }: { product: ProductCardType }) => {
  const { products, addProduct, removeProduct } = useWishlist()

  const wishlistHasProduct = products.some((item) => item.id === product.id)

  const handleAddToWishlist = () => {
    if (wishlistHasProduct) {
      removeProduct(product.id)
      toast.info('El producto se eliminó de la lista de deseos', {
        duration: 2000
      })
    } else {
      addProduct(product)
      toast.info('Se agregó correctamente a la lista de deseos', {
        duration: 2000,
        action: {
          label: 'lista',
          onClick: () => {
            window.location.href = '/lista-de-deseos'
          }
        }
      })
    }
  }

  return (
    <Button
      asChild
      className={`rounded-none bg-accent p-0 text-gray-100 transition-colors duration-100 ease-in hover:text-gray-900 ${wishlistHasProduct ? 'fill-gray-900 text-gray-900' : ''}`}
      onClick={handleAddToWishlist}
    >
      <Heart className='h-10 w-10 cursor-pointer p-2' />
    </Button>
  )
}

const WishlistLink = () => {
  const { products, rehydrated } = useWishlist()

  return (
    <div className='favorite relative'>
      <Link href='lista-de-deseos' className='hover-200 hover:text-gray-700'>
        <Heart />
      </Link>
      {!rehydrated && (
        <span className='absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] animate-pulse items-center justify-center rounded-full bg-accent/50 text-[9px] text-gray-100'>
          <div className='rounded-full bg-gray-200'></div>
        </span>
      )}
      {products.length > 0 && (
        <span className='absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px] text-gray-100'>
          {products.length}
        </span>
      )}
    </div>
  )
}

const WishlistProductTableRemover = ({ id }: { id: string }) => {
  const { removeProduct } = useWishlist()

  const handleRemoveProduct = () => {
    removeProduct(id)
    toast.info('El producto se eliminó de la lista de deseos', {
      duration: 2000
    })
  }

  return (
    <div className='grid h-full place-content-center'>
      <button
        className='text-[#AAAAAA]'
        aria-label='Remove product'
        onClick={handleRemoveProduct}
      >
        <X className='h-5 w-5 transition-colors duration-150 ease-in hover:text-black' />
      </button>
    </div>
  )
}

export { WishlistBtn, WishlistLink, WishlistProductTableRemover }
