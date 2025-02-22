import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface NewsletterUserProps {
  registrationDate: string
  couponCode: string
}

export const NewsletterUserEmail = ({
  registrationDate,
  couponCode
}: NewsletterUserProps) => {
  const previewText = `¡Bienvenido al Newsletter! Aquí tienes tu cupón de descuento.`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        ¡Gracias por suscribirte a nuestro Newsletter!
      </Heading>
      <Text className='mb-6 text-gray-800'>Hola,</Text>
      <Text className='mb-6 text-gray-800'>
        Nos alegra que te hayas suscrito a nuestro boletín. A partir de ahora,
        recibirás noticias, ofertas y contenido exclusivo directamente en tu
        correo electrónico.
      </Text>
      <Section className='mb-6 text-center'>
        <Heading className='mb-2 text-lg font-semibold text-gray-800'>
          🎉 Aquí tienes tu cupón de descuento del 3% 🎉
        </Heading>
        <Text className='text-lg font-bold text-red-600'>{couponCode}</Text>
        <Text className='text-gray-800'>
          Usa este código al finalizar tu compra y disfruta de un 3% de
          descuento.
        </Text>
      </Section>
      <Text className='mb-6 text-gray-800'>
        Fecha de suscripción:{' '}
        {new Date(registrationDate).toLocaleDateString('es-ES')}
      </Text>
      <Text className='mb-6 text-gray-800'>
        ¡Esperamos que disfrutes nuestras novedades!
      </Text>
    </TailwindWrapper>
  )
}

NewsletterUserEmail.PreviewProps = {
  email: 'usuario@example.com',
  registrationDate: new Date(),
  couponCode: 'DESCUENTO3'
} as unknown as NewsletterUserProps

export default NewsletterUserEmail
