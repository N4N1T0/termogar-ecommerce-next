'use client'

import { PaginationBlogProps } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PaginationBlog = ({
  currentPage,
  totalPages,
  lastId,
  type = 'blog'
}: PaginationBlogProps) => {
  const router = useRouter()
  return (
    <div className='flex items-center justify-center space-x-4 py-4'>
      <button
        disabled={currentPage === 1}
        onClick={() => router.back()}
        className='flex items-center justify-center border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-300 ease-in-out hover:bg-accent hover:text-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronLeft className='mr-1 h-5 w-5' />
        Anterior
      </button>
      <span className='text-sm font-medium text-gray-700'>
        Pagina {currentPage} de {totalPages} Paginas
      </span>
      <Link
        aria-disabled={currentPage === totalPages}
        href={`/${type}?lastId=${lastId}&currentPage=${currentPage + 1}`}
        tabIndex={currentPage === totalPages ? -1 : 0}
        className='flex items-center justify-center border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-300 ease-in-out hover:bg-accent hover:text-gray-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
      >
        Siguiente
        <ChevronRight className='ml-1 h-5 w-5' />
      </Link>
    </div>
  )
}

export default PaginationBlog
