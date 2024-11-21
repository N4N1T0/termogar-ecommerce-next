// * MIGRATION
import { createClient } from '@sanity/client'
import pLimit from 'p-limit'
import { createOrReplace, defineMigration } from 'sanity/migrate'

// * UTILS
import { getDataTypes } from './lib/utils/getDataTypes'
import { wpDataTypeFetch } from './lib/utils/wpDataTypeFetch'
import { sanityFetchImages } from './lib/utils/wpImageFetch'
import { sanityFetchDocuments } from './lib/utils/wpDocumentsFetch'

// * TRANSFORMERS
import {
  transformToCategory,
  transformToCostumers,
  transformToCoupon,
  transformToPage,
  transformToPost,
  transformToProduct,
  transformToProductCategory,
  transformToProductTag,
  transformToTag
} from './lib'

// * TYPES IMPORTS
import type {
  WP_REST_API_Post,
  WP_REST_API_Term,
  WP_REST_API_Page
} from 'wp-types'
import {
  WP_REST_API_Costumer,
  WP_REST_API_Coupon,
  WP_REST_API_Product
} from './types'

const limit = pLimit(2)

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config())

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client)
    const existingDocuments = await sanityFetchDocuments(client)

    const { wpType } = getDataTypes(process.argv)
    // Define pages to skip
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

        const wpData = await wpDataTypeFetch(wpType, page)

        if (Array.isArray(wpData) && wpData.length) {
          // Create an array of concurrency-limited promises to stage documents
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              if (wpType === 'posts') {
                wpDoc = wpDoc as WP_REST_API_Post
                const doc = await transformToPost(wpDoc, client, existingImages)
                return doc
              } else if (wpType === 'pages') {
                wpDoc = wpDoc as WP_REST_API_Page
                const doc = await transformToPage(wpDoc, client, existingImages)
                return doc
              } else if (wpType === 'categories') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToCategory(wpDoc)
                return doc
              } else if (wpType === 'tags') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToTag(wpDoc)
                return doc
              } else if (wpType === 'product_cat') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToProductCategory(
                  wpDoc,
                  client,
                  existingImages
                )
                return doc
              } else if (wpType === 'product_tag') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToProductTag(
                  wpDoc,
                  client,
                  existingImages
                )
                return doc
              } else if (wpType === 'products') {
                wpDoc = wpDoc as WP_REST_API_Product
                const doc = await transformToProduct(
                  wpDoc,
                  client,
                  existingImages,
                  existingDocuments
                )
                return doc
              } else if (wpType === 'coupons') {
                wpDoc = wpDoc as WP_REST_API_Coupon
                const doc = await transformToCoupon(wpDoc)
                return doc
              } else if (wpType === 'customers') {
                wpDoc = wpDoc as WP_REST_API_Costumer
                const doc = await transformToCostumers(
                  wpDoc,
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
