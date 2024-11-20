// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import React from 'react'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'
import Link from 'next/link'
import OrderSummary from '@/components/CheakoutPage/order-summary'
import BillingAddress from '@/components/CheakoutPage/billing-address'

export const metadata: Metadata = {
  title: 'Formulario de Pago',
  description: 'Formulario de pago para termogar.'
}

const CheckoutPage = () => {
  return (
    <main className='checkout-page-wrapper w-full bg-white pb-[60px]'>
      <PageTitle
        title='Formulario de Pago'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Formulario de Pago', path: '/checkout' }
        ]}
      />
      <div className='container-x mx-auto mt-5 w-full'>
        <div className='mb-5 w-full sm:mb-10 sm:flex sm:space-x-[18px]'>
          <Link href='#' className='mb-5 h-[70px] w-full sm:w-1/2'>
            <div className='text-qblack hover-200 flex h-full w-full items-center justify-center bg-secondary hover:text-gray-100'>
              <span className='text-[15px] font-medium'>
                Iniciar Sesión en tu Cuenta
              </span>
            </div>
          </Link>
          <Link href='#coupon' className='h-[70px] flex-1'>
            <div className='text-qblack hover-200 flex h-full w-full items-center justify-center bg-secondary hover:text-gray-100'>
              <span className='text-[15px] font-medium'>
                Ingresar Código de Cupón
              </span>
            </div>
          </Link>
        </div>
        <div className='w-full lg:flex lg:space-x-[30px]'>
          <BillingAddress />
          <OrderSummary />
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
