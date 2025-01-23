// * ASSETS IMPORTS
import { toast } from 'sonner'
import { CircleFadingArrowUp, Replace, CopyPlus, Tag } from 'lucide-react'

// * UTILS IMPORTS
import {
  AsyncChangeToVariantProps,
  AsyncMakeCurrierTagProps,
  AsyncPublishProps,
  ParentProduct
} from '@/types'
import { DocumentActionComponent, DocumentActionsContext } from 'sanity'
import { Product, ProductVariant } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { base64ToBlob } from '@/lib/utils'

export function setParent(
  context: DocumentActionsContext
): DocumentActionComponent {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncSetParent: DocumentActionComponent = (
    props: AsyncPublishProps
  ) => {
    return {
      label: 'Encontrar Padre',
      icon: <CircleFadingArrowUp className='h-4 w-4' />,
      onHandle: async () => {
        try {
          // Fetch the parent product
          const parent: ParentProduct | null = await client.fetch(
            `*[_type == "product" && references($id)][0]{
                "id":_id,
              }`,
            { id: props.id }
          )

          if (!parent) {
            toast.error('Padre no encontrado')
            return
          } else {
            // Update the `parent` field in the productVariant document
            await client
              .patch(props.id)
              .set({ parent: { _type: 'reference', _ref: parent.id } })
              .commit()
          }

          toast.success('Padre encontrado y actualizado, Puede Publicar')
        } catch (error) {
          console.log('Error updating parent field before publishing:', error)
          toast.error('Error actualizando el campo padre antes de publicar')
        }
      }
    }
  }

  return asyncSetParent
}

export function changeToVariant(
  context: DocumentActionsContext
): DocumentActionComponent {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncChangeToVariant: DocumentActionComponent = (
    props: AsyncChangeToVariantProps
  ) => {
    const product = props.published

    return {
      label: 'Cambiar a Variante',
      icon: <Replace className='h-4 w-4' />,
      onHandle: async () => {
        try {
          if (!product) {
            toast.error(
              'Error: Ningún producto encontrado, trate de actualizar'
            )
            return
          } else {
            await client.createIfNotExists<ProductVariant>({
              _id: uuid(),
              _type: 'productVariant',
              _createdAt: new Date().toISOString(),
              _updatedAt: new Date().toISOString(),
              _rev: uuid(),
              content: product.content,
              excerpt: product.excerpt,
              featuredMedia: product.featuredMedia,
              price: product.price,
              slug: product.slug,
              title: product.title,
              dimensions: product.dimensions,
              downloads: product.downloads,
              ean: product.ean,
              productCategories: product.productCategories,
              productTag: product.productTag,
              referenceCode: product.referenceCode,
              relatedImages: product.relatedImages,
              sale: product.sale,
              sku: product.sku,
              stockQuantity: product.stockQuantity,
              youtube: product.youtube
            })

            toast.success('Producto Exitosamente cambiado a Variante')
          }
        } catch (error) {
          console.log('🚀 ~ onHandle: ~ error:', error)
          toast.error('Error al cambiar a Variante, trate de actualizar')
        }
      }
    }
  }

  return asyncChangeToVariant
}

export function duplicateProduct(
  context: DocumentActionsContext
): DocumentActionComponent {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncDuplicateProduct: DocumentActionComponent = (
    props: AsyncChangeToVariantProps
  ) => {
    const product = props.published

    return {
      label: 'Duplicar Producto',
      icon: <CopyPlus className='h-4 w-4' />,
      onHandle: async () => {
        try {
          if (!product) {
            toast.error(
              'Error: Ningún producto encontrado, trate de actualizar'
            )
            return
          } else {
            await client.createIfNotExists<Product>({
              _id: uuid(),
              _type: 'product',
              _createdAt: new Date().toISOString(),
              _updatedAt: new Date().toISOString(),
              _rev: uuid(),
              content: product.content,
              excerpt: product.excerpt,
              featuredMedia: product.featuredMedia,
              price: product.price,
              title: product.title,
              dimensions: product.dimensions,
              downloads: product.downloads,
              ean: product.ean,
              productCategories: product.productCategories,
              productTag: product.productTag,
              referenceCode: product.referenceCode,
              relatedImages: product.relatedImages,
              sale: product.sale,
              sku: product.sku,
              stockQuantity: product.stockQuantity,
              youtube: product.youtube,
              brand: product.brand,
              commentStatus: product.commentStatus,
              date: product.date,
              lastMinute: product.lastMinute,
              link: product.link,
              modified: product.modified,
              options: product.options,
              relatedProducts: product.relatedProducts,
              status: product.status
            })

            toast.success('Producto Exitosamente Duplicado')
          }
        } catch (error) {
          console.log('🚀 ~ onHandle: ~ error:', error)
          toast.error('Error al Duplicar Producto, trate de actualizar')
        }
      }
    }
  }

  return asyncDuplicateProduct
}

export function makeCurrierTag(
  context: DocumentActionsContext
): DocumentActionComponent {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncMakeCurrierTag: DocumentActionComponent = (
    props: AsyncMakeCurrierTagProps
  ) => {
    const order = props.published

    return {
      label: 'Crear Etiqueta',
      icon: <Tag className='h-4 w-4' />,
      onHandle: async () => {
        try {
          if (!order || !order.currierCode) {
            toast.error('Error: No se encontró el Albaran')
            return
          } else {
            const response = await fetch('http://localhost:3000/api/tipsa', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ strAlbaran: order.currierCode })
            })

            const { response: etiqueta } = await response.json()

            if (!etiqueta) {
              toast.error('Error: No se pudo construir la etiqueta')
              return
            }

            const pdfBlob = base64ToBlob(etiqueta)

            const file = await client.assets.upload('file', pdfBlob, {
              filename: order.currierCode + '.pdf',
              title: order.currierCode + '.pdf',
              label: 'Etiqueta ' + order.currierCode + '.pdf'
            })

            await client
              .patch(order._id)
              .set({
                currierTag: {
                  _type: 'file',
                  asset: { _type: 'reference', _ref: file._id, _weak: true }
                }
              })
              .commit({ autoGenerateArrayKeys: true })

            toast.success('Etiqueta Exitosamente Creada')
          }
        } catch (error) {
          console.log('🚀 ~ onHandle: ~ error:', error)
          toast.error('Error al Crear Etiqueta, inténtelo mas tarde')
        }
      }
    }
  }

  return asyncMakeCurrierTag
}
