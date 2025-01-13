import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { eurilize } from '@/lib/utils'
import { CartItemType } from '@/types'
import { Address, GET_USER_INFOResult } from '@/types/sanity'

interface CompletedPurchaseProps {
  orderNumber: string
  totalAmount: string
  purchaseDate: string
  products: CartItemType[]
  gateway: string
  user: GET_USER_INFOResult
  iva: string
  shippingAddress: Address
  billingAddress: Address
  discountCoupon: number
}

export const CompletedPurchase = ({
  orderNumber,
  totalAmount,
  purchaseDate,
  products,
  gateway,
  user,
  iva,
  shippingAddress,
  billingAddress,
  discountCoupon
}: CompletedPurchaseProps) => {
  const previewText = `hola ${user?.firstName} ${user?.lastName}! su compra en Termogar.es ha sido realizada con exito`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-6 text-center text-4xl font-bold text-accent'>
        Confirmación de Pago via{' '}
        <span className='font-bold uppercase'>{gateway}</span>
      </Heading>
      <Text className='mb-4 text-base text-gray-700'>
        Hola {user?.firstName},
      </Text>
      <Text className='mb-6 text-base text-gray-700'>
        Gracias por tu compra. Estamos emocionados de confirmar que tu pedido ha
        sido procesado con éxito.
      </Text>
      <div className='flex w-full gap-3'>
        {/* ORDER SUMMARY */}
        <Section
          className='mb-6 border p-6'
          style={{ border: '1px solid #e5e7eb' }}
        >
          <Text className='mb-4 text-xl text-accent'>
            <strong>Datos del Pedido</strong>
          </Text>
          <Text className='mb-2 text-sm text-gray-700'>
            <strong>Número de pedido:</strong> #{orderNumber}
          </Text>
          <Text className='mb-2 text-sm text-gray-700'>
            <strong>Total:</strong> {eurilize(Number(totalAmount))}
          </Text>
          <Text className='mb-2 text-sm text-gray-700'>
            <strong>Subtotal:</strong> {eurilize(Number(totalAmount))}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Iva:</strong> {eurilize(Number(iva))}
          </Text>
          {discountCoupon > 0 && (
            <Text className='text-sm text-gray-700'>
              <strong>Descuento por Cupon:</strong> -{discountCoupon}%{' '}
              <span>
                (-
                {eurilize(
                  Number(totalAmount) / (1 - discountCoupon / 100) -
                    Number(totalAmount)
                )}
                )
              </span>
            </Text>
          )}
          <Text className='text-sm text-gray-700'>
            <strong>Fecha:</strong> {purchaseDate}
          </Text>
        </Section>

        {/* New Section for Shipping Information */}
        <Section
          className='mb-6 h-full p-6'
          style={{ border: '1px solid #e5e7eb' }}
        >
          <Text className='mb-4 text-xl text-accent'>
            <strong>Datos de Facturación</strong>
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Nombre:</strong> {user?.firstName || ''}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Email:</strong> {user?.email || ''}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Teléfono:</strong> {billingAddress?.phone || ''}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Calle:</strong> {billingAddress.address1}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Piso:</strong> {billingAddress.address2}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Código Postal:</strong> {billingAddress.postcode}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Localidad:</strong> {billingAddress.city}
          </Text>
        </Section>
      </div>

      {/* New Section for Shipping Information */}
      <Section
        className='mb-6 mt-3 p-6'
        style={{ border: '1px solid #e5e7eb' }}
      >
        <Text className='mb-4 text-xl text-accent'>
          <strong>Datos del Envío</strong>
        </Text>
        <div className='flex w-full flex-row gap-3'>
          <div className='flex-1'>
            <Text className='text-sm text-gray-700'>
              <strong>Nombre:</strong> {shippingAddress?.firstName || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Email:</strong> {shippingAddress?.email || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Piso:</strong> {shippingAddress?.address2 || ''}
            </Text>
          </div>
          <div className='flex-1'>
            <Text className='text-sm text-gray-700'>
              <strong>Calle:</strong> {shippingAddress?.address1 || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Código Postal:</strong> {shippingAddress?.postcode || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Localidad:</strong> {shippingAddress?.state || ''}
            </Text>
          </div>
        </div>
      </Section>

      <Section
        className='mb-6 mt-3 p-6'
        style={{ border: '1px solid #e5e7eb' }}
      >
        <Text className='mb-2 text-xl text-accent'>
          <strong>Productos:</strong>
        </Text>
        <table width='100%' style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Producto</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Cantidad</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, title, quantity, price }) => (
              <tr key={id} style={{ borderBottom: '1px solid #dddddd' }}>
                <td
                  style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <p>{title}</p>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {quantity}
                </td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  {eurilize(price ? quantity * price : quantity * 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {gateway === 'transferencia-bancaria-directa' && (
        <>
          <Text className='text-gray-800'>
            Si has elegido pagar mediante transferencia, solo tienes que
            realizar la transferencia a la cuenta{' '}
          </Text>
          <Text className='font-bold'>IBAN: ES04 0182 4136 9102 0178 4853</Text>
          <Text className='font-bold'>BIC: BBVAESMMXXX</Text>
          <Text className='font-bold'>
            con el concepto: &quot;termogar-{orderNumber}&quot;
          </Text>
          <Text>
            Después de recibir la confirmación de la transferencia, nosotros nos
            pondremos en contacto contigo para confirmar la recepción del pago y
            proceder con el envío de tu pedido.
          </Text>
        </>
      )}
    </TailwindWrapper>
  )
}

CompletedPurchase.PreviewProps = {
  orderNumber: '12345',
  totalAmount: 2000,
  purchaseDate: new Date().toLocaleDateString('es-ES'),
  products: [],
  gateway: 'Transferencia',
  user: {
    firstName: 'John Doe',
    email: 'rB4Qs@example.com'
  },
  iva: 2000 * 0.21,
  shippingAddress: {
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'United States',
    phone: '123-456-7890'
  },
  billingAddress: {
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'United States',
    phone: '123-456-7890'
  },
  discountCoupon: 0
} as unknown as CompletedPurchaseProps

export default CompletedPurchase
