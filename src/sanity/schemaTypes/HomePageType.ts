import { defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Pagina Principal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'El título de la página. para fines de SEO'
    },
    {
      name: 'mainBanner',
      title: 'Sección 1 - Banner Principal',
      type: 'array',
      description: 'Las Tres imágenes principales de la página. (Máximo 3)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'link', type: 'string' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(3)
    },
    {
      name: 'mainCategory',
      title: 'Sección 2 - Categoría Principal',
      type: 'reference',
      description: 'Categoría del Primer Carousel de Productos',
      to: [{ type: 'productCategory' }],
      options: {
        filter: 'main == true'
      }
    },
    {
      name: 'offer',
      title: 'Sección 3 - Ofertas',
      type: 'object',
      description: 'Ofertas de la página (en caso de no tener desactivar)',
      fields: [
        {
          name: 'active',
          title: 'Activa!',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'date',
          title: 'Fecha de finalización',
          type: 'date'
        },
        {
          name: 'banner',
          title: 'Banner',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'secondaryCategory',
      title: 'Sección 4 - Categoría Secundaria',
      type: 'reference',
      description: 'Categoría del Segundo Carousel de Productos',
      to: [{ type: 'productCategory' }],
      options: {
        filter: 'main == true'
      }
    },
    {
      name: 'ads',
      title: 'Sección 5 - Banners Ads',
      type: 'array',
      description: 'Banners de anuncios',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'link', type: 'string' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4)
    },
    {
      name: 'tertiaryCategory',
      title: 'Sección 6 - Categoría Terciaria',
      type: 'reference',
      description: 'Categoría del Tercer Carousel de Productos',
      to: [{ type: 'productCategory' }],
      options: {
        filter: 'main == true'
      }
    },
    {
      name: 'youtubeVideos',
      title: 'Videos de Youtube',
      type: 'array',
      description: 'Carousel de los videos de Youtube',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'videoId', type: 'string' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4)
    }
  ]
})
