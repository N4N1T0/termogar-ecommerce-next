// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// * ASSETS IMPORTS
import ProfileDashboard from '@/components/Auth/Profile/profile-dashboard'
import BreadcrumbCom from '@/components/BreadcrumbCom'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_ORDERS_BY_USER_ID, GET_USER_INFO } from '@/sanity/lib/queries'

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

  if (!searchesUser) return redirect('/')

  return (
    <main className='w-full'>
      <div className='container-x mx-auto my-10 w-full'>
        <BreadcrumbCom
          paths={[
            { name: 'P. Principal', path: '/' },
            { name: 'Perfil', path: `/profile/${id}` }
          ]}
        />
        <div className='w-full bg-white px-10 py-9'>
          <h1 className='text-[22px] font-bold text-gray-900'>
            Tu Perfil de usuario
          </h1>
          <ProfileDashboard
            user={searchesUser}
            activeTab={tab}
            orders={searchedOrders}
          />
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
