// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import ErrorThumb from '@/components/FourZeroFour/404-ilustration'

const NotFound = () => {
  return (
    <div className='container-x mx-auto h-screen overflow-hidden'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
        <ErrorThumb />
        <div
          data-aos='fade-up'
          className='flex w-full flex-col items-center justify-center'
        >
          <h1 className='mb-5 text-center text-2xl font-semibold sm:text-xl'>
            ¡Lo siento! ¡No podemos encontrar esa página!
          </h1>
          <Link
            href='/'
            className='hover-200 w-fit self-center bg-accent px-4 py-2 text-gray-900 hover:text-gray-50'
          >
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
