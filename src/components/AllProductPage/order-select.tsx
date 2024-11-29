'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

// * UTILS IMPORTS
import siteData from '@/data/site-data.json'

const OrderSelect = ({
  url,
  orderBy
}: {
  url: string
  orderBy: string | string[] | undefined
}) => {
  const router = useRouter()
  const handleChange = (url: string, value: string) => {
    router.push(`${url}?orderBy=${value}`, { scroll: false })
  }

  return (
    <Select name='orderBy' onValueChange={(e) => handleChange(url, e)}>
      <SelectTrigger className='w-[150px] rounded-none border-0 bg-transparent text-gray-700 shadow-none focus:ring-0'>
        <SelectValue
          placeholder={
            !orderBy
              ? 'Ordenar por...'
              : siteData.orderBy.filter(({ value }) => value === orderBy)[0]
                  .label
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
