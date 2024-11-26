// * NEXT.JS IMPORTS
import Image from 'next/image'
import { Suspense } from 'react'

// * ASSETS IMPORTS
import { ResetPasswordForm } from '@/components/Auth/ResetPassword/reset-form'
import { notFound } from 'next/navigation'
import { validateSecurityToken } from '@/lib/utils'
import { bigLogo } from '@/assets'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'

// * UTILS IMPORTS
import { GET_USER_INFO } from '@/sanity/lib/queries'
import { sanityClientRead } from '@/sanity/lib/client'
import Link from 'next/link'

export const experimental_ppr = true

const ResetPasswordPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { token } = await searchParams

  if (!token || Array.isArray(token)) return notFound()

  const secretKey = process.env.SECRET_KEY! // Your server-side secret
  const expirationTime = 24 * 60 * 60 * 1000 // 24 hours

  if (validateSecurityToken(token, secretKey, expirationTime) === null) {
    return notFound()
  }

  const customerId = validateSecurityToken(token, secretKey, expirationTime)

  const searchedUser = await sanityClientRead.fetch(GET_USER_INFO, {
    id: customerId
  })

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white p-8 shadow-lg'>
        <div className='mb-4 text-center'>
          <Link href='/'>
            <Image
              src={bigLogo}
              alt='Logo de termogar'
              width={120}
              height={60}
              className='mx-auto mb-2'
            />
          </Link>
          <h1 className='text-2xl font-bold text-gray-800'>
            Restablecer Contraseña
          </h1>
        </div>
        <Suspense fallback={<LoaderStyleOne />}>
          <ResetPasswordForm user={searchedUser} />
        </Suspense>
      </div>
    </div>
  )
}

export default ResetPasswordPage
