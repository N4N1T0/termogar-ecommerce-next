import { UserRoundPen } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  icon: UserRoundPen,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      description: 'El nombre del autor.'
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción',
      description: 'Una breve descripción del autor.'
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      description: 'La imagen del autor.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar'
    }
  }
})
