import { OramaClient } from '@oramacloud/client'
import { createRedsysAPI, SANDBOX_URLS } from 'redsys-easy'
import { Resend } from 'resend'

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: SANDBOX_URLS
})

export const resend = new Resend(process.env.RESEND_API_KEY)

export const oramaClient = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/products-s2tig7',
  api_key: process.env.ORAMA_PUBLIC_API_KEY!
})
