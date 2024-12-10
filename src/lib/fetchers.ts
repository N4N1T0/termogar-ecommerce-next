import { CartItemType, YoptopReviews } from '@/types'

const appKey = process.env.NEXT_PUBLIC_YOTPO_APP_KEY

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

const paypal = {
  generateAccessToken: async (): Promise<string> => {
    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials'
        }).toString()
      }
    )
    const data = await response.json()
    return data.access_token
  },
  createOrder: async function (
    products: CartItemType[],
    redirectUrl: (page: string) => string,
    totalAmount: number
  ): Promise<string> {
    const accessToken = await this.generateAccessToken()
    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              items: [
                {
                  name: 'Node.js Complete Course',
                  description:
                    'Node.js Complete Course with Express and MongoDB',
                  quantity: 1,
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '100.00'
                  }
                }
              ],

              amount: {
                currency_code: 'EUR',
                value: Number(totalAmount).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: Number(totalAmount).toFixed(2)
                  }
                }
              }
            }
          ],

          application_context: {
            return_url: redirectUrl('exito'),
            cancel_url: redirectUrl('fallo'),
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'Termogar'
          }
        })
      }
    )
    const data = await response.json()
    return data.links.find(
      (link: Record<string, string>) => link.rel === 'approve'
    ).href
  }
}

export { yoptop, paypal }
