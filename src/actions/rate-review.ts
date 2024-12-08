'use server'

import { yoptop } from '@/lib/fetchers'
import { rateReviewSchema, RateReviewSchema } from '@/lib/schemas'

const rateReview = async (values: RateReviewSchema) => {
  const parsedValues = rateReviewSchema.safeParse(values)

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.issues[0].message
    }
  }

  const { reviewId, voteType } = parsedValues.data

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' }
  }

  try {
    const response = await yoptop.rateReview(options, reviewId, voteType)

    if (response.data !== 'OK') {
      return {
        success: false,
        message:
          'Error en la valoración de la reseña, por favor trate de nuevo!'
      }
    }

    return {
      success: true,
      message: 'valoración registrada y enviada, gracias por su colaboración'
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

export default rateReview
