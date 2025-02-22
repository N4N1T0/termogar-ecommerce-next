import { PlaceholderSquare } from '@/assets'
import { CategoryCardProps } from '@/types'
import { ChevronRight, Layers, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CategoryCard = ({ category }: CategoryCardProps) => {
  const hasChildren = category.children && category.children.length > 0

  const displayedChildren = hasChildren
    ? [{ id: 'all', name: 'Todos', slug: category.slug }, ...category.children]
    : []

  return (
    <div className='overflow-hidden bg-white shadow-md transition hover:shadow-lg'>
      {/* Category Image */}
      <div className='relative h-56'>
        <Image
          src={category.featuredImage?.url || PlaceholderSquare}
          alt={category.name || 'Sin Nombre'}
          title={category.name || 'Sin Nombre'}
          placeholder='blur'
          blurDataURL={
            category.featuredImage?.blur || PlaceholderSquare.blurDataURL
          }
          className='h-full w-full object-cover'
          width={300}
          height={300}
        />
        {/* Overlay */}
        <div className='absolute inset-0 flex items-center justify-center bg-black/40 p-2 text-center'>
          <h2 className='text-xl font-bold text-white md:text-2xl'>
            {category.name}
          </h2>
        </div>
      </div>

      {/* Category Content */}
      <div className='text-balance p-4'>
        {hasChildren ? (
          <>
            <h3 className='mb-3 flex items-center text-lg font-semibold text-red-600'>
              <Layers className='mr-2 h-5 w-5' />
              Subcategorias
            </h3>
            <ul className='flex flex-wrap gap-2'>
              {displayedChildren.map((subcategory) => (
                <li key={subcategory.id} className='whitespace-nowrap'>
                  <Link
                    href={`/categorias/${subcategory.slug}`}
                    className='flex items-center text-gray-700 hover:text-red-600'
                  >
                    <ChevronRight className='mr-1 h-4 w-4 shrink-0' />
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className='flex h-20 items-center justify-center'>
            <Link
              href={`/categorias/${category.slug}`}
              className='flex items-center text-lg text-gray-700 hover:text-red-600'
            >
              <ShoppingBag className='mr-2 h-5 w-5' />
              Comprar {category.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryCard
