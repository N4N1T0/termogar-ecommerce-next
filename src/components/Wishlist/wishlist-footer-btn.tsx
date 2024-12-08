'use client'

import { useCart, useWishlist } from '@/stores'
import React from 'react'
import { toast } from 'sonner'

const WishlistFooterBtn = () => {
  const { products, removeAllProducts } = useWishlist()
  const { products: CartProducts, addProduct } = useCart()

  const handleCleanWishlist = () => {
    removeAllProducts()
    toast.info('Lista de deseos limpiada', { duration: 2000 })
  }

  const handleAddAllToTheCart = () => {
    products.forEach((wishlistProduct) => {
      const existingProduct = CartProducts.find(
        (cartProduct) => cartProduct.id === wishlistProduct.id
      )
      if (existingProduct) {
        addProduct({
          ...wishlistProduct,
          quantity: existingProduct.quantity + 1
        })
      } else {
        addProduct({
          ...wishlistProduct,
          quantity: 1
        })
      }
    })

    removeAllProducts()

    toast.success('Todos los productos se han añadido al carrito', {
      duration: 2000
    })
  }

  return (
    <div className='mt-[30px] flex w-full justify-start sm:justify-end'>
      <div className='items-center sm:flex sm:space-x-[30px]'>
        <button type='button' onClick={handleCleanWishlist}>
          <div className='mb-5 w-full text-sm font-medium text-accent transition-colors duration-150 ease-in-out hover:text-black sm:mb-0'>
            Borrar la Lista
          </div>
        </button>
        <div className='h-[50px] w-[180px]'>
          <button
            type='button'
            className='yellow-btn'
            onClick={handleAddAllToTheCart}
          >
            <div className='hover-200 w-full bg-accent text-sm font-medium text-gray-100 hover:text-gray-900'>
              Agregar todos al Carrito
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistFooterBtn
