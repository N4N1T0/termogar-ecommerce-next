'use client'

// * ASSETS IMPORTS
import Link from 'next/link'
import React from 'react'

// * ASSETS IMPORTS
import { CompaireLink } from '@/components/Compaire/compaire-helpers'
import { WishlistLink } from '@/components/Wishlist/wishlist-helpers'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import SearchBox from '@/components/Helpers/search-box'
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function Drawer({
  categories
}: {
  categories: GET_MENU_CATEGORIESResult
}) {
  const [open, setOpen] = React.useState(false)

  const refactoredCategories = categories.map((category) => ({
    ...category,
    children: [
      ...category.children,
      {
        id: category.id,
        name: 'Todos',
        slug: category.slug
      }
    ]
  }))
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto bg-white'>
        <SheetHeader>
          <SheetTitle className='sr-only'>TermogarNavbar</SheetTitle>
          <SheetDescription className='sr-only'>
            Este es el mobile navbar de Termogar
          </SheetDescription>
        </SheetHeader>
        <div className='mb-4 mt-5 w-full px-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-5'>
              <SheetClose asChild>
                <CompaireLink />
              </SheetClose>
              <SheetClose asChild>
                <WishlistLink />
              </SheetClose>
            </div>
          </div>
        </div>
        <div className='h-10'>
          <SearchBox
            categories={categories}
            mobile={true}
            className='search-com'
            close={setOpen}
          />
        </div>
        <Accordion
          className='mt-5 w-full items-center'
          type='single'
          collapsible
        >
          {refactoredCategories.map(({ children, id, slug, name }) => (
            <AccordionItem value={slug || ''} key={id}>
              <AccordionTrigger>{name}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {children.map(({ id, slug, name }) => (
                    <li key={id} className='py-2'>
                      <SheetClose asChild>
                        <Link href={`/categorias/${slug}`}>{name}</Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem value='blog'>
            <AccordionTrigger>Blog</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li key='articulos' className='py-2'>
                  <SheetClose asChild>
                    <Link href='/blog'>Artículos</Link>
                  </SheetClose>
                </li>
                <li key='noticias' className='py-2'>
                  <SheetClose asChild>
                    <Link href='/noticias'>Noticias</Link>
                  </SheetClose>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
