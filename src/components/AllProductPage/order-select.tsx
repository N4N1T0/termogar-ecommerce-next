'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { useQueryState, parseAsString } from 'nuqs'

// * ASSETS IMPORTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// * UTILS IMPORTS
import siteData from '@/data/site-data.json'

const OrderSelect = ({ url }: { url: string }) => {
  const [order, setOrder] = useQueryState('orderBy', parseAsString)

  const handleChange = React.useCallback(
    (url: string, value: string) => {
      setOrder(value, { shallow: false })
    },
    [setOrder]
  )

  return (
    <Select name='orderBy' onValueChange={(e) => handleChange(url, e)}>
      <SelectTrigger className='w-[150px] rounded-none border-0 bg-transparent text-gray-700 shadow-none focus:ring-0'>
        <SelectValue
          placeholder={
            !order
              ? 'Ordenar por...'
              : siteData.orderBy.filter(({ value }) => value === order)[0].label
          }
        />
      </SelectTrigger>
      <SelectContent className='w-[150px] rounded-none border-0 bg-white text-gray-700 shadow-none'>
        {siteData.orderBy.map(({ label, value }) => (
          <SelectItem
            value={value}
            key={value}
            className='rounded-none text-gray-700 hover:bg-accent hover:text-white'
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default OrderSelect
