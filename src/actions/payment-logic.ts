'use server'

import {
  CURRENCIES,
  TRANSACTION_TYPES,
  randomTransactionId,
  LANGUAGES
} from 'redsys-easy'
import { createRedirectForm } from '@/lib/clients'
import Decimal from 'decimal.js'

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
  products: string,
  newAddress: string | string[] | undefined,
  discountCoupon: string
) => {
  // Random ID for the transaction
  const orderId = randomTransactionId()

  console.log(paymentType)

  if (paymentType === 'tarjeta') {
    // Get the currency information
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
      DS_MERCHANT_MERCHANTURL: `${process.env.NEXT_PUBLIC_URL}/api/notifications?&userId=${userId}&orderId=${orderId}&gateway=RedSys&products=${products}`, // Notification URL
      DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_URL}/exito?userId=${userId}&orderId=${orderId}&gateway=RedSys&newAddress=${newAddress}&discountCoupon=${discountCoupon}&total=${totalAmount}&products=${products}`, // Success URL
      DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_URL}/exito?userId=${userId}&orderId=${orderId}&gateway=RedSys&newAddress=${newAddress}&discountCoupon=${discountCoupon}&total=${totalAmount}&products=${products}`, // Error URL
      DS_MERCHANT_TRANSACTIONDATE: new Date().toISOString(),
      DS_MERCHANT_CONSUMERLANGUAGE: LANGUAGES.es,
      DS_MERCHANT_SHIPPINGADDRESSPYP: 'S',
      DS_MERCHANT_MERCHANTNAME: 'Termogar'
    })

    return {
      success: true,
      data: form
    }
  }

  if (paymentType === 'transferencia-bancaria-directa') {
    return {
      success: true,
      data: orderId
    }
  }

  return {
    success: false,
    data: null
  }
}

export default paymentLogic
