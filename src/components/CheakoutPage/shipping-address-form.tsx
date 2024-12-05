import { CheckoutUser } from '@/lib/schemas'
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import { UseFormReturn } from 'react-hook-form'

const ShippingAddressForm = ({
  form
}: {
  form: UseFormReturn<CheckoutUser>
}) => {
  const {
    control,
    formState: { isSubmitting }
  } = form

  return (
    <fieldset className='mt-5 border-t border-accent/20'>
      <legend className='my-4 block pr-4 text-lg font-medium leading-6 text-gray-900'>
        Dirección de Envío
      </legend>
      <FormFieldComponent
        className='w-full'
        label='Dirección'
        placeholder='Calle 123...'
        type='text'
        control={control}
        isSubmitting={isSubmitting}
        name='shippingAddresses.address1'
        autocomplete='address-line1'
      />
      <FormFieldComponent
        className='mt-4 w-full'
        label='Dirección 2'
        placeholder='Piso 2...'
        type='text'
        control={control}
        isSubmitting={isSubmitting}
        name='shippingAddresses.address2'
        autocomplete='address-line2'
      />
      <div className='input-item mt-4 flex space-x-2.5'>
        <FormFieldComponent
          className='w-full'
          label='Ciudad'
          placeholder='Malaga'
          type='text'
          control={control}
          name='shippingAddresses.city'
          isSubmitting={isSubmitting}
          autocomplete='address-level2'
        />
        <FormFieldComponent
          className='w-full'
          label='Código Postal'
          placeholder='1234'
          type='text'
          control={control}
          name='shippingAddresses.postcode'
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
          name='shippingAddresses.state'
          isSubmitting={isSubmitting}
          autocomplete='address-level1'
        />
        <FormFieldComponent
          className='w-full'
          label='Numero de Teléfono'
          placeholder='123456789'
          type='text'
          control={control}
          name='shippingAddresses.phone'
          isSubmitting={isSubmitting}
          autocomplete='tel'
        />
      </div>
      <hr />
    </fieldset>
  )
}

export default ShippingAddressForm
