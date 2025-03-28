// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import CostumerServiceError from '@/components/CostumerService/empty'
import { PortableText } from 'next-sanity'
import { AtencionAlCliente } from '@/assets'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_PAGE } from '@/sanity/lib/queries'
import PageTitle from '@/components/Helpers/PageTitle'
import { portableTextComponents } from '@/components/Helpers/PortableText'
import { Logger } from 'next-axiom'
import Image from 'next/image'

const log = new Logger()

// * METADATA
export async function generateMetadata(): Promise<Metadata> {
  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug: ['pagina-principal-de-atencion-al-cliente']
    }
  )

  if (!searchedPage)
    return { title: 'Not Found', description: 'Page not found' }

  return {
    title: searchedPage.title || 'Servicio de Atención al Cliente',
    description:
      searchedPage.excerpt || 'Servicio de Atención al Cliente para termogar.'
  }
}

const CostumerServicePageIndex = async () => {
  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug: ['pagina-principal-de-atencion-al-cliente']
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 600
      }
    }
  )

  if (!searchedPage) {
    log.error(
      `The page with slug 'pagina-principal-de-atencion-al-cliente' was not found`
    )
    return notFound()
  }

  const { content } = searchedPage

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
            path: 'servicio-al-cliente'
          }
        ]}
        title='Servicio de Atención al Cliente'
        className='mt-5'
      />
      {content ? (
        <section
          id='content'
          className='prose mx-auto mt-10 w-full max-w-none text-pretty bg-white py-10 pl-10 pr-5'
        >
          <Image
            src={AtencionAlCliente}
            priority
            alt='Servicio de atencion al Cliente'
            className='h-auto max-w-[300px]'
          />
          <PortableText value={content} components={portableTextComponents} />
        </section>
      ) : (
        <CostumerServiceError />
      )}
    </section>
  )
}

export default CostumerServicePageIndex
