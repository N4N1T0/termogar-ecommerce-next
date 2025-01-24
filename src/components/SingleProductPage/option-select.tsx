'use client'

// * NEXT.JS IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { OptionSelectProps } from '@/types'
import { parseAsString, useQueryState } from 'nuqs'

const OptionSelect = ({
  options,
  defaultValue,
  setType
}: OptionSelectProps) => {
  const [, setSearch] = useQueryState('variant', parseAsString)

  const handleValueChange = (e: string) => {
    if (e === '') return

    const isSlug = (e: string): e is string => /^[a-z0-9-]+$/.test(e)

    if (isSlug(e)) {
      setSearch(e, { shallow: false, throttleMs: 200 })
    } else {
      setType(e)
    }
  }

  return (
    <div data-aos='fade-up' className='product-size'>
      <span className='mb-3 inline-block text-sm font-normal uppercase text-accent'>
        {options.name}
      </span>
      <Select onValueChange={(e) => handleValueChange(e)}>
        <SelectTrigger className='w-full rounded-none'>
          <SelectValue placeholder={defaultValue || 'Seleccionar Variante'} />
        </SelectTrigger>
        <SelectContent className='rounded-none bg-white'>
          {options.values?.map(({ value, product }) => (
            <SelectItem
              value={product?.slug || value || 'N/A'}
              key={value || 'N/A'}
              className='rounded-none uppercase'
            >
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default OptionSelect
