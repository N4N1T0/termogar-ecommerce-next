'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { PriceRangeSliderProps } from '@/types'

const DEBOUNCE_DELAY = 300

const PriceRangeSlider = ({ min, max, step = 1 }: PriceRangeSliderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [value, setValue] = React.useState([min, max])

  React.useEffect(() => {
    const minParam = searchParams.get('min')
    const maxParam = searchParams.get('max')

    const initialMin = minParam ? parseInt(minParam) : min
    const initialMax = maxParam ? parseInt(maxParam) : max

    setValue([initialMin, initialMax])
  }, [searchParams, min, max])

  const updateURL = React.useCallback(
    (newValue: number[]) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('min', newValue[0].toString())
      params.set('max', newValue[1].toString())
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  React.useEffect(() => {
    const handler = setTimeout(() => {
      updateURL(value)
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(handler)
    }
  }, [value, updateURL])

  return (
    <div className='w-full max-w-sm space-y-4 py-4'>
      <h3 className='text-lg font-medium'>Rango de Precios</h3>
      <SliderPrimitive.Root
        className='relative flex w-full touch-none select-none items-center'
        value={value}
        onValueChange={setValue}
        max={max}
        min={min}
        step={step}
        aria-label='Price range'
      >
        <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full border-[1px] border-gray-300 bg-gray-100'>
          <SliderPrimitive.Range className='bg-primary absolute h-full bg-secondary' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='border-primary focus-visible:ring-ring block h-4 w-4 rounded-full border-[1px] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
        <SliderPrimitive.Thumb className='border-primary focus-visible:ring-ring block h-4 w-4 rounded-full border-[1px] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
      </SliderPrimitive.Root>
      <div className='text-muted-foreground flex justify-between text-sm'>
        <span>Min: ${value[0]}</span>
        <span>Max: ${value[1]}</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
