import { Tag } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre de la etiqueta',
      description: 'El nombre de la etiqueta.'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug de la etiqueta',
      description: 'El slug de la etiqueta.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
})
