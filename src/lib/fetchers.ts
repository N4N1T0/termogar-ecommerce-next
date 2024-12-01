import { YoptopReviews } from '@/types'

const appKey = process.env.YOTPO_APP_KEY

const yoptop = {
  fetchReviews: async (
    id: string
  ): Promise<{ status: number; reviews: YoptopReviews }> => {
    const reviews = await fetch(
      `https://api-cdn.yotpo.com/v1/widget/${appKey}/products/${id}/reviews.json`
    )
    if (!reviews.ok) {
      throw new Error(`HTTP error! status: ${reviews.status}`)
    }
    const data = await reviews.json()
    return {
      status: data.status?.code,
      reviews: data.response.reviews
    }
  },
  createReviews: async (
    options: RequestInit
  ): Promise<{ status: number; data: string }> => {
    const response = await fetch(
      'https://api.yotpo.com/v1/widget/reviews',
      options
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return {
      status: data.code,
      data: data.message
    }
  },
  rateReview: async (
    options: RequestInit,
    reviewId: string,
    voteType: 'up' | 'down'
  ): Promise<{ status: number; data: string }> => {
    const response = await fetch(
      `https://api.yotpo.com/reviews/${reviewId}/vote/${voteType}`,
      options
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return {
      status: data.status.code,
      data: data.status.message
    }
  }
}

export { yoptop }
