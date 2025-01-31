// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import Link from 'next/link'

// * ASSETS IMPORTS
import LoginForm from '@/components/Auth/Login/login-form'
import Thumbnail from '@/components/Auth/Login/thumbnail'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Pagina de Iniciar Sesión'
}

const LoginPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { redirectTo } = await searchParams

  const formattedRedirect = () =>
    redirectTo && !Array.isArray(redirectTo) && !redirectTo.includes('perfil')
      ? redirectTo
      : '/'

  return (
    <main className='container-x mx-auto h-full min-h-[90vh] w-full items-center gap-5 py-10 lg:flex'>
      <div className='flex min-h-[500px] w-full flex-1 flex-col items-center justify-center bg-gray-100 px-10 text-center md:px-0'>
        <h1 className='mb-1 border-b border-accent text-[30px] font-bold leading-[74px] text-gray-900'>
          inicio de sesión
        </h1>
        <LoginForm redirectTo={redirectTo} />
        <Link
          href={formattedRedirect()}
          className='hover-200 mt-5 border-t border-accent pt-1 font-bold text-gray-900 hover:text-accent'
        >
          <ChevronLeft className='mr-1 inline h-5 w-5' />
          Volver a la Tienda
        </Link>
      </div>
      <div className='hidden h-full max-h-[500px] flex-1 items-center lg:block'>
        <Thumbnail />
      </div>
    </main>
  )
}

export default LoginPage
