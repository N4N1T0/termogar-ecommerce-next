// * ASSETS IMPORTS
import React from 'react'
import { toast } from 'sonner'
import { CircleFadingArrowUp, Replace, CopyPlus, Tag, Plus } from 'lucide-react'
import { Button, Heading, Label, Stack, TextArea, TextInput } from '@sanity/ui'

// * UTILS IMPORTS
import {
  AsyncChangeToVariantProps,
  AsyncMakeCurrierTagProps,
  AsyncPublishProps,
  ParentProduct
} from '@/types'
import {
  DocumentActionComponent,
  DocumentActionsContext,
  SanityClient
} from 'sanity'
import { Product, ProductVariant } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { base64ToBlob } from '@/lib/utils'
import { construirEtiqueta8 } from '@/actions/tipsa-logic'

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

  const AsyncChangeToVariant: DocumentActionComponent = (
    props: AsyncChangeToVariantProps
  ) => {
    const product = props.published
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [newVariantInfo, setNewVariantInfo] = React.useState({
      title: product?.title,
      price: product?.price,
      referenceCode: product?.referenceCode,
      ean: product?.ean,
      excerpt: product?.excerpt,
      sku: product?.sku,
      value: ''
    })

    const handleClose = async () => {
      await handleChangeToVariant(client, newVariantInfo, product)
      props.onComplete()
    }

    return {
      label: 'Crear Variante',
      icon: <Replace size={17} strokeWidth={1.2} />,
      onHandle: () => {
        setDialogOpen(true)
      },
      dialog: dialogOpen && {
        type: 'dialog',
        onClose: props.onComplete,
        content: NewVariantDialog(
          newVariantInfo,
          setNewVariantInfo,
          handleClose
        )
      }
    }
  }

  return AsyncChangeToVariant
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
            const { response } = await construirEtiqueta8(order.currierCode)
            console.log('🚀 ~ onHandle: ~ response:', response)

            if (!response) {
              toast.error('Error: No se pudo construir la etiqueta')
              return
            }

            const pdfBlob = base64ToBlob(response as unknown as string)

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

// * HELPERS FUNCTIONS
const NewVariantDialog = (
  newVariantInfo: NewVariantInfoProps,
  setNewVariantInfo: React.Dispatch<React.SetStateAction<NewVariantInfoProps>>,
  handleClose: () => Promise<void>
) => {
  return (
    <Stack space={4}>
      <Heading as='h4' size={2}>
        Nueva Variante
      </Heading>
      <hr />

      <Label htmlFor='variantName'>Valor de la Variante</Label>
      <Label size={0}>
        Nombre que aparece como valor al referirse a la variante (Ej: Gas
        Natural)
      </Label>
      <TextInput
        id='variantName'
        value={newVariantInfo.value || ''}
        onChange={(e) =>
          setNewVariantInfo({ ...newVariantInfo, value: e.currentTarget.value })
        }
      />

      <Label htmlFor='variantName'>Nombre de la Variante</Label>
      <TextInput
        id='variantName'
        value={newVariantInfo.title || ''}
        onChange={(e) =>
          setNewVariantInfo({ ...newVariantInfo, title: e.currentTarget.value })
        }
      />

      <Label htmlFor='referenceCode'>Código de Referencia</Label>
      <TextInput
        id='referenceCode'
        value={newVariantInfo.referenceCode || ''}
        onChange={(e) =>
          setNewVariantInfo({
            ...newVariantInfo,
            referenceCode: e.currentTarget.value
          })
        }
      />

      <Label htmlFor='price'>Precio</Label>
      <TextInput
        id='price'
        type='number'
        value={newVariantInfo.price || ''}
        onChange={(e) =>
          setNewVariantInfo({
            ...newVariantInfo,
            price: parseFloat(e.currentTarget.value) || 0
          })
        }
      />

      <Label htmlFor='excerpt'>Descripción</Label>
      <TextArea
        id='excerpt'
        value={newVariantInfo.excerpt || ''}
        onChange={(e) =>
          setNewVariantInfo({
            ...newVariantInfo,
            excerpt: e.currentTarget.value
          })
        }
      />

      <Label htmlFor='ean'>EAN</Label>
      <TextInput
        id='ean'
        value={newVariantInfo.ean || ''}
        onChange={(e) =>
          setNewVariantInfo({
            ...newVariantInfo,
            ean: e.currentTarget.value
          })
        }
      />

      <Label htmlFor='sku'>SKU</Label>
      <TextInput
        id='sku'
        value={newVariantInfo.sku || ''}
        onChange={(e) =>
          setNewVariantInfo({
            ...newVariantInfo,
            sku: e.currentTarget.value
          })
        }
      />

      <Button
        fontSize={[2, 2, 3]}
        icon={Plus}
        mode='ghost'
        padding={[3, 3, 4]}
        text='Crear Variante'
        onClick={handleClose}
      />
    </Stack>
  )
}

const handleChangeToVariant = async (
  client: SanityClient,
  newVariantInfo: NewVariantInfoProps,
  product:
    | (Omit<Product, '_type'> & {
        _type: string
      })
    | null
) => {
  try {
    if (!product) {
      toast.error('Error: Ningún producto encontrado, trate de actualizar')
      return
    } else {
      const newVariant: ProductVariant = await client.createIfNotExists({
        _id: uuid(),
        _type: 'productVariant',
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: uuid(),
        parent: {
          _ref: product._id,
          _type: 'reference'
        },
        featuredMedia: product.featuredMedia,
        price: newVariantInfo.price,
        slug: product.slug,
        title: newVariantInfo.title,
        dimensions: product.dimensions,
        ean: newVariantInfo.ean,
        productTag: product.productTag,
        referenceCode: newVariantInfo.referenceCode,
        relatedImages: product.relatedImages,
        sale: product.sale,
        stockQuantity: product.stockQuantity,
        downloads: product.downloads,
        content: product.content,
        excerpt: newVariantInfo.excerpt,
        productCategories: product.productCategories,
        sku: newVariantInfo.sku,
        youtube: product.youtube
      })

      await client
        .patch(product._id)
        .setIfMissing({ options: { values: [] } })
        .insert('after', 'options.values[-1]', [
          {
            _type: 'values',
            value: newVariantInfo.value,
            reference: {
              _ref: newVariant._id,
              _type: 'reference',
              _weak: true
            }
          }
        ])
        .commit({ autoGenerateArrayKeys: true })

      toast.success('Producto Exitosamente cambiado a Variante')
    }
  } catch (error) {
    console.log('🚀 ~ onHandle: ~ error:', error)
    toast.error('Error al cambiar a Variante, trate de actualizar')
  }
}

// * TYPES
interface NewVariantInfoProps {
  title: string | undefined
  price: number | undefined
  referenceCode: string | undefined
  value: string
  ean: string | undefined
  excerpt: string | undefined
  sku: string | undefined
}
