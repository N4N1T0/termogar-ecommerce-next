import { wcAPI } from '@/lib/clients'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Product } from '@/types/sanity'
import { htmlToBlockContent } from '@migrations/import-wp/lib/utils/htmlToBlockContent'
import {
  sanityIdToDocumentReference,
  wpDocumentsFetch
} from '@migrations/import-wp/lib/utils/wpDocumentsFetch'
import { sanityFetchImages } from '@migrations/import-wp/lib/utils/wpImageFetch'
import {
  WP_REST_API_Product,
  WP_REST_API_Products
} from '@migrations/import-wp/types'
import { SanityAssetDocument, UploadClientConfig } from 'next-sanity'
import { NextResponse } from 'next/server'

const invalidProductsId = [21367]

export const GET = async () => {
  const totalPages = 26 // Número total de páginas

  try {
    // const existingDocuments = await sanityFetchDocuments(sanityClientWrite)
    const existingImages = await sanityFetchImages(sanityClientWrite)

    // Iterar sobre cada página
    for (let page = 1; page <= totalPages; page++) {
      console.log(`Procesando página: ${page}`)

      // Obtén los productos desde WooCommerce para la página actual
      const { data: products } = (await wcAPI.get('products', {
        per_page: 5, // Cantidad de productos por página
        page
      })) as Record<string, WP_REST_API_Products>

      // Procesa cada producto de la página actual
      for (const product of products) {
        if (invalidProductsId.includes(product.id)) {
          console.log(`Producto inválido omitido: ${product.id}`)
          continue
        }

        // Buscar el producto en Sanity
        const fetchedProduct = (await sanityClientWrite.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id: `product-${product.id}` }
        )) as Product

        if (!fetchedProduct) {
          console.error(`Producto no encontrado en Sanity: ${product.id}`)
          continue
        }

        const dimensions = product.dimensions
        const altDimensions = product.meta_data.find(
          (item) => item.key === 'yikes_woo_products_tabs'
        )

        const ProcededAltDimensions =
          altDimensions && altDimensions.value.length > 0
            ? await htmlToBlockContent(
                altDimensions.value[0].content,
                sanityClientWrite,
                existingImages
              )
            : undefined

        await sanityClientWrite
          .patch(fetchedProduct._id)
          .set({
            dimensions: {
              length: Number(dimensions.length),
              width: Number(dimensions.width),
              height: Number(dimensions.height),
              weight: Number(product.weight),
              alt: ProcededAltDimensions
            }
          })
          .commit()

        console.log(`Procesado producto: ${product.id}`)
      }
    }

    return NextResponse.json({ success: true, message: 'Done' })
  } catch (error) {
    console.error('Error en GET:', error)
    return NextResponse.json({
      success: false,
      message: 'An error occurred',
      error
    })
  }
}

// Función para procesar documentos asociados a un producto
export const processProductDocuments = async (
  product: WP_REST_API_Product,
  fetchedProduct: Product,
  existingDocuments: Record<string, string>
) => {
  const download = product.meta_data.find((data) => data.key === 'documents')

  if (download?.value?.length > 0) {
    const documentId = download?.id

    if (!documentId) {
      return
    }

    if (existingDocuments[documentId]) {
      return sanityIdToDocumentReference(existingDocuments[documentId])
    } else {
      try {
        // Obtener detalles del documento desde WordPress
        const metadata = await wpDocumentsFetch(
          download.value[0].url,
          documentId
        )

        if (metadata?.source?.url) {
          // Subir a Sanity
          const asset = await sanityUploadDocumentsFromUrl(
            metadata.source.url,
            metadata
          )

          console.log('🚀 ~ new', asset?._id)

          if (asset) {
            return sanityIdToDocumentReference(asset._id)
          }
        }
      } catch (err) {
        console.error(
          `Error procesando documento del producto ${product.id}:`,
          err
        )
      }
    }
  }
}

export async function sanityUploadDocumentsFromUrl(
  url: string,
  metadata: UploadClientConfig
): Promise<SanityAssetDocument | null> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer() // Convertimos a ArrayBuffer
  const buffer = Buffer.from(arrayBuffer) // Convertimos a Buffer para Node.js

  let data: SanityAssetDocument | null = null
  try {
    data = await sanityClientWrite.assets.upload('file', buffer, metadata) // Subimos el archivo como Buffer
  } catch (error) {
    console.error(`Failed to upload file from ${url}`)
    console.error(error)

    return null
  }

  return data
}
