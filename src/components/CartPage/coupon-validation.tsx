// * NEXT:JS IMPORTS
import React, { FormEvent } from 'react'

// * ASSETS IMPORTS
import { toast } from 'sonner'
import { CartItemType } from '@/types'
import { Coupon } from '@/types/sanity'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

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
        toast.error(data.message, {
          duration: 2000,
          classNames: {
            toast: 'bg-red-500 text-white'
          }
        })
      } else {
        setIsPending(false)
        toast.success(data.message, {
          duration: 3000,
          classNames: {
            toast: 'text-green-500 border-green-500'
          }
        })

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
        aria-disabled={isPending}
        className='black-btn hover-200 text-gray-gray-50 h-[50px] w-[90px] bg-accent hover:text-gray-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
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
