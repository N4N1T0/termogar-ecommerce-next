import { ShoppingBasket } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  description:
    'Un producto es un tipo de documento que se utiliza para crear contenido en el sitio web.',
  type: 'document',
  icon: ShoppingBasket,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      description: 'El título del producto.'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'El slug es el identificador único del producto.',
      options: {
        source: 'title'
      }
    }),
    defineField({
      name: 'link',
      type: 'slug',
      title: 'Enlace Principal',
      description: 'El enlace del producto.'
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Precio',
      description: 'El precio del producto.'
    }),
    defineField({
      name: 'sale',
      type: 'object',
      title: 'Oferta',
      description: 'La oferta del producto.',
      fields: [
        defineField({
          name: 'price',
          type: 'number',
          title: 'Precio',
          description: 'El precio de la oferta.'
        }),
        defineField({
          name: 'from',
          type: 'datetime',
          title: 'Desde',
          description: 'Desde La fecha de la oferta.'
        }),
        defineField({
          name: 'to',
          type: 'datetime',
          title: 'Hasta',
          description: 'Hasta La fecha de la oferta.'
        })
      ]
    }),
    defineField({
      name: 'downloads',
      type: 'file',
      title: 'Descargas',
      description: 'Las descargas del producto.'
    }),
    defineField({
      name: 'dimensions',
      type: 'object',
      title: 'Dimensiones',
      description: 'Las dimensiones del producto.',
      fields: [
        defineField({
          name: 'length',
          type: 'number',
          title: 'Longitud'
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Anchura'
        }),
        defineField({
          name: 'height',
          type: 'number',
          title: 'Altura'
        }),
        defineField({
          name: 'weight',
          type: 'number',
          title: 'Peso'
        }),
        defineField({
          name: 'alt',
          type: 'array',
          title: 'Dimensiones Alternativas',
          of: [{ type: 'block' }, { type: 'image' }, { type: 'externalImage' }]
        })
      ]
    }),
    defineField({
      name: 'options',
      type: 'object',
      title: 'Opciones',
      description: 'Las opciones del producto.',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Nombre de la opción'
        }),
        defineField({
          name: 'values',
          type: 'array',
          title: 'Valores',
          of: [{ type: 'string' }]
        })
      ]
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Fecha',
      description: 'La fecha de creación del producto.'
    }),
    defineField({
      name: 'modified',
      type: 'datetime',
      title: 'Modificado',
      description: 'La fecha de modificación del producto.'
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Estado',
      description: 'El estado del producto.',
      options: {
        list: [
          { title: 'Publicado', value: 'publish' },
          { title: 'Borrador', value: 'draft' },
          { title: 'Pendiente', value: 'pending' },
          { title: 'Privado', value: 'private' }
        ]
      }
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenido',
      description: 'El contenido del producto.',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'externalImage' }]
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Extracto',
      description: 'El extracto del producto.',
      rows: 3
    }),
    defineField({
      name: 'featuredMedia',
      type: 'image',
      title: 'Imagen Destacada',
      description: 'La imagen destacada del producto.'
    }),
    defineField({
      name: 'relatedImages',
      type: 'array',
      title: 'Imágenes Relacionadas',
      description: 'Las imágenes relacionadas del producto.',
      of: [{ type: 'image' }]
    }),
    defineField({
      name: 'stockQuantity',
      type: 'number',
      title: 'Stock',
      description: 'Stock del Producto'
    }),
    defineField({
      name: 'commentStatus',
      type: 'string',
      title: 'Estatus Comentarios',
      description: 'El estatus de los comentarios del producto.',
      options: {
        list: [
          { title: 'Abierto', value: 'open' },
          { title: 'Cerrado', value: 'closed' }
        ]
      }
    }),
    defineField({
      name: 'productCategories',
      type: 'array',
      title: 'Categorías',
      description: 'Las categorías del producto.',
      of: [{ type: 'reference', to: [{ type: 'productCategory' }] }]
    }),
    defineField({
      name: 'productTag',
      type: 'array',
      title: 'Etiquetas',
      description: 'Las etiquetas del producto.',
      of: [{ type: 'reference', to: [{ type: 'productTag' }] }]
    }),
    defineField({
      name: 'variations',
      type: 'array',
      title: 'Variaciones',
      description: 'Las variaciones del producto.',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      title: 'Productos Relacionados',
      description: 'Los productos relacionados del Producto.',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'featuredMedia'
    }
  }
})
