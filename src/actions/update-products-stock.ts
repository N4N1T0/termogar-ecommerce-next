'use server'

// * ASSETS IMPORTS
import { sanityClientWrite } from '@/sanity/lib/client'

// * UTILS IMPORTS
import { CartItemType } from '@/types'
import { Logger } from 'next-axiom'

const log = new Logger()

const updateProductsStock = async (products: CartItemType[]) => {
  if (!products.length) {
    console.log('No products to update stock.')
    return
  }

  for (const product of products) {
    try {
      await sanityClientWrite
        .patch(product.id)
        .dec({ stockQuantity: product.quantity })
        .commit()

      console.log(`Stock for product ${product.id} successfully updated.`)
    } catch (error) {
      log.error('Error while updating stock:', { error: error })
    }
  }

  console.log('All products stock successfully updated.')
  return
}

export default updateProductsStock
