// * NEXT.JS IMPORTS
import { NextResponse } from 'next/server'

// * UTILS IMPORTS
import { processRestNotification, resend } from '@/lib/clients'
import type { ResponseJSONSuccess } from 'redsys-easy'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Order } from '@/types/sanity'
import ErrorPayment from '@/emails/error-payment'
import {
  GET_CARD_STYLE_ONE_PRODUCTS_FOR_ERROR_NOTIFICATION,
  GET_USER_INFO
} from '@/sanity/lib/queries'
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'

export const POST = withAxiom(async (req: AxiomRequest) => {
  const log = req.log.with({ scope: 'notifications-checkout' })

  log.info('Starting notification process')
  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  const userId = req.nextUrl.searchParams.get('userId')
  const products = req.nextUrl.searchParams.get('products')

  const user = await sanityClientWrite.fetch(GET_USER_INFO, { id: userId })
  const errorProducts = await sanityClientWrite.fetch(
    GET_CARD_STYLE_ONE_PRODUCTS_FOR_ERROR_NOTIFICATION,
    {
      id: products?.split(',').map((product) => {
        return product.split('_')[0]
      })
    }
  )

  const refactoredProducts = errorProducts.map((product) => ({
    product: product,
    quantity:
      products
        ?.split(',')
        .map((p) => ({ id: p.split('_')[0], quantity: p.split('_')[1] }))
        .find((p) => p.id === product.id)?.quantity || 0
  }))

  const {
    Ds_Order: orderId,
    Ds_Response: responseCode,
    Ds_ProcessedPayMethod
  } = processRestNotification(notificationParams)

  log.info('Notification parameters', { notificationParams })

  if (responseCode === '0000') {
    // Verificar el código de respuesta (0000 es éxito)
    const response: Order = await sanityClientWrite
      .patch(orderId)
      .set({ status: 'completado', paymentMethod: Ds_ProcessedPayMethod })
      .commit()

    log.info('Updated order status', { orderId, responseCode })

    if (!response) {
      log.error('Failed to update order status') // Log error for order update failure
    }

    return NextResponse.json({ success: true, message: 'Payment completed' })
  } else {
    // TODO: Change the email address
    log.error('Payment failed', {
      orderId,
      responseCode,
      products: refactoredProducts,
      user
    })

    await resend.emails.send({
      from: 'registro-newsletter@termogar.es',
      bcc: ['hola@termogar.es'],
      to: [user?.email as string],
      subject: 'Suscripción al Newsletter',
      react: ErrorPayment({
        errorDetails: `Error al procesar el pago. Codigo de respuesta: ${responseCode}`,
        orderId,
        products: refactoredProducts,
        purchaseDate: new Date().toISOString(),
        user
      })
    })

    return NextResponse.json(
      { success: false, message: 'Payment failed' },
      { status: 400 }
    )
  }
})
