import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'URL',
      type: 'url'
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'string'
    })
  ]
})
