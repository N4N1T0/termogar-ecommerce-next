'use client'

// * NEXT.JS IMPORTS
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

// * ASSETS IMPORTS
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// * UTILS IMPORTS
import { RadiogroupFilterProps } from '@/types'

export function RadiogroupFilter({ categories, label }: RadiogroupFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('subcat', value)
      router.push(`?${params}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className='space-y-4 py-4'>
      <h3 className='text-lg font-medium'>{label}</h3>
      <RadioGroup
        defaultValue={searchParams.get('subcat') || ''}
        onValueChange={handleCategoryChange}
        className='space-y-2'
      >
        {categories.map(({ id, slug, name }) => (
          <div key={id} className='flex items-center space-x-2'>
            <RadioGroupItem value={slug || ''} id={id} />
            <Label htmlFor={id} className='cursor-pointer'>
              {name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
