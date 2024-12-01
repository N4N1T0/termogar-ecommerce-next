'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import { useEffect } from 'react'

// * ASSETS IMPORTS
import ErrorIlustration from '@/components/FourZeroFour/error-ilustration'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='container-x mx-auto h-screen overflow-hidden'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
        <ErrorIlustration />
        <div
          data-aos='fade-up'
          className='flex w-full flex-col items-center justify-center'
        >
          <h1 className='mb-5 text-center text-2xl font-semibold sm:text-xl'>
            ¡Lo siento! ¡Hubo un Error en el Servidor!
          </h1>
          <small className='mb-3 max-w-[500px] text-center'>
            {error.message}
          </small>
          <div className='flex gap-10'>
            <Link
              href='/'
              className='hover-200 w-fit self-center bg-accent px-4 py-2 text-gray-50 hover:text-gray-900'
            >
              Volver a la Tienda
            </Link>
            <button
              type='reset'
              className='hover-200 w-fit self-center bg-accent px-4 py-2 text-gray-50 hover:text-gray-900'
              onClick={() => reset()}
            >
              Intenta de nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
