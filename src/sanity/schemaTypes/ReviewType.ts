import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'id',
      type: 'number',
      title: 'ID',
      description: 'El ID de la reseña.'
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      description: 'El título de la reseña.'
    }),
    defineField({
      name: 'content',
      type: 'text',
      title: 'Contenido',
      description: 'El contenido de la reseña.'
    }),
    defineField({
      name: 'score',
      type: 'number',
      title: 'Puntuación',
      description: 'La puntuación de la reseña.'
    }),
    defineField({
      name: 'created_at',
      type: 'datetime',
      title: 'Fecha de creación',
      description: 'La fecha de creación de la reseña.'
    }),
    defineField({
      name: 'updated_at',
      type: 'datetime',
      title: 'Fecha de modificación',
      description: 'La fecha de modificación de la reseña.'
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      description: 'El nombre del comprador.'
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Correo electrónico',
      description: 'El correo electrónico del comprador.'
    })
    // defineField({
    //   name: 'user_reference',
    //   type: 'reference',
    //   title: 'Referencia de usuario',
    //   description: 'La referencia de usuario.',
    //   to: [{ type: 'client' }]
    // })
  ]
})
