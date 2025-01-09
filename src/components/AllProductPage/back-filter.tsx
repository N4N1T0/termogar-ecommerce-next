'use client'

// * NEXT.JS IMPORTS
import { useRouter } from 'next/navigation'
import React from 'react'

const BackFilter = () => {
  const router = useRouter()

  const handleReset = React.useCallback(() => {
    router.back()
  }, [router])

  return (
    <button
      className='hover-200 my-4 bg-secondary px-4 py-2 text-white hover:text-gray-900'
      onClick={handleReset}
    >
      Atrás
    </button>
  )
}

export default BackFilter
