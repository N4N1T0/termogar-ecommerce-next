/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { smallLogo } from '@/assets'
import {
  GET_BLOG_ARTICLE_BY_SLUGResult,
  GET_WHOLE_PRODUCT_BY_SLUGResult
} from '@/types/sanity'

const seoMetatags = (): Metadata => {
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

export const jldProductList = (products: any[]) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      ...products.map((product) => ({
        '@type': 'Product',
        name: product?.nombre || 'Product Name',
        image: [product.image],
        description: product?.descripcion
      }))
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

const jldBlogArticle = (article: GET_BLOG_ARTICLE_BY_SLUGResult) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article?.title,
    image: article?.featuredMedia.url,
    description: article?.excerpt,
    author: {
      '@type': 'Person',
      name: article?.author?.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lavanda del Lago',
      logo: {
        '@type': 'ImageObject',
        url: smallLogo.src
      }
    },
    datePublished: article?.date
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

const jldHomePage = () => {
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

export { jldBlogArticle, jldHomePage, seoMetatags }
