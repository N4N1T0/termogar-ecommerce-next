import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COUPONS_FOR_VALIDATION } from '@/sanity/lib/queries'
import { CartItemType } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { coupon, cart }: { coupon: string; cart: CartItemType[] } =
    await request.json()
  const today = new Date()

  const searchedCoupon = await sanityClientRead.fetch(
    GET_COUPONS_FOR_VALIDATION,
    { code: coupon }
  )

  if (!searchedCoupon) {
    return NextResponse.json(
      {
        message: 'No tenemos ningún Cupón con ese código',
        success: false,
        data: null
      },
      { status: 404 }
    )
  }

  const {
    date_expires,
    maximum_amount,
    minimum_amount,
    product_categories,
    product_ids,
    usage_limit,
    usage_count
    // limit_usage_to_x_items,
    // usage_limit_per_user
  } = searchedCoupon

  if (date_expires && new Date(date_expires) < today) {
    return NextResponse.json(
      {
        message: 'El cupón ha expirado',
        success: false,
        data: null
      },
      { status: 400 }
    )
  }

  if (usage_limit && usage_count && usage_count >= usage_limit) {
    return NextResponse.json(
      {
        message: 'El cupón ha alcanzado su uso límite',
        success: false,
        data: null
      },
      { status: 400 }
    )
  }

  const cartTotal = cart.reduce((total, item) => {
    const price = item.price || item.sale?.price || 1
    return total + price * item.quantity
  }, 0)

  const cartCategories = cart.reduce<string[]>((total, item) => {
    if (!item.categories) return total
    return [...total, ...item.categories?.map((category) => category.id)]
  }, [])

  const cartIds = cart.reduce<string[]>((total, item) => {
    if (!item.id) return total
    return [...total, item.id]
  }, [])

  if (cartTotal > Number(maximum_amount || 0)) {
    return NextResponse.json(
      {
        message: 'El total de tu compra es mayor al monto del cupón',
        success: false,
        data: null
      },
      { status: 400 }
    )
  }

  if (cartTotal < Number(minimum_amount || 10000000)) {
    return NextResponse.json(
      {
        message: 'El total de tu compra es menor al monto del cupón',
        success: false,
        data: null
      },
      { status: 400 }
    )
  }

  if (product_ids && product_ids.length > 0) {
    const validProduct = cartIds.some((id) =>
      product_ids.some((product) => product.id === id)
    )

    if (!validProduct) {
      return NextResponse.json(
        {
          message: 'El cupón no es aplicable a los productos en tu carrito',
          success: false,
          data: null
        },
        { status: 400 }
      )
    }
  }

  if (product_categories && product_categories.length > 0) {
    const validCategory = cartCategories.some((categoryId) =>
      product_categories.some((category) => category.id === categoryId)
    )

    if (!validCategory) {
      return NextResponse.json(
        {
          message:
            'El cupón no es aplicable a las categorías de productos en tu carrito',
          success: false,
          data: null
        },
        { status: 400 }
      )
    }
  }

  // TODO: limit usage to x items and user validation

  return NextResponse.json(
    { message: 'Coupon found', success: true, data: searchedCoupon },
    { status: 200 }
  )
}
