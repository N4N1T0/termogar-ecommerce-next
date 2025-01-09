'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

// * ASSETS IMPORTS
import { HelpCircle, RefreshCcw, UserIcon } from 'lucide-react'
import { useCart } from '@/stores'
import Form from 'next/form'
import sendPurchaseEmail from '@/actions/send-purchase-email'
import { OrderDataNotificationsButtons } from '@/types'

const NotificationsPageButton = ({
  orderData
}: {
  orderData: OrderDataNotificationsButtons
}) => {
  const {
    user,
    orderId,
    newAddress,
    gateway,
    products,
    total,
    iva,
    refactoredCoupon,
    refactoredShippingAddress,
    status
  } = orderData

  const { data: session } = useSession()
  const { removeAllProducts } = useCart()
  const router = useRouter()

  const handlePush = (href: string) => {
    removeAllProducts()
    router.push(href)
  }

  const handleSuccessSubmit = async (formData: FormData) => {
    const value = formData.get('action') as string

    await sendPurchaseEmail(
      user,
      products,
      orderId,
      total,
      new Date().toLocaleString(),
      gateway as string,
      iva,
      Number(refactoredCoupon[0]),
      refactoredShippingAddress,
      'success'
    )

    if (value === 'keepShopping') {
      handlePush('/')
    }
    if (value === 'goToProfile') {
      if (session) {
        handlePush(`/perfil/${user?.id}`)
      } else {
        handlePush(`/login?redirectTo=/perfil/${user?.id}`)
      }
    }
  }

  const handleFailureSubmit = async (formData: FormData) => {
    const value = formData.get('action') as string

    await sendPurchaseEmail(
      user,
      products,
      orderId,
      total,
      new Date().toLocaleString(),
      gateway as string,
      iva,
      Number(refactoredCoupon[0]),
      refactoredShippingAddress,
      'failed'
    )

    if (value === 'retry') {
      router.push(
        `${process.env.NEXT_PUBLIC_URL}/checkout?userId=${user?.id}&newAddress=${newAddress}`
      )
    }
    if (value === 'support') {
      return
    }
  }

  if (status === 'success') {
    return (
      <Form
        action={handleSuccessSubmit}
        className='flex w-full items-center justify-center gap-5'
      >
        <button
          className='hover-200 flex-1 bg-accent py-2 text-gray-100 hover:text-gray-900'
          type='submit'
          name='action'
          value='keepShopping'
        >
          Seguir Comprando
        </button>
        <button
          type='submit'
          name='action'
          value='goToProfile'
          className='hover-200 border-px flex flex-1 items-center justify-center border border-accent py-2 text-accent hover:bg-accent hover:text-gray-100'
        >
          <UserIcon className='mr-2 h-4 w-4' />
          Tu Perfil
        </button>
      </Form>
    )
  } else {
    return (
      <Form
        action={handleFailureSubmit}
        className='flex w-full items-center justify-center gap-5'
      >
        <button
          type='submit'
          name='action'
          value='retry'
          className='hover-200 flex flex-1 items-center justify-center bg-accent py-2 text-gray-100 hover:text-gray-900'
        >
          <RefreshCcw className='mr-2 h-4 w-4' />
          Reintentar
        </button>
        <button
          type='submit'
          name='action'
          value='support'
          className='hover-200 border-px flex flex-1 items-center justify-center border border-accent py-2 text-accent hover:bg-accent hover:text-gray-100'
        >
          <HelpCircle className='mr-2 h-4 w-4' />
          <Link href='mailto:info@lavandadellago.es'>Contactar Soporte</Link>
        </button>
      </Form>
    )
  }
}

export default NotificationsPageButton
