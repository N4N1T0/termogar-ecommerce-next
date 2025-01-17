import { defineField, defineType } from 'sanity'

export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Variante de Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nombre de la Variante',
      description: 'Ejemplo: Básico, Intermedio, Avanzado'
    }),
    defineField({
      name: 'optionName',
      type: 'string',
      title: 'Nombre de la Opción',
      description: 'Ejemplo: Nivel'
    }),
    defineField({
      name: 'optionValue',
      type: 'string',
      title: 'Valor de la Opción',
      description: 'Ejemplo: Básico, Intermedio, Avanzado'
    }),
    defineField({
      name: 'sku',
      type: 'string',
      title: 'SKU',
      description: 'El SKU específico de la variante'
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Precio',
      description: 'Precio de la variante'
    }),
    defineField({
      name: 'stockQuantity',
      type: 'number',
      title: 'Stock',
      description: 'Stock de la variante'
    }),
    defineField({
      name: 'variantOptions',
      type: 'array',
      title: 'Subvariantes',
      description: 'Opciones adicionales dentro de esta variante',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Nombre de la Opción',
              description: 'Ejemplo: Accesorios'
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Valor de la Opción',
              description: 'Ejemplo: Panel Solar'
            }),
            defineField({
              name: 'variant',
              type: 'reference',
              to: [{ type: 'productVariant' }],
              title: 'Subvariantes Asociada'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'featuredMedia',
      type: 'image',
      title: 'Imagen de la Variante'
    })
  ]
})
