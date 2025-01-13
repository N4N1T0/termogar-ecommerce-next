import React from 'react'
import { renderPulseDivs } from '@/lib/ui-utils'

const ProfileLoading = () => {
  return (
    <div className='container-x mx-auto my-10 flex w-full flex-col space-y-3 bg-white py-5'>
      {renderPulseDivs(1, 'w-1/5', 'h-6', 'title')}
      <div className='mt-5 flex h-80 items-center justify-center gap-10 space-y-3'>
        {renderPulseDivs(1, 'w-64', 'h-full', 'profile-image')}
        {renderPulseDivs(1, 'flex-1', 'h-full', 'profile-details')}
      </div>
    </div>
  )
}

export default ProfileLoading
