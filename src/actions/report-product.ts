'use server'

import ReportProduct from '@/emails/report-product'
import { resend } from '@/lib/clients'
import { reportProductSchema, ReportProductSchema } from '@/lib/schemas'
import { Logger } from 'next-axiom'

const log = new Logger()

const reportProduct = async (values: ReportProductSchema) => {
  const parsedValues = reportProductSchema.safeParse(values)

  if (!parsedValues.success) {
    log.error(
      `Invalid report product body: ${parsedValues.error.issues[0].message}`
    )
    return {
      success: false,
      message: parsedValues.error.issues[0].message
    }
  }

  try {
    await resend.emails.send({
      from: 'reporte-producto@termogar.es',
      bcc: ['adrian.alvarezalonso1991@gmail.com'],
      to: ['adrian.alvarezalonso1991@gmail.com'],
      subject: 'Reporte de Producto',
      react: ReportProduct({
        productName: parsedValues.data.productName,
        reason: parsedValues.data.reason,
        description: parsedValues.data.description
      })
    })

    log.info('Report product email sent successfully')
    return {
      message: 'Reporte enviando con éxito, gracias por su colaboración',
      success: true
    }
  } catch (error) {
    log.error('Error sending report product email', { error })
    return {
      message: 'Ha habido un error al enviar el reporte',
      success: false
    }
  }
}

export default reportProduct
