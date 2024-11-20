// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import CostumerServiceError from '@/components/CostumerService/empty'
import { PortableText } from 'next-sanity'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_PAGE } from '@/sanity/lib/queries'
import PageTitle from '@/components/Helpers/PageTitle'

export async function generateMetadata({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug } = await params

  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug: [slug]
    }
  )

  return {
    title: searchedPage?.title || 'Sin Titulo',
    description: searchedPage?.excerpt || 'Sin Descripcion'
  }
}

const CostumerServicePageSlug = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params

  if (!slug) return notFound()

  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug: [slug]
    }
  )

  if (!searchedPage) return notFound()

  const { title, content } = searchedPage

  // TODO: FIX THE LINKS IN THE CONTENT`

  return (
    <section
      id='costumer-service-page-index'
      className='flex w-full flex-col items-center justify-start pb-5'
    >
      <PageTitle
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          {
            name: 'Serv. Cliente',
            path: '/servicio-al-cliente'
          },
          {
            name: title || 'Términos y condiciones de Uso',
            path: `/servicio-al-cliente/${slug}`
          }
        ]}
        title={title || 'Términos y condiciones de Uso'}
      />
      {content ? (
        <section
          id='content'
          className='prose mx-auto ml-5 mt-10 w-full max-w-none text-pretty px-5'
        >
          <PortableText value={content} />
        </section>
      ) : (
        <CostumerServiceError />
      )}
    </section>
  )
}

export default CostumerServicePageSlug
