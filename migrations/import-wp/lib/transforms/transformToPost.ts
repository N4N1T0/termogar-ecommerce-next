import { Post } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { decode } from 'html-entities'
import type { WP_REST_API_Post } from 'wp-types'
import type { SanityClient } from 'sanity'

import {
  sanityIdToImageReference,
  sanityUploadImageFromUrl,
  wpImageFetch
} from './utils/wpImageFetch'
import { htmlToBlockContent } from './utils/htmlToBlockContent'
import { decodeAndStripHtml } from './utils/decodeHtmlToString'

// Remove these keys because they'll be created by Content Lake
type StagedPost = Omit<Post, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToPost(
  wpDoc: WP_REST_API_Post,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedPost> {
  const doc: StagedPost = {
    _id: `post-${wpDoc.id}`,
    _type: 'post'
  }

  doc.title = decode(wpDoc.title.rendered).trim()

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    doc.categories = wpDoc.categories.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `category-${catId}`
    }))
  }

  if (Array.isArray(wpDoc.tags) && wpDoc.tags.length) {
    doc.tags = wpDoc.tags.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `tag-${catId}`
    }))
  }

  if (wpDoc.author) {
    doc.author = {
      _type: 'reference',
      _ref: `author-${wpDoc.author}`
    }
  }

  if (wpDoc.date) {
    doc.date = wpDoc.date
  }

  if (wpDoc.modified) {
    doc.modified = wpDoc.modified
  }

  if (wpDoc.status) {
    doc.status = wpDoc.status as StagedPost['status']
  }

  doc.sticky = wpDoc.sticky == true

  // Document has an image
  if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
    // Image exists already in dataset
    if (existingImages[wpDoc.featured_media]) {
      doc.featuredMedia = sanityIdToImageReference(
        existingImages[wpDoc.featured_media]
      )
    } else {
      // Retrieve image details from WordPress
      const metadata = await wpImageFetch(wpDoc.featured_media)

      if (metadata?.source?.url) {
        // Upload to Sanity
        const asset = await sanityUploadImageFromUrl(
          metadata.source.url,
          client,
          metadata
        )

        if (asset) {
          doc.featuredMedia = sanityIdToImageReference(asset._id)
          existingImages[wpDoc.featured_media] = asset._id
        }
      }
    }
  }

  if (wpDoc.content) {
    doc.content = await htmlToBlockContent(
      wpDoc.content.rendered,
      client,
      existingImages
    )
  }

  if (wpDoc.excerpt) {
    doc.excerpt = decodeAndStripHtml(wpDoc.excerpt.rendered)
  }

  return doc
}
