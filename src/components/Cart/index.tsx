import { cn } from '@/lib/utils'

export default function Cart({ className }: { className?: string }) {
  return (
    <>
      <div
        style={{ boxShadow: ' 0px 15px 50px 0px rgba(0, 0, 0, 0.14)' }}
        className={cn(
          'cart-wrappwer w-[300px] border-t-[3px] bg-white',
          className
        )}
      >
        <div className='h-full w-full'>
          <div className='product-items h-[310px] overflow-y-scroll'>
            <ul>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
              <li className='flex h-full w-full'>
                <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                  <div className='h-full w-[65px]'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/product-img-1.jpg`}
                      alt=''
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex h-full flex-1 flex-col justify-center'>
                    <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                      iPhone 12 Pro Max 128GB Golen colour
                    </p>

                    <p className='price'>
                      <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                        $38
                      </span>
                    </p>
                  </div>
                </div>
                <span className='mr-[15px] mt-[20px] inline-flex cursor-pointer'>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    className='inline fill-current text-[#AAAAAA] hover:text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
          <div className='mb-[12px] mt-[20px] w-full px-4'>
            <div className='h-[1px] bg-[#F0F1F3]'></div>
          </div>
          <div className='product-actions mb-[30px] px-4'>
            <div className='total-equation mb-[28px] flex items-center justify-between'>
              <span className='font-500 text-qblack text-[15px]'>Subtotal</span>
              <span className='font-500 text-[15px] text-red-500'>$365</span>
            </div>
            <div className='product-action-btn'>
              <a href='#'>
                <div className='gray-btn mb-[10px] h-[50px] w-full'>
                  <span>View Cart</span>
                </div>
              </a>
              <a href='#'>
                <div className='h-[50px] w-full'>
                  <div className='yellow-btn'>
                    <span className='text-sm'>Checkout Now</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className='mt-[20px] w-full px-4'>
            <div className='h-[1px] bg-[#F0F1F3]'></div>
          </div>
          <div className='flex justify-center py-[15px]'>
            <p className='font-500 text-[13px] text-gray-500'>
              Get Return within <span className='text-qblack'>30 days</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
