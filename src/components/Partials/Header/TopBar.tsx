'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TopBar({
  message = '¡Envío gratis en pedidos superiores a $50!',
  className = ''
}: {
  message?: string
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'relative bg-gray-900 px-4 py-2 text-sm font-medium text-white',
        className
      )}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-center'>
        <p className='text-center'>{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors duration-200 hover:text-white/80'
          aria-label='Close announcement'
        >
          <X className='h-4 w-4' color='currentColor' />
        </button>
      </div>
    </div>
  )
}
