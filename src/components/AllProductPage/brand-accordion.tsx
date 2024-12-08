'use client'

// * NEXT.JS IMPORTS
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

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
                defaultValue={searchParams.get('subcat') || ''}
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
