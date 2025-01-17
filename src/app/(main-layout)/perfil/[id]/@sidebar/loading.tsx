import React from 'react'
import { renderPulseDivs } from '@/lib/ui-utils'

const ProfileLoading = () => {
  return (
    <div className='max-w-[250px]'>
      {renderPulseDivs(5, 'w-full', 'h-6', 'title')}
    </div>
  )
}

export default ProfileLoading
