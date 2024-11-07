import { useState } from 'react'
import InputCom from '../../Helpers/InputCom'
import Layout from '../../Partials/Layout'
import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [checked, setValue] = useState(false)
  const rememberMe = () => {
    setValue(!checked)
  }
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='login-page-wrapper w-full py-10'>
        <div className='container-x mx-auto'>
          <div className='relative items-center lg:flex'>
            <div className='flex w-full flex-col justify-center border border-[#E0E0E0] bg-white p-5 sm:p-10 lg:h-[783px] lg:w-[572px]'>
              <div className='w-full'>
                <div className='title-area relative mb-7 flex flex-col items-center justify-center text-center'>
                  <h1 className='text-qblack text-[34px] font-bold leading-[74px]'>
                    Create Account
                  </h1>
                  <div className='shape -mt-6'>
                    <svg
                      width='354'
                      height='30'
                      viewBox='0 0 354 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1'
                        stroke='#FFBB38'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </div>
                <div className='input-area'>
                  <div className='mb-5 flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                    <InputCom
                      placeholder='Demo Name'
                      label='Frist Name*'
                      name='fname'
                      type='text'
                      inputClasses='h-[50px]'
                    />

                    <InputCom
                      placeholder='Demo Name'
                      label='Last Name*'
                      name='lname'
                      type='text'
                      inputClasses='h-[50px]'
                    />
                  </div>
                  <div className='mb-5 flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                    <InputCom
                      placeholder='Demo@gmail.com'
                      label='Email Address*'
                      name='email'
                      type='email'
                      inputClasses='h-[50px]'
                    />

                    <InputCom
                      placeholder='0213 *********'
                      label='Phone*'
                      name='phone'
                      type='text'
                      inputClasses='h-[50px]'
                    />
                  </div>

                  <div className='input-item mb-5'>
                    <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
                      Country*
                    </h6>
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
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className='input-item mb-5'>
                    <InputCom
                      placeholder='Your address Here'
                      label='Address*'
                      name='address'
                      type='text'
                      inputClasses='h-[50px]'
                    />
                  </div>
                  <div className='mb-5 flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                    <div className='w-1/2'>
                      <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
                        Town / City*
                      </h6>
                      <div className='mb-2 flex h-[50px] w-full items-center justify-between border border-[#EDEDED] px-5'>
                        <span className='text-gray-500two text-[13px]'>
                          Maiyami
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
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className='flex-1'>
                      <div className='mb-5 h-[50px] w-full sm:mb-0'>
                        <InputCom
                          label='Postcode / ZIP*'
                          inputClasses='w-full h-full'
                          type='text'
                          placeholder='00000'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='forgot-password-area mb-7'>
                    <div className='remember-checkbox flex items-center space-x-2.5'>
                      <button
                        onClick={rememberMe}
                        type='button'
                        className='text-qblack border-light-gray flex h-5 w-5 items-center justify-center border'
                      >
                        {checked && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={rememberMe}
                        className='text-base text-black'
                      >
                        I agree all
                        <span className='text-qblack'>tarm and condition</span>
                        in BigShop.
                      </span>
                    </div>
                  </div>
                  <div className='signin-area mb-3'>
                    <div className='flex justify-center'>
                      <button
                        type='button'
                        className='black-btn bg-purple flex h-[50px] w-full items-center justify-center text-sm font-semibold text-white'
                      >
                        <span>Create Account</span>
                      </button>
                    </div>
                  </div>

                  <div className='signup-area flex justify-center'>
                    <p className='text-gray-500two text-base font-normal'>
                      Alrady have an Account?
                      <Link to='/login' className='text-qblack ml-2'>
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scale-60 hidden flex-1 transform lg:flex xl:scale-100 xl:justify-center'>
              <div
                className='absolute -right-[138px] xl:-right-20'
                style={{ top: 'calc(50% - 258px)' }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
