// Next.js Imports
import Link from 'next/link'

// Utils Imports
import { cn } from '@/lib/utils'

// Types Imports
import { ProductCardRowStyleTwoProps } from '@/types'

// Assets Imports
import { Expand, GitCompareArrows, Heart, Star } from 'lucide-react'

export default function ProductCardRowStyleTwo({
  className,
  datas
}: ProductCardRowStyleTwoProps) {
  return (
    <div
      data-aos='fade-left'
      className={cn(
        'product-row-card-style-one group relative h-[250px] w-full overflow-hidden bg-white',
        className
      )}
    >
      <div className='flex h-full w-full items-center space-x-5 p-2 sm:p-5 lg:p-[30px]'>
        <div className='h-full w-1/3 lg:w-1/2'>
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${datas.image}`}
            alt=''
            className='h-full w-full object-contain'
          />
        </div>
        <div className='flex h-full flex-1 flex-col justify-center'>
          <div>
            {/* reviews */}
            <div className='mb-3 flex space-x-1'>
              {Array.from(Array(datas.review), () => (
                <span key={datas.review + Math.random()}>
                  <Star />
                </span>
              ))}
            </div>
            <Link href='/single-product'>
              <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                {datas.title}
              </p>
            </Link>
            <p className='price mb-[26px]'>
              <span className='main-price font-600 text-base text-gray-500 line-through sm:text-[18px]'>
                {datas.price}
              </span>
              <span className='offer-price font-600 ml-2 text-base text-red-500 sm:text-[18px]'>
                {datas.offer_price}
              </span>
            </p>
            <button type='button' className='yellow-btn h-[30px] w-[110px]'>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -right-10 top-[30px] flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
        <Link
          href='#'
          className='transition-colors duration-100 ease-in hover:bg-accent'
        >
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <Expand />
          </span>
        </Link>
        <Link
          href='#'
          className='transition-colors duration-100 ease-in hover:bg-accent'
        >
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <Heart />
          </span>
        </Link>
        <Link
          href='#'
          className='transition-colors duration-100 ease-in hover:bg-accent'
        >
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <GitCompareArrows />
          </span>
        </Link>
      </div>
    </div>
  )
}
