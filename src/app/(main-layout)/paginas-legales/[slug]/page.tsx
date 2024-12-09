// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import CostumerServiceError from '@/components/CostumerService/empty'
import PageTitle from '@/components/Helpers/PageTitle'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_PAGE } from '@/sanity/lib/queries'
import { PortableText } from 'next-sanity'
import { portableTextComponents } from '@/components/Helpers/PortableText'

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
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  return {
    title: searchedPage?.title || 'Sin Titulo',
    description: searchedPage?.excerpt || 'Sin Descripcion'
  }
}

const LegalPages = async ({
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
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )
  if (!searchedPage) return notFound()

  const { title, content } = searchedPage

  return (
    <main className='container-x mx-auto w-full bg-white pb-[30px]'>
      <div className='mb-[30px] w-full'>
        <PageTitle
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            {
              name: title || 'Términos y condiciones de Uso',
              path: `/paginas-legales/${slug}`
            }
          ]}
          title={title || 'Términos y condiciones de Uso'}
        />
      </div>
      <div className='flex w-full items-center justify-center'>
        {content ? (
          <section
            id='content'
            className='container-x prose mx-auto w-full text-pretty px-5'
          >
            <PortableText value={content} components={portableTextComponents} />
          </section>
        ) : (
          <CostumerServiceError />
        )}
      </div>
    </main>
  )
}

export default LegalPages
