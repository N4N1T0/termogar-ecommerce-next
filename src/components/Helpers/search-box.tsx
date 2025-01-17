'use client'

// * NEXT.JS IMPORTS
import Form from 'next/form'

// * UI IMPORTS
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'

// * TYPES IMPORTS
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'

export default function SearchBox({
  className,
  categories,
  mobile = false,
  close
}: {
  className?: string
  categories: GET_MENU_CATEGORIESResult
  mobile?: boolean
  close?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleSubmit = () => {
    if (mobile && close) {
      close(false)
    }
  }

  return (
    <Form
      action='/busqueda'
      onSubmit={handleSubmit}
      className={cn(
        `border-gray-500-border flex h-full w-full items-center border bg-white`,
        className
      )}
    >
      <div className='h-full flex-1'>
        <input
          type='text'
          className='search-input'
          placeholder='Buscar Productos...'
          name='search'
        />
      </div>
      {!mobile && (
        <>
          <div className='mr-5 h-[22px] w-[1px] bg-gray-500'></div>
          <SearchedBoxCategories categories={categories} />
        </>
      )}
      <button
        className='font-600 search-btn h-full w-[93px] bg-accent text-sm text-white transition-colors duration-150 ease-in hover:bg-secondary/80'
        type='submit'
      >
        Buscar
      </button>
    </Form>
  )
}

const SearchedBoxCategories = ({
  categories
}: {
  categories: GET_MENU_CATEGORIESResult
}) => {
  const refactoredCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug
  }))
  return (
    <Select name='category'>
      <SelectTrigger className='w-[200px] rounded-none border-0 bg-transparent text-gray-700 shadow-none focus:ring-0'>
        <SelectValue placeholder='Categorías' />
      </SelectTrigger>
      <SelectContent className='w-[200px] rounded-none border-0 bg-white text-gray-700 shadow-none'>
        <SelectGroup>
          {refactoredCategories.map(({ id, name, slug }) => (
            <SelectItem
              value={slug || 'value-1'}
              key={id}
              className='rounded-none text-gray-700 hover:bg-accent hover:text-white'
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
