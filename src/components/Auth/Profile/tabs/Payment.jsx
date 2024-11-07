import React from 'react'

export default function Payment() {
  return (
    <>
      <div className='items-wrapper-bank-payment w-full'>
        <ul className='items'>
          <li className='border-light-purple w-full items-center justify-between border-b py-[30px] sm:flex'>
            <div className='mb-3 flex items-center space-x-5 sm:mb-0'>
              <div className='flex items-center justify-center rounded-full sm:h-[120px] sm:w-[120px] sm:bg-[#F2F2F2]'>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/card-1.svg`}
                  alt='payment'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <p className='text-qblack text-lg font-bold tracking-wide sm:text-xl'>
                  Datch Bangla Bank Ltd
                </p>
                <p className='text-thin-light-gray sm:text-18 text-sm tracking-wide'>
                  Bank **********5535
                </p>
                <p className='sm:text-18 text-sm tracking-wide text-green-500'>
                  Verified
                </p>
              </div>
            </div>
            <div>
              <button
                type='button'
                className='text-qblack sm:text-18 h-[40px] w-[116px] bg-accent text-sm font-medium tracking-wide sm:h-[46px]'
              >
                <span>Manage</span>
              </button>
            </div>
          </li>
          <li className='border-light-purple w-full items-center justify-between border-b py-[30px] sm:flex'>
            <div className='mb-3 flex items-center space-x-5 sm:mb-0'>
              <div className='flex items-center justify-center rounded-full sm:h-[120px] sm:w-[120px] sm:bg-[#F2F2F2]'>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/card-2.svg`}
                  alt='payment'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <p className='text-qblack text-lg font-bold tracking-wide sm:text-xl'>
                  Datch Bangla Bank Ltd
                </p>
                <p className='text-thin-light-gray sm:text-18 text-sm tracking-wide'>
                  Bank **********5535
                </p>
                <p className='sm:text-18 text-sm tracking-wide text-green-500'>
                  Verified
                </p>
              </div>
            </div>
            <div>
              <button
                type='button'
                className='text-qblack sm:text-18 h-[40px] w-[116px] bg-accent text-sm font-medium tracking-wide sm:h-[46px]'
              >
                <span>Manage</span>
              </button>
            </div>
          </li>
          <li className='border-light-purple w-full items-center justify-between border-b py-[30px] sm:flex'>
            <div className='mb-3 flex items-center space-x-5 sm:mb-0'>
              <div className='flex items-center justify-center rounded-full sm:h-[120px] sm:w-[120px] sm:bg-[#F2F2F2]'>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/card-3.svg`}
                  alt='payment'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <p className='text-qblack text-lg font-bold tracking-wide sm:text-xl'>
                  Datch Bangla Bank Ltd
                </p>
                <p className='text-thin-light-gray sm:text-18 text-sm tracking-wide'>
                  Bank **********5535
                </p>
                <p className='sm:text-18 text-sm tracking-wide text-green-500'>
                  Verified
                </p>
              </div>
            </div>
            <div>
              <button
                type='button'
                className='text-qblack sm:text-18 h-[40px] w-[116px] bg-accent text-sm font-medium tracking-wide sm:h-[46px]'
              >
                <span>Manage</span>
              </button>
            </div>
          </li>
          <li className='border-light-purple w-full items-center justify-between border-b py-[30px] sm:flex'>
            <div className='mb-3 flex items-center space-x-5 sm:mb-0'>
              <div className='flex items-center justify-center rounded-full sm:h-[120px] sm:w-[120px] sm:bg-[#F2F2F2]'>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/card-4.svg`}
                  alt='payment'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <p className='text-qblack text-lg font-bold tracking-wide sm:text-xl'>
                  Datch Bangla Bank Ltd
                </p>
                <p className='text-thin-light-gray sm:text-18 text-sm tracking-wide'>
                  Bank **********5535
                </p>
                <p className='sm:text-18 text-sm tracking-wide text-green-500'>
                  Verified
                </p>
              </div>
            </div>
            <div>
              <button
                type='button'
                className='text-qblack sm:text-18 h-[40px] w-[116px] bg-accent text-sm font-medium tracking-wide sm:h-[46px]'
              >
                <span>Manage</span>
              </button>
            </div>
          </li>
        </ul>
        <div className='flex space-x-4'>
          <button
            type='button'
            className='bg-qblack h-[50px] w-[126px] text-sm font-semibold text-white'
          >
            Add Card
          </button>
          <button
            type='button'
            className='text-qblack border-qblack h-[50px] w-[126px] border text-sm font-semibold'
          >
            Add Bank
          </button>
        </div>
      </div>
    </>
  )
}
