'use client'

import { useCompare } from '@/stores'
import { GitCompareArrows, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ProductCardType } from '@/types'

const CompaireLink = () => {
  const { products, rehydrated } = useCompare()

  return (
    <div className='relative'>
      <Link
        href='/comparar-productos'
        className='hover-200 hover:text-gray-700'
      >
        <GitCompareArrows />
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

const CompaireBtn = ({ product }: { product: ProductCardType }) => {
  const { products, addProduct, removeProduct } = useCompare()

  const compaireHasProduct = products.some((item) => item.id === product.id)

  const handleAddToCompaireList = () => {
    if (compaireHasProduct) {
      removeProduct(product.id)
      toast.info('El producto se eliminó de la lista de comparación', {
        duration: 2000,
        classNames: {
          toast: 'text-accent border-accent'
        }
      })
    } else {
      addProduct(product)
      toast.info('Se agregó correctamente a la lista de comparación', {
        duration: 2000,
        classNames: {
          toast: 'text-accent border-accent'
        },
        action: {
          label: 'Lista',
          onClick: () => {
            window.location.href = '/comparar-productos'
          }
        }
      })
    }
  }

  return (
    <Button
      asChild
      className={`rounded-none bg-accent p-0 text-gray-100 transition-colors duration-100 ease-in hover:text-gray-900 ${compaireHasProduct ? 'text-gray-900' : ''}`}
      onClick={handleAddToCompaireList}
    >
      <GitCompareArrows
        className='h-10 w-10 cursor-pointer p-2'
        stroke='currentColor'
      />
    </Button>
  )
}

const CompaireProductTableRemover = ({ id }: { id: string }) => {
  const { removeProduct } = useCompare()

  const handleRemoveProduct = () => {
    removeProduct(id)
    toast.info('El producto se eliminó de la lista de comparación', {
      duration: 2000,
      classNames: {
        toast: 'text-accent border-accent'
      }
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

export { CompaireLink, CompaireBtn, CompaireProductTableRemover }
