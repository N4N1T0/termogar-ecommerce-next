import { Product } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import type { SanityClient } from 'sanity'

import {
  sanityIdToImageReference,
  sanityUploadImageFromUrl
} from '../utils/wpImageFetch'
import { htmlToBlockContent } from '../utils/htmlToBlockContent'
import { decodeAndStripHtml } from '../utils/decodeHtmlToString'
import { WP_REST_API_Product } from '../../types'
import {
  sanityIdToDocumentReference,
  sanityUploadDocumentsFromUrl,
  wpDocumentsFetch
} from '../utils/wpDocumentsFetch'

// Remove these keys because they'll be created by Content Lake
export type StagedProduct = Omit<Product, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToProduct(
  wpDoc: WP_REST_API_Product,
  client: SanityClient,
  existingImages: Record<string, string> = {},
  existingDocuments: Record<string, string> = {}
): Promise<StagedProduct> {
  const doc: StagedProduct = {
    _id: `product-${wpDoc.id}`,
    _type: 'product'
  }

  doc.title = wpDoc.name

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    doc.productCategories = wpDoc.categories.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `productCategory-${catId.id}`
    }))
  }

  if (Array.isArray(wpDoc.tags) && wpDoc.tags.length) {
    doc.productTag = wpDoc.tags.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `productTag-${catId.id}`
    }))
  }

  if (wpDoc.date_created) {
    doc.date = wpDoc.date_created
  }

  if (wpDoc.date_modified) {
    doc.modified = wpDoc.date_modified
  }

  if (wpDoc.status) {
    doc.status = wpDoc.status as Product['status']
  }

  // Document has an image
  if (Array.isArray(wpDoc.images) && wpDoc.images.length > 0) {
    for (const image of wpDoc.images) {
      if (existingImages[image.id]) {
        // Add existing image reference
        doc.relatedImages = [
          ...(doc.relatedImages ?? []),
          {
            asset: {
              _ref: String(existingImages[image.id]),
              _type: 'reference'
            },
            _type: 'image',
            _key: uuid()
          }
        ]
      } else {
        // Retrieve image details from WordPress
        const metadata = {
          filename: image.name,
          source: {
            id: String(image.id),
            name: 'WordPress',
            url: image.src
          }
        }

        if (metadata.source.url) {
          // Upload to Sanity
          const asset = await sanityUploadImageFromUrl(
            metadata.source.url,
            client,
            metadata
          )

          if (asset) {
            doc.relatedImages = [
              ...(doc.relatedImages ?? []),
              {
                asset: {
                  _ref: asset._id,
                  _type: 'reference'
                },
                _type: 'image',
                _key: uuid()
              }
            ]
            existingImages[image.id] = asset._id // Cache the new asset ID
          }
        }
      }
    }

    // Set the first image as featured
    doc.featuredMedia = sanityIdToImageReference(
      existingImages[wpDoc.images[0].id]
    )
  }

  if (wpDoc.description) {
    doc.content = await htmlToBlockContent(
      wpDoc.description,
      client,
      existingImages
    )
  }

  if (wpDoc.stockQuantity) {
    doc.stockQuantity = wpDoc.stockQuantity
  }

  if (wpDoc.meta_data && wpDoc.meta_data.length) {
    const documentInfo = wpDoc.meta_data.find(
      (item) => item.key === '_yoast_wpseo_metadesc'
    )
    doc.excerpt = decodeAndStripHtml(documentInfo?.value)
  }

  if (wpDoc.meta_data && wpDoc.meta_data.length) {
    const documentInfo = wpDoc.meta_data.find(
      (item) => item.key === 'documents'
    )

    if (documentInfo && documentInfo.value.length > 0) {
      if (existingDocuments[documentInfo?.id]) {
        doc.downloads = sanityIdToDocumentReference(
          existingDocuments[documentInfo?.id]
        )
      } else {
        // Retrieve image details from WordPress
        const metadata = await wpDocumentsFetch(
          documentInfo.value[0].url,
          documentInfo.id
        )

        if (metadata?.source?.url) {
          // Upload to Sanity
          const asset = await sanityUploadDocumentsFromUrl(
            metadata.source.url,
            client,
            metadata
          )

          if (asset) {
            doc.downloads = sanityIdToDocumentReference(asset._id)
            existingDocuments[documentInfo?.id] = asset._id
          }
        }
      }
    }
  }

  if (wpDoc.permalink) {
    doc.link = { _type: 'slug', current: wpDoc.permalink }
  }

  if (wpDoc.regular_price || wpDoc.price) {
    doc.price =
      wpDoc.regular_price === ''
        ? Number(wpDoc.price)
        : Number(wpDoc.regular_price)
  }

  if (wpDoc.sale_price && wpDoc.date_on_sale_from && wpDoc.date_on_sale_to) {
    doc.sale = {
      from: wpDoc.date_on_sale_from,
      to: wpDoc.date_on_sale_to,
      price: Number(wpDoc.sale_price)
    }
  }

  if (wpDoc.dimensions && wpDoc.weight) {
    const altDimensions =
      wpDoc.meta_data.find((item) => item.key === 'yikes_woo_products_tabs')
        ?.value > 0
        ? await htmlToBlockContent(
            wpDoc.meta_data.find(
              (item) => item.key === 'yikes_woo_products_tabs'
            )?.value[0].content,
            client,
            existingImages
          )
        : undefined

    doc.dimensions = {
      height: Number(wpDoc.dimensions.height),
      length: Number(wpDoc.dimensions.length),
      width: Number(wpDoc.dimensions.width),
      weight: Number(wpDoc.weight),
      alt: altDimensions
    }
  }

  if (Array.isArray(wpDoc.attributes) && wpDoc.attributes.length > 0) {
    doc.options = {
      name: wpDoc.attributes[0].name,
      values: wpDoc.attributes[0].options.map((option) => option)
    }
  }

  // TODO: With Patch

  // if (Array.isArray(wpDoc.variations) && wpDoc.variations.length > 0) {
  //   doc.variations = wpDoc.variations.map((variation) => ({
  //     _key: uuid(),
  //     _type: 'reference',
  //     _ref: `product-${variation}`
  //   }))
  // }

  // if (Array.isArray(wpDoc.related_ids) && wpDoc.related_ids.length > 0) {
  //   doc.relatedProducts = wpDoc.related_ids.map((variation) => ({
  //     _key: uuid(),
  //     _type: 'reference',
  //     _ref: `product-${variation}`
  //   }))
  // }

  return doc
}
