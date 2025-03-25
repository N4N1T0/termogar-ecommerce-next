'use client'

// * NEXT.JS IMPORTS
import React, { MutableRefObject } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Form from 'next/form'

// * ASSETS IMPORTS
import { useCart } from '@/stores'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import CouponValidation from '@/components/CartPage/coupon-validation'

// * UTILS IMPORTS
import { calculateTotal, cn, eurilize } from '@/lib/utils'
import { Coupon } from '@/types/sanity'
import paymentLogic from '@/actions/payment-logic'
import { RedirectForm } from 'redsys-easy'
import { PlaceholderSquare } from '@/assets'
import { toast } from 'sonner'
import { ChevronLeft } from 'lucide-react'

const OrderSummary = ({
  userId,
  newAddress,
  loading,
  setLoading
}: {
  userId: string | string[] | undefined
  newAddress: string | string[] | undefined
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // * HOOKS
  const { products, rehydrated } = useCart()
  const [coupon, setCoupon] = React.useState<{
    amount: number
    type: Coupon['discount_type']
  }>({
    amount: 0,
    type: 'fixed_cart'
  })
  const [paymentForm, setPaymentForm] = React.useState<RedirectForm | null>(
    null
  )

  const router = useRouter()

  // * VARIABLES
  const isDisabled = !userId && !newAddress
  const [subtotal, total, iva, shipping] = calculateTotal(
    products,
    '33460',
    coupon
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const value = new FormData(event.currentTarget)
    const paymentType = value.get('payment-type')

    const response = await paymentLogic(
      paymentType,
      total,
      userId,
      products,
      newAddress,
      `${coupon.amount}_${coupon.type}`
    )

    if (response.data === null) {
      setLoading(false)
      console.log(response.data)
      toast.error('Error al realizar el pago, por favor intente de nuevo')
      return
    }

    if (
      paymentType === 'transferencia-bancaria-directa' &&
      response.success &&
      response.data !== null
    ) {
      router.push(response.data as unknown as string)
    }

    if (
      paymentType === 'tarjeta' &&
      response.success &&
      response.data !== null
    ) {
      setPaymentForm(response.data as RedirectForm)
    }

    if (
      paymentType === 'paypal' &&
      response.success &&
      response.data !== null
    ) {
      window.location.href = response.data as unknown as string
    }
  }

  return (
    <section
      id='order-summary'
      className={cn(
        'mt-5 h-fit flex-1 px-2 md:sticky md:top-2 md:mt-0 md:px-0',
        isDisabled ? 'pointer-events-none opacity-50' : ''
      )}
    >
      <div className='flex w-full items-center justify-between'>
        <h2
          className={cn(
            'mb-5 text-xl font-medium sm:text-2xl',
            isDisabled ? 'text-gray-900' : 'text-accent'
          )}
        >
          Resumen de Orden
        </h2>
        <button
          onClick={() => router.back()}
          className='hover-200 hover flex items-center gap-1 text-gray-900 hover:text-gray-600'
        >
          <ChevronLeft /> Editar Datos
        </button>
      </div>

      <div className='w-full border border-gray-200 px-7 py-[30px] md:px-10'>
        <div className='mb-4 flex items-center justify-between border-b border-gray-200'>
          <p className='text-[13px] font-medium uppercase text-gray-900'>
            Productos
          </p>
          <p className='text-[13px] font-medium uppercase text-gray-900'>
            total
          </p>
        </div>
        <ul className='mb-4 flex w-full flex-col space-y-5 border-b border-gray-200 pb-3'>
          {rehydrated ? (
            products.map(
              ({
                title,
                quantity,
                categories,
                price,
                sale,
                id,
                featuredMedia,
                selectedOption
              }) => (
                <li key={id} className='flex items-center justify-between'>
                  <div className='flex items-center justify-center gap-3'>
                    <Image
                      src={featuredMedia?.url || PlaceholderSquare}
                      width={50}
                      height={50}
                      priority
                      placeholder='blur'
                      blurDataURL={
                        featuredMedia?.blur || PlaceholderSquare.blurDataURL
                      }
                      alt={title || 'Sin Nombre'}
                      className='border-px h-[50px] w-[50px] border border-gray-200 object-cover'
                    />
                    <div>
                      <h4 className='mb-2.5 text-[15px] text-gray-900'>
                        {title}
                        <sup className='ml-2 mt-2 text-[13px] text-gray-500'>
                          x{quantity}
                        </sup>
                      </h4>
                      {selectedOption === '' ? (
                        <p className='w-full text-balance text-[13px] text-gray-500'>
                          {categories?.map((category, index) => (
                            <span key={category.id}>
                              {' '}
                              {category.name}
                              {index === categories.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </p>
                      ) : (
                        <span className='text-balance text-[13px] text-gray-500'>
                          {selectedOption}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className='text-[15px] font-medium text-gray-900'>
                      {eurilize((sale && sale.price) || price || 0)}
                    </span>
                  </div>
                </li>
              )
            )
          ) : (
            <li className='grid w-full place-content-center'>
              <LoaderStyleOne />
            </li>
          )}
        </ul>
        <div className='mb-5 mt-2 flex justify-between'>
          <p className='text-[13px] font-medium uppercase text-gray-900'>
            SUBTOTAL
          </p>
          <p className='text-[15px] font-medium uppercase text-accent'>
            {eurilize(subtotal)}
          </p>
        </div>
        <div className='mb-5 mt-2 flex justify-between'>
          <p className='text-[13px] font-medium uppercase text-gray-900'>IVA</p>
          <p className='text-[15px] font-medium uppercase text-accent'>
            {eurilize(iva)}
          </p>
        </div>
        <div className='mb-2 flex justify-between border-b border-gray-200 pb-2'>
          <div>
            <span className='mb-3 block text-xs text-gray-600'>Envío</span>
            {shipping === 0 ? (
              <p className='text-base font-medium text-gray-900'>
                Envío Gratis
              </p>
            ) : (
              <p className='text-base font-medium text-gray-900'>
                Gastos de Envío
              </p>
            )}
          </div>
          <p className='text-[15px] font-medium text-gray-900'>
            +{eurilize(shipping)}
          </p>
        </div>
        <CouponValidation
          cart={products}
          setCoupon={setCoupon}
          className='mt-3 sm:w-full'
          disabled={isDisabled}
        />

        <div className='border-px mb-2 mt-4 flex justify-between border-y border-gray-200 py-5'>
          <p className='text-2xl font-medium text-gray-900'>Total</p>
          <p className='text-2xl font-medium text-accent'>{eurilize(total)}</p>
        </div>
        <Form onSubmit={handleSubmit} action='' disabled={isDisabled}>
          <ul className='mt-4'>
            {['Transferencia bancaria directa', 'PayPal', 'Tarjeta'].map(
              (paymentType) => (
                <li className='mb-5' key={paymentType}>
                  <input
                    type='radio'
                    name='payment-type'
                    title='payment-type'
                    required
                    onInvalid={(event) => {
                      event.currentTarget.setCustomValidity(
                        'Por favor, seleccione algunas de estas opciones'
                      )
                    }}
                    value={paymentType.replace(/ /g, '-').toLowerCase()}
                    className='mr-2 cursor-pointer accent-accent'
                    id={paymentType.replace(/ /g, '-').toLowerCase()}
                    disabled={isDisabled}
                  />
                  <label
                    htmlFor={paymentType.replace(/ /g, '-').toLowerCase()}
                    className='text-normal cursor-pointer text-[18px] text-gray-900 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
                    aria-disabled={isDisabled}
                  >
                    {paymentType}
                  </label>
                  {paymentType === 'Transferencia bancaria directa' && (
                    <small className='block text-gray-600'>
                      Realiza tu pago directamente en nuestra cuenta bancaria.
                      Por favor, utiliza tu ID de pedido como referencia de
                      pago.
                    </small>
                  )}
                </li>
              )
            )}
          </ul>
          <button
            type='submit'
            className='hover-200 flex h-[50px] w-full items-center justify-center bg-accent text-gray-50 hover:text-gray-900 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
            aria-disabled={isDisabled}
            disabled={isDisabled}
          >
            <span className='text-sm font-semibold uppercase'>
              {loading ? 'Realizando compra...' : 'Realizar pedido ahora'}
            </span>
          </button>
          {isDisabled && (
            <small className='mt-2 block w-full text-center text-gray-600'>
              Debe completar el formulario para seguir con la compra
            </small>
          )}
        </Form>
      </div>
      <PaymentForm form={paymentForm} />
    </section>
  )
}

const PaymentForm = ({ form }: { form: RedirectForm | null }) => {
  const formRef: MutableRefObject<HTMLFormElement | null> = React.useRef(null)

  React.useEffect(() => {
    // Enviar automáticamente el formulario cuando el componente se monta
    if (formRef.current && form !== null) {
      formRef.current.submit()
    }
  }, [form])

  if (!form) {
    return null
  }

  return (
    <form id='paymentForm' ref={formRef} action={form?.url} method='POST'>
      <input
        type='hidden'
        name='Ds_SignatureVersion'
        value={form?.body.Ds_SignatureVersion}
      />
      <input
        type='hidden'
        name='Ds_MerchantParameters'
        value={form?.body.Ds_MerchantParameters}
      />
      <input
        type='hidden'
        name='Ds_Signature'
        value={form?.body.Ds_Signature}
      />
    </form>
  )
}

export default OrderSummary
