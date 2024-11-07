import { decode } from 'html-entities'
import type { SanityClient } from 'sanity'
import { Readable } from 'node:stream'

import type {
  SanityAssetDocument,
  SanityImageAssetDocument,
  UploadClientConfig
} from '@sanity/client'

import { BASE_URL } from '../../constants'
import { Post } from '@/types/sanity'

// Get WordPress' asset metadata about an image by its ID
export async function wpImageFetch(
  id: number
): Promise<UploadClientConfig | null> {
  const wpApiUrl = new URL(`${BASE_URL}/media/${id}`).toString()
  const imageData = await fetch(wpApiUrl).then((res) => res.json())

  if (!imageData || !imageData.source_url) {
    return null
  }

  let metadata: UploadClientConfig = {
    filename: imageData.source_url.split('/').pop(),
    source: {
      id: imageData.id,
      name: 'WordPress',
      url: imageData.source_url
    },
    // Not technically part of the Sanity imageAsset schema, but used by the popular Media Plugin
    // @ts-expect-error
    altText: imageData.alt_text
  }

  if (imageData?.title?.rendered) {
    metadata.title = decode(imageData.title.rendered)
  }

  if (imageData?.image_meta?.caption) {
    metadata.description = imageData.image_meta.caption
  }

  if (imageData?.image_meta?.credit) {
    metadata.creditLine = imageData.image_meta.credit
  }

  return metadata
}

export function sanityIdToImageReference(id: string): Post['featuredMedia'] {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: id }
  }
}

export async function sanityFetchImages(client: SanityClient) {
  const query = `*[
      _type == "sanity.imageAsset" 
      && defined(source.id)
      && source.name == "WordPress"
  ]{
      _id,
      "sourceId": source.id
  }`

  const initialImages =
    await client.fetch<{ _id: string; sourceId: number }[]>(query)
  const existingImages: Record<number, string> = {}

  for (let index = 0; index < initialImages.length; index++) {
    existingImages[initialImages[index].sourceId] = initialImages[index]._id
  }

  return existingImages
}

export async function sanityUploadImageFromUrl(
  url: string,
  client: SanityClient,
  metadata: UploadClientConfig
): Promise<SanityImageAssetDocument | SanityAssetDocument | null> {
  const { body } = await fetch(url)
  if (!body) {
    throw new Error(`No body found for ${url}`)
  }
  let data: SanityImageAssetDocument | null = null
  try {
    // @ts-expect-error
    data = await client.assets.upload('image', Readable.fromWeb(body), metadata)
  } catch (error) {
    console.error(`Failed to upload image from ${url}`)
    console.error(error)

    return null
  }

  return data
}
