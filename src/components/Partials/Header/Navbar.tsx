'use client'

// * NEXT IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import { ChevronDownIcon } from 'lucide-react'
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import React from 'react'

export default function Navbar({
  className,
  navbarMenu
}: {
  className?: string
  navbarMenu: GET_MENU_CATEGORIESResult
}) {
  return (
    <div
      className={cn(
        'nav-widget-wrapper top-0 z-30 h-[60px] w-full bg-accent',
        className
      )}
    >
      <div className='container-x relative mx-auto flex h-full w-full items-center justify-between'>
        <div className='category-and-nav flex items-center space-x-3 xl:space-x-7'>
          <div className='nav'>
            <ul className='nav-wrapper flex space-x-5 xl:space-x-10'>
              {navbarMenu.map((menu) => (
                <MegaMenuLi key={menu.id} menu={menu} />
              ))}
              <li className='relative'>
                <div>
                  <span className='font-600 flex cursor-pointer items-center text-sm text-white'>
                    <span>Blog</span>
                    <span className='ml-1.5'>
                      <ChevronDownIcon className='fill-current' />
                    </span>
                  </span>
                  <div className='sub-menu absolute -left-10 top-[60px] z-50 w-[150px]'>
                    <div
                      className='flex w-full flex-col items-center justify-between gap-3 bg-white py-3'
                      style={{
                        boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)'
                      }}
                    >
                      <Link
                        className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
                        href='/blog'
                      >
                        Artículos
                      </Link>
                      <Link
                        className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
                        href='/noticias'
                      >
                        Noticias
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const MegaMenuLi = React.memo(
  ({ menu }: { menu: GET_MENU_CATEGORIESResult[number] }) => {
    const hasChildren = menu.children?.length > 0

    const refactoredMenu = React.useMemo(() => {
      if (menu.name === 'Calentadores' && hasChildren) {
        return {
          ...menu,
          children: [...menu.children].sort((a, b) =>
            a.name === 'Estancos' ? -1 : b.name === 'Estancos' ? 1 : 0
          )
        }
      }
      return menu
    }, [hasChildren, menu])

    return (
      <li className='relative'>
        <span className='font-600 flex cursor-pointer items-center text-sm text-white'>
          <Link href={`/categorias/${menu.slug}`}>{menu.name}</Link>
          {hasChildren && (
            <span className='ml-1.5'>
              <ChevronDownIcon className='fill-current' />
            </span>
          )}
        </span>
        {hasChildren && (
          <div className='sub-menu absolute left-0 top-[60px] z-50 w-fit'>
            <div
              className='flex h-fit w-full items-center justify-between bg-white p-[30px]'
              style={{
                boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)'
              }}
            >
              <div className='flex h-full justify-start pr-3'>
                <ul className='flex flex-col space-y-2'>
                  {refactoredMenu.children.map((child) => (
                    <li key={child.id}>
                      <Link href={`/categorias/${child.slug}`}>
                        <span className='font-400 border-b border-transparent text-gray-500 hover:border-accent hover:text-accent'>
                          {child.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </li>
    )
  }
)
