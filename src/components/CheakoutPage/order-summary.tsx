'use client'
import { eurilize } from '@/lib/utils'
import { useCart } from '@/stores'
import React from 'react'
import CouponValidation from '@/components/CartPage/coupon-validation'
import { Coupon } from '@/types/sanity'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'

const OrderSummary = () => {
  const { products, rehydrated } = useCart()
  const [coupon, setCoupon] = React.useState<{
    amount: number
    type: Coupon['discount_type']
  }>({
    amount: 0,
    type: 'fixed_cart'
  })

  const cartTotal = products.reduce((total, item) => {
    const price = item.price || item.sale?.price || 1
    return total + price * item.quantity
  }, 0)

  console.log(coupon)

  return (
    <section id='order-summary' className='flex-1'>
      <h2 className='mb-5 text-xl font-medium text-gray-900 sm:text-2xl'>
        Resumen de Orden
      </h2>

      <div className='w-full border border-gray-200 px-10 py-[30px]'>
        <div className='mb-10 flex items-center justify-between border-b border-gray-200'>
          <p className='text-[13px] font-medium uppercase text-gray-900'>
            Productos
          </p>
          <p className='text-[13px] font-medium uppercase text-gray-900'>
            total
          </p>
        </div>
        <div className='mb-7 w-full border-b border-gray-200 pb-3'>
          <ul className='flex flex-col space-y-5'>
            {rehydrated ? (
              products.map(
                ({ title, quantity, categories, price, sale, id }) => (
                  <li key={id} className='flex items-center justify-between'>
                    <div>
                      <h4 className='mb-2.5 text-[15px] text-gray-900'>
                        {title}
                        <sup className='ml-2 mt-2 text-[13px] text-gray-500'>
                          x{quantity}
                        </sup>
                      </h4>
                      <p className='w-full text-balance text-[13px] text-gray-500'>
                        {categories?.map((category, index) => (
                          <span key={category.id}>
                            {' '}
                            {category.name}
                            {index === categories.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div>
                      <span className='text-[15px] font-medium text-gray-900'>
                        {eurilize((sale && sale.price) || price || 0)}
                      </span>
                    </div>
                  </li>
                )
              )
            ) : (
              <div className='grid w-full place-content-center'>
                <LoaderStyleOne />
              </div>
            )}
          </ul>
        </div>
        <div className='mt-[30px]'>
          <div className='mb-5 flex justify-between'>
            <p className='text-[13px] font-medium uppercase text-gray-900'>
              SUBTOTAL
            </p>
            <p className='text-[15px] font-medium uppercase text-accent'>
              {eurilize(cartTotal)}
            </p>
          </div>
        </div>

        <div className='mt-8 w-full border-b border-gray-200 pb-3'>
          <div className='mb-2 flex justify-between border-b border-gray-200 pb-2'>
            <div>
              <span className='mb-3 block text-xs text-gray-600'>Envío</span>
              <p className='text-base font-medium text-gray-900'>
                Envío Gratis
              </p>
            </div>
            <p className='text-[15px] font-medium text-gray-900'>+$0</p>
          </div>
          <CouponValidation
            cart={products}
            setCoupon={setCoupon}
            className='mt-3 sm:w-full'
          />
        </div>

        <div className='mb-5 mt-9 flex justify-between'>
          <p className='text-2xl font-medium text-gray-900'>Total</p>
          <p className='text-2xl font-medium text-accent'>$365</p>
        </div>
        <ul className='mt-9 flex flex-col space-y-1'>
          {['Transferencia bancaria directa', 'PayPal', 'Tarjeta'].map(
            (paymentType) => (
              <li className='mb-5' key={paymentType}>
                <div className='mb-4 flex items-center space-x-2.5'>
                  <div className='input-radio'>
                    <input
                      type='radio'
                      name='payment-type'
                      value={paymentType.replace(' ', '-')}
                      className='accent-accent'
                      id={paymentType.replace(' ', '-')}
                    />
                  </div>
                  <label
                    htmlFor={paymentType.replace(' ', '-')}
                    className='text-normal text-[18px] text-gray-900'
                  >
                    {paymentType}
                  </label>
                </div>
                {paymentType === 'Transferencia bancaria directa' && (
                  <p className='ml-6 text-[15px] text-gray-600'>
                    Realiza tu pago directamente en nuestra cuenta bancaria. Por
                    favor, utiliza tu ID de pedido como referencia de pago.
                  </p>
                )}
              </li>
            )
          )}
        </ul>
      </div>
      <a href='#'>
        <div className='hover-200 flex h-[50px] w-full items-center justify-center bg-accent hover:text-gray-100'>
          <span className='text-sm font-semibold'>Realizar pedido ahora</span>
        </div>
      </a>
    </section>
  )
}

export default OrderSummary
