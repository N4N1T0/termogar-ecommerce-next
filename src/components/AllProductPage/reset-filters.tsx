'use client'

import { useRouter } from 'next/navigation'

const ResetFilters = ({ url }: { url: string }) => {
  const router = useRouter()

  const handleReset = () => {
    router.push(url, { scroll: false })
  }

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
