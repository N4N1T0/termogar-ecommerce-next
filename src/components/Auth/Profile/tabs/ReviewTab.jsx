import React from 'react'
import Star from '../../../Helpers/icons/Star'
import { Link } from 'react-router-dom'

export default function ReviewTab({ className, products }) {
  return (
    <>
      <div className='review-tab-wrapper w-full'>
        <div className='grid grid-cols-2 gap-8'>
          {products.slice(0, 6).map((product, index) => (
            <div key={product.id} className='item'>
              <div
                style={{ boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.05)' }}
                className={`product-row-card-style-one group relative h-[170px] w-full overflow-hidden bg-white ${
                  className || ''
                }`}
              >
                <div className='flex h-full w-full items-center space-x-2 p-2'>
                  <div className='h-full w-1/3'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/${product.image}`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <div>
                      <span className='mb-1.5 block text-sm text-gray-500'>
                        July 22, 2022
                      </span>
                      {/* reviews */}
                      <div className='mb-1.5 flex'>
                        {Array.from(Array(product.review), () => (
                          <span key={product.review + Math.random()}>
                            <Star />
                          </span>
                        ))}
                      </div>
                      <Link to='/single-product'>
                        <p className='title font-600 text-qblack mb-2 line-clamp-1 text-[13px] leading-[24px] hover:text-blue-600 sm:text-[15px]'>
                          {product.title}
                        </p>
                      </Link>
                      <p className='price mb-[26px] line-clamp-2 text-sm text-gray-500'>
                        Didn't I tell you not put your phone on charge because
                        weekend?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
