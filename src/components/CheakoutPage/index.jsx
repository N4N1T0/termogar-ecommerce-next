import InputCom from '../Helpers/InputCom'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'

export default function CheakoutPage() {
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='checkout-page-wrapper w-full bg-white pb-[60px]'>
        <div className='mb-5 w-full'>
          <PageTitle
            title='Checkout'
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'checkout', path: '/checkout' }
            ]}
          />
        </div>
        <div className='checkout-main-content w-full'>
          <div className='container-x mx-auto'>
            <div className='mb-5 w-full sm:mb-10'>
              <div className='s sm:flex sm:space-x-[18px]'>
                <div className='mb-5 h-[70px] w-full sm:w-1/2'>
                  <a href='#'>
                    <div className='text-qblack flex h-full w-full items-center justify-center bg-[#F6F6F6]'>
                      <span className='text-[15px] font-medium'>
                        Log into your Account
                      </span>
                    </div>
                  </a>
                </div>
                <div className='h-[70px] flex-1'>
                  <a href='#'>
                    <div className='text-qblack flex h-full w-full items-center justify-center bg-[#F6F6F6]'>
                      <span className='text-[15px] font-medium'>
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='w-full lg:flex lg:space-x-[30px]'>
              <div className='w-full lg:w-1/2'>
                <h1 className='text-qblack mb-5 text-xl font-medium sm:text-2xl'>
                  Billing Details
                </h1>
                <div className='form-area'>
                  <form>
                    <div className='mb-6 items-center sm:flex sm:space-x-5'>
                      <div className='mb-5 sm:mb-0 sm:w-1/2'>
                        <InputCom
                          label='First Name*'
                          placeholder='Demo Name'
                          inputClasses='w-full h-[50px]'
                        />
                      </div>
                      <div className='flex-1'>
                        <InputCom
                          label='Last Name*'
                          placeholder='Demo Name'
                          inputClasses='w-full h-[50px]'
                        />
                      </div>
                    </div>
                    <div className='mb-6 flex items-center space-x-5'>
                      <div className='w-1/2'>
                        <InputCom
                          label='Email Address*'
                          placeholder='demoemial@gmail.com'
                          inputClasses='w-full h-[50px]'
                        />
                      </div>
                      <div className='flex-1'>
                        <InputCom
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
              </div>
              <div className='flex-1'>
                <h1 className='text-qblack mb-5 text-xl font-medium sm:text-2xl'>
                  Order Summary
                </h1>

                <div className='w-full border border-[#EDEDED] px-10 py-[30px]'>
                  <div className='sub-total mb-6'>
                    <div className='mb-5 flex justify-between'>
                      <p className='text-qblack text-[13px] font-medium uppercase'>
                        PROduct
                      </p>
                      <p className='text-qblack text-[13px] font-medium uppercase'>
                        total
                      </p>
                    </div>
                    <div className='h-[1px] w-full bg-[#EDEDED]'></div>
                  </div>
                  <div className='product-list mb-[30px] w-full'>
                    <ul className='flex flex-col space-y-5'>
                      <li>
                        <div className='flex items-center justify-between'>
                          <div>
                            <h4 className='text-qblack mb-2.5 text-[15px]'>
                              Apple Watch
                              <sup className='ml-2 mt-2 text-[13px] text-gray-500'>
                                x1
                              </sup>
                            </h4>
                            <p className='text-[13px] text-gray-500'>
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className='text-qblack text-[15px] font-medium'>
                              $38
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='flex items-center justify-between'>
                          <div>
                            <h4 className='text-qblack mb-2.5 text-[15px]'>
                              Apple Watch
                              <sup className='ml-2 mt-2 text-[13px] text-gray-500'>
                                x1
                              </sup>
                            </h4>
                            <p className='text-[13px] text-gray-500'>
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className='text-qblack text-[15px] font-medium'>
                              $38
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='flex items-center justify-between'>
                          <div>
                            <h4 className='text-qblack mb-2.5 text-[15px]'>
                              Apple Watch
                              <sup className='ml-2 mt-2 text-[13px] text-gray-500'>
                                x1
                              </sup>
                            </h4>
                            <p className='text-[13px] text-gray-500'>
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className='text-qblack text-[15px] font-medium'>
                              $38
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='h-[1px] w-full bg-[#EDEDED]'></div>

                  <div className='mt-[30px]'>
                    <div className='mb-5 flex justify-between'>
                      <p className='text-qblack text-[13px] font-medium uppercase'>
                        SUBTOTAL
                      </p>
                      <p className='text-qblack text-[15px] font-medium uppercase'>
                        $365
                      </p>
                    </div>
                  </div>

                  <div className='mt-[30px] w-full'>
                    <div className='sub-total mb-6'>
                      <div className='mb-5 flex justify-between'>
                        <div>
                          <span className='text-gray-500two mb-3 block text-xs'>
                            SHIPPING
                          </span>
                          <p className='text-qblack text-base font-medium'>
                            Free Shipping
                          </p>
                        </div>
                        <p className='text-qblack text-[15px] font-medium'>
                          +$0
                        </p>
                      </div>
                      <div className='h-[1px] w-full bg-[#EDEDED]'></div>
                    </div>
                  </div>

                  <div className='mt-[30px]'>
                    <div className='mb-5 flex justify-between'>
                      <p className='text-qblack text-2xl font-medium'>Total</p>
                      <p className='text-2xl font-medium text-red-500'>$365</p>
                    </div>
                  </div>
                  <div className='shipping mt-[30px]'>
                    <ul className='flex flex-col space-y-1'>
                      <li className='mb-5'>
                        <div className='mb-4 flex items-center space-x-2.5'>
                          <div className='input-radio'>
                            <input
                              type='radio'
                              name='price'
                              className='accent-pink-500'
                              id='transfer'
                            />
                          </div>
                          <label
                            htmlFor='transfer'
                            className='text-normal text-qblack text-[18px]'
                          >
                            Direct Bank Transfer
                          </label>
                        </div>
                        <p className='text-gray-500two ml-6 text-[15px]'>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      </li>
                      <li>
                        <div className='mb-5 flex items-center space-x-2.5'>
                          <div className='input-radio'>
                            <input
                              type='radio'
                              name='price'
                              className='accent-pink-500'
                              id='delivery'
                            />
                          </div>
                          <label
                            htmlFor='delivery'
                            className='text-normal text-qblack text-[18px]'
                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className='mb-5 flex items-center space-x-2.5'>
                          <div className='input-radio'>
                            <input
                              type='radio'
                              name='price'
                              className='accent-pink-500'
                              id='bank'
                            />
                          </div>
                          <label
                            htmlFor='bank'
                            className='text-normal text-qblack text-[18px]'
                          >
                            Credit/Debit Cards or Paypal
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <a href='#'>
                    <div className='black-btn flex h-[50px] w-full items-center justify-center'>
                      <span className='text-sm font-semibold'>
                        Place Order Now
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
