'use client'

// * NEXT IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { ChevronDownIcon } from 'lucide-react'
import MegaMenu from '@/assets/images/mega-menu-thumb.jpg'
import { GET_MENU_CATEGORIESResult } from '@/types/sanity'
import { PortableText } from 'next-sanity'
import { portableTextComponents } from '@/components/Helpers/PortableText'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'

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

const MegaMenuLi = ({ menu }: { menu: GET_MENU_CATEGORIESResult[number] }) => {
  const refactorChildren = [
    {
      id: 'all',
      name: 'Todos',
      slug: menu.slug
    },
    ...menu.children
  ]

  return (
    <li>
      <span className='font-600 flex cursor-pointer items-center text-sm text-white'>
        {menu.children?.length === 0 || !menu.children ? (
          <Link href={`/categorias/${menu.slug}`}>
            <span>{menu.name}</span>
          </Link>
        ) : (
          <span>{menu.name}</span>
        )}
        {menu.children?.length > 0 && (
          <span className='ml-1.5'>
            <ChevronDownIcon className='fill-current' />
          </span>
        )}
      </span>
      {menu.children?.length > 0 ? (
        <div className='sub-menu absolute left-0 top-[60px] z-50 w-full'>
          <div
            className='mega-menu-wrapper flex w-full items-center justify-between bg-white p-[30px]'
            style={{
              minHeight: '295px',
              boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)'
            }}
          >
            <div className='categories-wrapper -ml-[70px] flex h-full flex-1 justify-around'>
              <div>
                <div className='category'>
                  <h1 className='font-700 text-qblack mb-[13px] text-[13px] uppercase'>
                    lista de {menu.name}
                  </h1>
                </div>
                <div className='category-items'>
                  <ul className='flex flex-col space-y-2'>
                    {refactorChildren.map((child) => (
                      <li key={child.id}>
                        <Link href={`/categorias/${child.slug}`}>
                          <span className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'>
                            {child.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {menu.description && (
              <div className='categories-wrapper -ml-[70px] flex h-full flex-1 justify-around'>
                <PortableText
                  value={menu.description}
                  components={portableTextComponents}
                />
              </div>
            )}
            <div className='thumbnil h-full w-[348px]'>
              <div className='h-[235px] w-full'>
                <Image
                  src={menu.featuredImage?.url || MegaMenu}
                  alt='Mega Menu'
                  className='h-full w-full object-contain'
                  width={348}
                  height={235}
                  quality={70}
                  placeholder='blur'
                  blurDataURL={menu.featuredImage?.blur || MegaMenu.blurDataURL}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}
