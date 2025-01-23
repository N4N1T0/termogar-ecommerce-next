import { htmlToBlocks } from '@portabletext/block-tools'
import { Schema } from '@sanity/schema'
import { uuid } from '@sanity/uuid'
import { JSDOM } from 'jsdom'
import pLimit from 'p-limit'
import type { FieldDefinition, SanityClient } from 'sanity'

import { schema } from '@/sanity/schemaTypes'
import { BASE_URL } from '../../constants'
import {
  sanityIdToImageReference,
  sanityUploadImageFromUrl,
  wpImageFetch
} from './wpImageFetch'

// * TYPES IMPORTS
import { Post, ProductCategory, ProductTag } from '@/types/sanity'

const defaultSchema = Schema.compile(schema)
const blockContentSchema = defaultSchema
  .get('post')
  .fields.find((field: FieldDefinition) => field.name === 'content').type

// https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/block-tools/README.md
export async function htmlToBlockContent(
  html: string,
  client: SanityClient,
  imageCache: Record<number, string>
): Promise<
  Post['content'] | ProductCategory['description'] | ProductTag['description']
> {
  // Convert HTML to Sanity's Portable Text
  let blocks = htmlToBlocks(html, blockContentSchema, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(node, next, block) {
          const el = node as HTMLElement

          if (node.nodeName.toLowerCase() === 'figure') {
            const url = el.querySelector('img')?.getAttribute('src')

            if (!url) {
              return undefined
            }

            return block({
              // these attributes may be overwritten by the image upload below
              _type: 'externalImage',
              url
            })
          }

          return undefined
        }
      }
    ]
  })

  // Note: Multiple documents may be running this same function concurrently
  const limit = pLimit(5)

  const blocksWithUploads = blocks.map((block) =>
    limit(async () => {
      if (block._type !== 'externalImage' || !('url' in block)) {
        return block
      }

      // The filename is usually stored as the "slug" in WordPress media documents
      // Filename may be appended with dimensions like "-1024x683", remove with regex
      const dimensions = /-\d+x\d+$/
      const slug = (block.url as string)
        .split('/uploads')
        .pop()
        ?.split('.')
        ?.shift()
        ?.replace(dimensions, '')
        .toLocaleLowerCase()

      console.log(slug)

      const imageId = await fetch(`${BASE_URL}/media?search=${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) =>
          Array.isArray(data) && data.length ? data[0].id : null
        )

      if (typeof imageId !== 'number' || !imageId) {
        return block
      }

      if (imageCache[imageId]) {
        return {
          _key: block._key,
          ...sanityIdToImageReference(imageCache[imageId])
        } as Extract<Post['content'], { _type: 'image' }>
      }

      const imageMetadata = await wpImageFetch(imageId)
      if (imageMetadata?.source?.url) {
        const imageDocument = await sanityUploadImageFromUrl(
          block.url as string,
          client,
          imageMetadata
        )
        if (imageDocument) {
          // Add to in-memory cache if re-used in other documents
          imageCache[imageId] = imageDocument._id

          return {
            _key: block._key,
            ...sanityIdToImageReference(imageCache[imageId])
          } as Extract<Post['content'], { _type: 'image' }>
        } else {
          return block
        }
      }

      return block
    })
  )

  blocks = await Promise.all(blocksWithUploads)

  // Eliminate empty blocks
  blocks = blocks.filter((block) => {
    if (!block) {
      return false
    } else if (!('children' in block)) {
      return true
    }

    return (
      block.children.map((c) => (c.text as string).trim()).join('').length > 0
    )
  })

  blocks = blocks.map((block) =>
    block._key ? block : { ...block, _key: uuid() }
  )

  // TS complains there's no _key in these blocks, but this is corrected in the map above
  // @ts-expect-error ignore
  return blocks
}
