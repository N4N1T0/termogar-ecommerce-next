// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import { OrderTab, ProfileTab } from '@/components/Auth/Profile/tabs'
import { BaggageClaim, LogOut, User, LockKeyhole } from 'lucide-react'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import {
  GET_ORDERS_BY_USER_IDResult,
  GET_USER_INFOResult
} from '@/types/sanity'
import { logoutAction } from '@/actions/login-action'
import PasswordTab from './tabs/password-tab'

const menuLinks = [
  {
    href: 'profile',
    icon: <User className='shrink-0' />,
    label: 'Información'
  },
  {
    href: 'order',
    icon: <BaggageClaim className='shrink-0' />,
    label: 'Pedidos'
  },
  {
    href: 'password',
    icon: <LockKeyhole className='shrink-0' />,
    label: 'Cambiar contraseña'
  }
]

const ProfileDashboard = ({
  user,
  activeTab,
  orders
}: {
  user: GET_USER_INFOResult
  activeTab: string | string[] | undefined
  orders: GET_ORDERS_BY_USER_IDResult
}) => {
  return (
    <div className='relative flex w-full gap-10 px-10 py-10'>
      <div className='sticky top-5 flex h-fit max-w-[250px] flex-col gap-10 border-r border-gray-200 pr-10 pt-5 text-base font-normal'>
        {menuLinks.map(({ href, icon, label }) => (
          <Link
            key={href}
            className={cn(
              'hover-200 flex items-center space-x-3 text-gray-600 hover:text-accent',
              activeTab === href ? 'text-accent' : ''
            )}
            href={`/perfil/${user?.id}?tab=${href}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
        <form action={logoutAction}>
          <button
            type='submit'
            className='hover-200 flex items-center space-x-3 text-gray-600 hover:text-accent'
          >
            <LogOut />
            <span>Cerrar sesión</span>
          </button>
        </form>
      </div>
      <div className='w-full flex-1'>
        {activeTab === 'profile' ? (
          <ProfileTab user={user} />
        ) : activeTab === 'order' ? (
          <OrderTab orders={orders} />
        ) : activeTab === 'password' ? (
          <PasswordTab user={user} />
        ) : (
          <ProfileTab user={user} />
        )}
      </div>
    </div>
  )
}

export default ProfileDashboard
