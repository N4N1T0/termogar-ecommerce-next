// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'

// * UTILS IMPORTS
import { BrandSectionProps } from '@/types'
import { cn } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_BRANDS } from '@/sanity/lib/queries'

const BrandSection = async ({ className, sectionTitle }: BrandSectionProps) => {
  const brands = await sanityClientRead.fetch(GET_BRANDS)

  // TODO: Refactor to have less DOM Elements

  return (
    <section id='brands' data-aos='fade-up' className={cn('w-full', className)}>
      <div className='container-x mx-auto'>
        <div className='section-title mb-5 flex items-center justify-between'>
          <div>
            <h2 className='font-600 text-xl text-gray-900 sm:text-3xl'>
              {sectionTitle}
            </h2>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
          {brands.map(({ title, id, slug, media }) => (
            <Link key={id} className='item group' href={`/marcas/${slug}`}>
              <div className='flex h-[130px] w-full items-center justify-center overflow-hidden border border-gray-200'>
                <Image
                  src={media.url || PlaceholderSquare}
                  alt={title || 'Marca'}
                  title={title || 'Marca'}
                  width={100}
                  height={100}
                  placeholder='blur'
                  blurDataURL={media.blur || PlaceholderSquare.blurDataURL}
                  className='h-auto w-auto transition-transform duration-300 ease-out group-hover:scale-110'
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandSection
