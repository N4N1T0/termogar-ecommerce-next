import { Product } from '@/types/sanity'
import type {
  SanityAssetDocument,
  SanityClient,
  UploadClientConfig
} from '@sanity/client'
import { Readable } from 'stream'

// Get WordPress' asset metadata about an image by its ID
export async function wpDocumentsFetch(
  url: string,
  id: number
): Promise<UploadClientConfig | null> {
  if (!url.startsWith('http')) {
    return null
  }

  const metadata: UploadClientConfig = {
    filename: url.split('/').pop(),
    source: {
      id: String(id),
      name: 'WordPress',
      url: url
    },
    // @ts-expect-error ignore
    altText: url.split('/').pop()?.split('.').shift(),
    title: url.split('/').pop()?.split('.').shift()
  }

  return metadata
}

export async function sanityFetchDocuments(client: SanityClient) {
  const query = `*[
      _type == "sanity.fileAsset" 
      && defined(source.id)
      && source.name == "WordPress"
  ]{
      _id,
      "sourceId": source.id
  }`

  const initialDocuments =
    await client.fetch<{ _id: string; sourceId: number }[]>(query)
  const existingDocuments: Record<number, string> = {}

  for (let index = 0; index < initialDocuments.length; index++) {
    existingDocuments[initialDocuments[index].sourceId] =
      initialDocuments[index]._id
  }

  return existingDocuments
}

export function sanityIdToDocumentReference(id: string): Product['downloads'] {
  return {
    _type: 'file',
    asset: { _type: 'reference', _ref: id }
  }
}

export async function sanityUploadDocumentsFromUrl(
  url: string,
  client: SanityClient,
  metadata: UploadClientConfig
): Promise<SanityAssetDocument | null> {
  const { body } = await fetch(url)
  if (!body) {
    throw new Error(`No body found for ${url}`)
  }
  let data: SanityAssetDocument | null = null
  try {
    // @ts-expect-error ignore
    data = await client.assets.upload('file', Readable.fromWeb(body), metadata)
  } catch (error) {
    console.error(`Failed to upload file from ${url}`)
    console.error(error)

    return null
  }

  return data
}
