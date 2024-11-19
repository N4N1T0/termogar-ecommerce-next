import { Tag } from '@/types/sanity'
import type { WP_REST_API_Tag } from 'wp-types'

// Remove these keys because they'll be created by Content Lake
export type StagedTag = Omit<Tag, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToTag(
  wpDoc: WP_REST_API_Tag
): Promise<StagedTag> {
  const doc: StagedTag = {
    _id: `tag-${wpDoc.id}`,
    _type: 'tag'
  }

  if (wpDoc.name) {
    doc.name = wpDoc.name
  }

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  return doc
}
