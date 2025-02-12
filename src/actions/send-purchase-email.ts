'use server'

// * ASSETS IMPORTS
import CompletedPurchase from '@/emails/completed-purchase'
import ErrorPurchase from '@/emails/error-purchase'

// * UTILS IMPORTS
import { resend } from '@/lib/clients'
import { CartItemType } from '@/types'
import { Address, GET_USER_INFOResult } from '@/types/sanity'
import { Logger } from 'next-axiom'

const log = new Logger()

const sendPurchaseEmail = async (
  user: GET_USER_INFOResult,
  products: CartItemType[],
  orderNumber: string | string[] | undefined,
  totalAmount: number,
  purchaseDate: Date,
  gateway: string,
  iva: number,
  followLink: string,
  discountCoupon: number,
  shippingAddress:
    | ({
        _key: string
      } & Address)
    | null
    | undefined,
  status: 'success' | 'failed'
) => {
  try {
    if (status === 'failed') {
      log.info(
        `Sending order failed email to ${user?.email} with order number ${orderNumber}`
      )

      await resend.emails.send({
        from: 'compra-error@termogar.es',
        bcc: ['hola@termogar.es'],
        to: [user?.email as string],
        subject: 'Orden Fallida',
        react: ErrorPurchase({
          user,
          products,
          billingAddress: user?.billingAddress as Address,
          discountCoupon,
          gateway,
          iva: iva.toString(),
          orderNumber: orderNumber as string,
          purchaseDate: new Date(purchaseDate).toISOString(),
          shippingAddress: shippingAddress as Address,
          totalAmount: totalAmount.toString()
        })
      })
    } else {
      log.info(
        `Sending order completed email to ${user?.email} with order number ${orderNumber}`
      )

      await resend.emails.send({
        from: 'compra-realizada@termogar.es',
        bcc: ['hola@termogar.es'],
        to: [user?.email as string],
        subject: 'Orden Completada',
        react: CompletedPurchase({
          user,
          products,
          billingAddress: user?.billingAddress as Address,
          discountCoupon,
          gateway,
          iva: iva.toString(),
          orderNumber: orderNumber as string,
          purchaseDate: new Date(purchaseDate).toISOString(),
          shippingAddress: shippingAddress as Address,
          totalAmount: totalAmount.toString(),
          currierLink: followLink
        })
      })
    }
  } catch (error) {
    log.error('Error sending purchase email:', { error: error })
  }
}

export default sendPurchaseEmail
