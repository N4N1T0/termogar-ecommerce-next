import { factusol } from '@/lib/fetchers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const products = await factusol.getAllProductsStock()

  return NextResponse.json(products, { status: 200 })
}
