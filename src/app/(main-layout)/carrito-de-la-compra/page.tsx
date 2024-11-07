// Next.js Imports
import Link from 'next/link'

// Project Components Imports
import BreadcrumbCom from '@/components/BreadcrumbCom'
import EmptyCardError from '@/components/EmptyCardError'
import InputCom from '@/components/Helpers/InputCom'
import PageTitle from '@/components/Helpers/PageTitle'
import ProductsTable from '@/components/CartPage/ProductsTable'
import CouponValidation from '@/components/CartPage/CouponValidation'

// Data Imports
import { products } from '@/data/products.json'

let CART_LENGTH = 3

const CartPage = () => {
  if (CART_LENGTH === 0) {
    return (
      <section id='Empty-Cart' className='cart-page-wrapper mt-5 w-full'>
        <div className='container-x mx-auto'>
          <BreadcrumbCom
            paths={[
              { name: 'P. Principal', path: '/' },
              { name: 'Carrito del la compra', path: '/carrito-de-la-compra' }
            ]}
          />
          <EmptyCardError />
        </div>
      </section>
    )
  }

  return (
    <div className='cart-page-wrapper w-full bg-white pb-[60px]'>
      <div className='w-full'>
        <PageTitle
          title='Tu carrito de la compra'
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Carrito del la compra', path: '/carrito-de-la-compra' }
          ]}
        />
      </div>
      <div className='mt-[23px] w-full'>
        <div className='container-x mx-auto'>
          <ProductsTable
            className='mb-[30px]'
            products={products.slice(0, 3)}
          />
          <div className='w-full justify-between sm:flex'>
            <CouponValidation />
            <div className='flex items-center space-x-2.5'>
              <a href='#'>
                <div className='flex h-[50px] w-[220px] items-center justify-center bg-[#F6F6F6]'>
                  <span className='text-sm font-semibold'>
                    Continue Shopping
                  </span>
                </div>
              </a>
              <a href='#'>
                <div className='flex h-[50px] w-[140px] items-center justify-center bg-[#F6F6F6]'>
                  <span className='text-sm font-semibold'>Update Cart</span>
                </div>
              </a>
            </div>
          </div>
          <div className='mt-[30px] flex w-full sm:justify-end'>
            <div className='w-full border border-[#EDEDED] px-[30px] py-[26px] sm:w-[370px]'>
              <div className='sub-total mb-6'>
                <div className='mb-6 flex justify-between'>
                  <p className='text-qblack text-[15px] font-medium'>
                    Subtotal
                  </p>
                  <p className='text-[15px] font-medium text-red-500'>$365</p>
                </div>
                <div className='h-[1px] w-full bg-[#EDEDED]'></div>
              </div>
              <div className='shipping mb-6'>
                <span className='text-qblack mb-[18px] block text-[15px] font-medium'>
                  Shipping
                </span>
                <ul className='flex flex-col space-y-1'>
                  <li>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2.5'>
                        <div className='input-radio'>
                          <input
                            type='radio'
                            name='price'
                            className='accent-pink-500'
                          />
                        </div>
                        <span className='text-normal text-gray-500two text-[13px]'>
                          Free Shipping
                        </span>
                      </div>
                      <span className='text-normal text-gray-500two text-[13px]'>
                        +$00.00
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2.5'>
                        <div className='input-radio'>
                          <input
                            type='radio'
                            name='price'
                            className='accent-pink-500'
                          />
                        </div>
                        <span className='text-normal text-gray-500two text-[13px]'>
                          Flat Rate
                        </span>
                      </div>
                      <span className='text-normal text-gray-500two text-[13px]'>
                        +$00.00
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2.5'>
                        <div className='input-radio'>
                          <input
                            type='radio'
                            name='price'
                            className='accent-pink-500'
                          />
                        </div>
                        <span className='text-normal text-gray-500two text-[13px]'>
                          Local Delivery
                        </span>
                      </div>
                      <span className='text-normal text-gray-500two text-[13px]'>
                        +$00.00
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='shipping-calculation mb-3 w-full'>
                <div className='title mb-[17px]'>
                  <h1 className='text-[15px] font-medium'>
                    Calculate Shipping
                  </h1>
                </div>
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
                <div className='h-[50px] w-full'>
                  <InputCom
                    inputClasses='w-full h-full'
                    type='text'
                    placeholder='Postcode / ZIP'
                  />
                </div>
              </div>
              <button type='button' className='mb-10 w-full'>
                <div className='flex h-[50px] w-full items-center justify-center bg-[#F6F6F6]'>
                  <span className='text-sm font-semibold'>Update Cart</span>
                </div>
              </button>
              <div className='total mb-6'>
                <div className='flex justify-between'>
                  <p className='text-qblack text-[18px] font-medium'>Total</p>
                  <p className='text-[18px] font-medium text-red-500'>$365</p>
                </div>
              </div>
              <Link href='/checkout'>
                <div className='black-btn flex h-[50px] w-full items-center justify-center'>
                  <span className='text-sm font-semibold'>
                    Proceed to Checkout
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
