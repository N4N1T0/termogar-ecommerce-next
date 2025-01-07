'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import AddressDisplay from '@/components/Payment/address-card'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import NotificationsPageButton from '@/components/Payment/notification-buttons'

// * UTILS IMPORTS
import { useCart } from '@/stores'
import { calculateTotal, eurilize } from '@/lib/utils'
import { OrderData } from '@/types'

export default function FailedPaymentContent({
  failedPaymentData
}: {
  failedPaymentData: OrderData
}) {
  const { products, rehydrated } = useCart()
  const { user, orderId, gateway, discountCoupon, newAddress } =
    failedPaymentData

  // * VARIABLES
  const refactoredShippingAddress =
    newAddress === 'true'
      ? user?.shippingAddresses && user.shippingAddresses[0]
      : user?.billingAddress
  const refactoredCoupon =
    discountCoupon && !Array.isArray(discountCoupon)
      ? discountCoupon.split('-')
      : ['0', '0']

  const [subtotal, total, iva, shipping] = calculateTotal(
    products,
    refactoredShippingAddress?.postcode,
    {
      amount: Number(refactoredCoupon[0]),
      type: refactoredCoupon[1] as
        | 'percent'
        | 'fixed_cart'
        | 'fixed_product'
        | 'sign_up_fee'
        | undefined
    }
  )

  return (
    <div className='w-full space-y-4 p-6'>
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>
          Lo sentimos, {user?.firstName}. Tu pago no ha sido procesado.
        </h2>
        <div
          className='border-l-4 border-red-500 bg-red-100 p-4 text-red-700'
          role='alert'
        >
          <p className='font-bold'>Error</p>
        </div>
        <div
          className='border-l-4 border-red-500 bg-red-100 p-4 text-red-700'
          role='alert'
        >
          <p className='font-bold'>Pago Fallido</p>
          <p>
            Lo sentimos, no hemos podido procesar tu pago. Por favor, intenta de
            nuevo o contacta con el soporte para obtener ayuda.
          </p>
        </div>
        <div className='border-px grid grid-cols-2 gap-3 border-t border-gray-200 pt-2 lg:grid-cols-3'>
          <div>
            <h3 className='font-semibold'>ID de la orden:</h3>
            <p>{orderId}</p>
          </div>
          <div>
            <h3 className='font-semibold'>Método de Pago:</h3>
            <p>{gateway}</p>
          </div>
          <div>
            <h3 className='font-semibold'>Total:</h3>
            <p className='font-medium'>{eurilize(total)}</p>
          </div>
          <div>
            <h3 className='font-semibold'>SubTotal:</h3>
            <p className='font-medium'>{eurilize(subtotal)}</p>
          </div>
          {discountCoupon !== '0' && (
            <div>
              <h3 className='font-semibold'>Descuento:</h3>
              <p>{discountCoupon}</p>
            </div>
          )}
          <div>
            <span className='mb-3 block text-xs text-gray-600'>Envío</span>
            {shipping === 0 ? (
              <p className='text-base font-medium text-gray-900'>
                Envío Gratis
              </p>
            ) : (
              <p className='text-base font-medium text-gray-900'>
                Gastos de Envío
              </p>
            )}
            <p className='text-[15px] font-medium text-gray-900'>
              +{eurilize(shipping)}
            </p>
          </div>
        </div>
        <div className='space-y-2'>
          <h3 className='border-b border-gray-200 pb-2 font-semibold'>
            Productos:
          </h3>
          <ul className='list-inside list-disc border-b border-gray-200 py-2'>
            {rehydrated ? (
              products.map(
                ({
                  title,
                  quantity,
                  categories,
                  price,
                  sale,
                  id,
                  featuredMedia
                }) => (
                  <li
                    key={id}
                    className='border-px mb-2 flex items-center justify-between border-b border-gray-100 pb-2'
                  >
                    <div className='flex items-center justify-center gap-3'>
                      <Image
                        src={featuredMedia?.url || PlaceholderSquare}
                        width={50}
                        height={50}
                        priority
                        placeholder='blur'
                        blurDataURL={
                          featuredMedia?.blur || PlaceholderSquare.blurDataURL
                        }
                        alt={title || 'Sin Nombre'}
                        className='border-px h-[50px] w-[50px] border border-gray-200 object-cover'
                      />
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
      </div>
      <AddressDisplay
        address={user?.billingAddress}
        title='Dirección de Facturación'
      />
      <AddressDisplay
        address={refactoredShippingAddress}
        title='Dirección de Envío'
      />
      <NotificationsPageButton
        orderData={{
          ...failedPaymentData,
          status: 'failed',
          products,
          iva,
          refactoredCoupon,
          refactoredShippingAddress,
          total
        }}
      />
    </div>
  )
}
