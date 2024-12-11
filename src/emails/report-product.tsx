import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface ReportProductProps {
  productName: string
  reason: 'inapropiado' | 'falso' | 'ofensivo' | 'otro'
  description: string
}

export const ReportProduct = ({
  productName,
  reason,
  description
}: ReportProductProps) => {
  const previewText = `Producto ${productName} reportado`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Producto {productName} reportado
      </Heading>
      <Text className='mb-6 text-gray-800'>
        Estimado equipo administrativo, Se ha reportado un producto en la
        plataforma.
      </Text>
      <Section className='mb-6'>
        <table className='w-full border-collapse'>
          <tbody>
            <tr>
              <td
                className='border border-gray-300 px-4 py-2 font-bold'
                style={{ border: '1px solid #e5e7eb' }}
              >
                Nombre del producto
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {productName}
              </td>
            </tr>
            <tr>
              <td
                className='border border-gray-300 px-4 py-2 font-bold'
                style={{ border: '1px solid #e5e7eb' }}
              >
                Razón
              </td>
              <td className='border border-gray-300 px-4 py-2'>{reason}</td>
            </tr>
            <tr>
              <td
                className='border border-gray-300 px-4 py-2 font-bold'
                style={{ border: '1px solid #e5e7eb' }}
              >
                Descripción
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {description}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Text className='mb-6 text-gray-800'>
        Por favor, agreguen este usuario a la lista de envíos del newsletter.
      </Text>
    </TailwindWrapper>
  )
}

ReportProduct.PreviewProps = {
  productName: 'Producto 1',
  reason: 'inapropiado',
  description: 'Descripción del producto'
} as unknown as ReportProductProps

export default ReportProduct
