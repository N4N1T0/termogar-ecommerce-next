import { Page } from '@/types/sanity'
import { decode } from 'html-entities'
import type { WP_REST_API_Page } from 'wp-types'
import type { SanityClient } from 'sanity'

import {
  sanityIdToImageReference,
  sanityUploadImageFromUrl,
  wpImageFetch
} from '../utils/wpImageFetch'
import { htmlToBlockContent } from '../utils/htmlToBlockContent'
import { decodeAndStripHtml } from '../utils/decodeHtmlToString'
import { pageSlugArray } from '../../constants'

// Remove these keys because they'll be created by Content Lake
export type StagedPage = Omit<Page, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToPage(
  wpDoc: WP_REST_API_Page,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedPage | null> {
  const doc: StagedPage = {
    _id: `page-${wpDoc.id}`,
    _type: 'page'
  }

  console.log(wpDoc.id)

  if (pageSlugArray.includes(wpDoc.link) && wpDoc.status === 'publish') {
    doc.title = decode(wpDoc.title.rendered).trim()

    if (wpDoc.slug) {
      doc.slug = { _type: 'slug', current: wpDoc.slug }
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
      doc.status = wpDoc.status as StagedPage['status']
    }

    if (wpDoc.link) {
      doc.link = { _type: 'slug', current: wpDoc.link }
    }

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
  } else {
    return null
  }

  return doc
}
