'use client'

// * ASSETS IMPORTS
import { NewsletterBG } from '@/assets'
import { toast } from 'sonner'

// * UTILS IMPORTS
import subscribeToNewsletter from '@/actions/newsletter-subscriber'
import Form from 'next/form'

const BlogNewsletter = () => {
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
    <Form
      action=''
      scroll={false}
      onSubmit={handleSubmit}
      data-aos='fade-up'
      className='h-[358px] w-full'
      style={{
        background: `url(${NewsletterBG.src}) no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div className='flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-[30px]'>
        <div>
          <h5 className='mb-5 text-[22px] font-bold text-white'>
            Nuestro Newsletter
          </h5>
          <div className='mb-5 h-[1px] w-full bg-[#615B9C]'></div>
          <p className='line-clamp-2 text-base leading-[26px] text-white'>
            Sigue nuestro Newsletter para estar al tanto sobre nosotros.
          </p>
        </div>
        <div>
          <div className='mb-3.5 w-full'>
            <input
              type='email'
              name='email'
              className='h-[60px] w-full bg-gray-200 pl-5 placeholder:text-gray-500 focus:outline-none focus:ring-0'
              placeholder='Ingresa tu dirección de correo electrónico'
            />
          </div>
          <button
            type='submit'
            className='hover-200 h-[60px] w-full bg-accent hover:text-gray-100'
          >
            Suscribirse
          </button>
        </div>
      </div>
    </Form>
  )
}

export default BlogNewsletter
