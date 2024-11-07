import React from 'react'
import InputCom from '@/components/Helpers/InputCom'

const CouponValidation = () => {
  // TODO: Make this component a Form
  // TODO: Make a Server Action for the validation of the Coupon
  return (
    <div className='discount-code mb-5 flex h-[50px] w-full sm:mb-0 sm:w-[270px]'>
      <div className='h-full flex-1'>
        <InputCom type='text' placeholder='Discount Code' />
      </div>
      <button type='button' className='black-btn h-[50px] w-[90px]'>
        <span className='text-sm font-semibold'>Apply</span>
      </button>
    </div>
  )
}

export default CouponValidation
