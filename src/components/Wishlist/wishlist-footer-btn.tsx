'use client'

import { useCart, useWishlist } from '@/stores'
import React from 'react'
import { toast } from 'sonner'

const WishlistFooterBtn = () => {
  const { products, removeAllProducts } = useWishlist()
  const { products: CartProducts, addProduct } = useCart()

  const handleCleanWishlist = () => {
    removeAllProducts()
    toast.info('Lista de deseos limpiada', {
      duration: 2000,
      classNames: {
        toast: 'text-accent border-accent'
      }
    })
  }

  const handleAddAllToTheCart = () => {
    products.forEach((wishlistProduct) => {
      const existingProduct = CartProducts.find(
        (cartProduct) => cartProduct.id === wishlistProduct.id
      )
      if (existingProduct) {
        addProduct({
          ...wishlistProduct,
          quantity: existingProduct.quantity + 1,
          selectedOption: existingProduct.selectedOption || ''
        })
      } else {
        addProduct({
          ...wishlistProduct,
          quantity: 1,
          selectedOption: ''
        })
      }
    })

    removeAllProducts()

    toast.success('Todos los productos se han añadido al carrito', {
      duration: 3000,
      classNames: {
        toast: 'text-green-500 border-green-500'
      }
    })
  }

  return (
    <div className='mt-[30px] flex w-full justify-start sm:justify-end'>
      <div className='flex h-[50px] min-w-72 items-center justify-center sm:space-x-[30px]'>
        <button
          type='button'
          onClick={handleCleanWishlist}
          className='hover-200 h-full flex-1 text-sm font-medium text-accent hover:text-black'
        >
          Borrar la Lista
        </button>
        <button
          type='button'
          className='hover-200 h-full flex-1 bg-accent text-sm font-medium text-gray-100 hover:text-gray-900'
          onClick={handleAddAllToTheCart}
        >
          Agregar todos al Carrito
        </button>
      </div>
    </div>
  )
}

export default WishlistFooterBtn
