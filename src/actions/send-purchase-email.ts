'use server'

// * ASSETS IMPORTS
import CompletedPurchase from '@/emails/completed-purchase'
import ErrorPurchase from '@/emails/error-purchase'

// * UTILS IMPORTS
import { resend } from '@/lib/clients'
import { tipsa } from '@/lib/fetchers'
import { tipsaFormatDate } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
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
      // TODO: Change the email address
      await resend.emails.send({
        from: 'compra-error@termogar.es',
        bcc: ['adrian.alvarezalonso1991@gmail.com'],
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

      const expectedDeliveryDate = new Date()
      expectedDeliveryDate.setHours(expectedDeliveryDate.getHours() + 48) // Sumar 48 horas

      const albaran = await tipsa.grabaEnvio24(
        tipsaFormatDate(purchaseDate),
        '48',
        `${user?.firstName} ${user?.lastName}`,
        `${shippingAddress?.address1} ${shippingAddress?.address2}`,
        shippingAddress?.city as string,
        shippingAddress?.postcode as string,
        shippingAddress?.phone as string,
        products.reduce((total, product) => total + product.quantity, 0),
        products
          .map((product) => `${product.quantity} ${product.title}`)
          .join(', ')
      )

      const followLink = `https://aplicaciones.tip-sa.com/cliente/datos_env.php?id=${process.env.TIPSA_AGENCY}${process.env.TIPSA_USER}${albaran}`

      await sanityClientWrite
        .patch(orderNumber as string)
        .set({
          currierLink: followLink,
          currierCode: albaran,
          expectedDeliveryDate: expectedDeliveryDate.toISOString()
        })
        .commit()

      if (!products.length) {
        return
      }

      for (const product of products) {
        try {
          await sanityClientWrite
            .patch(product.id)
            .dec({ stockQuantity: product.quantity })
            .commit()
        } catch (error) {
          log.error('Error while updating stock:', { error: error })
        }
      }

      // TODO: Change the email address
      await resend.emails.send({
        from: 'compra-realizada@termogar.es',
        bcc: ['adrian.alvarezalonso1991@gmail.com'],
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
