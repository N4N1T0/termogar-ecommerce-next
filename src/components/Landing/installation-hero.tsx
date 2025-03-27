import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PlaceholderSquare } from '@/assets'
import ReviewBento from './review-bento'

export default function InstallationHeroBento() {
  return (
    <section className='container mx-auto px-4 py-12 md:py-20'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-accent md:text-4xl lg:text-6xl'>
          Instalación de equipos
        </h1>
        <h2 className='text-muted-foreground mt-2'>
          Tienes problemas con tu calentador de agua, aire acondicionado o
          Aerotermia? Nosotros te ayudamos
        </h2>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* First column - Square bento box */}
        <div className='aspect-square overflow-hidden border'>
          <div className='bg-muted relative h-1/2 w-full'>
            <Image
              src={PlaceholderSquare}
              alt='Featured image'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex h-1/2 flex-col justify-between p-6'>
            <div>
              <h2 className='mb-2 text-2xl font-bold'>
                <span className='bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                  Medium length section
                </span>{' '}
                <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                  heading goes here
                </span>
              </h2>
              <p className='text-muted-foreground'>
                A brief description of what this section is about. Engage your
                visitors with compelling content.
              </p>
            </div>
            <div className='mt-4'>
              <Link
                href='#'
                className='bg-primary text-primary-foreground inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium'
              >
                Learn more <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>

        {/* Second column - 2 rows */}
        <div className='grid grid-cols-1 gap-6'>
          {/* First row - 2 square boxes */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* First square */}
            <div className='aspect-square overflow-hidden border p-6'>
              <div className='bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full'>
                <svg
                  className='text-primary h-5 w-5'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M12 5v14' />
                  <path d='M5 12h14' />
                </svg>
              </div>
              <h3 className='mb-2 text-xl font-bold'>
                <span className='bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                  Medium length
                </span>{' '}
                <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                  section heading
                </span>
              </h3>
              <p className='text-muted-foreground'>
                Short description that explains the value proposition of this
                particular feature or benefit.
              </p>
              <Link
                href='#'
                className='text-primary mt-4 inline-flex items-center text-sm font-medium'
              >
                Learn more <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </div>

            {/* Second square */}
            <ReviewBento />
          </div>

          {/* Second row - Full rectangular box */}
          <div className='flex overflow-hidden border'>
            <div className='bg-muted relative hidden w-1/3 sm:block'>
              <Image
                src={PlaceholderSquare}
                alt='Feature image'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-1 flex-col justify-between p-6'>
              <div>
                <p className='text-primary text-sm font-medium'>Feature</p>
                <h3 className='mb-2 text-xl font-bold'>
                  <span className='bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                    Medium length
                  </span>{' '}
                  <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                    section heading goes here
                  </span>
                </h3>
                <p className='text-muted-foreground'>
                  Short description that explains the value proposition of this
                  particular feature.
                </p>
              </div>
              <Link
                href='#'
                className='text-primary mt-4 inline-flex items-center text-sm font-medium'
              >
                Learn more <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
