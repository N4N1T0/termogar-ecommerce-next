import { Section, Text, Heading, Link } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { eurilize } from '@/lib/utils'
import { CartItemType } from '@/types'
import { Costumer } from '@/types/sanity'

interface PackageOnDeliveryProps {
  orderId: string
  expectedDeliveryDate: Date
  products: CartItemType[]
  shippingAddress: Record<string, string>
  currier: string
  currierCode: string
  user: Costumer
  currierLink: string
}

export const PackageOnDelivery = ({
  orderId,
  expectedDeliveryDate,
  products,
  shippingAddress,
  currier,
  currierCode,
  user,
  currierLink
}: PackageOnDeliveryProps) => {
  const previewText = `${user?.firstName} ${user?.lastName} - Tu Paquete Está en Camino`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-6 text-center text-4xl font-bold text-accent'>
        Tu Paquete Está en Camino
      </Heading>
      <Text className='mb-4 text-base text-gray-700'>
        Hola ${user?.firstName} ${user?.lastName}
      </Text>
      <Text className='mb-6 text-base text-gray-700'>
        ¡Buenas noticias! Tu pedido con número de orden #{orderId} ha sido
        enviado y está en camino hacia ti.
      </Text>

      {/* Shipping Information */}
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

      {/* Expected Delivery and Tracking */}
      <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
        <Text className='mb-4 text-xl text-gray-700'>
          <strong>Información de Entrega</strong>
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Fecha Estimada de Entrega:</strong>{' '}
          {expectedDeliveryDate.toLocaleString('es-ES').split(',')[0]}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Transportista:</strong> {currier}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Código de Seguimiento:</strong> {currierCode}
        </Text>
        <Text className='text-sm text-gray-700'>
          <strong>Enlace de seguimiento:</strong>{' '}
          <Link href={currierLink} target='_blank'>
            Clique aquí
          </Link>
        </Text>
      </Section>

      {/* Product Details */}
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

      {/* Closing */}
      <Text className='mt-6 text-center text-base text-gray-700'>
        Gracias por elegirnos. ¡Esperamos que disfrutes de tu compra!
      </Text>
      <Text className='mt-2 text-center text-sm text-gray-500'>
        Si tienes alguna pregunta, no dudes en{' '}
        <Link href='mailto:support@empresa.com'>contactarnos</Link>.
      </Text>
    </TailwindWrapper>
  )
}

PackageOnDelivery.PreviewProps = {
  orderId: '123456789',
  expectedDeliveryDate: new Date(),
  products: [],
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
  currier: 'Empresa de Transporte',
  currierCode: '123456789',
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'rB4Qs@example.com'
  },
  currierLink: 'https://example.com/tracking/123456789'
} as unknown as PackageOnDeliveryProps

export default PackageOnDelivery
