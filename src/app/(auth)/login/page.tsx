import LoginForm from '@/components/Auth/Login/login-form'
import Thumbnail from '@/components/Auth/Login/thumbnail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page'
}

const LoginPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { redirectTo } = await searchParams
  return (
    <main className='min-h-screen w-full py-10'>
      <div className='container-x relative mx-auto h-screen items-center lg:flex'>
        <div className='flex h-full w-full flex-col justify-center border border-[#E0E0E0] bg-white p-5 sm:p-10 lg:flex-1'>
          <div className='mb-7 flex w-full flex-col items-center justify-center text-center'>
            <h1 className='mb-1 border-b border-accent text-[30px] font-bold leading-[74px] text-gray-900'>
              inicio de sesión
            </h1>
            <LoginForm redirectTo={redirectTo} />
          </div>
        </div>
        <div className='hidden h-[80vh] flex-1 items-center lg:flex xl:justify-center'>
          <Thumbnail />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
