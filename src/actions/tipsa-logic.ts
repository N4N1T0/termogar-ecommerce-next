'use server'

import { tipsa } from '@/lib/fetchers'

export async function construirEtiqueta8(strAlbaran: string) {
  if (typeof strAlbaran !== 'string') {
    throw new Error('Invalid input: strAlbaran must be a string')
  }

  try {
    const response = await tipsa.construirEtiqueta8(strAlbaran)
    return { response }
  } catch (error) {
    throw new Error('An error occurred', { cause: error })
  }
}
