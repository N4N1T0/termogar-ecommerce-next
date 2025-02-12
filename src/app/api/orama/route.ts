import { sanityClientRead } from '@/sanity/lib/client'
import { GET_CARD_STYLE_ONE_PRODUCTS_FOR_ORAMA } from '@/sanity/lib/queries'
import { CloudManager } from '@oramacloud/client'
import { NextResponse } from 'next/server'

const manager = new CloudManager({
  api_key: process.env.ORAMA_PRIVATE_API_KEY!
})
const indexManager = manager.index('b891izjvpx5w3lvq3p391m2h')

export const GET = async () => {
  try {
    const products = await sanityClientRead.fetch(
      GET_CARD_STYLE_ONE_PRODUCTS_FOR_ORAMA
    )

    await indexManager.empty()
    await indexManager.insert(products)
    await indexManager.deploy()

    return NextResponse.json('OK', { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred', details: error },
      { status: 500 }
    )
  }
}
