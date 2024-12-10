'use client'

// * ASSETS IMPORTS
import PasswordIlustration from '@/components/Auth/Profile/utils/password-ilustration'
import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import PasswordCheck from '@/components/Auth/ResetPassword/password-check'
import resetPassword from '@/actions/reset-password'

// * UTILS IMPORTS
import { PasswordSchema, passwordReset } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GET_USER_INFOResult } from '@/types/sanity'

const PasswordTab = ({ user }: { user: GET_USER_INFOResult }) => {
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
        duration: 4000,
        classNames: {
          toast: 'text-green-500 border-green-500'
        }
      })
      reset()
    } else {
      toast.error(response.message, {
        duration: 4000,
        classNames: {
          toast: 'bg-red-500 text-white'
        }
      })
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset
  } = form

  return (
    <div className='flex w-full flex-col-reverse space-x-5 xl:flex-row xl:items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mb-10 w-[397px]'
        >
          <input
            type='hidden'
            name='username'
            value={user?.userName || 'userName'}
            autoComplete='username'
          />
          <PasswordCheck form={form} />
          <div className='mt-[30px] w-full items-center justify-start space-y-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='hover-200 h-[46px] w-full bg-accent font-bold text-gray-100 hover:text-gray-400'
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting
                ? 'Restableciendo contraseña...'
                : 'Restablecer contraseña'}
            </button>
            {isDirty && (
              <button
                type='button'
                onClick={() => reset()}
                className='mb-5 h-[46px] w-full text-sm font-semibold sm:mb-0'
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </Form>
      <div className='hidden flex-1 justify-end sm:flex'>
        <PasswordIlustration />
      </div>
    </div>
  )
}

export default PasswordTab
