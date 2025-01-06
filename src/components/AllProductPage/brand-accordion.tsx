'use client'

// * NEXT.JS IMPORTS
import { useQueryState, parseAsString } from 'nuqs'
import React from 'react'

// * ASSETS IMPORTS
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'

// * UTILS IMPORTS
import { GroupedCategory } from '@/types'

interface BrandAccordionProps {
  categories: GroupedCategory[]
  label: string
}

const BrandAccordion = ({ categories, label }: BrandAccordionProps) => {
  const [subcat, setSubcat] = useQueryState('subcat', parseAsString)

  const handleCategoryChange = React.useCallback(
    (value: string) => {
      setSubcat(value, { shallow: false })
    },
    [setSubcat]
  )

  return (
    <div className='py-4'>
      <h3 className='text-lg font-medium'>{label}</h3>
      <Accordion type='multiple' className='space-y-2'>
        {categories.map(({ main, children }) => (
          <AccordionItem key={main.id} value={main.id}>
            <AccordionTrigger className='font-medium'>
              {main.name}
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                defaultValue={subcat || ''}
                onValueChange={handleCategoryChange}
                className='space-y-2'
              >
                {children.map(({ id, slug, name }) => (
                  <div key={id} className='flex items-center space-x-2'>
                    <RadioGroupItem value={slug || ''} id={id} />
                    <Label htmlFor={id} className='cursor-pointer'>
                      {name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default BrandAccordion
