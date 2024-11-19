import { Category } from '@/types/sanity'
import type { WP_REST_API_Category } from 'wp-types'

// Remove these keys because they'll be created by Content Lake
export type StagedCategory = Omit<
  Category,
  '_createdAt' | '_updatedAt' | '_rev'
>

export async function transformToCategory(
  wpDoc: WP_REST_API_Category
): Promise<StagedCategory> {
  const doc: StagedCategory = {
    _id: `tag-${wpDoc.id}`,
    _type: 'category'
  }

  if (wpDoc.name) {
    doc.name = wpDoc.name
  }

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  return doc
}
