// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import { ChevronRight, Layers, ShoppingBag } from 'lucide-react'

// * UTILS IMPORTS
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'
import { sanityClientRead } from '@/sanity/lib/client'
import PageTitle from '@/components/Helpers/PageTitle'
import { Logger } from 'next-axiom'

export const metadata: Metadata = {
  title: 'Categorias',
  description:
    'Encuentra el artículo que mejor se adapte a tus necesidades según las categorías dentro de la web de termogar.'
}

const log = new Logger()

const CategoriesPage = async () => {
  const navbarMenu = await sanityClientRead.fetch(
    GET_MENU_CATEGORIES,
    {},
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  if (!navbarMenu) return log.error('No se encontraron categorias')

  const refactoredMenu = navbarMenu.map((item) => {
    const refactoredChildren = [
      {
        id: 'all',
        name: 'Todos',
        slug: item.slug
      },
      ...item.children
    ]
    return {
      ...item,
      children: item.children.length > 0 ? refactoredChildren : undefined
    }
  })

  return (
    <div className='container mx-auto px-4 py-8'>
      <PageTitle
        title='Nuestras Categorias'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Categorias', path: '/categorias' }
        ]}
      />
      <div className='grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {refactoredMenu.map((category) => (
          <div key={category.id} className='overflow-hidden bg-white shadow-lg'>
            <div className='relative h-56 p-5'>
              <Image
                src={category.featuredImage?.url || PlaceholderSquare}
                alt={category.name || 'Sin Nombre'}
                title={category.name || 'Sin Nombre'}
                placeholder='blur'
                blurDataURL={
                  category.featuredImage?.blur || PlaceholderSquare.blurDataURL
                }
                className='aspect-square h-full w-full object-fill'
                width={300}
                height={300}
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20'>
                <h2 className='text-2xl font-bold text-white'>
                  {category.name}
                </h2>
              </div>
            </div>
            <div className='p-4'>
              {category.children ? (
                <>
                  <h3 className='mb-2 flex items-center text-lg font-semibold text-accent'>
                    <Layers className='mr-2 h-5 w-5' />
                    Subcategorias
                  </h3>
                  <ul className='grid grid-cols-2 gap-2'>
                    {category.children.map((subcategory) => (
                      <li key={subcategory.id}>
                        <Link
                          href={`/categorias/${subcategory.slug}`}
                          className='hover-200 flex items-center text-gray-700 hover:text-accent'
                        >
                          <ChevronRight className='mr-1 h-4 w-4' />
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className='flex h-24 items-center justify-center'>
                  <Link
                    href={`/categorias/${category.slug}`}
                    className='flex items-center text-lg text-gray-700 hover:text-accent'
                  >
                    <ShoppingBag className='mr-2 h-5 w-5' />
                    Comprar nuestro {category.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
