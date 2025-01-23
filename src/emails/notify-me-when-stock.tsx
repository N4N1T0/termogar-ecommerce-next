import { Section, Text, Heading, Link, Img } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'
import { GET_USER_INFOResult, Product } from '@/types/sanity'

interface NotifyMeWhenStockProps {
  product: Product
  user: GET_USER_INFOResult
}

export const NotifyMeWhenStock = ({
  product,
  user
}: NotifyMeWhenStockProps) => {
  const { title, slug, featuredMedia } = product
  const previewText = `hola ${user?.firstName} ${user?.lastName}! su compra en Termogar.es ha sido realizada con exito`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-6 text-center text-4xl font-bold text-accent'>
        Ya lo tenemos en stock
        <Text className='text-2xl font-bold'>{title}</Text>
      </Heading>
      <Text className='mb-4 text-base text-gray-700'>
        Hola {user?.firstName},
      </Text>
      <Text className='mb-6 text-base text-gray-700'>
        Como hemos prometido le notificamos que uno de los productos en su lista
        de notificaciones ya esta en stock
      </Text>
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
              <th style={{ padding: '10px', textAlign: 'left' }}>Imagen</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Enlace</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #dddddd' }}>
              <td
                style={{
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Img
                  src={featuredMedia?.asset?._ref}
                  width='140'
                  height='60'
                  alt='company-logo'
                  className='aspect-square'
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{title}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                <Link href={`${process.env.NEXT_PUBLIC_URL}/producto/${slug}`}>
                  Ver el producto
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
    </TailwindWrapper>
  )
}

NotifyMeWhenStock.PreviewProps = {
  product: {
    title: 'Producto 1',
    excerpt: 'Descripción del producto 1',
    slug: 'producto-1'
  },
  user: {
    firstName: 'John',
    lastName: 'Doe'
  }
} as unknown as NotifyMeWhenStockProps

export default NotifyMeWhenStock
