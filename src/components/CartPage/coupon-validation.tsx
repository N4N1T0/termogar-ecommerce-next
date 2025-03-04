// * NEXT:JS IMPORTS
import React, { FormEvent } from 'react'

// * ASSETS IMPORTS
import { toast } from 'sonner'
import { CartItemType } from '@/types'
import { Coupon } from '@/types/sanity'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import Form from 'next/form'
import { couponValidation } from '@/actions/coupon-validation'

const CouponValidation = ({
  cart,
  setCoupon,
  className,
  disabled
}: {
  cart: CartItemType[]
  setCoupon: React.Dispatch<
    React.SetStateAction<{
      amount: number
      type: Coupon['discount_type']
    }>
  >
  className?: string
  disabled?: boolean
}) => {
  const [isPending, setIsPending] = React.useState(false)

  const handleCouponValidationSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await couponValidation(formData, cart)

      if (!response.success) {
        toast.error(response.message, {
          duration: 2000
        })
      } else {
        setIsPending(false)
        toast.success(response.message, {
          duration: 3000
        })

        setCoupon({
          amount: response?.data?.amount as unknown as number,
          type: response?.data?.discount_type as Coupon['discount_type']
        })
      }
    } catch (error) {
      console.error('Error validating coupon:', error)
    }
  }

  return (
    <Form
      action=''
      onSubmit={handleCouponValidationSubmit}
      id='coupon-form'
      className={cn(
        'discount-code mb-5 flex h-[50px] w-full sm:mb-0 sm:w-[270px]',
        className
      )}
    >
      <div className='h-full flex-1'>
        <Input
          type='text'
          placeholder='Código de Cupón'
          name='coupon'
          className='h-full rounded-none border-gray-200'
          disabled={isPending}
        />
      </div>
      <button
        type='submit'
        aria-disabled={isPending || disabled}
        className='hover-200 text-gray-gray-50 h-[50px] w-[90px] bg-accent text-gray-100 hover:text-gray-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
      >
        {isPending ? (
          <span className='animate-pulse text-sm font-medium'>
            Validando...
          </span>
        ) : (
          <span className='text-sm font-medium'>Validar</span>
        )}
      </button>
    </Form>
  )
}

export default CouponValidation
