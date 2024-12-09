// * MIGRATION
import { createClient } from '@sanity/client'
import pLimit from 'p-limit'
import { createOrReplace, defineMigration } from 'sanity/migrate'

// * UTILS
import { getDataTypes } from '../import-wp/lib/utils/getDataTypes'
import { sanityFetchImages } from '../import-wp/lib/utils/wpImageFetch'
// import { sanityFetchDocuments } from '../import-wp/lib/utils/wpDocumentsFetch'

// * TRANSFORMERS
import { transformToPage } from '../import-wp/lib'

// * TYPES IMPORTS
import { WP_REST_API_Product } from '../import-wp/types'
import { wcAPI } from '@/lib/clients'
import { WP_REST_API_Page, WP_REST_API_Pages } from 'wp-types'

const limit = pLimit(2)

export default defineMigration({
  title: 'Import WP JSON data from API',

  async *migrate(docs, context) {
    const client = createClient(context.client.config())
    const existingImages = await sanityFetchImages(client)
    // const existingDocuments = await sanityFetchDocuments(client)
    // const existingProducts: Record<string, string>[] = await client.fetch(
    //   `*[_type == "product"]{_id}`
    // )

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

        const products: { data: WP_REST_API_Pages } = await wcAPI.get('pages', {
          per_page: 10,
          page
        })

        if (Array.isArray(products.data) && products.data.length) {
          const docs = products.data.map((product) =>
            limit(async () => {
              if (wpType === 'pages') {
                product = product as WP_REST_API_Page
                const doc = await transformToPage(
                  product,
                  client,
                  existingImages
                )
                return doc
              }

              hasMore = false
              throw new Error(`Unhandled WordPress type: ${wpType}`)
            })
          )

          // Filter out null documents and resolve all valid documents concurrently
          const resolvedDocs = await Promise.all(
            docs.map(async (docPromise) => {
              const doc = await docPromise
              return doc !== null ? createOrReplace(doc) : null
            })
          )

          // Yield only the non-null results
          yield resolvedDocs.filter((doc) => doc !== null)

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
