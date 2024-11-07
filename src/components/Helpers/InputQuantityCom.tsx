'use client'

import { useState } from 'react'

export default function InputQuantityCom() {
  const [quantity, setQuantity] = useState(1)
  const increment = () => {
    setQuantity((prev) => prev + 1)
  }
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }
  return (
    <div className='border-gray-500-border flex h-[40px] w-[120px] items-center border px-[26px]'>
      <div className='flex w-full items-center justify-between'>
        <button
          onClick={decrement}
          type='button'
          className='text-xl text-gray-500 transition-colors duration-150 ease-in hover:text-black'
          aria-label='decrement'
        >
          -
        </button>
        <span className='text-qblack'>{quantity}</span>
        <button
          onClick={increment}
          type='button'
          className='text-xl text-gray-500 transition-colors duration-150 ease-in hover:text-black'
          arial-label='increment'
        >
          +
        </button>
      </div>
    </div>
  )
}
