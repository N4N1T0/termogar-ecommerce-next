'use client'

// * ASSETS IMPORTS
import { NewsletterBG } from '@/assets'
import { toast } from 'sonner'

// * UTILS IMPORTS
import subscribeToNewsletter from '@/actions/newsletter-subscriber'
import Form from 'next/form'

const NewsletterBanner = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const email = e.currentTarget.email.value
    const response = await subscribeToNewsletter({ email })

    if (response.success) {
      toast.success(response.message, { duration: 3000 })
    } else {
      toast.error(response.message, {
        duration: 3000
      })
    }
  }

  return (
    <section className='container-x relative mx-auto mt-14 bg-gray-900 text-white'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50'
        style={{
          background: `url(${NewsletterBG.src}) no-repeat`,
          backgroundSize: 'cover'
        }}
        aria-hidden='true'
      />
      <div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Suscribete a nuestro boletín
          </h2>
          <p className='mt-4 text-lg'>
            Mantente a la par de nuestras ofertas y novedades!
          </p>
        </div>
        <Form
          action=''
          scroll={false}
          onSubmit={handleSubmit}
          className='mx-auto mt-8 w-1/2 items-center sm:flex sm:justify-center'
        >
          <div className='min-w-0 flex-1'>
            <label htmlFor='email' className='sr-only'>
              Dirección de correo electrónico
            </label>
            <input
              id='email'
              type='email'
              required
              className='h-[60px] w-full bg-gray-200 pl-5 placeholder:text-gray-500 focus:outline-none focus:ring-0'
              placeholder='Ingresa tu dirección de correo electrónico'
            />
          </div>
          <div className='mt-3 sm:ml-3 sm:mt-0'>
            <button
              type='submit'
              className='hover-200 h-[60px] w-full bg-accent px-5 hover:text-gray-100'
            >
              Suscribirme
            </button>
          </div>
        </Form>
      </div>
    </section>
  )
}

export default NewsletterBanner
