'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// * ASSETS IMPORTS
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Pencil } from 'lucide-react'
import { PlaceholderSquare } from '@/assets'

// * UTILS IMPORTS
import { costumerSchema, CostumerSchema } from '@/lib/schemas'
import { GET_USER_INFOResult } from '@/types/sanity'
import userProfileUpdate from '@/actions/user-profile-update'

export default function ProfileTab({ user }: { user: GET_USER_INFOResult }) {
  const [profileImg, setProfileImg] = React.useState<string | null>(null)
  const profileImgInput = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  const browseProfileImg = React.useCallback(() => {
    profileImgInput?.current?.click()
  }, [])

  const profileImgChangHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== '') {
        const imgReader = new FileReader()
        imgReader.onload = (event) => {
          setProfileImg(event.target?.result as string)
        }
        if (e.target.files) {
          imgReader.readAsDataURL(e.target.files[0] as File)
        }
      }
    },
    [setProfileImg]
  )

  const form = useForm<CostumerSchema>({
    resolver: zodResolver(costumerSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      userName: user?.userName || '',
      billingAddress: {
        address1: user?.billingAddress?.address1 || '',
        address2: user?.billingAddress?.address2 || '',
        city: user?.billingAddress?.city || '',
        postcode: user?.billingAddress?.postcode || '',
        state: user?.billingAddress?.state || '',
        email: user?.email || '',
        phone: user?.billingAddress?.phone || '',
        firstName: user?.firstName || ''
      },
      shippingAddresses: {
        address1: user?.billingAddress?.address1 || '',
        address2: user?.billingAddress?.address2 || '',
        city: user?.billingAddress?.city || '',
        postcode: user?.billingAddress?.postcode || '',
        state: user?.billingAddress?.state || '',
        email: user?.email || '',
        phone: user?.billingAddress?.phone || '',
        firstName: user?.firstName || ''
      }
    }
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset
  } = form

  React.useEffect(() => {
    if (!isDirty) return
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
  }, [isDirty])

  const onSubmit = async (values: CostumerSchema) => {
    const refactoredValues = { ...values, id: user?.id, avatarUrl: profileImg }
    const isEmailDirty = form.getFieldState('email', form.formState).isDirty
    const response = await userProfileUpdate(refactoredValues, isEmailDirty)

    if (!response?.success) {
      toast.error(response?.message, {
        duration: 4000
      })
    } else {
      toast.success(response?.message, {
        duration: 4000
      })
      reset()
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex space-x-8'>
          <div className='w-[570px]'>
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
            <div className='input-item mb-4 flex space-x-2.5'>
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
            <fieldset className='border-t border-accent/20'>
              {/* BILLING ADDRESS */}
              <legend className='mb-2 mt-4 block pr-4 text-lg font-semibold leading-6 text-gray-900'>
                Dirección de Facturación
              </legend>
              <div className='input-item mt-2 flex space-x-2.5'>
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
              <div className='input-item mt-4 flex space-x-2.5'>
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
              <div className='input-item mt-4 flex space-x-2.5'>
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
            </fieldset>
          </div>
          <div className='flex-1'>
            <div className='update-logo mb-9 w-full'>
              <h2 className='text-qblack mb-2 flex items-center text-xl font-bold tracking-wide'>
                Foto de Perfil
              </h2>
              <p className='mb-5 text-xs text-gray-700'>
                El perfil debe tener un tamaño mínimo de
                <span className='text-qblack ml-1'>300x300</span>. Los gifs
                también funcionan.
                <span className='text-qblack ml-1'>Máximo 5mb</span>.
              </p>
              <div className='flex justify-start xl:justify-center'>
                <div className='relative'>
                  <div className='relative h-[199px] w-[199px] overflow-hidden rounded-full sm:h-[198px] sm:w-[198px]'>
                    <Image
                      src={profileImg || user?.avatar?.url || PlaceholderSquare}
                      alt={user?.email || 'Sin Email'}
                      title={user?.email || 'Sin Email'}
                      placeholder='blur'
                      blurDataURL={
                        user?.avatar?.blur || PlaceholderSquare.blurDataURL
                      }
                      width={100}
                      height={100}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <input
                    ref={profileImgInput}
                    onChange={(e) => profileImgChangHandler(e)}
                    type='file'
                    className='hidden'
                  />
                  <div
                    onClick={browseProfileImg}
                    className='absolute bottom-7 right-[105px] flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-700 text-gray-50 sm:right-0'
                  >
                    <Pencil size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <div className='mt-4 flex items-center space-x-4 pt-4'>
          <button
            type='button'
            onClick={() => reset()}
            className='hover-200 h-[50px] w-[164px] font-semibold text-red-500 hover:text-gray-900'
          >
            Cancelar
          </button>
          {isDirty && (
            <button
              type='submit'
              className='hover-200 h-[50px] w-[164px] bg-accent text-gray-50 hover:text-gray-900'
            >
              Actualizar
            </button>
          )}
        </div>
      </form>
    </Form>
  )
}
