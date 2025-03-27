import { Section, Text, Heading, Button, Link } from '@react-email/components'
import * as React from 'react'
import TailwindWrapper from './utils/tailwind-wrapper'

interface ReactivateAccountProps {
  name: string
  reactivateLink: string
}

export const ReactivateAccount = ({
  name,
  reactivateLink
}: ReactivateAccountProps) => {
  const previewText = `Hemos Extrañado Tu Presencia`
  return (
    <TailwindWrapper previewText={previewText}>
      <Section className='rounded-[8px] bg-white p-[24px]'>
        <Heading className='mb-[16px] text-[32px] font-bold text-gray-800'>
          Nuevo Sitio Web
        </Heading>
        <Text className='mb-[16px] text-[16px] text-gray-700'>
          Hola {name},
        </Text>
        <Text className='mb-[16px] text-[16px] text-gray-700'>
          Hemos hecho algunas mejoras emocionantes y nos encantaría darte la
          bienvenida de nuevo.
        </Text>
        <Section className='mb-[24px] bg-accent/10 p-[16px]'>
          <Heading className='mb-[8px] text-[18px] font-bold text-accent'>
            ¿Qué Hay de Nuevo en Nuestro Sitio Web:
          </Heading>
          <Text className='mb-[8px] text-[16px] text-gray-700'>
            ✓ Interfaz de usuario completamente rediseñada para una mejor
            navegación
          </Text>
          <Text className='mb-[8px] text-[16px] text-gray-700'>
            ✓ Función e interfaz de comparación para que puedas decidir con más
            información
          </Text>
          <Text className='mb-[0px] text-[16px] text-gray-700'>
            ✓ Funcionalidad de búsqueda mejorada y Filtros para encontrar lo que
            necesitas más rápido
          </Text>
        </Section>
        <Section className='mb-[24px]'>
          <Heading className='mb-[16px] text-[20px] font-bold text-gray-800'>
            Nuevos Precios
          </Heading>
          <Text className='mb-[16px] text-[16px] text-gray-700'>
            Tenemos mejores ofertas y servicios para ti. reactiva tu cuenta para
            que puedas aprovecharlas.
          </Text>
          <Button
            className='box-border block bg-accent px-[24px] py-[12px] text-center font-bold text-white no-underline'
            href={reactivateLink}
          >
            REACTIVA MI CUENTA AHORA
          </Button>
        </Section>
        <Text className='mb-[24px] text-[16px] text-gray-700'>
          Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de
          soporte estará siempre aquí para ayudarte.
        </Text>
        <Link href='tel:+34956861081'>956 861 081</Link> /{' '}
        <Link href='tel:+34667525413'>667 525 413</Link>
        <Text className='mb-[8px] text-[16px] text-gray-700'>
          Estamos emocionados de verte de nuevo en nuestra plataforma.
        </Text>
      </Section>
    </TailwindWrapper>
  )
}

ReactivateAccount.PreviewProps = {
  name: 'John Doe',
  reactivateLink: '#'
} as unknown as ReactivateAccountProps

export default ReactivateAccount
