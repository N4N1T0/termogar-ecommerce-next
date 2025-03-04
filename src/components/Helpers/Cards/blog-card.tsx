// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * TYPES IMPORTS
import { BlogCardProps } from '@/types'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { PlaceholderSquare } from '@/assets'
import { ArrowRight, Calendar, UserCircle } from 'lucide-react'

const BlogCard = ({ className, data, priority, type }: BlogCardProps) => {
  return (
    <article
      className={cn('group h-fit w-full border border-gray-200', className)}
      data-aos='fade-up'
    >
      <Link
        href={`${type === 'blog' ? '/blog/articulos/' : '/noticias/'}${data.slug}`}
        className='block h-1/2 w-full'
      >
        <Image
          src={data.featuredMedia.url || PlaceholderSquare}
          alt={data.title || 'Blog Image'}
          width={500}
          height={500}
          placeholder='blur'
          blurDataURL={data.featuredMedia.blur || PlaceholderSquare.blurDataURL}
          className='h-full w-full object-fill'
          priority={priority}
        />
      </Link>
      <div className='p-3 md:p-5'>
        <div className='mb-3 flex items-center space-x-9'>
          <div className='flex items-center space-x-1.5'>
            <UserCircle className='h-5 w-5 text-tertiary' />
            <span className='text-base capitalize text-gray-500'>
              Por {data.author?.name}
            </span>
          </div>
          <div className='flex items-center space-x-1.5'>
            <Calendar className='h-5 w-5 text-tertiary' />
            <span className='text-base text-gray-500'>
              {data.date
                ? new Date(data.date).toLocaleDateString('es-es')
                : new Date().toLocaleDateString('es-es')}
            </span>
          </div>
        </div>
        <div className='details'>
          <Link
            href={`${type === 'blog' ? '/blog/articulos/' : '/noticias/'}${data.slug}`}
            prefetch={true}
          >
            <h1 className='mb-1 line-clamp-2 text-[22px] font-semibold capitalize text-gray-900 transition-colors duration-150 ease-in group-hover:text-tertiary'>
              {data.title}
            </h1>
          </Link>
          <p className='text-gray-500two mb-3 line-clamp-2 text-[15px] leading-[30px]'>
            {data.excerpt}
          </p>
          {/* view more btn */}
          <Link href={`/blog/articulos/${data.slug}`} className='text-tertiary'>
            <div className='flex items-center space-x-2'>
              <span className='text-base font-semibold'>
                Ver {type === 'blog' ? 'el articulo' : 'la noticia'}
              </span>
              <ArrowRight className='h-6 w-6 transition-transform duration-150 ease-in group-hover:translate-x-2' />
            </div>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
