import { Section, Text, Heading, Container } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { GET_USER_INFOResult } from '@/types/sanity'

interface ErrorPaymentProps {
  purchaseDate: string
  user: GET_USER_INFOResult
  errorDetails: string
  orderId: string
}

export const ErrorPayment = ({
  user,
  errorDetails,
  orderId,
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
            {(user?.billingAddress && user?.billingAddress.phone) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Calle:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress.address1) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Piso:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress.address2) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Código Postal:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress.postcode) ||
              'No disponible'}
          </Text>
          <Text className='text-sm text-gray-700'>
            <strong>Localidad:</strong>{' '}
            {(user?.billingAddress && user?.billingAddress.state) ||
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
  purchaseDate: new Date()
} as unknown as ErrorPaymentProps

export default ErrorPayment
