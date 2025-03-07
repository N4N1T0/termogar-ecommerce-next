import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface AskAboutAProductProps {
  productName: string
  email: string
  message: string
}

export const AskAboutAProduct = ({
  productName,
  email,
  message
}: AskAboutAProductProps) => {
  const previewText = `Producto ${productName} reportado`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Pregunta sobre {productName}
      </Heading>
      <Text className='mb-6 text-gray-800'>
        Estimado equipo administrativo, hay una pregunta de parte del cliente
        {email}.
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
                Mensaje
              </td>
              <td className='border border-gray-300 px-4 py-2'>{message}</td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Text className='mb-6 text-gray-800'>
        Por favor, responder con la mayor brevedad posible.
      </Text>
    </TailwindWrapper>
  )
}

AskAboutAProduct.PreviewProps = {
  productName: 'Producto 1',
  email: 'correo@ejemplo',
  message: 'Hola, estoy interesado en este producto.'
} as unknown as AskAboutAProductProps

export default AskAboutAProduct
