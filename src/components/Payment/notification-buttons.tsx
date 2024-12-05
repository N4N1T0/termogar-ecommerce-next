'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// * ASSETS IMPORTS
import { HelpCircle, RefreshCcw, UserIcon } from 'lucide-react'
import { useCart } from '@/stores'
import { GET_USER_INFOResult } from '@/types/sanity'

const NotificationsPageButton = ({
  status,
  user,
  newAddress
}: {
  user: GET_USER_INFOResult
  status: 'success' | 'failed'
  newAddress: string | string[] | undefined
}) => {
  const { removeAllProducts } = useCart()
  const router = useRouter()

  const handleClick = (href: string) => {
    removeAllProducts()
    router.push(href)
  }

  if (status === 'success') {
    return (
      <>
        <button
          className='hover-200 flex-1 bg-accent py-2 text-gray-100 hover:text-gray-900'
          type='button'
          onClick={() => handleClick('/')}
        >
          Seguir Comprando
        </button>
        <button
          type='button'
          onClick={() => handleClick(`/perfil/${user?.id}`)}
          className='border-px flex flex-1 items-center justify-center border border-accent py-2 text-accent hover:bg-accent hover:text-gray-100'
        >
          <UserIcon className='mr-2 h-4 w-4' />
          Tu Perfil
        </button>
      </>
    )
  } else {
    return (
      <>
        <button
          type='button'
          className='hover-200 flex-1 bg-accent py-2 text-gray-100 hover:text-gray-900'
          onClick={() =>
            handleClick(
              `http://localhost:3000/checkout?userId=${user?.id}&newAddress=${newAddress}`
            )
          }
        >
          <RefreshCcw className='mr-2 h-4 w-4' />
          Reintentar
        </button>
        <button
          type='button'
          className='border-px flex flex-1 items-center justify-center border border-accent py-2 text-accent hover:bg-accent hover:text-gray-100'
        >
          <HelpCircle className='mr-2 h-4 w-4' />
          <Link href='mailto:info@lavandadellago.es'>Contactar Soporte</Link>
        </button>
      </>
    )
  }
}

export default NotificationsPageButton
