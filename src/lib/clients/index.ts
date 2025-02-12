import { OramaClient } from '@oramacloud/client'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import { createRedsysAPI, SANDBOX_URLS } from 'redsys-easy'
import { Resend } from 'resend'

export const wcAPI = new WooCommerceRestApi({
  url: 'https://termogar.es',
  consumerKey: 'ck_f55ae036b58b2154c2bdb07faa3b64eb669b2750',
  consumerSecret: 'cs_383e2ce0c13d65e86a8209b86356632a2501ff84',
  version: 'wc/v3'
})

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: SANDBOX_URLS
})

export const resend = new Resend(process.env.RESEND_API_KEY)

export const oramaClient = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/products-s2tig7',
  api_key: process.env.ORAMA_PUBLIC_API_KEY!
})
