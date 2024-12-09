// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FailedIlustration from '@/components/Payment/failed-ilustration'
import { AlertCircle } from 'lucide-react'
import FailedPaymentContent from '@/components/Payment/failed'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_USER_INFO } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Pago Fallido',
  description:
    'Pago realizado con exito. En breve te llegara un correo con los detalles de tu pedido.'
}

export default async function FailedPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { userId, orderId, newAddress, discountCoupon, gateway } =
    await searchParams

  if (!userId || !orderId) {
    notFound()
  }

  const user = await sanityClientRead.fetch(GET_USER_INFO, {
    id: userId
  })

  return (
    <div className='container-x relative mx-auto flex py-10'>
      <Card className='flex-1 overflow-hidden rounded-none border-[1px]'>
        <CardHeader className='bg-red-700 text-white'>
          <AlertCircle className='mr-2' />
          <CardTitle className='text-2xl uppercase'>Pago Fallido!</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <FailedPaymentContent
            failedPaymentData={{
              user,
              orderId,
              newAddress,
              discountCoupon,
              gateway
            }}
          />
        </CardContent>
      </Card>
      <div className='top-2 flex h-full w-auto flex-1 items-center justify-center bg-gray-100 p-6 md:sticky'>
        <FailedIlustration />
      </div>
    </div>
  )
}
