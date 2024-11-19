import { ProductCategory } from '@/types/sanity'
import type { WP_REST_API_Term } from 'wp-types'
import { htmlToBlockContent } from '../utils/htmlToBlockContent'
import { SanityClient } from 'sanity'

// Remove these keys because they'll be created by Content Lake
export type StagedProductCategory = Omit<
  ProductCategory,
  '_createdAt' | '_updatedAt' | '_rev'
>

export async function transformToProductCategory(
  wpDoc: WP_REST_API_Term,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedProductCategory> {
  const doc: StagedProductCategory = {
    _id: `productCategory-${wpDoc.id}`,
    _type: 'productCategory'
  }

  if (wpDoc.name) {
    doc.name = wpDoc.name
  }

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (wpDoc.link) {
    const url = new URL(wpDoc.link)
    doc.link = { _type: 'slug', current: url.pathname }
  }

  if (wpDoc.description) {
    doc.description = (await htmlToBlockContent(
      wpDoc.description,
      client,
      existingImages
    )) as ProductCategory['description']
  }

  if (wpDoc.taxonomy) {
    doc.taxonomy = wpDoc.taxonomy
  }

  if (wpDoc.parent) {
    doc.parent = {
      _ref: `productCategory-${wpDoc.parent}`,
      _type: 'reference'
    }
  }

  return doc
}
