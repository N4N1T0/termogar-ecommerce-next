// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * TYPES IMPORTS
import { GET_CARD_BLOG_POSTResult } from '@/types/sanity'

// * UTILS IMPORTS
import { cn } from '@/lib/utils'
import { PlaceholderSquare } from '@/assets'
import { ArrowRight, Calendar, UserCircle } from 'lucide-react'

const BlogCard = ({
  className,
  data,
  priority
}: {
  className?: string
  data: GET_CARD_BLOG_POSTResult[number]
  priority?: boolean
}) => {
  return (
    <div className={cn('group w-full border border-gray-200', className)}>
      <Link href={`/blog/${data.slug}`} className='h-[340px] w-full'>
        <Image
          src={data.featuredMedia.url || PlaceholderSquare}
          alt={data.title || 'Blog Image'}
          width={500}
          height={500}
          placeholder='blur'
          blurDataURL={data.featuredMedia.blur || PlaceholderSquare.blurDataURL}
          className='h-full w-full object-cover'
          priority={priority}
        />
      </Link>
      <div className='p-[24px]'>
        <div className='short-data mb-3 flex items-center space-x-9'>
          <div className='flex items-center space-x-1.5'>
            <UserCircle className='h-5 w-5 text-tertiary' />
            <span className='text-gray-500two text-base capitalize'>
              Por {data.author?.name}
            </span>
          </div>
          <div className='flex items-center space-x-1.5'>
            <Calendar className='h-5 w-5 text-tertiary' />
            <span className='text-gray-500two text-base'>
              {data.date
                ? new Date(data.date).toLocaleDateString('es-es')
                : new Date().toLocaleDateString('es-es')}
            </span>
          </div>
        </div>
        <div className='details'>
          <Link href={`/blog/${data.slug}`}>
            <h1 className='mb-1 line-clamp-2 text-[22px] font-semibold capitalize text-gray-900 transition-colors duration-150 ease-in group-hover:text-tertiary'>
              {data.title}
            </h1>
          </Link>
          <p className='text-gray-500two mb-3 line-clamp-2 text-[15px] leading-[30px]'>
            {data.excerpt}
          </p>
          {/* view more btn */}
          <Link href={`/blog/${data.slug}`} className='text-tertiary'>
            <div className='flex items-center space-x-2'>
              <span className='text-base font-semibold'>Ver el Post</span>
              <ArrowRight className='h-6 w-6 transition-transform duration-150 ease-in group-hover:translate-x-2' />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
