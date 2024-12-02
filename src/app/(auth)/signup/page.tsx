import SignupForm from '@/components/Auth/Signup/signup-form'
import Thumbnail from '@/components/Auth/Signup/thumbnail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Pagina de Registro de Usuario'
}

const SignupPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { redirectTo } = await searchParams
  return (
    <main className='container-x mx-auto h-full min-h-[90vh] w-full items-center gap-5 py-10 lg:flex'>
      <div className='flex min-h-[500px] w-full flex-1 flex-col items-center justify-center bg-gray-100 text-center'>
        <h1 className='mb-1 border-b border-accent text-[30px] font-bold leading-[74px] text-gray-900'>
          Registro de Usuario
        </h1>
        <SignupForm redirectTo={redirectTo} />
      </div>
      <div className='hidden h-full max-h-[500px] flex-1 items-center lg:block'>
        <Thumbnail />
      </div>
    </main>
  )
}

export default SignupPage
