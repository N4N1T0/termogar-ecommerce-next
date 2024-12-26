'use client'

// * NEXT.JS IMPORTS
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

// * ASSETS IMPORTS
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// * UTILS IMPORTS
import { BrandFilterProps } from '@/types'

const BrandFilter = ({ brands }: BrandFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleBrandChange = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('brand', value)
      router.push(`?${params}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className='space-y-4 py-4'>
      <h3 className='text-lg font-medium'>Marcas</h3>
      <RadioGroup
        defaultValue={searchParams.get('brand') || ''}
        onValueChange={handleBrandChange}
        className='space-y-2'
      >
        {brands.map(({ id, link, title }) => (
          <div key={id} className='flex items-center space-x-2'>
            <RadioGroupItem value={link || ''} id={id} />
            <Label htmlFor={id} className='cursor-pointer'>
              {title}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default BrandFilter
