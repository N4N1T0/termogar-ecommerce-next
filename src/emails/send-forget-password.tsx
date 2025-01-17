import * as React from 'react'
import { Section, Text, Heading, Link } from '@react-email/components'
import TailwindWrapper from './utils/tailwind-wrapper'

interface SendForgotPasswordProps {
  token: string
  name: string
}

export const SendForgotPassword = ({
  token,
  name
}: SendForgotPasswordProps) => {
  const previewText = `termogar le envía un link para poder recuperar su contraseña`

  return (
    <TailwindWrapper previewText={previewText}>
      <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
        Contraseña Olvidada
      </Heading>
      <Text className='mb-6 text-gray-800'>
        Estimado {name}, has solicitado cambiar tu contraseña en Termogar. por
        lo que el equipo de termogar le envía este correo para poder
        recuperarla, solo tiene que hacer click en el enlace de abajo.
      </Text>
      <Section className='mb-6'>
        <Link
          href={`http://localhost:3000/reset-password/?token=${token}?reset=true`}
        >
          Recuperar contraseña
        </Link>
      </Section>
      <Text className='mb-6 text-gray-800'>
        Si el enlace no funciona, por favor copie el enlace y péguelo en su
        navegador. Recuerde que tiene 24 horas de vigencia a partir de{' '}
        <span className='underline'>{new Date().toLocaleString()}</span>, hasta{' '}
        <span className='underline'>
          {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}.
        </span>
      </Text>
      <Text>
        http://localhost:3000/reset-password/?token={token}?reset=true
      </Text>
    </TailwindWrapper>
  )
}

SendForgotPassword.PreviewProps = {
  token: 'rB4Qs67lPD9Krg',
  name: 'John Doe'
} as unknown as SendForgotPasswordProps

export default SendForgotPassword
