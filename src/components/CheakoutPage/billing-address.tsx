'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// * ASSETS IMPORTS
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import ShippingAddressForm from '@/components/CheakoutPage/shipping-address-form'
import CheckoutPasswordCheck from '@/components/CheakoutPage/password-check'
import { toast } from 'sonner'

// * UTILS IMPORTS
import { checkoutUser, CheckoutUser } from '@/lib/schemas'
import { GET_USER_INFOResult } from '@/types/sanity'
import checkoutLogic from '@/actions/checkout-logic'
import { cn } from '@/lib/utils'

const BillingAddress = ({ user }: { user: GET_USER_INFOResult }) => {
  const [isShippingAddress, setIsShippingAddress] =
    React.useState<boolean>(false)
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()

  const isDisabled =
    searchParams.get('userId') && searchParams.get('newAddress') ? true : false

  const form = useForm<CheckoutUser>({
    resolver: zodResolver(checkoutUser),
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      userName: user?.userName || '',
      password: '',
      confirmPassword: '',
      companyName: user?.companyName || '',
      IdDocument: user?.IdDocument || '',
      billingAddress: {
        address1: user?.billingAddress?.address1 || '',
        address2: user?.billingAddress?.address2 || '',
        city: user?.billingAddress?.city || '',
        postcode: user?.billingAddress?.postcode || '',
        state: user?.billingAddress?.state || '',
        email: user?.email || 'juan@example.com',
        phone: user?.billingAddress?.phone || '',
        firstName: user?.firstName || ''
      },
      shippingAddresses: {
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        state: '',
        email: '',
        phone: '',
        firstName: ''
      }
    },
    mode: 'onChange'
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, dirtyFields },
    reset
  } = form

  const isDirty = Object.values(dirtyFields).length > 0
  const noErrors = Object.keys(errors).length === 0

  // IN CASE NEW USER
  React.useEffect(() => {
    form.setValue('password', user ? '12345678a' : '')
    form.setValue('confirmPassword', user ? '12345678a' : '')
  }, [user, form])

  // IN CASE NEW ADDRESS
  React.useEffect(() => {
    const fields = [
      {
        key: 'shippingAddresses.address1',
        value: !isShippingAddress ? 'Marbella 1' : ''
      },
      {
        key: 'shippingAddresses.address2',
        value: !isShippingAddress ? 'Marbella 2' : ''
      },
      {
        key: 'shippingAddresses.city',
        value: !isShippingAddress ? '12345' : ''
      },
      {
        key: 'shippingAddresses.email',
        value: !isShippingAddress ? 'juan@example.com' : form.getValues('email')
      },
      {
        key: 'shippingAddresses.firstName',
        value: !isShippingAddress ? 'Marbella 4' : form.getValues('firstName')
      },
      {
        key: 'shippingAddresses.phone',
        value: !isShippingAddress ? '12345' : ''
      },
      {
        key: 'shippingAddresses.postcode',
        value: !isShippingAddress ? '12345' : ''
      },
      {
        key: 'shippingAddresses.state',
        value: !isShippingAddress ? 'Marbella 4' : ''
      }
    ]

    fields.forEach(({ key, value }) => {
      // @ts-expect-error ignore
      form.setValue(key, value)
    })
  }, [isShippingAddress, form])

  React.useEffect(() => {
    if (!isDirty || isDisabled) return
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      return (event.returnValue = '')
    }

    window.addEventListener('beforeunload', handleBeforeUnload, {
      capture: true
    })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, {
        capture: true
      })
    }
  }, [path, isDirty, isDisabled])

  const onSubmit = async (values: CheckoutUser) => {
    if (!isDirty && noErrors && !isShippingAddress) {
      router.push(
        `/checkout?userId=${user?.id}&newAddress=false#order-summary`,
        {
          scroll: false
        }
      )
      return
    }

    const response = await checkoutLogic(
      values,
      user ? false : true,
      isShippingAddress
    )

    if (response?.success) {
      toast.success(response.message, {
        duration: 4000
      })
      router.push(
        `/checkout?userId=${response.userId}&newAddress=${isShippingAddress}#order-summary`,
        {
          scroll: false
        }
      )
    } else {
      toast.error(response?.message, {
        duration: 4000
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex-1',
          isDisabled ? 'pointer-events-none opacity-50' : ''
        )}
      >
        <h2
          className={cn(
            'mb-5 text-xl font-medium sm:text-2xl',
            isDisabled ? 'text-gray-900' : 'text-accent'
          )}
        >
          Datos de Envío y Facturación
        </h2>
        <fieldset className='flex justify-center px-4'>
          <div className='max-w-[570px] md:w-full'>
            {/* USER INFO */}
            <div className='mb-4 flex space-x-2.5'>
              <FormFieldComponent
                className='w-full'
                label='Nombre'
                placeholder='Juan...'
                type='text'
                control={control}
                name='firstName'
                isSubmitting={isSubmitting}
                autocomplete='given-name'
              />
              <FormFieldComponent
                className='w-full'
                label='Apellidos'
                placeholder='perez...'
                type='text'
                control={control}
                name='lastName'
                isSubmitting={isSubmitting}
                autocomplete='family-name'
              />
            </div>
            <div className='mb-4 flex space-x-2.5'>
              <FormFieldComponent
                className='w-full'
                label='Email'
                placeholder='juan@perez...'
                type='email'
                control={control}
                name='email'
                isSubmitting={isSubmitting}
                autocomplete='email'
              />
              <FormFieldComponent
                className='w-full'
                label='Usuario'
                placeholder='juanP11...'
                type='text'
                control={control}
                name='userName'
                isSubmitting={isSubmitting}
                autocomplete='username'
              />
            </div>
            <div className='mb-4 flex space-x-2.5'>
              <FormFieldComponent
                className='w-full'
                label='Documento de Identidad'
                placeholder='123456...'
                type='text'
                control={control}
                name='IdDocument'
                isSubmitting={isSubmitting}
                autocomplete='document-id'
              />
              <FormFieldComponent
                className='w-full'
                label='Nombre de de la Compañía (Opcional)'
                placeholder='termoga...'
                type='text'
                control={control}
                name='companyName'
                isSubmitting={isSubmitting}
                autocomplete='organization'
              />
            </div>
            <fieldset className='border-t border-accent/20'>
              {/* BILLING ADDRESS */}
              <legend className='mb-2 mt-4 block pr-4 text-lg font-semibold leading-6 text-gray-900'>
                Dirección de Facturación
              </legend>
              <div className='mt-4 flex flex-col gap-2 md:flex-row'>
                <FormFieldComponent
                  className='w-full'
                  label='Dirección'
                  placeholder='Calle 123...'
                  type='text'
                  control={control}
                  isSubmitting={isSubmitting}
                  name='billingAddress.address1'
                  autocomplete='address-line1'
                />
                <FormFieldComponent
                  className='w-full'
                  label='Dirección 2'
                  placeholder='Piso 2...'
                  type='text'
                  control={control}
                  isSubmitting={isSubmitting}
                  name='billingAddress.address2'
                  autocomplete='address-line2'
                />
              </div>
              <div className='mt-4 flex space-x-2.5'>
                <FormFieldComponent
                  className='w-full'
                  label='Ciudad'
                  placeholder='Malaga'
                  type='text'
                  control={control}
                  name='billingAddress.city'
                  isSubmitting={isSubmitting}
                  autocomplete='address-level2'
                />
                <FormFieldComponent
                  className='w-full'
                  label='Código Postal'
                  placeholder='1234'
                  type='text'
                  control={control}
                  name='billingAddress.postcode'
                  isSubmitting={isSubmitting}
                  autocomplete='postal-code'
                />
              </div>
              <div className='mt-4 flex space-x-2.5'>
                <FormFieldComponent
                  className='w-full'
                  label='Localidad'
                  placeholder='Marbella'
                  type='text'
                  control={control}
                  name='billingAddress.state'
                  isSubmitting={isSubmitting}
                  autocomplete='address-level1'
                />
                <FormFieldComponent
                  className='w-full'
                  label='Numero de Teléfono'
                  placeholder='123456789'
                  type='text'
                  control={control}
                  name='billingAddress.phone'
                  isSubmitting={isSubmitting}
                  autocomplete='tel'
                />
              </div>

              {/* NEW USER PASSWORD CHECK */}
              {!user && (
                <fieldset className='mt-5 space-y-4 border-t border-accent/20'>
                  <legend className='pr-4 text-sm text-tertiary'>
                    Crea tu contraseña y date de alta en Termogar.es
                  </legend>
                  <CheckoutPasswordCheck form={form} />
                </fieldset>
              )}
              <hr className='my-3 h-px border-none bg-accent/20' />

              {/* NEW ADDRESS CHECKBOX */}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='useShippingAddress'
                  name='useShippingAddress'
                  checked={isShippingAddress}
                  onCheckedChange={() =>
                    setIsShippingAddress(!isShippingAddress)
                  }
                  className='h-4 w-4'
                />
                <label
                  htmlFor='useShippingAddress'
                  className='text-sm text-tertiary'
                >
                  Usar una dirección de envío diferente a la de facturación
                </label>
              </div>

              {/* SHIPPING ADDRESS */}
              {isShippingAddress && <ShippingAddressForm form={form} />}
            </fieldset>
          </div>
        </fieldset>
        <div className='mt-4 flex items-center space-x-4 pt-4'>
          <button
            type='button'
            aria-disabled={isSubmitting}
            onClick={() => reset()}
            className='hover-200 h-[50px] w-[164px] font-semibold text-red-500 hover:text-gray-900 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          >
            Cancelar
          </button>
          <button
            type='submit'
            aria-disabled={isSubmitting}
            className='hover-200 h-[50px] w-[164px] bg-accent text-gray-50 hover:text-gray-900 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          >
            {isSubmitting
              ? 'Actualizando...'
              : isDirty && user
                ? 'Actualizar Datos'
                : 'Aceptar Datos'}
          </button>
          {!user && (
            <Link
              href={`/login?redirectTo=${path}`}
              aria-disabled={isSubmitting}
              className='hover-200 flex h-[50px] w-[164px] items-center justify-center bg-tertiary text-gray-50 hover:text-gray-900 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
            >
              inicia sesión
            </Link>
          )}
        </div>
      </form>
    </Form>
  )
}

export default BillingAddress
