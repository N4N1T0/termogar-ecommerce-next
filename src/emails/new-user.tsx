import { Section, Text, Heading, Link } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface NewUserProps {
  email: string
  registrationDate: string
  link: string
}

export const NewUser = ({ email, registrationDate, link }: NewUserProps) => {
  const previewText = `Nuevo Usuario Registrado`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Nuevo Usuario Registrado
      </Heading>
      <Text className='mb-6 text-gray-800'>
        Estimado equipo administrativo, Se ha creado una nueva cuenta de usuario
        en la plataforma.
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
                Fecha de creación
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {new Date(registrationDate).toLocaleDateString('es-ES')}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Text className='mb-6 text-gray-800'>
        Por favor, verifiquen la información del usuario si es necesario.
        <Link href={link}>Puedes verificar la info aquí</Link>
      </Text>
    </TailwindWrapper>
  )
}

NewUser.PreviewProps = {
  email: 'rB4Qs@example.com',
  name: 'John Doe',
  registrationDate: new Date().toISOString(),
  link: 'https://example.com'
} as unknown as NewUserProps

export default NewUser
