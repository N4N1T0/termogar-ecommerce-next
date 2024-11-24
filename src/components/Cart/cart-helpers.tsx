'use client'

import { useCart } from '@/stores'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const CartLink = () => {
  const { products, rehydrated } = useCart()

  return (
    <div className='relative'>
      <Link
        href='/carrito-de-la-compra'
        className='hover-200 hover:text-gray-700'
      >
        <ShoppingBag />
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

const CartProductTableRemover = ({ id }: { id: string }) => {
  const { removeProduct } = useCart()

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

const CartProductTableQuantity = ({ id }: { id: string }) => {
  const { products, updateProductQuantity } = useCart()
  const quantity = products.find((product) => product.id === id)?.quantity || 1

  const increment = () => updateProductQuantity(id, quantity + 1)
  const decrement = () => updateProductQuantity(id, quantity - 1)

  return (
    <div className='flex items-center gap-1'>
      <Button
        variant='outline'
        size='icon'
        aria-label='decrease'
        className='rounded-none bg-accent transition-colors duration-150 ease-in hover:text-white'
        disabled={quantity === 1}
        onClick={decrement}
      >
        <Minus className='h-4 w-4' />
      </Button>
      <span className='w-6 text-center'>{quantity}</span>
      <Button
        variant='outline'
        size='icon'
        aria-label='increase'
        className='rounded-none bg-accent transition-colors duration-150 ease-in hover:text-white'
        onClick={increment}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  )
}

export { CartLink, CartProductTableRemover, CartProductTableQuantity }
