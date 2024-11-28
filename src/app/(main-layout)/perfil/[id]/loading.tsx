import React from 'react'

const ProfileLoading = () => {
  return (
    <div className='container-x mx-auto my-10 flex w-full flex-col bg-white py-5'>
      <div className='mt-5 h-6 w-1/5 animate-pulse bg-gray-100' />
      <div className='mt-5 flex h-80 items-center justify-center gap-10'>
        <div className='h-full w-64 animate-pulse bg-gray-100' />
        <div className='h-full flex-1 animate-pulse bg-gray-100' />
      </div>
    </div>
  )
}

export default ProfileLoading
