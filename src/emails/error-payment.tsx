import { Section, Text, Heading, Container } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { eurilize } from '@/lib/utils'
import { CartItemType } from '@/types'
import { Costumer } from '@/types/sanity'

interface ErrorPaymentProps {
  totalAmount: string
  purchaseDate: string
  products: CartItemType[]
  user: Costumer
  errorDetails: string
  orderId: string
}

export const ErrorPayment = ({
  totalAmount,
  user,
  errorDetails,
  orderId,
  products,
  purchaseDate
}: ErrorPaymentProps) => {
  const previewText = `Error en el pago de ${user?.firstName} ${user?.lastName}`

  return (
    <TailwindWrapper previewText={previewText}>
      <Container className='mx-auto max-w-screen-sm p-4'>
        <Heading className='mb-6 text-center text-4xl font-bold text-red-500'>
          Error en el Pago
        </Heading>
        <Text className='mb-4 text-base text-gray-700'>
          Hola Equipo de Administración,
        </Text>
        <Text className='mb-6 text-base text-gray-700'>
          Se ha producido un error inesperado durante el proceso de pago para el
          cliente {user?.firstName} {user?.lastName}. en la fecha{' '}
          {new Date(purchaseDate).toLocaleDateString('es-ES')}. Por favor,
          revisen los detalles a continuación para investigar el problema.
        </Text>

        {/* Error Details */}
        <Section className='mb-6 p-6' style={{ border: '1px solid #e5e7eb' }}>
          <Text className='mb-4 text-xl text-gray-700'>
            <strong>Detalles del Error</strong>
          </Text>
          <Text className='text-sm text-red-500'>{errorDetails || ''}</Text>
        </Section>

        <Section className='mb-6 p-6' style={{ border: '1px solid #e5e7eb' }}>
          <Text className='mb-2 text-sm text-gray-700'>
            <strong>Número de Pedido:</strong> #
            {orderId || 'Sin Número de Orden'}
          </Text>
          <Text className='mb-2 text-sm text-gray-700'>
            <strong>Total:</strong> {eurilize(Number(totalAmount))}
          </Text>
        </Section>

        {/* User Data Section */}
        <Section className='mb-6 p-6' style={{ border: '1px solid #e5e7eb' }}>
          <Text className='mb-4 text-xl text-gray-700'>
            <strong>Datos del Usuario</strong>
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Nombre:</strong> {user?.firstName || 'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Email:</strong> {user?.email || 'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Teléfono:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress[0].phone) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Calle:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress[0].address1) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Piso:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress[0].address2) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Código Postal:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress[0].postcode) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Localidad:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress[0].state) ||
              'No disponible'}
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
      </Container>
    </TailwindWrapper>
  )
}

ErrorPayment.PreviewProps = {
  totalAmount: 350,
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
  errorDetails: 'Error al procesar el pago',
  orderId: '123456789',
  products: [],
  purchaseDate: new Date()
} as unknown as ErrorPaymentProps

export default ErrorPayment
