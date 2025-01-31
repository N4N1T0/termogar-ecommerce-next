// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'

// * UTILS IMPORTS
import { auth } from '@/lib/auth'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_USER_INFO } from '@/sanity/lib/queries'
import { GET_USER_INFOResult } from '@/types/sanity'
import ClientPage from '@/components/CheakoutPage/client-page'

export const metadata: Metadata = {
  title: 'Formulario de Pago',
  description: 'Formulario de pago para termogar.'
}

const CheckoutPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { userId, newAddress } = await searchParams
  const session = await auth()
  let searchesUser: GET_USER_INFOResult | null = null

  if (session) {
    searchesUser = await sanityClientRead.fetch(GET_USER_INFO, {
      id: session?.user?.id
    })
  } else if (userId) {
    searchesUser = searchesUser = await sanityClientRead.fetch(GET_USER_INFO, {
      id: userId
    })
  } else {
    searchesUser = null
  }

  return (
    <main className='checkout-page-wrapper w-full bg-white pb-[60px]'>
      <PageTitle
        title='Formulario de Pago'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Formulario de Pago', path: '/checkout' }
        ]}
      />
      <ClientPage
        searchesUser={searchesUser}
        userId={userId}
        newAddress={newAddress}
      />
    </main>
  )
}

export default CheckoutPage
