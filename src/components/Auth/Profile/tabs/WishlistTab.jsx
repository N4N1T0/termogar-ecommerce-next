import React from 'react'
import InputQuantityCom from '../../../Helpers/InputQuantityCom'

export default function WishlistTab({ className }) {
  return (
    <>
      <div className={`w-full ${className || ''}`}>
        <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <tbody>
              {/* table heading */}
              <tr className='default-border-bottom whitespace-nowrap border-b bg-[#F6F6F6] px-2 text-[13px] font-medium uppercase text-black'>
                <td className='block w-[380px] whitespace-nowrap py-4 pl-10'>
                  product
                </td>
                <td className='whitespace-nowrap py-4 text-center'>
                  stock status
                </td>
                <td className='whitespace-nowrap py-4 text-center'>price</td>
                <td className='whitespace-nowrap py-4 text-center'>quantity</td>
                <td className='whitespace-nowrap py-4 text-center'>total</td>
                <td className='block w-[114px] whitespace-nowrap py-4 text-right'></td>
              </tr>
              {/* table heading end */}
              <tr className='border-b bg-white hover:bg-gray-50'>
                <td className='py-4 pl-10'>
                  <div className='flex items-center space-x-6'>
                    <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_URL
                        }/assets/images/product-img-1.jpg`}
                        alt='product'
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <div className='flex flex-1 flex-col'>
                      <p className='text-qblack text-[15px] font-medium'>
                        iPhone 12 Pro Max 128GB
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-2 py-4 text-center'>
                  <span className='text-[15px] font-normal'>In Stock(23)</span>
                </td>
                <td className='px-2 py-4 text-center'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4'>
                  <div className='flex items-center justify-center'>
                    <InputQuantityCom />
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span>
                      <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z'
                          fill='#AAAAAA'
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className='border-b bg-white hover:bg-gray-50'>
                <td className='w-[380px] py-4 pl-10'>
                  <div className='flex items-center space-x-6'>
                    <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_URL
                        }/assets/images/product-img-2.jpg`}
                        alt='product'
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <div className='flex flex-1 flex-col'>
                      <p className='text-qblack text-[15px] font-medium'>
                        iPhone 12 Pro Max 128GB
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-2 py-4 text-center'>
                  <span className='text-[15px] font-normal'>In Stock(23)</span>
                </td>
                <td className='px-2 py-4 text-center'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4'>
                  <div className='flex items-center justify-center'>
                    <InputQuantityCom />
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span>
                      <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z'
                          fill='#AAAAAA'
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className='border-b bg-white hover:bg-gray-50'>
                <td className='w-[380px] py-4 pl-10'>
                  <div className='flex items-center space-x-6'>
                    <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_URL
                        }/assets/images/product-img-3.jpg`}
                        alt='product'
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <div className='flex flex-1 flex-col'>
                      <p className='text-qblack text-[15px] font-medium'>
                        iPhone 12 Pro Max 128GB
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-2 py-4 text-center'>
                  <span className='text-[15px] font-normal'>In Stock(23)</span>
                </td>
                <td className='px-2 py-4 text-center'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4'>
                  <div className='flex items-center justify-center'>
                    <InputQuantityCom />
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>$38</span>
                  </div>
                </td>
                <td className='py-4 text-right'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span>
                      <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z'
                          fill='#AAAAAA'
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-[30px] flex w-full justify-start sm:justify-end'>
        <div className='items-center sm:flex sm:space-x-[30px]'>
          <button type='button'>
            <div className='mb-5 w-full text-sm font-semibold text-red-500 sm:mb-0'>
              Clean Wishlist
            </div>
          </button>
          <div className='h-[50px] w-[180px]'>
            <button type='button' className='yellow-btn'>
              <div className='w-full text-sm font-semibold'>
                Add to Cart All
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
