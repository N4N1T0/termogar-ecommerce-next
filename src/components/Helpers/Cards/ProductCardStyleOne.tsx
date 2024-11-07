// * NEXTJS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import { ProductCardStyleOneProps } from '@/types'
import {
  Expand,
  GitCompareArrows,
  Heart,
  ShoppingBag,
  Star
} from 'lucide-react'

export default function ProductCardStyleOne({
  datas
}: ProductCardStyleOneProps) {
  const available =
    datas.cam_product_sale !== null && datas.cam_product_available
      ? (datas.cam_product_sale /
          (datas.cam_product_available + datas.cam_product_sale)) *
        100
      : 0
  return (
    <div
      className='product-card-one group relative h-full w-full overflow-hidden bg-white'
      style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
    >
      {/* TODO */}
      <div
        className='product-card-img h-[300px] w-full'
        style={{
          background: `url(${process.env.NEXT_PUBLIC_URL}/assets/images/${
            datas.image
          }) no-repeat center`
        }}
      >
        {/* product available progress */}
        {datas.campaingn_product && (
          <>
            <div className='absolute left-0 top-3 w-full px-[30px]'>
              <div className='progress-title flex justify-between'>
                <p className='text-qblack font-400 text-xs leading-6'>
                  Products Available
                </p>
                <span className='text-qblack font-600 text-sm leading-6'>
                  {datas.cam_product_available}
                </span>
              </div>
              <div className='progress bg-primarygray relative h-[5px] w-full overflow-hidden rounded-[22px]'>
                <div
                  style={{
                    width: `${datas.campaingn_product ? 100 - available : 0}%`
                  }}
                  className='absolute left-0 top-0 h-full bg-accent'
                ></div>
              </div>
            </div>
          </>
        )}
        {/* product type */}
        {datas.product_type && !datas.campaingn_product && (
          <div className='product-type absolute right-[14px] top-[17px]'>
            <span
              className={`font-700 rounded-full px-3 py-[6px] text-[9px] uppercase leading-none tracking-wider text-white ${
                datas.product_type === 'popular' ? 'bg-[#19CC40]' : 'bg-accent'
              }`}
            >
              {datas.product_type}
            </span>
          </div>
        )}
      </div>
      <div className='product-card-details relative px-[30px] pb-[30px]'>
        {/* add to card button */}
        <div className='absolute left-0 top-40 h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[85px]'>
          <button type='button' className='yellow-btn'>
            <div className='flex items-center space-x-3'>
              <ShoppingBag size={18} />
              <span>Add To Cart</span>
            </div>
          </button>
        </div>
        <div className='reviews mb-3 flex space-x-[1px]'>
          {Array.from(Array(datas.review), () => (
            <span key={datas.review + Math.random()}>
              <Star />
            </span>
          ))}
        </div>
        <Link href='/single-product'>
          <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[15px] leading-[24px] hover:text-blue-600'>
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
      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -right-10 top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
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
