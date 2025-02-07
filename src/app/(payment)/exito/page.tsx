// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import SuccessContent from '@/components/Payment/success'
import SuccessIlustration from '@/components/Payment/success-ilustration'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// * UTILS IMPORTS
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_INFO } from '@/sanity/lib/queries'
import { processRestNotification } from '@/lib/clients'
import { Order } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { paypal, tipsa } from '@/lib/fetchers'
import { tipsaFormatDate } from '@/lib/utils'
import { Logger } from 'next-axiom'

export const metadata: Metadata = {
  title: 'Pago Realizado con Exito',
  description:
    'Pago realizado con exito. En breve te llegara un correo con los detalles de tu pedido.'
}

const log = new Logger()

const SuccessPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const currentDate = new Date()
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
    total,
    token
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

  if (gateway === 'PayPal') {
    const response = await paypal.captureOrder(token as string)
    if (response !== 'COMPLETED') {
      notFound()
    }
  }

  let followLink = ''

  const user = await sanityClientWrite.fetch(
    GET_USER_INFO,
    {
      id: userId
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 180
      }
    }
  )

  const refactoredProducts =
    Array.isArray(products) || products === undefined
      ? []
      : products.split(',').map((product) => ({
          product: {
            _ref: product.split('_')[0],
            _type: 'reference' as const
          },
          quantity: parseInt(product.split('_')[1], 10),
          selectedOption: product.split('_')[2] || '',
          _key: uuid()
        }))

  const address =
    newAddress === 'true'
      ? user?.shippingAddresses && user.shippingAddresses.length > 0
        ? [user.shippingAddresses[0]]
        : undefined
      : user?.billingAddress
        ? [user.billingAddress]
        : undefined

  try {
    const albaran = await tipsa.grabaEnvio24(
      tipsaFormatDate(currentDate),
      '48',
      `${user?.firstName} ${user?.lastName}`,
      `${address && address[0].address1} ${address && address[0].address2}`,
      (address && address[0].city) || '',
      (address && address[0].postcode) || '',
      (address && address[0].phone) || '',
      refactoredProducts.reduce(
        (total, product) => total + product.quantity,
        0
      ),
      refactoredProducts
        .map((product) => `${product.quantity} ${product.product._ref}`)
        .join(', ')
    )

    followLink = `https://aplicaciones.tip-sa.com/cliente/datos_env.php?id=${process.env.TIPSA_AGENCY}${process.env.TIPSA_USER}${albaran}`

    await sanityClientWrite.create<Order>({
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
      shippingAddress: address,
      currierCode: albaran,
      currierLink: followLink,
      expectedDeliveryDate: new Date(
        currentDate.setHours(currentDate.getHours() + 48)
      ).toISOString() // Sumar 48 horas
    })

    for (const product of refactoredProducts) {
      try {
        await sanityClientWrite
          .patch(product.product._ref)
          .dec({ stockQuantity: product.quantity })
          .commit()
      } catch (error) {
        log.error('Error while updating stock:', { error: error })
      }
    }

    console.log('Order created successfully', { orderId })

    log.info('Order created successfully', { orderId })
  } catch (error) {
    log.error('Error while creating order:', { error: error })
  }

  return (
    <div className='container-x relative mx-auto flex py-10'>
      <Card className='flex-1 overflow-hidden rounded-none border-[1px]'>
        <CardHeader className='bg-green-500 text-white'>
          <CardTitle className='text-2xl uppercase'>Orden Realizada!</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <SuccessContent
            orderData={{ user, orderId, newAddress, discountCoupon, gateway }}
            followLink={followLink}
          />
        </CardContent>
      </Card>
      <div className='top-10 hidden h-full w-auto flex-1 items-center justify-center bg-gray-100 p-6 md:sticky md:flex'>
        <SuccessIlustration />
      </div>
    </div>
  )
}

export default SuccessPage
