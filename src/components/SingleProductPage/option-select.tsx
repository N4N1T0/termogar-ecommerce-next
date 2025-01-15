'use client'

// * NEXT.JS IMPORTS
import { useRouter } from 'next/navigation'
import React from 'react'

// * ASSETS IMPORTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const OptionSelect = ({
  options,
  defaultValue,
  setType
}: {
  options: {
    name: string | null
    values: Array<{
      value: string | null
      slug: string | null
    }> | null
  }
  defaultValue?: string | null | undefined
  setType: (e: string) => void
}) => {
  const router = useRouter()

  React.useEffect(() => {
    options.values?.forEach(({ slug }) => {
      router.prefetch(`/product/${slug}`)
    })
  }, [options.values, router])

  return (
    <div data-aos='fade-up' className='product-size'>
      {!defaultValue && (
        <span className='mb-3 inline-block text-sm font-normal uppercase text-gray-500'>
          {options.name}
        </span>
      )}
      <Select onValueChange={(e) => setType(e)}>
        <SelectTrigger className='w-full rounded-none'>
          <SelectValue placeholder={defaultValue || options.name} />
        </SelectTrigger>
        <SelectContent className='rounded-none bg-white'>
          {options.values?.map(({ value }) => (
            <SelectItem
              value={value || ''}
              key={value || ''}
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
