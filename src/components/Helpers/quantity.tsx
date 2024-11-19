'use client'

// * NEXT IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCart } from '@/stores'
import { CartItemType, ProductCardType } from '@/types'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'

const AddToCart = ({
  product,
  showQuantity = false,
  className = ''
}: {
  product: ProductCardType
  showQuantity?: boolean
  className?: string
}) => {
  const [quantity, setQuantity] = React.useState(1)
  const { addProduct } = useCart()

  const increment = () => setQuantity((prev) => prev + 1)
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    const cartItem: CartItemType = { quantity, ...product }
    addProduct(cartItem)
    toast('Producto agregado al carrito', {
      duration: 2000,
      action: {
        label: 'carrito',
        onClick: () => (window.location.href = '/carrito-de-la-compra')
      }
    })
  }

  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      {showQuantity && (
        <div className='flex items-center gap-1 border border-accent'>
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
      )}
      <Button
        className={`${
          showQuantity ? 'w-3/4' : 'w-full'
        } rounded-none bg-accent transition-colors duration-150 ease-in hover:text-white`}
        onClick={handleAddToCart}
      >
        <ShoppingBag size={18} />
        Agregar
      </Button>
    </div>
  )
}

export default AddToCart
