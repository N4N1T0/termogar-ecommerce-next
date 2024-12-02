// * MIGRATION
import { createClient } from '@sanity/client'
import pLimit from 'p-limit'
import { defineMigration } from 'sanity/migrate'

// * UTILS
import { getDataTypes } from '../import-wp/lib/utils/getDataTypes'
// import { sanityFetchImages } from '../import-wp/lib/utils/wpImageFetch'
// import { sanityFetchDocuments } from '../import-wp/lib/utils/wpDocumentsFetch'

// * TRANSFORMERS
import { transformToProduct } from '../import-wp/lib'

// * TYPES IMPORTS
import { WP_REST_API_Product } from '../import-wp/types'
import { wcAPI } from '@/lib/clients'
// import { sanityClientWrite } from '@/sanity/lib/client'

const limit = pLimit(2)

export default defineMigration({
  title: 'Import WP JSON data from API',

  async *migrate(docs, context) {
    const client = createClient(context.client.config())
    // const existingImages = await sanityFetchImages(client)
    // const existingDocuments = await sanityFetchDocuments(client)
    const existingProducts: Record<string, string>[] = await client.fetch(
      `*[_type == "product"]{_id}`
    )

    const { wpType } = getDataTypes(process.argv)
    // const skipPages = [25, 50, 74]
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        // Check if the current page is in the skip list
        // if (skipPages.includes(page)) {
        //   console.log(`Skipping page ${page}`)
        //   page++
        //   continue
        // }

        const products: { data: WP_REST_API_Product[] } = await wcAPI.get(
          'products',
          {
            per_page: 10,
            page
          }
        )

        if (Array.isArray(products.data) && products.data.length) {
          const docs = products.data.map((product) =>
            limit(async () => {
              if (wpType === 'products') {
                product = product as WP_REST_API_Product
                const doc = await transformToProduct(
                  product,
                  // client
                  // existingImages,
                  // existingDocuments,
                  existingProducts
                )
                return doc
              }

              hasMore = false
              throw new Error(`Unhandled WordPress type: ${wpType}`)
            })
          )

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs)

          await Promise.all(
            resolvedDocs.map((doc) => {
              if (doc._id !== 'product-21367') {
                return client
                  .patch(doc._id)
                  .setIfMissing({ variations: [] })
                  .insert('after', 'variations[-1]', doc.variations || [])
                  .commit({
                    autoGenerateArrayKeys: true
                  })
              }
              return Promise.resolve() // Ensure `map` returns a promise even if condition is false
            })
          )

          page++
        } else {
          hasMore = false
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error)
        // Stop the loop in case of an error
        hasMore = false
      }
    }
  }
})
