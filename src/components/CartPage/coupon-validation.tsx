// * NEXT:JS IMPORTS
import React, { FormEvent } from 'react'

// * ASSETS IMPORTS
import InputCom from '@/components/Helpers/InputCom'
import { toast } from 'sonner'
import { CartItemType } from '@/types'
import { Coupon } from '@/types/sanity'
import { cn } from '@/lib/utils'

const CouponValidation = ({
  cart,
  setCoupon,
  className
}: {
  cart: CartItemType[]
  setCoupon: React.Dispatch<
    React.SetStateAction<{
      amount: number
      type: Coupon['discount_type']
    }>
  >
  className?: string
}) => {
  const [isPending, setIsPending] = React.useState(false)

  // TODO: Make an server action
  const handleCouponValidationSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())
    const refactoredBody = {
      ...body,
      cart
    }

    try {
      const response = await fetch('/api/coupon-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(refactoredBody)
      })

      const data = await response.json()

      if (!data.success) {
        toast.error(data.message, { duration: 2000 })
      } else {
        setIsPending(false)
        toast.success(data.message, { duration: 3000 })

        setCoupon({
          amount: data.data.amount as number,
          type: data.data.discount_type as Coupon['discount_type']
        })
      }
    } catch (error) {
      console.error('Error validating coupon:', error)
    }
  }

  return (
    <form
      onSubmit={handleCouponValidationSubmit}
      id='coupon'
      className={cn(
        'discount-code mb-5 flex h-[50px] w-full sm:mb-0 sm:w-[270px]',
        className
      )}
    >
      <div className='h-full flex-1'>
        <InputCom
          type='text'
          placeholder='Código de Cupón'
          name='coupon'
          inputClasses='disabled:cursor-not-allowed disabled:opacity-50 border-gray-200'
          isPending={isPending}
        />
      </div>
      <button
        type='submit'
        disabled={isPending}
        className='black-btn hover-200 h-[50px] w-[90px] bg-accent text-gray-950 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isPending ? (
          <span className='animate-pulse text-sm font-semibold'>
            Validando...
          </span>
        ) : (
          <span className='text-sm font-semibold'>Validar</span>
        )}
      </button>
    </form>
  )
}

export default CouponValidation
