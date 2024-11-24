'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

// * ASSETS IMPORTS
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'

// * UTILS IMPORTS
import { SignupSchema, signupSchema } from '@/lib/schemas'
import signupAction from '@/actions/signup-action'

const SignupForm = ({
  redirectTo
}: {
  redirectTo: string | string[] | undefined
}) => {
  const router = useRouter()
  const tempUrl =
    redirectTo === undefined || Array.isArray(redirectTo) ? '/' : redirectTo

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: SignupSchema) => {
    const response = await signupAction(values)

    if (response.success) {
      toast.success(response.message, { duration: 4000 })
      form.reset()
      setTimeout(() => router.push(tempUrl), 4500)
    } else {
      toast.error(response.message, { duration: 5000 })
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-2 w-full lg:w-1/2'>
        <FormFieldComponent
          type='email'
          name='email'
          placeholder='Email'
          label='email'
          control={control}
          isSubmitting={isSubmitting}
          autocomplete='email'
          className='mt-2'
        />
        <FormFieldComponent
          type='password'
          name='password'
          placeholder='Contraseña'
          label='Contraseña'
          control={control}
          isSubmitting={isSubmitting}
          autocomplete='new-password'
          className='mt-2'
        />
        <FormFieldComponent
          type='password'
          name='confirmPassword'
          placeholder='Contraseña'
          label='Confirmar Contraseña'
          control={control}
          isSubmitting={isSubmitting}
          autocomplete='confirm-password'
          className='mt-2'
        />
        <div className='signin-area mb-3'>
          <div className='flex justify-center'>
            <button
              disabled={isSubmitting}
              type='submit'
              className='hover-200 mb-3 flex h-[50px] w-full items-center justify-center bg-accent text-lg font-medium text-gray-900 hover:text-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75'
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </div>
        <div className='signup-area flex justify-center'>
          <p className='text-sm font-normal text-gray-700'>
            Ya tienes Cuenta?
            <Link
              href={`/login?redirectTo=${tempUrl}`}
              className='hover-200 ml-2 text-accent hover:text-gray-900'
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default SignupForm
