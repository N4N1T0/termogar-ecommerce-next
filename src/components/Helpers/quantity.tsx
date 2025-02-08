'use client'

// * NEXT IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useCart } from '@/stores'
import { CartItemType } from '@/types'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import OptionSelect from '../SingleProductPage/option-select'

const AddToCart = ({
  product,
  showQuantity = false,
  className = '',
  stock
}: {
  product: CartItemType
  showQuantity?: boolean
  className?: string
  stock: number | null
}) => {
  const [quantity, setQuantity] = React.useState(1)
  const { addProduct } = useCart()

  const increment = () => setQuantity((prev) => prev + 1)
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    const cartItem: CartItemType = { ...product, quantity }
    addProduct(cartItem)
    toast.info('Producto agregado al carrito', {
      duration: 2000,
      action: {
        label: 'Carrito',
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
            className='rounded-none bg-accent text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'
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
            className='rounded-none bg-accent text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'
            disabled={quantity === stock}
            onClick={increment}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      )}
      <Button
        className={cn(
          showQuantity ? 'w-3/4' : 'w-full',
          'rounded-none bg-accent text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'
        )}
        onClick={handleAddToCart}
      >
        <ShoppingBag size={18} />
        Agregar
      </Button>
    </div>
  )
}

export const AddToCartMobile = ({ product }: { product: CartItemType }) => {
  const { addProduct } = useCart()

  const handleAddToCart = () => {
    const cartItem: CartItemType = { ...product, quantity: 1 }
    addProduct(cartItem)
    toast.info('Producto agregado al carrito', {
      duration: 2000,
      action: {
        label: 'Carrito',
        onClick: () => (window.location.href = '/carrito-de-la-compra')
      }
    })
  }
  return (
    <Button
      asChild
      className='rounded-none bg-accent p-0 text-gray-100 transition-colors duration-100 ease-in hover:text-gray-900'
      onClick={handleAddToCart}
    >
      <ShoppingBag className='h-10 w-10 cursor-pointer p-2' />
    </Button>
  )
}

export const AddToCartVariant = ({
  product,
  stock
}: {
  product: CartItemType
  stock: number
}) => {
  const { options } = product
  const [type, setType] = React.useState<string | null>(null)

  const refactoredDatas: CartItemType = {
    ...product,
    quantity: 1,
    selectedOption:
      type ||
      (Array.isArray(options?.values) &&
        options?.values?.length > 0 &&
        options?.values[0]?.value) ||
      ''
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full rounded-none bg-accent text-gray-100 transition-colors duration-150 ease-in hover:text-gray-900'>
          <ShoppingBag size={18} />
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Agregar Variante</DialogTitle>
          <DialogDescription>
            Agregar la variante {product.title} al carrito
          </DialogDescription>
        </DialogHeader>
        <h3>{product.title}</h3>
        <p>
          Debe agregar una de las siguientes variantes para continuar con la
          compra
        </p>
        {/* OPTIONS */}
        {options &&
          Array.isArray(options?.values) &&
          options?.values?.length > 0 && (
            <OptionSelect options={options} setType={setType} />
          )}
        <DialogFooter>
          <AddToCart product={refactoredDatas} stock={stock} showQuantity />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCart
