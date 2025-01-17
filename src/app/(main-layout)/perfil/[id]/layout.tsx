import React from 'react'
import BreadcrumbCom from '@/components/BreadcrumbCom'

const ProfileLayout = ({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) => {
  return (
    <main className='w-full'>
      <div className='container-x mx-auto my-10 w-full'>
        <BreadcrumbCom
          paths={[
            { name: 'P. Principal', path: '/' },
            { name: 'Perfil', path: `/profile` }
          ]}
          className='mb-0'
        />
        <div className='flex flex-col justify-end md:flex-row'>
          {sidebar}
          {children}
        </div>
      </div>
    </main>
  )
}

export default ProfileLayout
