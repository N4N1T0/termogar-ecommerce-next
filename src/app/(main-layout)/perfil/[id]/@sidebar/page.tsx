// * NEXT.JS IMPORTS
import Link from 'next/link'
import React from 'react'

// * ASSETS IMPORTS
import { BaggageClaim, LogOut, User, LockKeyhole } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { logoutAction } from '@/actions/login-action'

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

const ProfileSidebar = async ({
  params,
  searchParams
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { id } = await params
  const { tab } = await searchParams

  return (
    <>
      {/* DESKTOP */}
      <div className='sticky top-5 hidden h-fit max-w-[250px] flex-col gap-10 pr-10 pt-5 text-base font-normal md:flex'>
        {menuLinks.map(({ href, icon, label }) => (
          <Link
            key={href}
            className={cn(
              'hover-200 flex items-center space-x-3 text-gray-600 hover:text-accent',
              tab === href ? 'text-accent' : ''
            )}
            href={`/perfil/${id}?tab=${href}`}
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

      {/*  MOBILE */}
      <Sheet>
        <SheetTrigger className='mb-2 w-fit self-end border border-accent px-3 py-1 text-accent md:hidden'>
          Pestañas
        </SheetTrigger>
        <SheetContent className='bg-white sm:max-w-[425px]' side='right'>
          <SheetHeader>
            <SheetTitle>Pestañas del Perfil</SheetTitle>
            <SheetDescription className='sr-only'>
              Una lista de las diferentes pestañas que tiene el perfil de
              usuarios en termogar
            </SheetDescription>
          </SheetHeader>
          {menuLinks.map(({ href, icon, label }) => (
            <SheetClose key={href} asChild>
              <Link
                className={cn(
                  'hover-200 mt-4 flex items-center space-x-3 text-gray-600 hover:text-accent',
                  tab === href ? 'text-accent' : ''
                )}
                href={`/perfil/${id}?tab=${href}`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </SheetClose>
          ))}
          <form action={logoutAction}>
            <button
              type='submit'
              className='hover-200 mt-5 flex items-center space-x-3 text-gray-600 hover:text-accent'
            >
              <LogOut />
              <span>Cerrar sesión</span>
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProfileSidebar
