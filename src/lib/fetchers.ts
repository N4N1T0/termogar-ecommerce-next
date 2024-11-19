import { YoptopReviews } from '@/types'

const yoptop = {
  fetchReviews: async (
    id: string
  ): Promise<{ status: number; reviews: YoptopReviews[] }> => {
    const reviews = await fetch(
      `https://api-cdn.yotpo.com/v1/widget/xLY3fm5Fhp2fd8eNdujTZUGBZQRBPClqijIFfmPR/products/${id}/reviews.json`
    )

    const data = await reviews.json()
    return {
      status: data.status.code,
      reviews: data.response.reviews
    }
  }
}

export { yoptop }
