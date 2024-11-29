// * NEXT.JS IMPORTS
import { Metadata } from 'next'
import React from 'react'

// * ASSETS IMPORTS
import PageTitle from '@/components/Helpers/PageTitle'
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
        <div className='w-full lg:flex lg:space-x-[30px]'>
          <BillingAddress />
          <OrderSummary />
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
