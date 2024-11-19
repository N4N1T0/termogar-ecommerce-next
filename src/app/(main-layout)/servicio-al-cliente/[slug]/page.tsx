// * NEXT.JS IMPORTS
import { notFound } from 'next/navigation'

// * ASSETS IMPORTS
import CostumerServiceError from '@/components/CostumerService/empty'
import { PortableText } from 'next-sanity'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_PAGE } from '@/sanity/lib/queries'

const CostumerServicePageSlug = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params

  const searchedPage = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_PAGE,
    {
      slug
    }
  )

  if (!searchedPage) return notFound()

  const { title, content } = searchedPage

  // TODO: FIX THE LINKS IN THE CONTENT

  return (
    <section
      id='costumer-service-page-index'
      className='mx-auto mt-10 flex w-full flex-col items-center justify-center'
    >
      <h1 className='my-5 text-3xl font-semibold text-gray-900'>{title}</h1>
      {content ? (
        <section
          id='content'
          className='prose w-full max-w-none text-pretty px-5'
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
