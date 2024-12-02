// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import PageTitle from '@/components/Helpers/PageTitle'

// * UTILS IMPORTS
import { GET_BRANDS } from '@/sanity/lib/queries'
import { sanityClientRead } from '@/sanity/lib/client'

export const metadata: Metadata = {
  title: 'Marcas',
  description:
    'Encuentra el artículo que mejor se adapte a tus necesidades según estas Marcas dentro de la web de Termogar.'
}

const BrandsPage = async () => {
  const brands = await sanityClientRead.fetch(
    GET_BRANDS,
    {},
    {
      cache: 'force-cache',
      next: {
        revalidate: 43200
      }
    }
  )

  return (
    <div className='container-x mx-auto px-4 py-8'>
      <PageTitle
        title='Nuestras Marcas'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Marcas', path: '/marcas' }
        ]}
      />
      <div className='my-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {brands.map(({ id, media, slug, title }) => (
          <Link
            href={`/marcas/${slug}`}
            className='group h-56 overflow-hidden bg-white p-10 shadow-lg'
            key={id}
          >
            <Image
              src={media?.url || PlaceholderSquare}
              alt={title || 'Sin Nombre'}
              title={title || 'Sin Nombre'}
              placeholder='blur'
              priority
              width={300}
              height={300}
              quality={100}
              blurDataURL={media?.blur || PlaceholderSquare.blurDataURL}
              className='h-full w-full transition-transform duration-200 ease-in group-hover:scale-105'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BrandsPage
