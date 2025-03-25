/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { smallLogo } from '@/assets'
import {
  GET_BLOG_ARTICLE_BY_SLUGResult,
  GET_COSTUMER_SERVICES_PAGEResult,
  GET_WHOLE_PRODUCT_BY_SLUGResult
} from '@/types/sanity'

const BASE_URL = 'https://www.termogar.es'

export const seoMetatags = (): Metadata => {
  return {
    title: {
      template: '%s  |  Termogar',
      default: 'Termogar | Productos de Climatización'
    },
    description:
      'Venta de equipos de Climatización En España. Venta online de calentadores a gas, aire acondicionado, calderas, yunkers, estufas, termos.',
    authors: [
      { name: 'Adrian Alvarez', url: 'https://www.adrian-alvarez.dev/es/' }
    ],
    generator: 'Next.js',
    applicationName: 'Termogar',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'calefacción',
      'aire acondicionado',
      'calentadores',
      'estufas',
      'termos',
      'yunkers',
      'radiadores',
      'calefactores',
      'sistemas de climatización',
      'climatizados'
    ],
    creator: 'Adrian Alvarez',
    publisher: 'Termogar',
    category: 'E-commerce, Climatización, España',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
      date: true,
      url: true
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: 'Termogar | Productos de Lavanda',
      description:
        'Venta de equipos de Climatización En España. Venta online de calentadores a gas, aire acondicionado, calderas, yunkers, estufas, termos.',
      url: 'https://termogar.es/',
      siteName: 'Termogar',
      images: [
        {
          url: 'https://termogar.es/android-chrome-512x512.png',
          width: 1200,
          height: 630,
          alt: 'Lavanda del Lago'
        }
      ],
      locale: 'es_ES',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@lavandadellago',
      creator: '@adrian_alvarez',
      title: 'Lavanda del Lago | Productos de Lavanda',
      description: 'Descubre productos de lavanda premium en Lavanda del Lago.',
      images: ['https://termogar.es/android-chrome-512x512.png']
    }
  }
}

export const jldProduct = (product: GET_WHOLE_PRODUCT_BY_SLUGResult) => {
  const url = `${process.env.NEXT_PUBLIC_URL}/producto/${product?.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        'url': url,
        'name': `${product?.title} | Termogar`,
        'isPartOf': {
          '@id': `${process.env.NEXT_PUBLIC_URL}`
        },
        'primaryImageOfPage': {
          '@id': `${url}#primaryimage`
        },
        'image': {
          '@id': `${url}#primaryimage`
        },
        'thumbnailUrl': product?.featuredMedia.url,
        'description': product?.excerpt,
        'breadcrumb': {
          '@id': `${url}#brea`
        },
        'inLanguage': 'es',
        'potentialAction': [
          {
            '@type': 'ReadAction',
            'target': [url]
          }
        ]
      },
      {
        '@type': 'ImageObject',
        'inLanguage': 'es',
        '@id': `${url}#primaryimage`,
        'url': product?.featuredMedia.url,
        'contentUrl': product?.featuredMedia.url,
        'width': 1024,
        'height': 1024
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Portada',
            'item': process.env.NEXT_PUBLIC_URL
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': `${product?.categories && product?.categories[0].name}`,
            'item': `${process.env.NEXT_PUBLIC_URL}/${product?.categories && product?.categories[0].slug}`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${product?.title}`,
            'item': `${process.env.NEXT_PUBLIC_URL}/${product?.slug}`
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': process.env.NEXT_PUBLIC_URL,
        'url': process.env.NEXT_PUBLIC_URL,
        'name': 'Termogar',
        'description':
          'Venta de equipos de Climatización En España. Venta online de calentadores a gas, aire acondicionado, calderas, yunkers, estufas, termos.',
        'publisher': {
          '@id': 'https://www.adrian-alvarez.dev/es/'
        },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${process.env.NEXT_PUBLIC_URL}/busqueda?search={search_term_string}&category=`
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              'valueRequired': true,
              'valueName': 'search_term_string'
            }
          }
        ],
        'inLanguage': 'es'
      },
      {
        '@type': 'Organization',
        '@id': process.env.NEXT_PUBLIC_URL,
        'name': 'Termogar',
        'url': process.env.NEXT_PUBLIC_URL,
        'logo': {
          '@type': 'ImageObject',
          'inLanguage': 'es',
          '@id': `${process.env.NEXT_PUBLIC_URL}/android-chrome-192x192.png`,
          'url': `${process.env.NEXT_PUBLIC_URL}/android-chrome-192x192.png`,
          'contentUrl': `${process.env.NEXT_PUBLIC_URL}/android-chrome-192x192.png`,
          'width': 644,
          'height': 302,
          'caption': 'Termogar'
        },
        'image': {
          '@id': `${process.env.NEXT_PUBLIC_URL}/android-chrome-192x192.png`
        },
        'sameAs': [
          'https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg',
          'https://www.instagram.com/termogar.es/',
          'https://es-es.facebook.com/termogar'
        ]
      }
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldProductList = (
  products: any[],
  params: string | string[] | undefined
) => {
  const productListUrl = `${BASE_URL}/${params}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${productListUrl}`,
        'url': `${productListUrl}`,
        'name': `Productos de la Categoria ${params} | Termogar.es | Expertos en Climatización`,
        'isPartOf': { '@id': 'https://termogar.es' },
        'primaryImageOfPage': {
          '@id': products[0].featuredMedia.url
        },
        'image': {
          '@id': products[0].featuredMedia.url
        },
        'thumbnailUrl': products[0].featuredMedia.url,
        'breadcrumb': {
          '@id': `${productListUrl}#breadcrumbs`
        },
        'inLanguage': 'es'
      },
      {
        '@type': 'ImageObject',
        'inLanguage': 'es',
        '@id': products[0].featuredMedia.url,
        'url': products[0].featuredMedia.url,
        'contentUrl': products[0].featuredMedia.url,
        'width': 500,
        'height': 600,
        'caption': products[0].title
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${productListUrl}#breadcrumbs`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://termogar.es/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Categorias',
            'item': 'https://termogar.es/categorias'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': params,
            'item': `${productListUrl}#breadcrumbs`
          },
          { '@type': 'ListItem', 'position': 3, 'name': 'Split' }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://termogar.es/',
        'url': 'https://termogar.es/',
        'name': 'Termogar.es | Expertos en Climatización',
        'description':
          'Venta online de productos de climatización, con amplia oferta en calentadores a gas, calderas y bombas de calor. Asesoramiento técnico especializado.',
        'publisher': { '@id': 'https://www.adrian-alvarez.dev/es/' },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate':
                'http://termogar.es/busqueda?search=junkers&category=calentadores'
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              'valueRequired': true,
              'valueName': 'search_term_string'
            }
          }
        ],
        'inLanguage': 'es'
      },
      {
        '@type': 'Organization',
        '@id': 'http://termogar.es/servicio-al-cliente/acerca-de-la-empresa',
        'name': 'TERMOGAR, Expertos en climatización',
        'url': 'https://termogar.es/',
        'logo': {
          '@type': 'ImageObject',
          'inLanguage': 'es',
          '@id': 'https://termogar.es/android-chrome-192x192.png',
          'url': 'https://termogar.es/android-chrome-192x192.png',
          'contentUrl': 'https://termogar.es/android-chrome-192x192.png',
          'width': 450,
          'height': 220,
          'caption': 'TERMOGAR, Expertos en climatización'
        },
        'image': { '@id': 'https://termogar.es/android-chrome-192x192.png' },
        'sameAs': [
          'https://www.instagram.com/termogar.es/',
          'https://es-es.facebook.com/termogar',
          'https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
        ]
      }
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldBlogArticle = (article: GET_BLOG_ARTICLE_BY_SLUGResult) => {
  const isBlog = article?.categories?.some(
    (category) => category?.slug === 'blog'
  )
  const blogUrl = `${BASE_URL}/${isBlog ? 'blog/articulos' : 'noticias'}/${article?.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': blogUrl,
        'isPartOf': {
          '@id': blogUrl
        },
        'author': {
          'name': article?.author?.name,
          '@id': article?.author?.name
        },
        'headline': article?.title,
        'datePublished': article?.date,
        'dateModified': article?.date,
        'mainEntityOfPage': {
          '@id': blogUrl
        },
        'wordCount': 349,
        'publisher': {
          '@id': 'http://termogar.es/servicio-al-cliente/acerca-de-la-empresa'
        },
        'image': {
          '@id': 'https://termogar.es/android-chrome-192x192.png'
        },
        'thumbnailUrl': article?.featuredMedia.url,
        'keywords': [
          ...(article?.categories?.map((category) => category?.name) || []),
          ...(article?.tags?.map((tag) => tag?.name) || [])
        ],
        'articleSection': [
          ...(article?.categories?.map((category) => category?.name) || [])
        ],
        'inLanguage': 'es'
      },
      {
        '@type': 'WebPage',
        '@id': blogUrl,
        'url': blogUrl,
        'name': article?.title,
        'isPartOf': { '@id': 'https://termogar.es' },
        'primaryImageOfPage': {
          '@id': article?.featuredMedia.url
        },
        'image': {
          '@id': article?.featuredMedia.url
        },
        'thumbnailUrl': article?.featuredMedia.url,
        'datePublished': article?.date,
        'dateModified': article?.date,
        'description': article?.excerpt,
        'breadcrumb': {
          '@id': `${blogUrl}#breadcrumb`
        },
        'inLanguage': 'es',
        'potentialAction': [
          {
            '@type': 'ReadAction',
            'target': [blogUrl]
          }
        ]
      },
      {
        '@type': 'ImageObject',
        'inLanguage': 'es',
        '@id': `${blogUrl}#primaryimage`,
        'url': article?.featuredMedia.url,
        'contentUrl': article?.featuredMedia.url,
        'width': 903,
        'height': 504
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${blogUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://termogar.es/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': isBlog ? 'Blog' : 'Noticias',
            'item': `${BASE_URL}/${isBlog ? 'blog' : 'noticias'}`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article?.title
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://termogar.es/',
        'url': 'https://termogar.es/',
        'name': 'Termogar.es | Expertos en Climatización',
        'description':
          'Venta online de productos de climatización, con amplia oferta en calentadores a gas, calderas y bombas de calor. Asesoramiento técnico especializado.',
        'publisher': { '@id': 'https://www.adrian-alvarez.dev/es/' },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate':
                'http://termogar.es/busqueda?search=junkers&category=calentadores'
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              'valueRequired': true,
              'valueName': 'search_term_string'
            }
          }
        ],
        'inLanguage': 'es'
      },
      {
        '@type': 'Organization',
        '@id': 'http://termogar.es/servicio-al-cliente/acerca-de-la-empresa',
        'name': 'TERMOGAR, Expertos en climatización',
        'url': 'https://termogar.es/',
        'logo': {
          '@type': 'ImageObject',
          'inLanguage': 'es',
          '@id': 'https://termogar.es/android-chrome-192x192.png',
          'url': 'https://termogar.es/android-chrome-192x192.png',
          'contentUrl': 'https://termogar.es/android-chrome-192x192.png',
          'width': 450,
          'height': 220,
          'caption': 'TERMOGAR, Expertos en climatización'
        },
        'image': { '@id': 'https://termogar.es/android-chrome-192x192.png' },
        'sameAs': [
          'https://www.instagram.com/termogar.es/',
          'https://es-es.facebook.com/termogar',
          'https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
        ]
      }
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldHomePage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lavanda del Lago',
    url: process.env.NEXT_PUBLIC_URL,
    logo: smallLogo.src,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34667525413',
      contactType: 'Customer Service'
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldCostumerServicesPages = (
  page: GET_COSTUMER_SERVICES_PAGEResult,
  slug: string | string[] | undefined
) => {
  const costumerServiceUrl = `${BASE_URL}/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': costumerServiceUrl,
        'url': costumerServiceUrl,
        'name':
          'Cómo realizar tu pedido, paso a paso | Termogar.es | Expertos en Climatización',
        'isPartOf': { '@id': 'https://termogar.es/#website' },
        'primaryImageOfPage': {
          '@id': `${costumerServiceUrl}#primaryimage`
        },
        'image': {
          '@id': `${costumerServiceUrl}#primaryimage`
        },
        'datePublished': '2016-08-20T17:50:04+00:00',
        'dateModified': '2022-04-18T17:02:24+00:00',
        'description': page?.excerpt,
        'breadcrumb': {
          '@id': `${costumerServiceUrl}#breadcrumb`
        },
        'inLanguage': 'es',
        'potentialAction': [
          {
            '@type': 'ReadAction',
            'target': [costumerServiceUrl]
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${costumerServiceUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://termogar.es/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Servicio de Atención al Cliente',
            'item': 'https://termogar.es/servicio-de-atencion-al-cliente/'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': page?.title,
            'item': costumerServiceUrl
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://termogar.es/',
        'url': 'https://termogar.es/',
        'name': 'Termogar.es | Expertos en Climatización',
        'description':
          'Venta online de productos de climatización, con amplia oferta en calentadores a gas, calderas y bombas de calor. Asesoramiento técnico especializado.',
        'publisher': { '@id': 'https://www.adrian-alvarez.dev/es/' },
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate':
                'http://termogar.es/busqueda?search=junkers&category=calentadores'
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              'valueRequired': true,
              'valueName': 'search_term_string'
            }
          }
        ],
        'inLanguage': 'es'
      },
      {
        '@type': 'Organization',
        '@id': 'http://termogar.es/servicio-al-cliente/acerca-de-la-empresa',
        'name': 'TERMOGAR, Expertos en climatización',
        'url': 'https://termogar.es/',
        'logo': {
          '@type': 'ImageObject',
          'inLanguage': 'es',
          '@id': 'https://termogar.es/android-chrome-192x192.png',
          'url': 'https://termogar.es/android-chrome-192x192.png',
          'contentUrl': 'https://termogar.es/android-chrome-192x192.png',
          'width': 450,
          'height': 220,
          'caption': 'TERMOGAR, Expertos en climatización'
        },
        'image': { '@id': 'https://termogar.es/android-chrome-192x192.png' },
        'sameAs': [
          'https://www.instagram.com/termogar.es/',
          'https://es-es.facebook.com/termogar',
          'https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
        ]
      }
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
