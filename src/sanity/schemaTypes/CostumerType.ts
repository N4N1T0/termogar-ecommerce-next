import { defineType } from 'sanity'

export const costumerType = defineType({
  name: 'costumer',
  title: 'Cliente',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    },
    {
      name: 'firstName',
      title: 'Nombre',
      type: 'string'
    },
    {
      name: 'lastName',
      title: 'Apellido',
      type: 'string'
    },
    {
      name: 'password',
      title: 'Contraseña',
      type: 'string',
      options: {
        type: 'password'
      }
    },
    {
      name: 'userName',
      title: 'Nombre de Usuario',
      type: 'string'
    },
    {
      name: 'billingAddress',
      title: 'Dirección de Facturación',
      type: 'array',
      of: [{ type: 'address' }],
      validation: (Rule) => Rule.max(1)
    },
    {
      name: 'shippingAddresses',
      title: 'Direcciones de Envío',
      type: 'array',
      of: [{ type: 'address' }]
    },
    {
      name: 'isPayingCustomer',
      title: '¿Cliente a Comprado antes?',
      type: 'boolean'
    },
    {
      name: 'avatarUrl',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
      media: 'avatarUrl'
    }
  }
})
