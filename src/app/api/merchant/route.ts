/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import * as content from '@googleapis/content'
import { type content_v2_1 } from '@googleapis/content'
import pLimit from 'p-limit'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_FOR_MERCHANT_CENTER } from '@/sanity/lib/queries'
import { uuid } from '@sanity/uuid'
import { GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult } from '@/types/sanity'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.nextUrl)

  if (searchParams.get('secret') !== process.env.CRON_JOBS_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized. Please check your secret key.' },
      { status: 401 }
    )
  }

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
    const products: GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORYResult =
      await sanityClientRead.fetch(
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
  contentClient: content_v2_1.Content
) => {
  try {
    const mainCategory = product.categories?.find(
      (category) => category.main === true
    )?.name
    const updatedProduct = await contentClient.products.update({
      merchantId: process.env.MERCHANT_CENTER_ACCOUNT_ID,
      requestBody: {
        id: product.sku || product.id.split('-')[1],
        title: toTitleCase(product.title),
        description: product.excerpt,
        price: {
          value: String(product.price && product.price * 1.21) || '0.00',
          currency: 'EUR'
        },
        offerId: product.sku || uuid(),
        salePrice:
          product.sale && product.sale.price
            ? {
                currency: 'EUR',
                value: String(product.sale.price * 1.21) || '0.00'
              }
            : undefined,
        link: `${process.env.NEXT_PUBLIC_UR}/productos/${product.slug}`,
        imageLink: product.featuredMedia.url,
        contentLanguage: 'es',
        targetCountry: 'ES',
        channel: 'online',
        availability:
          product?.stockQuantity && product.stockQuantity > 0
            ? 'in stock'
            : 'out of stock',
        condition: 'new',
        gtin: product.ean || null,
        mpn: product.referenceCode || null,
        brand: product.brand?.title,
        availabilityDate: '2025-07-16T00:00:00Z',
        canonicalLink: `${process.env.NEXT_PUBLIC_UR}/productos/${product.slug}`,
        pickupMethod: 'buy',
        salePriceEffectiveDate: product.sale
          ? '2025-03-01T23:00:00Z/2025-06-15T22:00:00Z'
          : null,
        customLabel0: product.title?.includes('JUNKERS') ? 'top-seller' : null,
        productTypes:
          product.categories?.map((category) => category.name || '') || null,
        googleProductCategory:
          googleProductCategory[
            (mainCategory as keyof typeof googleProductCategory) ||
              'Calentadores'
          ] || null
      }
    })
    return { success: true, product: updatedProduct }
  } catch (error: any) {
    console.error(`Failed to update product ${product.id}:`, error)
    return { success: false, error: error.message, productId: product.id }
  }
}

const toTitleCase = (str: string | null): string => {
  if (!str) return ''
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}

const googleProductCategory = {
  'Calentadores': '621',
  'Termos Eléctricos': '621',
  'Estufas': '2639',
  'Aire Acondicionado': '605',
  'Aerotermia': '621',
  'Fancoil': '605',
  'Calderas': '3082',
  'Radiadores': '2060'
}
