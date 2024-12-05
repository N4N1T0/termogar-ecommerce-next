// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import NotificationsPageButton from '@/components/Payment/notification-buttons'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_USER_INFO } from '@/sanity/lib/queries'
import FailedIlustration from '@/components/Payment/failed-ilustration'
import FailedPaymentContent from '@/components/Payment/failed'
import { AlertCircle } from 'lucide-react'

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
        <CardFooter className='flex items-center justify-between px-5'>
          <NotificationsPageButton
            user={user}
            status='failed'
            newAddress={newAddress}
          />
        </CardFooter>
      </Card>
      <div className='top-2 flex flex-1 items-center justify-center bg-gray-100 p-6 md:sticky'>
        <FailedIlustration />
      </div>
    </div>
  )
}
