'use client'

// * NEXT.JS IMPORTS
import { useRouter } from 'next/navigation'
import React from 'react'

const ResetFilters = ({ url }: { url: string }) => {
  const router = useRouter()

  const handleReset = React.useCallback(() => {
    router.push(url, { scroll: false })
  }, [router, url])

  return (
    <button
      className='hover-200 my-4 bg-accent px-4 py-2 text-white hover:text-gray-900'
      onClick={handleReset}
    >
      Limpiar Filtros
    </button>
  )
}

export default ResetFilters
