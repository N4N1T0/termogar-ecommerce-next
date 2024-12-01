'use server'

import { reportProductSchema, ReportProductSchema } from '@/lib/schemas'

const reportProduct = async (values: ReportProductSchema) => {
  const parsedValues = reportProductSchema.safeParse(values)

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.issues[0].message
    }
  }

  console.log(values)

  // TODO: Send a email

  return {
    message: 'Reporte enviando con éxito, gracias por su colaboración',
    success: true
  }
}

export default reportProduct
