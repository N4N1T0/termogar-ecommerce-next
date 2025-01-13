'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// * ASSETS IMPORTS
import { logoutAction } from '@/actions/login-action'
import { PlaceholderSquare } from '@/assets'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { Session } from 'next-auth'

const UserPopup = ({ session }: { session: Session | null }) => {
  const path = usePathname()

  if (session === null) {
    return (
      <div className='user-popup relative'>
        <User />
        <div className='user-sub-menu -left-22 absolute top-[30px] w-[130px] md:-left-14'>
          <div
            className='flex w-full flex-col items-center justify-between gap-3 bg-white py-3'
            style={{
              boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)'
            }}
          >
            <Link
              href={`/login?redirectTo=${path}`}
              className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { user } = session

  return (
    <div className='user-popup relative'>
      <Avatar>
        <AvatarImage src={user?.image || PlaceholderSquare.src} />
        <AvatarFallback>
          {user?.name?.split('').slice(0, 2).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='user-sub-menu absolute -left-20 top-[60px] w-[150px] md:-left-10'>
        <div
          className='flex w-full flex-col items-center justify-between gap-3 bg-white py-3'
          style={{
            boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.14)'
          }}
        >
          <Link
            href={`/perfil/${user?.id}?tab=profile`}
            className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
          >
            Ir Perfil
          </Link>
          <form action={logoutAction}>
            <button
              type='submit'
              className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserPopup
