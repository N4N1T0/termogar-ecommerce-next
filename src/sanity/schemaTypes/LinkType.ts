import { defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'link',
      title: 'URL',
      type: 'url'
    },
    {
      name: 'text',
      title: 'Texto',
      type: 'string'
    }
  ]
})
