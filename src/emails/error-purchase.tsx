import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { eurilize } from '@/lib/utils'
import { CartItemType } from '@/types'
import { Address, GET_USER_INFOResult } from '@/types/sanity'

interface ErrorPurchaseProps {
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

export const ErrorPurchase = ({
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
}: ErrorPurchaseProps) => {
  const previewText = `Problema en la compra de ${user?.firstName} ${user?.lastName}`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-6 text-center text-4xl font-bold text-red-500'>
        Error en la Creación de Compra
      </Heading>
      <Text className='mb-4 text-base text-gray-700'>
        Hola Equipo de Administración,
      </Text>
      <Text className='mb-6 text-base text-gray-700'>
        Se ha producido un error inesperado durante la creación de la compra
        para el cliente {user?.firstName} {user?.lastName}. La compra se ha
        completado con éxito, pero los detalles no se han registrado
        correctamente en nuestro sistema. Por favor, revisen el dashboard del
        gateway de pagos ({gateway}) para verificar la confirmación de la
        compra.
      </Text>
      {/* ORDER SUMMARY */}
      <Section
        className='mb-6 border p-6'
        style={{ border: '1px solid #e5e7eb' }}
      >
        <Text className='mb-2 text-sm text-gray-700'>
          <strong>Número de pedido:</strong> #{orderNumber}
        </Text>
        <Text className='mb-2 text-sm text-gray-700'>
          <strong>Total:</strong> {eurilize(Number(totalAmount))}
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
          <strong>Fecha de compra:</strong>{' '}
          {new Date(purchaseDate).toLocaleDateString('es-ES')}
        </Text>
      </Section>

      {/* New Section for Shipping Information */}
      <Section
        className='mb-6 mt-3 p-6'
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
          <strong>Compañía:</strong> {user?.companyName || ''}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Documento:</strong> {user?.IdDocument || ''}
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

      {/* New Section for Shipping Information */}
      <Section
        className='mb-6 mt-3 p-6'
        style={{ border: '1px solid #e5e7eb' }}
      >
        <Text className='mb-4 text-xl text-accent'>
          <strong>Datos del Envío</strong>
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Calle:</strong> {shippingAddress?.address1 || ''}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Piso:</strong> {shippingAddress?.address2 || ''}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Código Postal:</strong> {shippingAddress?.postcode || ''}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Localidad:</strong> {shippingAddress?.state || ''}
        </Text>
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
    </TailwindWrapper>
  )
}

ErrorPurchase.PreviewProps = {
  customerName: 'Cliente Valorado',
  orderNumber: '12345',
  totalAmount: 'N/A',
  purchaseDate: new Date(),
  products: [],
  gateway: 'Transferencia',
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'rB4Qs@example.com',
    billingAddress: [
      {
        address1: '123 Main St',
        address2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postcode: '10001',
        country: 'United States',
        phone: '123-456-7890'
      }
    ]
  },
  iva: 23,
  shippingAddress: [
    {
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postcode: '10001',
      country: 'United States',
      phone: '123-456-7890'
    }
  ],
  billingAddress: [
    {
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postcode: '10001',
      country: 'United States',
      phone: '123-456-7890'
    }
  ],
  discountCoupon: 0
} as unknown as ErrorPurchaseProps

export default ErrorPurchase
