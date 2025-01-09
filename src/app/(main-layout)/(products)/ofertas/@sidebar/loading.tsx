import React from 'react'

const SidebarLoading = () => {
  return (
    <aside className='sticky top-0 m-4 hidden h-screen w-72 animate-pulse divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10 md:block'>
      {Array(8)
        .fill('SidebarCategories')
        .map((item, index) => (
          <div
            key={`${item}-${index}`}
            className='my-3 h-20 w-full rounded bg-gray-200'
          />
        ))}
    </aside>
  )
}

export default SidebarLoading
