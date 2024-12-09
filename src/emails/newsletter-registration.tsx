import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface NewsletterRegistrationProps {
  email: string
  registrationDate: string
}

export const NewsletterRegistration = ({
  email,
  registrationDate
}: NewsletterRegistrationProps) => {
  const previewText = `Nueva Suscripción al Newsletter`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Nueva Suscripción al Newsletter
      </Heading>
      <Text className='mb-6 text-gray-800'>
        Estimado equipo administrativo, Un usuario se ha suscrito al newsletter
        de la plataforma.
      </Text>
      <Section className='mb-6'>
        <table className='w-full border-collapse'>
          <tbody>
            <tr>
              <td
                className='border border-gray-300 px-4 py-2 font-bold'
                style={{ border: '1px solid #e5e7eb' }}
              >
                Correo electrónico
              </td>
              <td className='border border-gray-300 px-4 py-2'>{email}</td>
            </tr>
            <tr>
              <td
                className='border border-gray-300 px-4 py-2 font-bold'
                style={{ border: '1px solid #e5e7eb' }}
              >
                Fecha de suscripción
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {new Date(registrationDate).toLocaleDateString('es-ES')}
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

NewsletterRegistration.PreviewProps = {
  email: 'rB4Qs@example.com',
  registrationDate: new Date()
} as unknown as NewsletterRegistrationProps

export default NewsletterRegistration
