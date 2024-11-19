// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import CostumerServiceError from '@/components/CostumerService/empty'
import { PortableText } from 'next-sanity'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_PAGE } from '@/sanity/lib/queries'
import PageTitle from '@/components/Helpers/PageTitle'

const CostumerServicePageIndex = async () => {
  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug: ['servicio-de-atencion-al-cliente']
    }
  )

  if (!searchedPage) return notFound()

  const { content } = searchedPage

  // TODO: FIX THE LINKS IN THE CONTENT

  return (
    <section
      id='costumer-service-page-index'
      className='flex w-full flex-col items-center justify-center pb-5'
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

export default CostumerServicePageIndex
