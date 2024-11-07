import { Filter } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  icon: Filter,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      description: 'El nombre de la categoría.'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'El identificador único de la categoría.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
})
