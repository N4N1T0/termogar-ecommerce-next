import { Button } from '@/components/ui/button'

export default function ContactCTA() {
  return (
    <div className='mx-auto max-w-6xl bg-accent px-4 py-12 md:px-6 lg:px-8 lg:py-20'>
      <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2'>
        <div>
          <h2 className='relative text-4xl font-bold text-white md:text-6xl'>
            ¡Contáctenos para tu presupuesto!
          </h2>
        </div>

        <div className='space-y-6'>
          <p className='text-lg text-gray-200'>
            ¿Necesitas ayuda con tu proyecto? Estamos aquí para brindarte la
            mejor solución adaptada a tus necesidades y presupuesto. Nuestro
            equipo de expertos está listo para ayudarte.
          </p>

          <div className='flex flex-wrap gap-4'>
            <Button className='hover-200 rounded-none bg-white text-accent hover:text-gray-900'>
              Solicitar
            </Button>
            <Button
              variant='outline'
              className='hover-200 rounded-none border-white text-white hover:bg-white hover:text-gray-900'
            >
              Más info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
