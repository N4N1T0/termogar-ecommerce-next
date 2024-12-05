// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import NotificationsPageButton from '@/components/Payment/notification-buttons'
import SuccessContent from '@/components/Payment/success'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// * UTILS IMPORTS
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_INFO } from '@/sanity/lib/queries'
import SuccessIlustration from '@/components/Payment/success-ilustration'
import { processRestNotification } from '@/lib/clients'
import { Order } from '@/types/sanity'
import { uuid } from '@sanity/uuid'

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const {
    userId,
    orderId,
    newAddress,
    discountCoupon,
    gateway,
    Ds_SignatureVersion,
    Ds_MerchantParameters,
    Ds_Signature,
    products,
    total
  } = await searchParams

  if (!userId || !orderId) {
    notFound()
  }

  if (gateway === 'RedSys') {
    const { Ds_Response } = processRestNotification({
      Ds_SignatureVersion: Ds_SignatureVersion as string,
      Ds_MerchantParameters: Ds_MerchantParameters as string,
      Ds_Signature: Ds_Signature as string
    })

    if (Ds_Response !== '0000') {
      notFound()
    }
  }

  const user = await sanityClientWrite.fetch(GET_USER_INFO, {
    id: userId
  })

  const refactoredProducts =
    Array.isArray(products) || products === undefined
      ? []
      : products.split(',').map((product) => ({
          product: {
            _ref: product.split('_')[0],
            _type: 'reference' as const
          },
          quantity: parseInt(product.split('_')[1], 10),
          _key: uuid()
        }))

  await sanityClientWrite.createIfNotExists<Order>({
    _id: Array.isArray(orderId) ? '' : orderId,
    status: 'procesando',
    paymentMethod:
      Array.isArray(gateway) || gateway === undefined ? '' : gateway,
    _type: 'order',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: Array.isArray(orderId) ? '' : orderId,
    purchaseDate: new Date().toISOString(),
    totalAmount: Number(total),
    products: refactoredProducts,
    userEmail: {
      _ref: user?.id || '',
      _type: 'reference'
    },
    // @ts-expect-error ignore
    shippingAddress: newAddress
      ? [user?.shippingAddresses ? user?.shippingAddresses[0] : undefined]
      : user?.billingAddress
  })

  return (
    <div className='container-x relative mx-auto flex py-10'>
      <Card className='flex-1 overflow-hidden rounded-none border-[1px]'>
        <CardHeader className='bg-green-500 text-white'>
          <CardTitle className='text-2xl uppercase'>Orden Realizada!</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <SuccessContent
            orderData={{ user, orderId, newAddress, discountCoupon, gateway }}
          />
        </CardContent>
        <CardFooter className='flex items-center justify-between gap-5 px-5'>
          <NotificationsPageButton
            user={user}
            status='success'
            newAddress={newAddress}
          />
        </CardFooter>
      </Card>
      <div className='top-2 flex h-full w-auto flex-1 items-center justify-center bg-gray-100 p-6 md:sticky'>
        <SuccessIlustration />
      </div>
    </div>
  )
}
