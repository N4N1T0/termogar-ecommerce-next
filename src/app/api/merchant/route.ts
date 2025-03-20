/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import * as content from '@googleapis/content'
import pLimit from 'p-limit'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_FOR_MERCHANT_CENTER } from '@/sanity/lib/queries'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'

export const GET = async () => {
  const authClient = new content.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_PRIVATE_KEY,
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
    },
    scopes: [
      'https://www.googleapis.com/auth/content',
      'https://www.googleapis.com/auth/cloud-platform'
    ]
  })
  const contentClient = content.content({
    version: 'v2.1',
    auth: authClient
  })

  try {
    const products = await sanityClientRead.fetch(
      GET_CARD_STYLE_ONE_PRODUCTS_FOR_MERCHANT_CENTER
    )

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: 'No products found to update' },
        { status: 200 }
      )
    }

    const limit = pLimit(5)

    const updateResults = await Promise.all(
      products.map(
        (product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number]) =>
          limit(() => updateProduct(product, contentClient))
      )
    )

    return NextResponse.json(updateResults, { status: 200 })
  } catch (error: any) {
    console.error('Error updating products:', error)
    return NextResponse.json(
      { error: 'An error occurred', details: error.message },
      { status: 500 }
    )
  }
}

const updateProduct = async (
  product: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult[number],
  contentClient: any
) => {
  try {
    const updatedProduct = await contentClient.products.update({
      merchantId: process.env.MERCHANT_CENTER_ACCOUNT_ID,
      productId: `online:es:ES:${product.id}`,
      // TODO: Update this to use the actual product data
      requestBody: {
        title: product.title,
        description: product.excerpt,
        price: product.price
      }
    })
    return { success: true, product: updatedProduct }
  } catch (error: any) {
    console.error(`Failed to update product ${product.id}:`, error)
    return { success: false, error: error.message, productId: product.id }
  }
}
