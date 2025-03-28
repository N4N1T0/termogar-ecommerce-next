// * NEXT.JS IMPORTS
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'

// * UTILS IMPORTS
import { GET_ALL_TAGS } from '@/sanity/lib/queries'
import { sanityClientRead } from '@/sanity/lib/client'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Logger } from 'next-axiom'

const log = new Logger()

export const metadata: Metadata = {
  title: 'Categorias',
  description:
    'Encuentra el artículo que mejor se adapte a tus necesidades según las categorías dentro de la web de termogar.'
}

const TagsPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { search } = await searchParams
  const searchedTags = await sanityClientRead.fetch(
    GET_ALL_TAGS,
    {},
    {
      cache: 'force-cache',
      next: {
        revalidate: 600
      }
    }
  )

  if (!searchedTags) {
    log.error('Tags not found', { searchedTags })
    return notFound()
  }

  const refactoredTags = searchedTags.filter((tag) => {
    return tag.name
      ?.toLowerCase()
      .includes(Array.isArray(search) || !search ? '' : search.toLowerCase())
  })

  return (
    <main className='container-x mx-auto px-4 py-8'>
      <PageTitle
        title='Nuestras Etiquetas'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Etiquetas', path: '/etiquetas' }
        ]}
      />
      <Form action='' className='mt-5 flex w-full justify-end'>
        <fieldset className='flex w-full items-center justify-end gap-3 md:w-1/3'>
          <Input
            type='text'
            name='search'
            id='search'
            defaultValue={search || ''}
            placeholder='Buscar'
            className='h-[40px] w-full flex-1 rounded-none bg-gray-200 pl-5 placeholder:text-gray-500 focus:outline-none focus:ring-0'
          />
          <button
            type='submit'
            className='hover-200 h-[40px] w-24 bg-accent hover:text-gray-100'
          >
            Buscar
          </button>
        </fieldset>
      </Form>
      <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {refactoredTags.map(({ id, name, slug }) => (
          <Link
            key={id}
            href={`/etiquetas/${slug}`}
            className='hover-200 flex flex-col items-center border border-gray-300 p-4 hover:bg-accent hover:text-gray-100'
          >
            {name}
          </Link>
        ))}
      </div>
    </main>
  )
}

export default TagsPage
