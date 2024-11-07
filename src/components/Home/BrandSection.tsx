// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import {
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  Brand7,
  Brand8,
  Brand9,
  Brand10,
  Brand11,
  Brand12
} from '@/assets'

// Assets Imports
import { BrandSectionProps } from '@/types'

// Utils Imports
import { cn } from '@/lib/utils'

export default function BrandSection({
  className,
  sectionTitle
}: BrandSectionProps) {
  const brands = [
    { name: 'Brand1', image: Brand1 },
    { name: 'Brand2', image: Brand2 },
    { name: 'Brand3', image: Brand3 },
    { name: 'Brand4', image: Brand4 },
    { name: 'Brand5', image: Brand5 },
    { name: 'Brand6', image: Brand6 },
    { name: 'Brand7', image: Brand7 },
    { name: 'Brand8', image: Brand8 },
    { name: 'Brand9', image: Brand9 },
    { name: 'Brand10', image: Brand10 },
    { name: 'Brand11', image: Brand11 },
    { name: 'Brand12', image: Brand12 }
  ]

  return (
    <div data-aos='fade-up' className={cn('w-full', className)}>
      <div className='container-x mx-auto'>
        <div className='section-title mb-5 flex items-center justify-between'>
          <div>
            <h2 className='font-600 text-xl text-gray-900 sm:text-3xl'>
              {sectionTitle}
            </h2>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
          {brands.map(({ name, image }) => (
            <Link key={name} className='item group' href={`/marca/${name}`}>
              <div className='flex h-[130px] w-full items-center justify-center overflow-hidden border border-gray-200'>
                <Image
                  src={image}
                  alt={name}
                  title={name}
                  className='transition-transform duration-300 ease-out group-hover:scale-110'
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
