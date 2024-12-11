'use server'

import {
  CURRENCIES,
  TRANSACTION_TYPES,
  randomTransactionId,
  LANGUAGES
} from 'redsys-easy'
import { createRedirectForm } from '@/lib/clients'
import Decimal from 'decimal.js'
import { paypal } from '@/lib/fetchers'
import { CartItemType } from '@/types'
import { Logger } from 'next-axiom'

const log = new Logger()

const merchantInfo = {
  DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE!, // Merchant code
  DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL!, // Terminal number
  DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION // '0' = Authorization
}

const currency = 'EUR'

const paymentLogic = async (
  paymentType: FormDataEntryValue | null,
  totalAmount: number,
  userId: string | string[] | undefined,
  products: CartItemType[],
  newAddress: string | string[] | undefined,
  discountCoupon: string
) => {
  const orderId = randomTransactionId()
  const refactoredProductsForPayment = products
    .map((product) => `${product.id}_${product.quantity}`)
    .join(',')
  const templateRedirectUrl = (page: string) => {
    return `${process.env.NEXT_PUBLIC_URL}/${page}?userId=${userId}&orderId=${orderId}&gateway=RedSys&newAddress=${newAddress}&discountCoupon=${discountCoupon}&total=${totalAmount}&products=${refactoredProductsForPayment}`
  }

  log.info('Payment logic initiated', {
    paymentType,
    totalAmount,
    userId,
    newAddress,
    discountCoupon
  })

  if (paymentType === 'tarjeta') {
    const currencyInfo = CURRENCIES[currency]
    const redsysAmount = new Decimal(totalAmount)
      .mul(10 ** currencyInfo.decimals)
      .toFixed(0)
    const redsysCurrency = currencyInfo.num

    const form = createRedirectForm({
      ...merchantInfo,
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_AMOUNT: redsysAmount,
      DS_MERCHANT_CURRENCY: redsysCurrency,
      DS_MERCHANT_MERCHANTURL: templateRedirectUrl('api/notifications'),
      DS_MERCHANT_URLOK: templateRedirectUrl('exito'),
      DS_MERCHANT_URLKO: templateRedirectUrl('fallo'),
      DS_MERCHANT_TRANSACTIONDATE: new Date().toISOString(),
      DS_MERCHANT_CONSUMERLANGUAGE: LANGUAGES.es,
      DS_MERCHANT_SHIPPINGADDRESSPYP: 'S',
      DS_MERCHANT_MERCHANTNAME: 'Termogar'
    })

    log.info('Tarjeta payment form created', { orderId })

    return {
      success: true,
      data: form
    }
  }

  if (paymentType === 'transferencia-bancaria-directa') {
    log.info('Transferencia bancaria directa selected', { orderId })
    return {
      success: true,
      data: templateRedirectUrl('exito')
    }
  }

  if (paymentType === 'paypal') {
    const redirectUrl = await paypal.createOrder(
      products,
      templateRedirectUrl,
      totalAmount
    )

    log.info('Paypal order created', { orderId, redirectUrl })

    return {
      success: true,
      data: redirectUrl
    }
  }

  log.error('Invalid payment type', { paymentType })

  return {
    success: false,
    data: null
  }
}

export default paymentLogic

