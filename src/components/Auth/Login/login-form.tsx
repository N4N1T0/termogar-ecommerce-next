'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

// * ASSETS IMPORTS
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import GoogleIcon from '@/components/Auth/Login/google-icon'

// * UTILS IMPORTS
import { loginSchema, LoginSchema } from '@/lib/schemas'
import { loginAction, loginGoogleAction } from '@/actions/login-action'
import { toast } from 'sonner'
import sendForgetPassword from '@/actions/send-forgot-password'

const LoginForm = ({
  redirectTo
}: {
  redirectTo: string | string[] | undefined
}) => {
  const router = useRouter()
  const [forgotPassword, setForgotPassword] = React.useState(false)
  const tempUrl =
    redirectTo === undefined || Array.isArray(redirectTo) ? '/' : redirectTo

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginSchema) => {
    const response = await loginAction(values)

    if (!response?.success) {
      toast.error(response?.message, {
        duration: 4000
      })
      setForgotPassword(true)
    } else {
      toast.success(
        `${response.message} ${redirectTo && !Array.isArray(redirectTo) ? 'Tienda' : 'Pagina Principal'}`,
        {
          duration: 4000
        }
      )
      setTimeout(() => router.push(tempUrl), 2000)
    }
  }

  const handleForgotPassword = async () => {
    const response = await sendForgetPassword(form.getValues('email'))

    if (!response?.success) {
      toast.error(response?.message, {
        duration: 4000
      })
    } else {
      toast.success(response.message, {
        duration: 4000
      })
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-2 w-full lg:w-1/2'
        >
          <div className='mb-5'>
            <FormFieldComponent
              control={form.control}
              isSubmitting={isSubmitting}
              label='Email'
              name='email'
              placeholder='Introduzca su email'
              type='email'
            />
          </div>
          <div className='mb-5'>
            <FormFieldComponent
              placeholder='● ● ● ● ● ●'
              control={form.control}
              isSubmitting={isSubmitting}
              label='Contraseña'
              name='password'
              type='password'
              autocomplete='current-password'
            />
          </div>
          <div className='signin-area mb-3.5'>
            <div className='flex justify-center'>
              <button
                disabled={isSubmitting}
                type='submit'
                className='hover-200 mb-3 flex h-[50px] w-full items-center justify-center bg-accent text-lg font-medium text-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75'
              >
                {isSubmitting ? 'iniciando...' : 'iniciar'}
              </button>
            </div>
          </div>
        </form>
      </Form>
      <form
        action={() => loginGoogleAction(redirectTo)}
        className='w-full lg:w-1/2'
      >
        <button
          type='submit'
          className='border-gray-500-border hover-200 flex h-[50px] w-full items-center justify-center space-x-3 border bg-gray-200 hover:bg-gray-50'
        >
          <GoogleIcon />
          <span className='text-[18px] font-normal text-gray-700'>
            Inicia sección with Google
          </span>
        </button>
      </form>
      <div className='mt-5 text-xs font-normal text-gray-500'>
        {forgotPassword ? (
          <button
            onClick={() => handleForgotPassword()}
            type='button'
            className='hover-200 ml-2 text-accent hover:text-gray-900'
          >
            Olvidaste la contraseña
          </button>
        ) : (
          <p className='font-normal text-gray-700'>
            No tienes cuenta?
            <Link
              href={`/signup?redirectTo=${tempUrl}`}
              className='hover-200 ml-2 text-accent hover:text-gray-900'
            >
              Regístrate gratis
            </Link>
          </p>
        )}
      </div>
    </>
  )
}

export default LoginForm
