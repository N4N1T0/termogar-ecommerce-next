'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'
import React from 'react'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import AddressDisplay from '@/components/Payment/address-card'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import NotificationsPageButton from './notification-buttons'

// * UTILS IMPORTS
import { useCart } from '@/stores'
import { calculateTotal, eurilize } from '@/lib/utils'
import { CartItemType, OrderData } from '@/types'
import { Pencil } from 'lucide-react'

const SuccessContent = ({
  orderData,
  followLink
}: {
  orderData: OrderData
  followLink: string
}) => {
  const { products, rehydrated } = useCart()
  const { user, orderId, newAddress, gateway, discountCoupon } = orderData

  // * VARIABLES
  const refactoredShippingAddress =
    newAddress === 'true'
      ? user?.shippingAddresses && user.shippingAddresses[0]
      : user?.billingAddress

  const refactoredCoupon = React.useMemo(() => {
    return discountCoupon && !Array.isArray(discountCoupon)
      ? discountCoupon.split('-')
      : ['0', '0']
  }, [discountCoupon])

  // Referencia al contenedor para impresión
  const printRef = React.useRef<HTMLDivElement>(null)

  const handlePrint = React.useCallback(() => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload() // Recarga para restaurar el contenido original
    }
  }, [])

  const [subtotal, total, iva, shipping] = React.useMemo(() => {
    return calculateTotal(products, refactoredShippingAddress?.postcode, {
      amount: Number(refactoredCoupon[0]),
      type: refactoredCoupon[1] as
        | 'percent'
        | 'fixed_cart'
        | 'fixed_product'
        | 'sign_up_fee'
        | undefined
    })
  }, [products, refactoredShippingAddress?.postcode, refactoredCoupon])

  const ProductItem = React.memo((product: CartItemType) => {
    const {
      title,
      quantity,
      categories,
      price,
      sale,
      id,
      featuredMedia,
      selectedOption
    } = product

    return (
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
            blurDataURL={featuredMedia?.blur || PlaceholderSquare.blurDataURL}
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
            {selectedOption === '' ? (
              <p className='w-full text-balance text-[13px] text-gray-500'>
                {categories?.map((category, index) => (
                  <span key={category.id}>
                    {' '}
                    {category.name}
                    {index === categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
            ) : (
              <span className='text-balance text-[13px] text-gray-500'>
                {selectedOption}
              </span>
            )}
          </div>
        </div>
        <div>
          <span className='text-[15px] font-medium text-gray-900'>
            {eurilize((sale && sale.price) || price || 0)}
          </span>
        </div>
      </li>
    )
  })

  ProductItem.displayName = 'ProductItem'

  return (
    <div className='w-full space-y-4 p-6' ref={printRef}>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-2xl font-bold'>
          Gracias por tu compra,{' '}
          <span className='text-accent'>{user?.firstName}!</span>
        </h2>
        <button
          onClick={handlePrint}
          className='hover-200 flex items-center gap-2 bg-green-500 px-3 py-1 text-gray-100 hover:text-gray-900'
        >
          <Pencil size={16} /> Imprimir
        </button>
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
          <h3 className='font-semibold'>IVA:</h3>
          <p>{eurilize(iva)}</p>
        </div>
        <div>
          <h3 className='font-semibold'>Total:</h3>
          <p className='text-lg font-medium'>{eurilize(total)}</p>
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
          <h3 className='font-semibold'>Envío</h3>
          {shipping === 0 ? (
            <p className='text-sm font-medium text-gray-900'>Envío Gratis</p>
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
      {gateway === 'transferencia-bancaria-directa' && (
        <div className='border-px border-t border-gray-200 pt-2'>
          Has elegido el método de Pago por Transferencia o Ingreso Directo,
          deberás realizar el pago desde tu propia entidad mediante
          transferencia. Por favor, usa el{' '}
          <strong>Nº DE PEDIDO Y TU NOMBRE</strong> como concepto de pago. Tu
          pedido no será enviado hasta que los fondos hayan sido recibidos en
          nuestra cuenta.{' '}
          <strong>Dispones de un plazo de 3 días laborables</strong>, a contar
          desde la realización de la compra, para proceder al pago.
          <div className='mt-1 font-semibold text-accent underline'>
            ENTIDAD: BANCO SANTANDER
          </div>
          <div className='mt-1 font-semibold text-accent underline'>
            IBAN: ES63 0049 3207 5321 1401 6384
          </div>
          <small className='mt-1'>
            Si la entidad bancaria desde la que nos haces el pago es diferente a
            la nuestra, es posible que se demore la recepción del pago en un
            plazo de 24 a 48 horas.
          </small>
        </div>
      )}
      <div className='space-y-2'>
        <h3 className='border-px w-fit border-b border-gray-500 font-semibold uppercase'>
          PRODUCTOS:
        </h3>
        <ul className='list-inside list-disc border-b border-gray-200 py-2'>
          {rehydrated ? (
            products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))
          ) : (
            <div className='grid w-full place-content-center'>
              <LoaderStyleOne />
            </div>
          )}
        </ul>
      </div>
      <div className='flex flex-col gap-2 md:flex-row'>
        <AddressDisplay
          address={user?.billingAddress}
          title='Dirección de Facturación'
        />
        <AddressDisplay
          address={refactoredShippingAddress}
          title='Dirección de Envío'
        />
      </div>
      <NotificationsPageButton
        orderData={{
          ...orderData,
          status: 'success',
          products,
          iva,
          refactoredCoupon,
          refactoredShippingAddress,
          total
        }}
        followLink={followLink}
      />
    </div>
  )
}

export default SuccessContent
