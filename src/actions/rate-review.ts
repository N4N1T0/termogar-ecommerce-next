'use server'

// * ASSETS IMPORTS
import { yoptop } from '@/lib/fetchers'
import { rateReviewSchema, RateReviewSchema } from '@/lib/schemas'
import { Logger } from 'next-axiom'

const log = new Logger()

const rateReview = async (values: RateReviewSchema) => {
  const parsedValues = rateReviewSchema.safeParse(values)

  if (!parsedValues.success) {
    log.error('Rate review schema validation failed', {
      where: 'rateReview',
      data: parsedValues.error.issues[0].message
    })
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
      log.error('Yopto service failed', {
        where: 'rateReview',
        data: response
      })
      return {
        success: false,
        message:
          'Error en la valoración de la reseña, por favor trate de nuevo!'
      }
    }

    log.info('Review rated successfully', {
      where: 'rateReview',
      reviewId,
      voteType
    })
    return {
      success: true,
      message: 'valoración registrada y enviada, gracias por su colaboración'
    }
  } catch (error) {
    log.error('An error occurred while rating review', {
      where: 'rateReview',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

export default rateReview
