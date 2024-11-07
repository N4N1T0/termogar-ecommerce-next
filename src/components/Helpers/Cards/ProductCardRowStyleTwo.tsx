// Next.js Imports
import Link from 'next/link'

// Utils Imports
import { cn } from '@/lib/utils'

// Types Imports
import { ProductCardRowStyleTwoProps } from '@/types'

export default function ProductCardRowStyleTwo({
  className,
  datas
}: ProductCardRowStyleTwoProps) {
  return (
    <div
      data-aos='fade-up'
      className={cn('product-card-row-two w-full', className)}
    >
      <div className='border-primarygray h-[105px] w-full border bg-white px-5'>
        <div className='flex h-full w-full items-center justify-center space-x-5'>
          <div className='h-[75px] w-[75px]'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${
                datas.image
              }`}
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex h-full flex-1 flex-col justify-center'>
            <Link href='/single-product'>
              <p className='title font-600 text-qblack mb-2 line-clamp-1 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                {datas.title}
              </p>
            </Link>

            <p className='price'>
              <span className='main-price font-600 text-[18px] text-gray-500 line-through'>
                {datas.price}
              </span>
              <span className='offer-price font-600 ml-2 text-[18px] text-red-500'>
                {datas.offer_price}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
