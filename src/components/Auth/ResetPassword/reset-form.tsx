'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// * ASSETS IMPORTS
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import PasswordCheck from '@/components/Auth/ResetPassword/password-check'
import resetPassword from '@/actions/reset-password'

// * UTILS IMPORTS
import { GET_USER_INFOResult } from '@/types/sanity'
import { PasswordSchema, passwordReset } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PlaceholderSquare } from '@/assets'

export function ResetPasswordForm({
  user,
  reset
}: {
  user: GET_USER_INFOResult
  reset: string | string[] | undefined
}) {
  const [state, setState] = useState(false)

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordReset),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: PasswordSchema) => {
    const refactoredValues = {
      ...values,
      id: user?.id
    }
    const response = await resetPassword(refactoredValues)

    if (response.success) {
      toast.success(response.message, {
        duration: 4000
      })
      setState(true)
    } else {
      toast.error(response.message, {
        duration: 4000
      })
    }
  }

  if (!user) {
    return <h1 className='text-xl text-accent'>ERROR FALTAN PARÁMETROS</h1>
  }

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  if (state) {
    return (
      <div className='text-center'>
        <p className='mb-1 text-lg text-green-600'>
          Contraseña restablecida con éxito
        </p>
        <p className='mb-4 text-gray-700'>
          Muchas gracias por su apoyo! que tenga buen dia!
        </p>
        <Link
          href='/'
          className='hover-200 mr-2 bg-accent px-4 py-2 text-gray-50 hover:text-gray-950'
        >
          Ir a la Tienda
        </Link>
        <Link
          href={`/perfil/${user?.id}`}
          className='hover-200 bg-tertiary px-4 py-2 text-gray-50 hover:text-gray-950'
        >
          Ir al Perfil
        </Link>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form>
        <div className='mb-4 space-y-4 text-center'>
          <Image
            src={user?.avatar?.url || PlaceholderSquare}
            alt={user?.firstName || 'Sin Nombre'}
            title={user?.firstName || 'Sin Nombre'}
            width={80}
            height={80}
            placeholder='blur'
            blurDataURL={user?.avatar?.url || PlaceholderSquare.blurDataURL}
            className='mx-auto h-20 w-20 rounded-full'
          />
        </div>
        {reset ? (
          <p className='mb-4 text-sm text-gray-600'>
            Hola <span className='text-accent'>{user?.firstName}</span> aquí
            puede restablecer tu contraseña para su cuenta
          </p>
        ) : (
          <p className='mb-4 text-sm text-gray-600'>
            Hola <span className='text-accent'>{user?.firstName}</span>! Estamos
            creando una nueva y más potente web para ti. Como cliente leal,
            necesitamos que nos acompañes en este proceso actualizando tu
            contraseña.
          </p>
        )}

        <input
          type='hidden'
          name='username'
          value={user?.userName || 'userName'}
          autoComplete='username'
        />
        <PasswordCheck form={form} />
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-red-600 px-4 py-2 text-white hover:bg-red-700'
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting
            ? 'Restableciendo contraseña...'
            : 'Restablecer contraseña'}
        </button>
        {/* // TODO: Add a link to contact support */}
        <p className='mt-4 text-xs text-gray-600'>
          Si tienes alguna duda, por favor contáctenos:
          <br />
          Teléfono:{' '}
          <Link
            href='tel:+34900123456'
            className='hover-200 underline hover:text-accent'
          >
            +34 900 123 456
          </Link>
          <br />
          Email:{' '}
          <Link
            href='mailto:soporte@ejemplo.com'
            className='hover-200 underline hover:text-accent'
          >
            soporte@ejemplo.com
          </Link>
        </p>
      </form>
    </Form>
  )
}
