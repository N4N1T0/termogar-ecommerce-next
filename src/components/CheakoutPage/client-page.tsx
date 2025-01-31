'use client'

import React from 'react'
import BillingAddress from './billing-address'
import OrderSummary from './order-summary'
import LastMinute from './last-minute'
import { GET_USER_INFOResult } from '@/types/sanity'
import LoaderStyleOne from '../Helpers/Loaders/LoaderStyleOne'
import { cn } from '@/lib/utils'

const ClientPage = ({
  searchesUser,
  userId,
  newAddress
}: {
  searchesUser: GET_USER_INFOResult | null
  userId: string | string[] | undefined
  newAddress: string | string[] | undefined
}) => {
  const [loading, setLoading] = React.useState(false)

  return (
    <div className='container-x mx-auto mt-5 w-full'>
      <div
        className={cn(
          'relative w-full lg:flex lg:space-x-[30px]',
          loading ? 'pointer-events-none opacity-50' : ''
        )}
      >
        {/* Loading State */}
        {loading && (
          <div className='absolute inset-0 z-50 grid h-full w-full place-content-center'>
            <LoaderStyleOne />
          </div>
        )}

        <BillingAddress user={searchesUser} />
        <OrderSummary
          userId={userId}
          newAddress={newAddress}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <React.Suspense fallback={<LoaderStyleOne />}>
        <LastMinute disabled={loading} />
      </React.Suspense>
    </div>
  )
}

export default ClientPage
