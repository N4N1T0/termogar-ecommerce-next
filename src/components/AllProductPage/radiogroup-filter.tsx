'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { useQueryState, parseAsString } from 'nuqs'

// * ASSETS IMPORTS
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// * UTILS IMPORTS
import { RadiogroupFilterProps } from '@/types'

export function RadiogroupFilter({ categories, label }: RadiogroupFilterProps) {
  const [subCat, setSubCat] = useQueryState('subcat', parseAsString)

  const handleCategoryChange = React.useCallback(
    (value: string) => {
      setSubCat(value, { shallow: false })
    },
    [setSubCat]
  )

  return (
    <div className='space-y-4 py-4'>
      <h3 className='text-lg font-medium'>{label}</h3>
      <RadioGroup
        defaultValue={subCat || ''}
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
