// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import { ArrowRight } from 'lucide-react'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { ViewMoreTitleProps } from '@/types'

export default function ViewMoreTitle({
  categoryTitle = '',
  className = '',
  children,
  seeMoreUrl = ''
}: ViewMoreTitleProps) {
  return (
    <div className={cn('section-wrapper w-full', className)}>
      <div className='container-x mx-auto'>
        <div className='section-title mb-5 flex items-center justify-between'>
          <div>
            <h1 className='font-600 text-xl leading-none text-gray-900 sm:text-3xl'>
              Nuestros {categoryTitle}
            </h1>
          </div>
          <div>
            <Link href={seeMoreUrl || '/categorias/calentadores'}>
              <div className='flex items-center space-x-2'>
                <p className='font-600 text-qblack text-base'>Ver Mas</p>
                <span className='animate-right-dir'>
                  <ArrowRight className='text-qblack h-4 w-4' />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className='section-content'>{children && children}</div>
      </div>
    </div>
  )
}
