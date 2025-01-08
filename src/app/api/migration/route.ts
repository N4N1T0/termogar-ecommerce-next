import { wcAPI } from '@/lib/clients'
import { NextResponse } from 'next/server'
import { WP_REST_API_Products } from '@migrations/import-wp/types'
import { sanityClientWrite } from '@/sanity/lib/client'
import pLimit from 'p-limit'

const notSanityProducts = ['21367']

export const GET = async () => {
  const limit = pLimit(5) // Limit concurrency to 5
  const pagePromises = [] // Array to store page fetch promises

  for (let page = 1; page <= 26; page++) {
    // Push each page fetch to the pagePromises array
    pagePromises.push(
      wcAPI
        .get('products', { per_page: 10, page })
        .then(async (response) => {
          const products: { data: WP_REST_API_Products } = response

          // Process each product in the current page
          const productPromises = products.data.map((product) =>
            limit(async () => {
              const searchedProducts = await sanityClientWrite.fetch(
                `*[_type == "product" && _id == $id][0]`,
                { id: `product-${product.id}` }
              )

              if (!searchedProducts) {
                console.log(`Product not found in Sanity: ${product.id}`)
                return
              }

              if (notSanityProducts.includes(product.id.toString())) {
                return
              }

              await sanityClientWrite
                .patch(`product-${product.id}`)
                .set({ stockQuantity: product.stock_quantity })
                .commit()

              console.log(
                `Product ${product.name} - Stock Quantity: ${product.stock_quantity}`
              )
            })
          )

          // Wait for all product promises on this page to complete
          await Promise.all(productPromises)
        })
        .catch((error) => {
          console.error(`Failed to fetch products for page ${page}:`, error)
        })
    )
  }

  // Wait for all pages to be fetched and processed
  await Promise.all(pagePromises)

  return NextResponse.json({
    success: true,
    message: 'Products migrated across all pages'
  })
}
