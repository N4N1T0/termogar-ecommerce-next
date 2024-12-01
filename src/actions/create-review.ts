'use server'

import { yoptop } from '@/lib/fetchers'
import { reviewSchema, ReviewSchema } from '@/lib/schemas'

const appKey = process.env.YOTPO_APP_KEY

const createReview = async (values: ReviewSchema) => {
  const parsedValues = reviewSchema.safeParse(values)

  if (!parsedValues.success) {
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
      console.error('Error with the response:', response.status)
      return {
        success: false,
        message: 'Error en el registro de la reseña, por favor trate de nuevo'
      }
    }

    return {
      success: true,
      message: 'Reseña registrada y enviada, gracias por su colaboración'
    }
  } catch (error) {
    console.error('Error submitting review:', error)

    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

export default createReview
