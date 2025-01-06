'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { useQueryStates, parseAsInteger } from 'nuqs'

// * ASSETS IMPORTS
import * as SliderPrimitive from '@radix-ui/react-slider'
import { PriceRangeSliderProps } from '@/types'

const DEBOUNCE_DELAY = 300

const PriceRangeSlider = ({ min, max, step = 1 }: PriceRangeSliderProps) => {
  const [range, setRange] = useQueryStates({
    min: parseAsInteger.withDefault(min),
    max: parseAsInteger.withDefault(max)
  })

  const updateURL = React.useCallback(
    (newValue: number[]) => {
      setRange(
        { min: newValue[0], max: newValue[1] },
        { shallow: false, throttleMs: DEBOUNCE_DELAY }
      )
    },
    [setRange]
  )

  return (
    <div className='w-full max-w-sm space-y-4 py-4'>
      <h3 className='text-lg font-medium'>Rango de Precios</h3>
      <SliderPrimitive.Root
        className='relative flex w-full touch-none select-none items-center'
        value={[range.min, range.max]}
        onValueChange={updateURL}
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
        <span>Min: ${range.min}</span>
        <span>Max: ${range.max}</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
