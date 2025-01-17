// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// * ASSETS IMPORTS
import { OrderTab, ProfileTab } from '@/components/Auth/Profile/tabs'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_ORDERS_BY_USER_ID, GET_USER_INFO } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'
import PasswordTab from '@/components/Auth/Profile/tabs/password-tab'

const log = new Logger()
export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { id } = await params

  const searchesUser = await sanityClientRead.fetch(GET_USER_INFO, { id })

  return {
    title:
      searchesUser?.firstName ||
      searchesUser?.lastName ||
      searchesUser?.userName ||
      'Usuario',
    description: `Perfil de Usuario de ${searchesUser?.firstName || searchesUser?.lastName || searchesUser?.userName || searchesUser?.email || 'Usuario'}`
  }
}

const ProfilePage = async ({
  params,
  searchParams
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { id } = await params
  const { tab } = await searchParams

  const searchesUser = await sanityClientRead.fetch(GET_USER_INFO, { id })
  const searchedOrders = await sanityClientRead.fetch(GET_ORDERS_BY_USER_ID, {
    id
  })

  if (!searchesUser) {
    log.error(`The user with id ${id} was not found`)
    return redirect('/')
  }

  return (
    <div className='w-full bg-white px-5 py-9 md:px-10'>
      <h1 className='text-[22px] font-bold text-gray-900'>
        Tu Perfil de usuario
      </h1>
      <div className='w-full flex-1'>
        {tab === 'profile' ? (
          <ProfileTab user={searchesUser} />
        ) : tab === 'order' ? (
          <OrderTab orders={searchedOrders} />
        ) : tab === 'password' ? (
          <PasswordTab user={searchesUser} />
        ) : (
          <ProfileTab user={searchesUser} />
        )}
      </div>
    </div>
  )
}

export default ProfilePage
