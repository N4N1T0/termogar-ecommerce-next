import { ProductTag } from '@/types/sanity'
import type { WP_REST_API_Term } from 'wp-types'
import { htmlToBlockContent } from './utils/htmlToBlockContent'
import { SanityClient } from 'sanity'

// Remove these keys because they'll be created by Content Lake
type StagedProductTag = Omit<ProductTag, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToProductTag(
  wpDoc: WP_REST_API_Term,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedProductTag> {
  const doc: StagedProductTag = {
    _id: `productTag-${wpDoc.id}`,
    _type: 'productTag'
  }

  if (wpDoc.name) {
    doc.name = wpDoc.name
  }

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (wpDoc.description) {
    doc.description = (await htmlToBlockContent(
      wpDoc.description,
      client,
      existingImages
    )) as ProductTag['description']
  }

  if (wpDoc.taxonomy) {
    doc.taxonomy = wpDoc.taxonomy
  }

  return doc
}
