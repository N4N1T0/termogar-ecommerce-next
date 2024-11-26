import { defineType } from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Orden de Compra',
  type: 'document',
  fields: [
    {
      name: 'userEmail',
      title: 'Correo Electrónico del Usuario',
      type: 'reference',
      to: [{ type: 'costumer' }],
      description:
        'Referencia al correo electrónico del usuario asociado a esta compra.'
    },
    {
      name: 'products',
      title: 'Productos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Producto',
              type: 'reference',
              to: [{ type: 'product' }],
              description: 'El producto comprado.'
            },
            {
              name: 'quantity',
              title: 'Cantidad',
              type: 'number',
              description: 'Cantidad del producto comprado.'
            }
          ],
          preview: {
            select: {
              title: 'product.title',
              subtitle: 'quantity',
              media: 'product.featuredMedia'
            },
            prepare(value) {
              const { title, subtitle, media } = value
              return {
                title: title,
                subtitle: `Cantidad: ${subtitle}`,
                media: media
              }
            }
          }
        }
      ],
      description:
        'Lista de productos comprados y sus cantidades en esta transacción.'
    },
    {
      name: 'totalAmount',
      title: 'Monto Total',
      type: 'number',
      description: 'El monto total de la compra.'
    },
    {
      name: 'purchaseDate',
      title: 'Fecha de Compra',
      type: 'datetime',
      description: 'Fecha y hora en que se realizó la compra.',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Hoy',
        readonly: true
      }
    },
    {
      name: 'paymentMethod',
      title: 'Método de Pago',
      type: 'string',
      description: 'El método de pago utilizado para la compra.'
    },
    {
      name: 'status',
      title: 'Estado de la Compra',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pendiente' },
          { title: 'Completado', value: 'completado' },
          { title: 'Cancelado', value: 'cancelado' },
          { title: 'Procesando', value: 'procesando' },
          { title: 'Enviado', value: 'enviado' },
          { title: 'Entregado', value: 'entregado' }
        ]
      },
      description: 'El estado actual de la compra.'
    },
    {
      name: 'shippingAddress',
      title: 'Dirección de Envío',
      type: 'array',
      of: [{ type: 'address' }],
      validation: (Rule) => Rule.max(1),
      description: 'La dirección de envío de la compra'
    },
    {
      name: 'currierCode',
      title: 'Código de Transporte',
      type: 'string',
      description: 'El código de transporte utilizado para la compra.'
    },
    {
      name: 'expectedDeliveryDate',
      title: 'Fecha de Entrega Estimada',
      type: 'datetime',
      description: 'Fecha estimada de entrega de la compra.'
    }
  ],
  preview: {
    select: {
      title: 'userEmail.email',
      subtitle: 'purchaseDate',
      media: 'userEmail.image'
    },
    prepare(selection: { title: string; subtitle: string; media: string }) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: new Date(subtitle).toLocaleString('es-ES'),
        media: media
      }
    }
  }
})
