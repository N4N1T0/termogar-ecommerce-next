'use server'

// * ASSETS IMPORTS
import { yoptop } from '@/lib/fetchers'
import { reviewSchema, ReviewSchema } from '@/lib/schemas'
import { Logger } from 'next-axiom'

const appKey = process.env.NEXT_PUBLIC_YOTPO_APP_KEY
const log = new Logger()

const createReview = async (values: ReviewSchema) => {
  const parsedValues = reviewSchema.safeParse(values)

  if (!parsedValues.success) {
    log.error('Review schema validation failed', {
      where: 'createReview',
      data: parsedValues.error.issues[0].message
    })
    return {
      success: false,
      message: parsedValues.error.issues[0].message
    }
  }

  const {
    product_id,
    product_title,
    product_url,
    display_name,
    email,
    review_content,
    review_score,
    review_title
  } = parsedValues.data

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sku: product_id,
      product_title,
      domain: 'https://termogar.es/',
      product_url,
      display_name,
      email,
      review_content,
      review_title,
      review_score,
      appkey: appKey
    })
  }

  try {
    const response = await yoptop.createReviews(options)

    if (response.data !== 'ok') {
      log.error('Yopto service failed', {
        where: 'createReview',
        data: response
      })
      return {
        success: false,
        message: 'Error en el registro de la reseña, por favor trate de nuevo'
      }
    }

    log.info('Review successfully created', {
      data: response
    })

    return {
      success: true,
      message: 'Reseña registrada y enviada, gracias por su colaboración'
    }
  } catch (error) {
    log.error('Unexpected error', {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
      data: error
    })
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

export default createReview
