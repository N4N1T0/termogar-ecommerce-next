import { Tags } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const couponsType = defineType({
  name: 'coupon',
  title: 'Cupones',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'code',
      title: 'Código',
      type: 'string'
    }),
    defineField({
      name: 'amount',
      title: 'Monto',
      type: 'string'
    }),
    defineField({
      name: 'date_created',
      title: 'Fecha de creación',
      type: 'datetime'
    }),
    defineField({
      name: 'date_modified',
      title: 'Fecha de modificación',
      type: 'datetime'
    }),
    defineField({
      name: 'discount_type',
      title: 'Tipo de descuento',
      type: 'string',
      options: {
        list: [
          { value: 'percent', title: 'Porcentaje' },
          { value: 'fixed_cart', title: 'Fijo en carrito' },
          { value: 'fixed_product', title: 'Fijo en producto' },
          { value: 'sign_up_fee', title: 'Cuota de inscripción' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'date_expires',
      title: 'Fecha de expiración',
      type: 'datetime'
    }),
    defineField({
      name: 'usage_count',
      title: 'Veces usadas',
      type: 'number'
    }),
    defineField({
      name: 'product_ids',
      title: 'IDs de productos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    }),
    defineField({
      name: 'usage_limit',
      title: 'Límite de uso',
      type: 'number'
    }),
    defineField({
      name: 'usage_limit_per_user',
      title: 'Límite de uso por usuario',
      type: 'number'
    }),
    defineField({
      name: 'limit_usage_to_x_items',
      title: 'Límite de uso por usuarios',
      type: 'number'
    }),
    defineField({
      name: 'product_categories',
      title: 'Categorías de productos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'productCategory' }]
        }
      ]
    }),
    defineField({
      name: 'minimum_amount',
      title: 'Monto mínimo',
      type: 'string'
    }),
    defineField({
      name: 'maximum_amount',
      title: 'Monto máximo',
      type: 'string'
    })
    // defineField({
    //   name: 'used_by',
    //   title: 'Usados por',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{ type: 'client' }]
    //     }
    //   ]
    // })
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'amount'
    }
  }
})
