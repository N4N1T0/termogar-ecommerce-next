import React from 'react'
import InputCom from '../Helpers/InputCom'

const BillingAddress = () => {
  return (
    <section id='billing-address' className='w-full lg:w-1/2'>
      <h1 className='text-qblack mb-5 text-xl font-medium sm:text-2xl'>
        Billing Details
      </h1>
      <div className='form-area'>
        <form>
          <div className='mb-6 items-center sm:flex sm:space-x-5'>
            <div className='mb-5 sm:mb-0 sm:w-1/2'>
              <InputCom
                type='text'
                label='First Name*'
                placeholder='Demo Name'
                inputClasses='w-full h-[50px]'
              />
            </div>
            <div className='flex-1'>
              <InputCom
                type='text'
                label='Last Name*'
                placeholder='Demo Name'
                inputClasses='w-full h-[50px]'
              />
            </div>
          </div>
          <div className='mb-6 flex items-center space-x-5'>
            <div className='w-1/2'>
              <InputCom
                type='text'
                label='Email Address*'
                placeholder='demoemial@gmail.com'
                inputClasses='w-full h-[50px]'
              />
            </div>
            <div className='flex-1'>
              <InputCom
                type='text'
                label='Phone Number*'
                placeholder='012 3  *******'
                inputClasses='w-full h-[50px]'
              />
            </div>
          </div>
          <div className='mb-6'>
            <h1 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
              Country*
            </h1>
            <div className='mb-2 flex h-[50px] w-full items-center justify-between border border-[#EDEDED] px-5'>
              <span className='text-gray-500two text-[13px]'>
                Select Country
              </span>
              <span>
                <svg
                  width='11'
                  height='7'
                  viewBox='0 0 11 7'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                    fill='#222222'
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className='mb-6'>
            <div className='w-full'>
              <InputCom
                type='text'
                label='Address*'
                placeholder='your address here'
                inputClasses='w-full h-[50px]'
              />
            </div>
          </div>
          <div className='mb-6 flex items-center space-x-5'>
            <div className='w-1/2'>
              <h1 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
                Town / City*
              </h1>
              <div className='flex h-[50px] w-full items-center justify-between border border-[#EDEDED] px-5'>
                <span className='text-gray-500two text-[13px]'>
                  Miyami Town
                </span>
                <span>
                  <svg
                    width='11'
                    height='7'
                    viewBox='0 0 11 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                      fill='#222222'
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className='flex-1'>
              <InputCom
                type='text'
                label='Postcode / ZIP*'
                placeholder=''
                inputClasses='w-full h-[50px]'
              />
            </div>
          </div>
          <div className='mb-10 flex items-center space-x-2'>
            <div>
              <input type='checkbox' name='' id='create' />
            </div>
            <label
              htmlFor='create'
              className='text-qblack select-none text-[15px]'
            >
              Create an account?
            </label>
          </div>
          <div>
            <h1 className='text-qblack mb-3 text-2xl font-medium'>
              Billing Details
            </h1>
            <div className='mb-10 flex items-center space-x-2'>
              <div>
                <input type='checkbox' name='' id='address' />
              </div>
              <label
                htmlFor='address'
                className='text-qblack select-none text-[15px]'
              >
                Ship to a different address
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BillingAddress
