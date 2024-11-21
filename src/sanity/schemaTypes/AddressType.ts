import { defineType } from 'sanity'

export const addressType = defineType({
  name: 'address',
  title: 'Dirección',
  type: 'object',
  fields: [
    {
      name: 'firstName',
      title: 'Nombre completo',
      type: 'string'
    },
    {
      name: 'address1',
      title: 'Dirección 1',
      type: 'string'
    },
    {
      name: 'address2',
      title: 'Dirección 2',
      type: 'string'
    },
    {
      name: 'city',
      title: 'Ciudad',
      type: 'string'
    },
    {
      name: 'postcode',
      title: 'Código Postal',
      type: 'string'
    },
    {
      name: 'state',
      title: 'Estado/Provincia',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string'
    }
  ]
})
