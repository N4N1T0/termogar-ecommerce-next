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
import { portableTextComponents } from '@/components/Helpers/PortableText'
import { Logger } from 'next-axiom'
import { jldCostumerServicesPages } from '@/components/seo'

const log = new Logger()

// * METADATA
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

  if (!searchedPage) {
    log.error(`The page with slug ${slug} was not found`)
    return notFound()
  }

  const { title, content } = searchedPage

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
        className='mt-5'
      />
      {content ? (
        <section
          id='content'
          className='prose mx-auto mt-10 w-full max-w-none text-pretty bg-white py-10 pl-10 pr-5'
        >
          <PortableText value={content} components={portableTextComponents} />
        </section>
      ) : (
        <CostumerServiceError />
      )}
      {jldCostumerServicesPages(searchedPage, slug)}
    </section>
  )
}

export default CostumerServicePageSlug
