// * NEXT.JS IMPORTS
import { NextRequest, NextResponse } from 'next/server'

// * UTILS IMPORTS
import { processRestNotification } from '@/lib/clients'
import type { ResponseJSONSuccess } from 'redsys-easy'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Order } from '@/types/sanity'

export const runtime = 'nodejs'

/**
 * Procesa la notificación de pago de Redsys.
 * @param req Solicitud de Next.js.
 * @returns Respuesta de Next.js con el estado de la solicitud.
 */
export const POST = async (req: NextRequest) => {
  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  const userId = req.nextUrl.searchParams.get('userId')
  const products = req.nextUrl.searchParams.get('products')

  const {
    Ds_Order: orderId,
    Ds_Response: responseCode,
    Ds_ProcessedPayMethod
  } = processRestNotification(notificationParams)

  if (responseCode === '0000') {
    // Verificar el código de respuesta (0000 es éxito)
    const response: Order = await sanityClientWrite
      .patch(orderId)
      .set({ status: 'completado', paymentMethod: Ds_ProcessedPayMethod })
      .commit()

    if (!response) {
      console.error('Failed to update order status') // Log error for order update failure
    }

    // TODO: Send email to user

     return NextResponse.json({ success: true, message: 'Payment completed' });
  } else {
    console.error('Payment failed')
    return NextResponse.json({ success: false, message: 'Payment failed' }, { status: 400 });
  }
})

