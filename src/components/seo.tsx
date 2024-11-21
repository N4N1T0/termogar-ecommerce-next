// Types Imports
import type { Metadata } from 'next'

// Assets Imports
import { smallLogo } from '@/assets'
import { GET_BLOG_ARTICLE_BY_SLUGResult } from '@/types/sanity'

const seoMetatags = (): Metadata => {
  return {
    title: {
      template: '%s  |  Termogar',
      default: 'Termogar | Productos de Lavanda'
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

// export const jldProduct = (product: Product | null) => {
//   const jsonLd = {
//     '@context': 'https://schema.org/',
//     '@type': 'Product',
//     'name': product?.nombre || 'Product Name',
//     'image':
//       product?.fotosVarias && product?.fotosVarias.length > 0
//         ? product?.fotosVarias.map((img) => img.image)
//         : [product?.image],

//     'description': product?.descripcion,
//     'brand': {
//       '@type': 'Brand',
//       'name': 'Lavanda del Lago'
//     }
//   }

//   return (
//     <script
//       type='application/ld+json'
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//     />
//   )
// }

// export const jldProductList = (products: Product[]) => {
//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'ItemList',
//     'itemListElement': [
//       ...products.map((product) => ({
//         '@type': 'Product',
//         'name': product?.nombre || 'Product Name',
//         'image': [product.image],
//         'description': product?.descripcion
//       }))
//     ]
//   }

//   return (
//     <script
//       type='application/ld+json'
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//     />
//   )
// }

const jldBlogArticle = (article: GET_BLOG_ARTICLE_BY_SLUGResult) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article?.title,
    'image': article?.featuredMedia.url,
    'description': article?.excerpt,
    'author': {
      '@type': 'Person',
      'name': article?.author?.name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Lavanda del Lago',
      'logo': {
        '@type': 'ImageObject',
        'url': smallLogo.src
      }
    },
    'datePublished': article?.date
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// TODO info
const jldHomePage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Lavanda del Lago',
    'url': process.env.NEXT_PUBLIC_URL,
    'logo': smallLogo.src,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-800-555-1234',
      'contactType': 'Customer Service'
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
